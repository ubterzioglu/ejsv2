import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export async function GET(request) {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
