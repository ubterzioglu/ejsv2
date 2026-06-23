"use client";

import { use, useState } from "react";
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
    back: "← Ana sayfaya dön",
  },
  en: {
    eyebrow: "Search",
    title: "What are you looking for?",
    intro: "Type a keyword to search across the site.",
    placeholder: "Keyword…",
    submit: "Search",
    empty: "Type a keyword to start searching.",
    noResults: "No results found for “{q}”.",
    back: "← Back to home",
  },
  de: {
    eyebrow: "Suche",
    title: "Wonach suchen Sie?",
    intro: "Geben Sie ein Stichwort ein, um die Website zu durchsuchen.",
    placeholder: "Stichwort…",
    submit: "Suchen",
    empty: "Geben Sie ein Stichwort ein, um die Suche zu starten.",
    noResults: "Keine Ergebnisse für „{q}“ gefunden.",
    back: "← Zurück zur Startseite",
  },
  bs: {
    eyebrow: "Pretraga",
    title: "Šta tražite?",
    intro: "Upišite ključnu riječ za pretragu po stranici.",
    placeholder: "Ključna riječ…",
    submit: "Pretraži",
    empty: "Upišite ključnu riječ da započnete pretragu.",
    noResults: "Nema rezultata za „{q}“.",
    back: "← Nazad na početnu",
  },
};

export default function SearchPage({ params }) {
  const { lang } = use(params);
  const t = searchStrings[lang] ?? searchStrings[defaultLocale];

  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <main className="search-page">
      <div className="search-page-inner">
        <a className="search-back" href={`/${lang}`}>
          {t.back}
        </a>

        <p className="structure-label">{t.eyebrow}</p>
        <h1 className="search-page-title">{t.title}</h1>
        <p className="search-page-intro">{t.intro}</p>

        <form className="search-form" role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.placeholder}
            aria-label={t.submit}
            autoFocus
          />
          <button type="submit" className="search-submit">
            {t.submit}
          </button>
        </form>

        <div className="search-results" aria-live="polite">
          {submitted
            ? t.noResults.replace("{q}", submitted)
            : t.empty}
        </div>
      </div>
    </main>
  );
}
