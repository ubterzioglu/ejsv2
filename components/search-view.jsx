"use client";

import { useMemo, useState } from "react";
import { searchContent } from "@/lib/search-index";

export function SearchView({ lang, index, strings }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  // Sonuclari yalnizca gonderilmis sorgu degistikce yeniden hesapla.
  const results = useMemo(
    () => (submitted ? searchContent(index, submitted) : []),
    [index, submitted]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(query.trim());
  };

  const sectionLabel = (section) => strings.sections?.[section] ?? "";

  return (
    <>
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={strings.placeholder}
          aria-label={strings.submit}
          autoFocus
        />
        <button type="submit" className="search-submit">
          {strings.submit}
        </button>
      </form>

      <div className="search-results" aria-live="polite">
        {!submitted ? (
          <p className="search-results-empty">{strings.empty}</p>
        ) : results.length === 0 ? (
          <p className="search-results-empty">
            {strings.noResults.replace("{q}", submitted)}
          </p>
        ) : (
          <>
            <p className="search-results-count">
              {strings.resultsCount
                .replace("{n}", String(results.length))
                .replace("{q}", submitted)}
            </p>
            <ul className="search-results-list">
              {results.map((result, idx) => (
                <li key={`${result.href}-${idx}`} className="search-result">
                  <a className="search-result-link" href={`/${lang}${result.href}`}>
                    {sectionLabel(result.section) ? (
                      <span className="search-result-section">
                        {sectionLabel(result.section)}
                      </span>
                    ) : null}
                    <span className="search-result-title">{result.title}</span>
                    {result.snippet ? (
                      <span className="search-result-snippet">{result.snippet}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
