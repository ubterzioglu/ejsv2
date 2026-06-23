"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";
import { translateMany } from "@/lib/deepl";

const BUCKET = "hero-videos";
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200 MB
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

async function requireAdmin() {
  if (!(await isAuthed())) {
    throw new Error("Yetkisiz işlem.");
  }
}

/**
 * Secilen videoyu Supabase Storage'a yukler, public URL doner.
 * Dosya yoksa { url: null } doner (yapistirilmis URL / mevcut korunur).
 */
async function uploadVideo(supabase, file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return { url: null };
  }
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return { error: "Geçersiz video türü (MP4, WebM veya MOV olmalı)." };
  }
  if (file.size > MAX_VIDEO_BYTES) {
    return { error: "Video 200 MB'tan büyük olamaz." };
  }

  const ext = (file.name?.split(".").pop() || "mp4").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: `Video yüklenemedi: ${error.message}` };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

async function parseSlide(supabase, formData) {
  const title = String(formData.get("title") ?? "").trim();
  const pastedUrl = String(formData.get("video_url") ?? "").trim();
  const creditUrl = String(formData.get("credit_url") ?? "").trim();
  const captionTr = String(formData.get("caption_tr") ?? "").trim();
  const captionEn = String(formData.get("caption_en") ?? "").trim();
  const captionDe = String(formData.get("caption_de") ?? "").trim();
  const captionBs = String(formData.get("caption_bs") ?? "").trim();
  const sortRaw = String(formData.get("sort_order") ?? "0").trim();
  const published = formData.get("published") === "on";
  const existingVideo = String(formData.get("existing_video_url") ?? "").trim();

  if (!title) return { error: "Başlık (etiket) boş olamaz." };
  if (!captionTr) return { error: "Türkçe metin (caption) boş olamaz." };

  const uploaded = await uploadVideo(supabase, formData.get("video"));
  if (uploaded.error) return { error: uploaded.error };

  // Oncelik: yuklenen dosya > yapistirilmis URL > mevcut URL
  const video_url = uploaded.url || pastedUrl || existingVideo || "";
  if (!video_url) {
    return { error: "Bir video URL'si girin veya bir video dosyası yükleyin." };
  }

  const sort_order = Number.isFinite(Number(sortRaw)) ? parseInt(sortRaw, 10) : 0;

  return {
    data: {
      title,
      video_url,
      credit_url: creditUrl || null,
      caption_tr: captionTr,
      caption_en: captionEn || null,
      caption_de: captionDe || null,
      caption_bs: captionBs || null,
      sort_order,
      published,
    },
  };
}

export async function createSlide(_prevState, formData) {
  await requireAdmin();
  const supabase = createServerClient();
  const parsed = await parseSlide(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase.from("hero_slides").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/hero");
  revalidatePath("/[lang]", "layout");
  return { ok: true };
}

export async function updateSlide(_prevState, formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Kayıt bulunamadı." };

  const supabase = createServerClient();
  const parsed = await parseSlide(supabase, formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase
    .from("hero_slides")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/hero");
  revalidatePath("/[lang]", "layout");
  return { ok: true };
}

export async function deleteSlide(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("hero_slides").delete().eq("id", id);
  revalidatePath("/admin/hero");
  revalidatePath("/[lang]", "layout");
}

/**
 * "Otomatik çevir" butonu icin: TR caption'i DeepL ile EN/DE/BS'ye cevirir.
 * Kayit YAPMAZ; sonucu forma doldurmak icin doner.
 */
export async function translateCaptions(_prevState, formData) {
  await requireAdmin();
  const captionTr = String(formData.get("caption_tr") ?? "").trim();
  if (!captionTr) {
    return { error: "Önce Türkçe metni yazın." };
  }

  try {
    const result = await translateMany(captionTr, ["en", "de", "bs"]);
    return { ok: true, translations: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Çeviri başarısız.";
    return { error: message };
  }
}
