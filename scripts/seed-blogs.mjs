// EJS blog yazilarini (docs/ejs_blog_export/posts/*.md) Supabase "articles"
// tablosuna ekler. Body ham Markdown olarak yazilir; her yazinin ilk gorseli
// indirilip "article-images" bucket'ina yuklenir ve image_url doldurulur.
//
// NOT: Blog yazilari "articles" tablosunda tutulur. "updates" tablosu ayridir
// ve panel/site GUNCELLEMELERI icindir.
//
// Onkosul:
//   1) supabase/migrations/0004_articles.sql + 0003_updates_body_image.sql
//      Supabase'de calistirilmis olmali (articles tablosu + article-images bucket).
//   2) docs scraper'i calistirilmis olmali (docs/ejs_blog_export/posts/*.md var).
//   3) .env.local icinde SUPABASE_SERVICE_ROLE_KEY dolu olmali.
//
// Calistir: node scripts/seed-blogs.mjs
//
// UYARI: Tek seferlik seed. Tekrar calistirilirsa kayitlar TEKRAR eklenir
// (mukerrer). Yeniden calistirmadan once ilgili "articles" kayitlarini silin.

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const POSTS_DIR = "docs/ejs_blog_export/posts";
const BUCKET = "article-images";
const LANG = "tr";

// --- .env.local'i basitce oku (diger seed scriptleriyle ayni desen) ---
const env = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("HATA: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik.");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

// --- Markdown frontmatter + govde ayristirma ---
/**
 * @param {string} raw
 * @returns {{ meta: Record<string,string>, body: string }}
 */
function parseFrontmatter(raw) {
  // BOM'u ve CRLF satir sonlarini normalize et (dosyalar Windows CRLF).
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const meta = {};
  if (!text.startsWith("---")) return { meta, body: text.trim() };

  const end = text.indexOf("\n---", 3);
  if (end === -1) return { meta, body: text.trim() };

  const fm = text.slice(3, end).trim();
  for (const line of fm.split("\n")) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  const body = text.slice(end + 4).trim();
  return { meta, body };
}

/**
 * Govde basindaki tekrar eden meta blogunu temizler:
 *  - "# Baslik" (ilk h1)
 *  - "- Tarih", "- Yayinlayan: ...", "- Kategori: ..." satirlari
 *  - "[Yorum yapilmamis](...#respond)" linki
 *  - tek basina kalan "#" satiri
 * @param {string} body
 * @param {string} title
 * @returns {string}
 */
function cleanBody(body, title) {
  let lines = body.split("\n");

  // Ilk h1 basligi (govdede tekrarlanan) sil.
  if (lines[0]?.trim().startsWith("# ")) lines.shift();

  const dropPatterns = [
    /^#\s*$/, // bos baslik isareti
    /^-\s*[A-Za-zÇĞİÖŞÜçğıöşü]+\s+\d{1,2},\s*\d{4}\s*$/, // - Ocak 9, 2024
    /^-\s*Yayınlayan:/i,
    /^-\s*Kategori:/i,
    /^\[Yorum yapılmamış\]\(.*#respond\)\s*$/i,
  ];

  // Bastan itibaren meta/bos satirlari at; ilk "gercek" icerige gelince dur.
  let start = 0;
  while (start < lines.length) {
    const t = lines[start].trim();
    if (t === "" || dropPatterns.some((p) => p.test(t))) {
      start += 1;
      continue;
    }
    break;
  }
  lines = lines.slice(start);

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Govdedeki ilk Markdown gorsel URL'sini dondurur (yoksa null).
 * @param {string} body
 * @returns {string|null}
 */
function firstImageUrl(body) {
  const m = body.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/);
  return m ? m[1] : null;
}

/**
 * Ilk anlamli paragraftan ~200 karakterlik ozet uretir.
 * @param {string} body
 * @returns {string}
 */
function buildExcerpt(body) {
  for (const block of body.split("\n\n")) {
    const t = block
      .trim()
      .replace(/^[#>\-*\d.]+\s*/, "") // basit markdown isaretlerini sil
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // gorselleri at
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // linkleri metne indir
      .trim();
    if (t.length < 20) continue; // baslik/etiket gibi kisa bloklari atla
    return t.length > 200 ? t.slice(0, 200).trimEnd() + "…" : t;
  }
  return body.slice(0, 200).trim();
}

/**
 * Gorseli indirip bucket'a yukler, public URL doner. Hata olursa null.
 * @param {string} imageUrl
 * @param {string} slug
 * @returns {Promise<string|null>}
 */
async function uploadImageFromUrl(imageUrl, slug) {
  try {
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" },
    });
    if (!res.ok) {
      console.warn(`  ! Gorsel indirilemedi (HTTP ${res.status}): ${imageUrl}`);
      return null;
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      console.warn(`  ! Gorsel degil (${contentType}): ${imageUrl}`);
      return null;
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength === 0) {
      console.warn(`  ! Bos gorsel: ${imageUrl}`);
      return null;
    }

    const extMap = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    const ext = extMap[contentType.split(";")[0].trim()] || "jpg";
    const objectPath = `blog/${slug}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, bytes, { contentType, upsert: false });
    if (error) {
      console.warn(`  ! Yukleme hatasi: ${error.message}`);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
    return data.publicUrl;
  } catch (err) {
    console.warn(`  ! Gorsel istisnasi: ${err?.message ?? err}`);
    return null;
  }
}

// --- Ana akis ---
const files = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort(); // 01-..., 02-... => yeni -> eski

if (files.length === 0) {
  console.error(`HATA: ${POSTS_DIR} icinde .md dosyasi yok. Once scraper'i calistirin.`);
  process.exit(1);
}

console.log(`Bulunan yazi: ${files.length}`);
const rows = [];

for (let i = 0; i < files.length; i += 1) {
  const file = files[i];
  const slug = path.basename(file, ".md");
  const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { meta, body } = parseFrontmatter(raw);

  const title = meta.title || slug;
  const cleanedBody = cleanBody(body, title);
  const excerpt = buildExcerpt(cleanedBody);

  const imgUrl = firstImageUrl(cleanedBody);
  let image_url = null;
  if (imgUrl) {
    console.log(`[${i + 1}/${files.length}] ${title} -> gorsel yukleniyor...`);
    image_url = await uploadImageFromUrl(imgUrl, slug);
  } else {
    console.log(`[${i + 1}/${files.length}] ${title} (gorsel yok)`);
  }

  rows.push({
    lang: LANG,
    title,
    excerpt,
    body: cleanedBody || null,
    image_url,
    sort_order: i + 1, // dosya sirasi: yeni yazi once
    published: true,
  });
}

const { data, error } = await supabase.from("articles").insert(rows).select();
if (error) {
  console.error("HATA:", error.message);
  process.exit(1);
}

const withImage = data.filter((r) => r.image_url).length;
console.log(`\nEklendi: ${data.length} kayit (gorselli: ${withImage}).`);
