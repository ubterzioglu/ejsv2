import { locales, defaultLocale } from "@/lib/locales";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const metadataByLocale = {
  tr: {
    title: "EJS Consulting | Üretim ve Proje Yönetimi Danışmanlığı",
    description:
      "Danışman değil, uygulamacı dönüşüm ortağı. Yalın süreçler, yalın üretim, kalite ve proje yönetiminde 33 yılı aşkın saha tecrübesiyle sonuç alana kadar sahadayız.",
  },
  en: {
    title: "EJS Consulting | Manufacturing & Project Management Consulting",
    description:
      "Not a consultant — a hands-on transformation partner. Over 33 years of field experience in lean processes, lean manufacturing, quality, and project management, on the floor until results are real.",
  },
  de: {
    title: "EJS Consulting | Beratung für Produktion & Projektmanagement",
    description:
      "Kein Berater — ein praxisnaher Transformationspartner. Über 33 Jahre Praxiserfahrung in Lean-Prozessen, Lean-Produktion, Qualität und Projektmanagement, vor Ort bis Ergebnisse real sind.",
  },
  bs: {
    title: "EJS Consulting | Konsalting za proizvodnju i upravljanje projektima",
    description:
      "Nismo konsultant — partner za transformaciju koji radi na terenu. Više od 33 godine iskustva na terenu u vitkim procesima, vitkoj proizvodnji, kvalitetu i upravljanju projektima, na licu mjesta dok rezultati ne postanu stvarni.",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return metadataByLocale[lang] ?? metadataByLocale[defaultLocale];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!locales.includes(lang)) notFound();

  return <>{children}</>;
}
