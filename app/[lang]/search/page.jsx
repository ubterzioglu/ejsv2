import { homepageContent } from "@/app/data/homepage-content";
import { buildSearchIndex } from "@/lib/search-index";
import { SearchView } from "@/components/search-view";
import { defaultLocale } from "@/lib/locales";

// Aramaya ozel, dile gore yerellestirilmis metinler.
const searchStrings = {
  tr: {
    eyebrow: "Arama",
    title: "Ne aramıştınız?",
    intro: "Site içinde aramak istediğiniz kelimeyi yazın.",
    placeholder: "Anahtar kelime…",
    submit: "Ara",
    empty: "Aramaya başlamak için bir kelime yazın.",
    noResults: "“{q}” için sonuç bulunamadı.",
    resultsCount: "“{q}” için {n} sonuç bulundu.",
    back: "← Ana sayfaya dön",
    sections: {
      identity: "Kimliğimiz",
      approach: "Yaklaşımımız",
      mission: "Misyonumuz",
      methodology: "Çalışmamız Hakkında",
      expertise: "Uzmanlık Alanlarımız",
      founder: "Kurucumuzun Hikayesi",
      articles: "Öğren ve Geliş",
      references: "Referanslar",
      contact: "İletişim",
    },
  },
  en: {
    eyebrow: "Search",
    title: "What are you looking for?",
    intro: "Type a keyword to search across the site.",
    placeholder: "Keyword…",
    submit: "Search",
    empty: "Type a keyword to start searching.",
    noResults: "No results found for “{q}”.",
    resultsCount: "{n} results for “{q}”.",
    back: "← Back to home",
    sections: {
      identity: "Identity",
      approach: "Our Approach",
      mission: "Our Mission",
      methodology: "About Our Work",
      expertise: "Areas of Expertise",
      founder: "Founder's Story",
      articles: "Learn & Grow",
      references: "References",
      contact: "Contact",
    },
  },
  de: {
    eyebrow: "Suche",
    title: "Wonach suchen Sie?",
    intro: "Geben Sie ein Stichwort ein, um die Website zu durchsuchen.",
    placeholder: "Stichwort…",
    submit: "Suchen",
    empty: "Geben Sie ein Stichwort ein, um die Suche zu starten.",
    noResults: "Keine Ergebnisse für „{q}“ gefunden.",
    resultsCount: "{n} Ergebnisse für „{q}“.",
    back: "← Zurück zur Startseite",
    sections: {
      identity: "Identität",
      approach: "Unser Ansatz",
      mission: "Unsere Mission",
      methodology: "Über unsere Arbeit",
      expertise: "Fachgebiete",
      founder: "Gründergeschichte",
      articles: "Lernen & Wachsen",
      references: "Referenzen",
      contact: "Kontakt",
    },
  },
  bs: {
    eyebrow: "Pretraga",
    title: "Šta tražite?",
    intro: "Upišite ključnu riječ za pretragu po stranici.",
    placeholder: "Ključna riječ…",
    submit: "Pretraži",
    empty: "Upišite ključnu riječ da započnete pretragu.",
    noResults: "Nema rezultata za „{q}“.",
    resultsCount: "{n} rezultata za „{q}“.",
    back: "← Nazad na početnu",
    sections: {
      identity: "Naš identitet",
      approach: "Naš pristup",
      mission: "Naša misija",
      methodology: "O našem radu",
      expertise: "Područja stručnosti",
      founder: "Priča osnivača",
      articles: "Uči i razvijaj se",
      references: "Reference",
      contact: "Kontakt",
    },
  },
};

export default async function SearchPage({ params }) {
  const { lang } = await params;
  const t = searchStrings[lang] ?? searchStrings[defaultLocale];
  const content = homepageContent[lang] ?? homepageContent[defaultLocale];
  const index = buildSearchIndex(content);

  return (
    <main className="search-page">
      <div className="search-page-inner">
        <a className="search-back" href={`/${lang}`}>
          {t.back}
        </a>

        <p className="structure-label">{t.eyebrow}</p>
        <h1 className="search-page-title">{t.title}</h1>
        <p className="search-page-intro">{t.intro}</p>

        <SearchView lang={lang} index={index} strings={t} />
      </div>
    </main>
  );
}
