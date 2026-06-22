"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";
import { locales } from "@/lib/locales";

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
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: `Görsel yüklenemedi: ${error.message}` };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

async function parseUpdate(supabase, formData) {
  const lang = String(formData.get("lang") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
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
    data: { lang, title, excerpt, body: body || null, image_url, sort_order, published },
  };
}

export async function createUpdate(_prevState, formData) {
  await requireAdmin();
  const supabase = createServerClient();
  const parsed = await parseUpdate(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase.from("articles").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  return { ok: true };
}

export async function updateUpdate(_prevState, formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Kayıt bulunamadı." };

  const supabase = createServerClient();
  const parsed = await parseUpdate(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase
    .from("articles")
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
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/updates");
}
