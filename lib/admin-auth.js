import "server-only";
import { cookies } from "next/headers";
import { createHash } from "crypto";

export const ADMIN_COOKIE = "ejs_admin";

/**
 * Sifreden turetilen sabit oturum token'i.
 * Cookie'de ham sifreyi tutmamak icin SHA-256 ozetini saklariz.
 */
export function adminToken() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`ejs:${password}`).digest("hex");
}

export function checkPassword(input) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return Boolean(expected) && input === expected;
}

/** Oturum gecerli mi? (Server Component / Server Action icinde cagrilir.) */
export async function isAuthed() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}
