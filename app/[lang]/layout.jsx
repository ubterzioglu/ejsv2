import { locales, defaultLocale } from "@/lib/locales";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!locales.includes(lang)) notFound();

  return <>{children}</>;
}
