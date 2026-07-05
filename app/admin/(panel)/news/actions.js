"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";
import { locales } from "@/lib/locales";
import { translateFields } from "@/lib/deepl";

const BUCKET = "article-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function requireAdmin() {
  if (!(await isAuthed())) {
    throw new Error("Yetkisiz işlem.");
  }
}

/**
 * Secilen gorseli Supabase Storage'a yukler, public URL doner.
 * Dosya yoksa { url: null } doner (mevcut gorsel korunur).
 */
async function uploadImage(supabase, file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return { url: null };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Geçersiz görsel türü (JPEG, PNG, WebP veya GIF olmalı)." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Görsel 5 MB'tan büyük olamaz." };
  }

  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `news-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: `Görsel yüklenemedi: ${error.message}` };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

/**
 * Create modunda ortak alanlari (gorsel, sort_order, published) parse eder.
 * TR title/excerpt/body/tag ayri alinir.
 */
async function parseNewsCreate(supabase, formData) {
  const titleTr = String(formData.get("title_tr") ?? "").trim();
  const excerptTr = String(formData.get("excerpt_tr") ?? "").trim();
  const bodyTr = String(formData.get("body_tr") ?? "").trim();
  const tagTr = String(formData.get("tag_tr") ?? "").trim();

  const titleEn = String(formData.get("title_en") ?? "").trim();
  const excerptEn = String(formData.get("excerpt_en") ?? "").trim();
  const bodyEn = String(formData.get("body_en") ?? "").trim();
  const tagEn = String(formData.get("tag_en") ?? "").trim();

  const titleDe = String(formData.get("title_de") ?? "").trim();
  const excerptDe = String(formData.get("excerpt_de") ?? "").trim();
  const bodyDe = String(formData.get("body_de") ?? "").trim();
  const tagDe = String(formData.get("tag_de") ?? "").trim();

  const titleBs = String(formData.get("title_bs") ?? "").trim();
  const excerptBs = String(formData.get("excerpt_bs") ?? "").trim();
  const bodyBs = String(formData.get("body_bs") ?? "").trim();
  const tagBs = String(formData.get("tag_bs") ?? "").trim();

  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";
  const existingImage = String(formData.get("existing_image_url") ?? "").trim();

  if (!titleTr) return { error: "Başlık (TR) boş olamaz." };
  if (!excerptTr) return { error: "Özet (TR) boş olamaz." };

  const uploaded = await uploadImage(supabase, formData.get("image"));
  if (uploaded.error) return { error: uploaded.error };
  const image_url = uploaded.url ?? (existingImage || null);

  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  return {
    data: {
      tr: { title: titleTr, excerpt: excerptTr, body: bodyTr || null, tag: tagTr || null },
      en: { title: titleEn, excerpt: excerptEn, body: bodyEn || null, tag: tagEn || null },
      de: { title: titleDe, excerpt: excerptDe, body: bodyDe || null, tag: tagDe || null },
      bs: { title: titleBs, excerpt: excerptBs, body: bodyBs || null, tag: tagBs || null },
      shared: { image_url, sort_order, published },
    },
  };
}

/**
 * Edit modunda tek kayit icin parse eder (eski desen, degismedi).
 */
async function parseNews(supabase, formData) {
  const lang = String(formData.get("lang") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";
  const existingImage = String(formData.get("existing_image_url") ?? "").trim();

  if (!locales.includes(lang)) return { error: "Geçersiz dil." };
  if (!title) return { error: "Başlık boş olamaz." };
  if (!excerpt) return { error: "Özet boş olamaz." };

  const uploaded = await uploadImage(supabase, formData.get("image"));
  if (uploaded.error) return { error: uploaded.error };
  const image_url = uploaded.url ?? (existingImage || null);

  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  return {
    data: {
      lang,
      title,
      excerpt,
      body: body || null,
      tag: tag || null,
      image_url,
      sort_order,
      published,
    },
  };
}

export async function createNews(_prevState, formData) {
  await requireAdmin();
  const supabase = createServerClient();
  const parsed = await parseNewsCreate(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { tr, en, de, bs, shared } = parsed.data;

  // TR her zaman eklenir
  const rows = [{ lang: "tr", ...tr, ...shared }];

  // EN/DE/BS: sadece title + excerpt dolu ise ekle
  if (en.title && en.excerpt) rows.push({ lang: "en", ...en, ...shared });
  if (de.title && de.excerpt) rows.push({ lang: "de", ...de, ...shared });
  if (bs.title && bs.excerpt) rows.push({ lang: "bs", ...bs, ...shared });

  const { error } = await supabase.from("news").insert(rows);
  if (error) return { error: error.message };

  revalidatePath("/admin/news");
  return { ok: true };
}

export async function updateNews(_prevState, formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Kayıt bulunamadı." };

  const supabase = createServerClient();
  const parsed = await parseNews(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase.from("news").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/news");
  return { ok: true };
}

export async function deleteNews(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("news").delete().eq("id", id);
  revalidatePath("/admin/news");
}

/**
 * "Otomatik cevir" butonu: TR title/excerpt/body/tag alanlarini DeepL ile EN/DE/BS'ye cevirir.
 * Kayit YAPMAZ; sonucu forma doldurmak icin doner.
 */
export async function translateNewsFields(_prevState, formData) {
  await requireAdmin();

  const titleTr = String(formData.get("title_tr") ?? "").trim();
  const excerptTr = String(formData.get("excerpt_tr") ?? "").trim();
  const bodyTr = String(formData.get("body_tr") ?? "").trim();
  const tagTr = String(formData.get("tag_tr") ?? "").trim();

  if (!titleTr) return { error: "Önce Türkçe başlığı yazın." };

  // Bos alanlari cevirmeden atla
  const fields = { title: titleTr };
  if (excerptTr) fields.excerpt = excerptTr;
  if (bodyTr) fields.body = bodyTr;
  if (tagTr) fields.tag = tagTr;

  try {
    const result = await translateFields(fields, ["en", "de", "bs"]);
    return { ok: true, translations: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Çeviri başarısız.";
    return { error: message };
  }
}
