"use client";

import { useState } from "react";

export function SiteHeader({ utilityLinks, mainLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">Roland Berger</span>
        </div>

        <nav className="utility-nav" aria-label="Sekundaere Navigation">
          {utilityLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="main-nav-row">
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
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Anfrage senden
        </a>
      </div>
    </header>
  );
}
