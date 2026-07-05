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
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: `Görsel yüklenemedi: ${error.message}` };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

/**
 * Tek bir dil icin form verisini parse eder.
 * edit modunda lang formdan gelir; create modunda cagiran belirtir.
 */
async function parseUpdateForLang(supabase, formData, lang, imageResult) {
  const title = String(formData.get(`title_${lang}`) ?? "").trim();
  const excerpt = String(formData.get(`excerpt_${lang}`) ?? "").trim();
  const body = String(formData.get(`body_${lang}`) ?? "").trim();

  if (!title || !excerpt) return null; // bos dil atlanir

  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";
  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  return {
    lang,
    title,
    excerpt,
    body: body || null,
    image_url: imageResult,
    sort_order,
    published,
  };
}

/**
 * Edit modu icin tek dil parse eder (lang hidden input'tan gelir).
 */
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

  // Gorsel bir kez yukle, tum diller ortak kullanir.
  const existingImage = String(formData.get("existing_image_url") ?? "").trim();
  const uploaded = await uploadImage(supabase, formData.get("image"));
  if (uploaded.error) return { error: uploaded.error };
  const image_url = uploaded.url ?? (existingImage || null);

  // TR zorunlu
  const titleTr = String(formData.get("title_tr") ?? "").trim();
  const excerptTr = String(formData.get("excerpt_tr") ?? "").trim();
  if (!titleTr) return { error: "Türkçe başlık boş olamaz." };
  if (!excerptTr) return { error: "Türkçe özet boş olamaz." };

  // Her dil icin kayit olustur; bos title/excerpt olan diller atlanir (TR zorunlu zaten kontrol edildi).
  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";
  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  const rows = [];
  for (const lang of locales) {
    const title = String(formData.get(`title_${lang}`) ?? "").trim();
    const excerpt = String(formData.get(`excerpt_${lang}`) ?? "").trim();
    const body = String(formData.get(`body_${lang}`) ?? "").trim();

    if (!title || !excerpt) continue; // bos dil atlanir

    rows.push({ lang, title, excerpt, body: body || null, image_url, sort_order, published });
  }

  if (rows.length === 0) return { error: "En az bir dil için başlık ve özet girilmeli." };

  const { error } = await supabase.from("articles").insert(rows);
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

/**
 * "Otomatik çevir" butonu icin: TR title/excerpt/body'yi DeepL ile EN/DE/BS'ye cevirir.
 * Kayit YAPMAZ; sonucu forma doldurmak icin doner.
 */
export async function translateArticleFields(_prevState, formData) {
  await requireAdmin();
  const titleTr = String(formData.get("title_tr") ?? "").trim();
  const excerptTr = String(formData.get("excerpt_tr") ?? "").trim();
  const bodyTr = String(formData.get("body_tr") ?? "").trim();

  if (!titleTr) return { error: "Önce Türkçe başlığı yazın." };
  if (!excerptTr) return { error: "Önce Türkçe özeti yazın." };

  try {
    const fields = { title: titleTr, excerpt: excerptTr };
    if (bodyTr) fields.body = bodyTr;

    const result = await translateFields(fields, ["en", "de", "bs"]);
    return { ok: true, translations: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Çeviri başarısız.";
    return { error: message };
  }
}
