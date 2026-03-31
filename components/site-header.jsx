"use client";

import { Fragment, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/lib/locales";

const languageItems = [
  { label: "TR", code: "tr" },
  { label: "EN", code: "en" },
  { label: "DE", code: "de" },
];

export function SiteHeader({ utilityLinks, mainLinks, ariaLabels }) {
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
            onClick={() => console.info("search açılacak")}
          >
            <span className="search-circle" />
            <span className="search-stick" />
          </button>
        </div>
      </div>
    </header>
  );
}
