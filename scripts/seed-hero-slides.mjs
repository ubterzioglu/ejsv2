// Hero slaytlarini Supabase "hero_slides" tablosuna yazar.
// TR caption'lar kullanicidan; EN/DE/BS DeepL ile otomatik cevrilir.
// Onkosul:
//   1) supabase/migrations/0005_hero_slides.sql calistirilmis olmali
//   2) .env.local icinde SUPABASE_SERVICE_ROLE_KEY ve DEEPL_API_KEY dolu olmali
// Calistir: node scripts/seed-hero-slides.mjs

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// .env.local'i basitce oku
const env = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
const deeplKey = env.DEEPL_API_KEY;
if (!url || !key) {
  console.error("HATA: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// DeepL ceviri (script icin bagimsiz; lib/deepl.js server-only oldugu icin burada tekrar yazilir)
const DEEPL_TARGET = { en: "EN-US", de: "DE", bs: "BS" };
const deeplHost = deeplKey?.endsWith(":fx")
  ? "https://api-free.deepl.com"
  : "https://api.deepl.com";

async function translate(text, lang) {
  if (!deeplKey) return null; // DeepL yoksa bos birak, admin panelden cevrilebilir
  const params = new URLSearchParams();
  params.append("text", text);
  params.append("target_lang", DEEPL_TARGET[lang]);
  params.append("source_lang", "TR");
  const res = await fetch(`${deeplHost}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) {
    console.warn(`DeepL uyari (${lang}, ${res.status}): atlandi.`);
    return null;
  }
  const data = await res.json();
  return data?.translations?.[0]?.text ?? null;
}

// Kullanicinin verdigi 5 TR caption + konuyla ilgili royalty-free Pexels videolari
const slides = [
  {
    title: "Workforce qualification on the shopfloor",
    video_url:
      "https://videos.pexels.com/video-files/7192922/7192922-uhd_3840_2160_30fps.mp4",
    credit_url:
      "https://www.pexels.com/video/two-men-are-working-on-a-machine-in-a-factory-20687170/",
    caption_tr:
      "Çalışma sistemimizle yalın, çevik, hızlı, verimli, anlaşılır, kullanışlı ve sürdürülebilir süreçler ve üretim alanları oluşturulması için çalışanlarınıza kalifikasyon kazandırmak",
  },
  {
    title: "Lean transformation of the company",
    video_url:
      "https://videos.pexels.com/video-files/32386599/13814607_3840_2160_100fps.mp4",
    credit_url:
      "https://www.pexels.com/video/high-tech-automated-manufacturing-process-32386581/",
    caption_tr:
      "Zorlayan değişime uyum sağlayabilmek için bir şirketin yüklerden kurtulup daha yalın, verimli, çevik, hızlı, anlaşılır, kullanışlı ve sürdürülebilir olmalıdır",
  },
  {
    title: "Drivers of continuous change",
    video_url:
      "https://videos.pexels.com/video-files/30900257/13212332_3840_2160_60fps.mp4",
    credit_url:
      "https://www.pexels.com/video/aerial-view-of-industrial-factory-complex-30900254/",
    caption_tr:
      "Artan dijitalleşme, artan müşteri talepleri, ülkelerin demografik değişimleri, kalifiye insan kaynağı kıtlığı, uluslararası fiyat baskısı ve zorlayan ekonomik ortam iş dünyasının sürekli değişimini tetiklemektedir",
  },
  {
    title: "Action over words",
    video_url:
      "https://videos.pexels.com/video-files/34508889/14621114_3840_2160_25fps.mp4",
    credit_url:
      "https://www.pexels.com/video/operator-uses-industrial-control-panel-for-machinery-31751360/",
    caption_tr: "Çalışırken kelimelerin yerine eylemi tercih ederiz",
  },
  {
    title: "By your side until the result is real",
    video_url:
      "https://videos.pexels.com/video-files/4038983/4038983-hd_1920_1080_24fps.mp4",
    credit_url:
      "https://www.pexels.com/video/a-director-in-a-production-control-room-5028976/",
    caption_tr:
      "Alışıldığı gibi size yalnız bir işin nasıl olması gerektiğini göstermeyiz; bizler çalıştığımız konular sonuçlana dek yanınızda yer alırız",
  },
];

const rows = [];
for (let i = 0; i < slides.length; i++) {
  const s = slides[i];
  const [en, de, bs] = await Promise.all([
    translate(s.caption_tr, "en"),
    translate(s.caption_tr, "de"),
    translate(s.caption_tr, "bs"),
  ]);
  rows.push({
    title: s.title,
    video_url: s.video_url,
    credit_url: s.credit_url,
    caption_tr: s.caption_tr,
    caption_en: en,
    caption_de: de,
    caption_bs: bs,
    sort_order: i + 1,
    published: true,
  });
  console.log(`Çevrildi (${i + 1}/${slides.length}): ${s.title}`);
}

const { data, error } = await supabase.from("hero_slides").insert(rows).select();
if (error) {
  console.error("HATA:", error.message);
  process.exit(1);
}
console.log(`Eklendi: ${data.length} slayt.`);
