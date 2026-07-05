"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";

const STATUSES = ["new", "in_progress", "done"];

const BUCKET = "revision-files";
const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB
// Yaygin dokuman/gorsel turleri (revizyon talebine ek).
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
];

async function requireAdmin() {
  if (!(await isAuthed())) {
    throw new Error("Yetkisiz işlem.");
  }
}

/**
 * Secilen dosyayi Supabase Storage'a yukler, { url, name } doner.
 * Dosya yoksa { url: null, name: null } doner.
 */
async function uploadAttachment(supabase, file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return { url: null, name: null };
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { error: "Geçersiz dosya türü (PDF, Word, Excel, resim, txt veya zip olmalı)." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "Dosya 15 MB'tan büyük olamaz." };
  }

  const originalName = file.name || "dosya";
  const ext = (originalName.split(".").pop() || "bin").toLowerCase();
  const path = `revision-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: `Dosya yüklenemedi: ${error.message}` };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, name: originalName };
}

export async function createRevision(_prevState, formData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!message) return { error: "Mesaj boş olamaz." };

  const supabase = createServerClient();

  const uploaded = await uploadAttachment(supabase, formData.get("attachment"));
  if (uploaded.error) return { error: uploaded.error };

  const { error } = await supabase.from("revision_requests").insert({
    name,
    email,
    message,
    attachment_url: uploaded.url,
    attachment_name: uploaded.name,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/revisions");
  return { ok: true };
}

export async function setRevisionStatus(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status)) return;

  const supabase = createServerClient();
  await supabase.from("revision_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/revisions");
}

export async function deleteRevision(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  // Yorumlar ON DELETE CASCADE ile otomatik silinir.
  await supabase.from("revision_requests").delete().eq("id", id);
  revalidatePath("/admin/revisions");
}

/**
 * Bir revizyon talebine admin ic notu / yorumu ekler.
 * useActionState ile kullanildigi icin (prevState, formData) imzasi.
 */
export async function addRevisionComment(_prevState, formData) {
  await requireAdmin();
  const revisionId = String(formData.get("revision_id") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim() || null;

  if (!revisionId) return { error: "Kayıt bulunamadı." };
  if (!body) return { error: "Yorum boş olamaz." };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("revision_comments")
    .insert({ revision_id: revisionId, body, author });
  if (error) return { error: error.message };

  revalidatePath("/admin/revisions");
  return { ok: true };
}

export async function deleteRevisionComment(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("revision_comments").delete().eq("id", id);
  revalidatePath("/admin/revisions");
}
