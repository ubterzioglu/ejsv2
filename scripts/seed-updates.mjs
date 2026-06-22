// Bugun yapilan degisiklikleri Supabase "updates" tablosuna yazar.
// Onkosul:
//   1) supabase/migrations/0001_admin_tables.sql calistirilmis olmali
//   2) .env.local icinde SUPABASE_SERVICE_ROLE_KEY dolu olmali
// Calistir: node scripts/seed-updates.mjs

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// .env.local'i basitce oku
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

const rows = [
  {
    lang: "tr",
    title: "Admin paneli eklendi",
    excerpt:
      "Sol menulu, sifre korumali bir admin paneli kuruldu (/admin). Ilk bolum 'Guncellemeler' ile ana sayfadaki yazilar yonetiliyor.",
    sort_order: 1,
    published: true,
  },
  {
    lang: "tr",
    title: "Revizyon istekleri bolumu eklendi",
    excerpt:
      "Kullanici revizyon isteklerinin girilip durumlariyla (yeni / devam ediyor / tamamlandi) takip edildigi yeni bir bolum eklendi.",
    sort_order: 2,
    published: true,
  },
  {
    lang: "tr",
    title: "Supabase entegrasyonu",
    excerpt:
      "Icerik artik Supabase veritabaninda tutuluyor. 'updates' ve 'revision_requests' tablolari olusturuldu; admin yazma islemleri server tarafinda service-role ile yapiliyor.",
    sort_order: 3,
    published: true,
  },
];

const { data, error } = await supabase.from("updates").insert(rows).select();
if (error) {
  console.error("HATA:", error.message);
  process.exit(1);
}
console.log(`Eklendi: ${data.length} kayit.`);
