"use client";

import { Fragment, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/lib/locales";

const languageItems = [
  { label: "TR", code: "tr" },
  { label: "EN", code: "en" },
  { label: "DE", code: "de" },
];

export function SiteHeader({ utilityLinks, mainLinks, ariaLabels, approachCta }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = locales.find((l) => pathname.startsWith(`/${l}`)) ?? "tr";

  const switchLang = (code) => {
    const withoutLang = pathname.replace(/^\/(tr|en|de)/, "") || "/";
    router.push(`/${code}${withoutLang}`);
  };

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-nav-wrap">
            <nav className="utility-nav" aria-label={ariaLabels?.utilityNav}>
              {utilityLinks.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 ? (
                    <span className="utility-separator" aria-hidden="true" />
                  ) : null}
                  <a className="utility-link" href={item.href}>
                    {item.label}
                  </a>
                </Fragment>
              ))}
            </nav>
          </div>

          <div className="language-switch" aria-label={ariaLabels?.langSwitch}>
            {languageItems.map((item, index) => (
              <Fragment key={item.code}>
                {index > 0 ? (
                  <span className="utility-separator" aria-hidden="true" />
                ) : null}
                <button
                  type="button"
                  className={`utility-link ${currentLang === item.code ? "is-active" : "is-muted"}`}
                  onClick={() => switchLang(item.code)}
                >
                  {item.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="main-nav-row">
        <a className="brand-lockup" href="#top" aria-label="EJS Consulting">
          <span className="brand-name">
            EJS
            <br />
            Consulting
          </span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          className={`main-nav ${isOpen ? "is-open" : ""}`}
          id="main-navigation"
          aria-label={ariaLabels?.mainNav}
        >
          {mainLinks.map((link) => (
            <a
              key={link.label}
              className="header-link"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="search-trigger"
            aria-label={ariaLabels?.search}
          >
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="2" />
              <line
                x1="15.6"
                y1="15.6"
                x2="21"
                y2="21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {approachCta ? (
        <a className="approach-cta" href={approachCta.href}>
          <span className="approach-cta-label">{approachCta.label}</span>
          <svg
            className="approach-cta-arrow"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M9 12h6m0 0-2.5-2.5M15 12l-2.5 2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ) : null}
    </header>
  );
}
