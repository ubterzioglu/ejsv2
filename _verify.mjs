import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: arts } = await sb.from("articles").select("sort_order,title,image_url").order("sort_order");
console.log("ARTICLES:", arts.length, "kayit");
for (const r of arts) console.log("  #" + r.sort_order, r.image_url ? "[IMG]" : "[---]", r.title.slice(0,55));
const { data: upd } = await sb.from("updates").select("title,body").eq("lang","tr").order("sort_order");
console.log("\nUPDATES (tr):", upd.length, "kayit");
for (const r of upd) console.log("  -", r.title, "(body:", (r.body||"").length, "c)");
const withImg = arts.find(r=>r.image_url);
const res = await fetch(withImg.image_url);
console.log("\nGorsel testi:", res.status, res.headers.get("content-type"));
