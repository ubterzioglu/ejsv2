import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/locales";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a supported locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Skip Next.js internals, static files and the locale-agnostic admin panel.
  // /admin/* yollari [lang] segmenti disindadir; locale prefix'i eklenirse 404 olur.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect to default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
