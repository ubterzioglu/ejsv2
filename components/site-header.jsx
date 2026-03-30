"use client";

import { Fragment, useState } from "react";

export function SiteHeader({
  utilityLinks,
  mainLinks,
  lang,
  onLangChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const languageItems = [
    { label: "TR", code: "tr" },
    { label: "EN", code: "en" },
  ];

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-nav-wrap">
            <nav className="utility-nav" aria-label="Ust Navigasyon">
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

          <div className="language-switch" aria-label="Dil secimi">
            {languageItems.map((item, index) => {
              const isActive = lang === item.code;
              const isMuted = lang !== item.code;

              return (
                <Fragment key={item.code}>
                  {index > 0 ? (
                    <span className="utility-separator" aria-hidden="true" />
                  ) : null}
                  <button
                    type="button"
                    className={`utility-link ${isActive ? "is-active" : ""} ${
                      isMuted ? "is-muted" : ""
                    }`}
                    onClick={() => onLangChange(item.code)}
                  >
                    {item.label}
                  </button>
                </Fragment>
              );
            })}
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
          aria-label="Hauptnavigation"
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
          <a className="search-trigger" href="#search" aria-label="Suche">
            <span className="search-circle" />
            <span className="search-stick" />
          </a>
        </div>
      </div>
    </header>
  );
}

