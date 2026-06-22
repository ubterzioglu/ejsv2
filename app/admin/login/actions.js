"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken, checkPassword } from "@/lib/admin-auth";

export async function loginAction(_prevState, formData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    return { error: "Sifre hatali." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 gun
  });

  redirect("/admin");
}
