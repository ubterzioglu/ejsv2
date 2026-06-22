// Ornek "changelog" (Guncellemeler) kayitlarini Supabase'e yazar.
// Onkosul:
//   1) supabase/migrations/0002_changelog.sql calistirilmis olmali
//   2) .env.local icinde SUPABASE_SERVICE_ROLE_KEY dolu olmali
// Calistir: node scripts/seed-changelog.mjs

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
    title: "Admin paneli açık temaya geçti",
    body: "Yönetim paneli krem/yeşil açık tema ile yeniden tasarlandı; tüm metinler düzgün Türkçe karakterlerle güncellendi.",
    sort_order: 1,
    published: true,
  },
  {
    lang: "tr",
    title: "Makaleler ve Güncellemeler ayrıldı",
    body: "Yazı yönetimi 'Makaleler' bölümünde toplandı. 'Güncellemeler' bölümü ise salt-okunur olarak bu listeyi gösterir.",
    sort_order: 2,
    published: true,
  },
];

const { data, error } = await supabase.from("changelog").insert(rows).select();
if (error) {
  console.error("HATA:", error.message);
  process.exit(1);
}
console.log(`Eklendi: ${data.length} kayit.`);
