// homepageContent.tr agacini Bosnakca'ya (bs) cevirir ve sonucu
// scripts/out/homepage-bs.js dosyasina yazar. Olusan "bs" blogunu
// app/data/homepage-content.js icine elle yapistirin (en/de bloklarinin yanina).
//
// Onkosul: .env.local icinde DEEPL_API_KEY dolu olmali.
// Calistir: node scripts/translate-homepage-bs.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homepageContent } from "../app/data/homepage-content.js";

// .env.local'i basitce oku
const env = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const deeplKey = env.DEEPL_API_KEY;
if (!deeplKey) {
  console.error("HATA: DEEPL_API_KEY eksik (.env.local).");
  process.exit(1);
}

const deeplHost = deeplKey.endsWith(":fx")
  ? "https://api-free.deepl.com"
  : "https://api.deepl.com";

// Cevrilmemesi gereken anahtarlar (yapisal / ozel ad / baglanti vb.)
const SKIP_KEYS = new Set([
  "href",
  "icon",
  "name", // founder.name (kisi adi) — degismez
  "companyName",
  "phones",
  "languages",
  "email",
  "address",
  "addressLines",
  "value", // contactRows[].value (telefon/etiket) — degismez
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Basit, ardisik bir DeepL cevirisi — 429 (rate limit) icin geri-cekilmeli yeniden deneme.
async function translate(text, attempt = 0) {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return text;
  const params = new URLSearchParams();
  params.append("text", trimmed);
  params.append("target_lang", "BS");
  params.append("source_lang", "TR");
  const res = await fetch(`${deeplHost}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (res.status === 429) {
    if (attempt >= 6) {
      throw new Error("DeepL 429: cok fazla yeniden deneme, vazgecildi.");
    }
    const wait = Math.min(2000 * 2 ** attempt, 30000); // 2s,4s,8s,...max 30s
    console.warn(`429 — ${wait}ms bekleniyor (deneme ${attempt + 1})...`);
    await sleep(wait);
    return translate(text, attempt + 1);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepL hatasi (${res.status}): ${detail}`);
  }
  const data = await res.json();
  // Cagrilar arasi kucuk gecikme: free tier'i bunaltmamak icin.
  await sleep(120);
  return data?.translations?.[0]?.text ?? text;
}

let count = 0;
async function deepTranslate(node, parentKey = "") {
  if (typeof node === "string") {
    // href anchor (#...) ve URL'leri cevirme
    if (parentKey === "href" || /^(#|https?:|tel:|mailto:)/.test(node.trim())) {
      return node;
    }
    count++;
    return await translate(node);
  }
  if (Array.isArray(node)) {
    const out = [];
    for (const item of node) out.push(await deepTranslate(item, parentKey));
    return out;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (SKIP_KEYS.has(k)) {
        out[k] = v; // oldugu gibi birak
      } else {
        out[k] = await deepTranslate(v, k);
      }
    }
    return out;
  }
  return node;
}

console.log("TR -> BS cevriliyor (DeepL)...");
const bs = await deepTranslate(homepageContent.tr);
console.log(`Toplam ${count} metin cevrildi.`);

const banner =
  "// OTOMATIK URETILDI: scripts/translate-homepage-bs.mjs (DeepL TR->BS).\n" +
  "// Bu 'bs' blogunu app/data/homepage-content.js icindeki homepageContent'e ekleyin.\n";
const body =
  banner + "export const bs = " + JSON.stringify(bs, null, 2) + ";\n";

mkdirSync("scripts/out", { recursive: true });
writeFileSync("scripts/out/homepage-bs.js", body, "utf8");
console.log("Yazildi: scripts/out/homepage-bs.js");
