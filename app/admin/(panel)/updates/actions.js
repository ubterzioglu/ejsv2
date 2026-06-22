"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";
import { locales } from "@/lib/locales";

async function requireAdmin() {
  if (!(await isAuthed())) {
    throw new Error("Yetkisiz.");
  }
}

function parseUpdate(formData) {
  const lang = String(formData.get("lang") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";

  if (!locales.includes(lang)) return { error: "Gecersiz dil." };
  if (!title) return { error: "Baslik bos olamaz." };
  if (!excerpt) return { error: "Ozet bos olamaz." };

  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  return { data: { lang, title, excerpt, sort_order, published } };
}

export async function createUpdate(_prevState, formData) {
  await requireAdmin();
  const parsed = parseUpdate(formData);
  if (parsed.error) return { error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase.from("updates").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  return { ok: true };
}

export async function updateUpdate(_prevState, formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Kayit bulunamadi." };

  const parsed = parseUpdate(formData);
  if (parsed.error) return { error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("updates")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  return { ok: true };
}

export async function deleteUpdate(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("updates").delete().eq("id", id);
  revalidatePath("/admin/updates");
}
