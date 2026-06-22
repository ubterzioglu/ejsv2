"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/admin-auth";

const STATUSES = ["new", "in_progress", "done"];

async function requireAdmin() {
  if (!(await isAuthed())) {
    throw new Error("Yetkisiz işlem.");
  }
}

export async function createRevision(_prevState, formData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!message) return { error: "Mesaj boş olamaz." };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("revision_requests")
    .insert({ name, email, message });
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
  await supabase.from("revision_requests").delete().eq("id", id);
  revalidatePath("/admin/revisions");
}
