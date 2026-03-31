"use client";

import Image from "next/image";
import { Fragment } from "react";

const footerLogo = "/assets/ejsmenulogo.png";

export function SiteFooter({ footer, shareLinks, lang }) {
  return (
    <footer className="site-footer">
      <div className="footer-shell section">
        <div className="footer-left-column">
          <div className="footer-logo-panel" aria-hidden="true">
            <Image
              src={footerLogo}
              alt=""
              className="footer-logo-mark"
              width={320}
              height={320}
              sizes="(max-width: 760px) 220px, 320px"
              loading="eager"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>

        <div className="footer-copy-column">
          <div className="footer-heading-block">
            <p className="structure-label footer-eyebrow">{footer.eyebrow}</p>
            <h2 className="footer-title">{footer.title}</h2>
          </div>

          <div className="footer-copy-grid">
            <div className="footer-office-block">
              <h3>{footer.officeName}</h3>
              <div className="footer-address">
                {footer.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="footer-contact-block">
              {footer.contactRows.map((row) => (
                <div key={row.label} className="footer-contact-row">
                  <span>{row.label}:</span>
                  <a href={row.href}>{row.value}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="footer-nav" aria-label={footer.navLabel}>
          {footer.links.map((link, index) => (
            <Fragment key={link.label}>
              {index > 0 ? <span className="footer-nav-separator" aria-hidden="true" /> : null}
              <a className="footer-nav-link" href={link.href}>
                {link.label}
              </a>
            </Fragment>
          ))}
        </nav>
      </div>

      <div className="footer-copyright">
        <p>EJS Consulting 2026 - Tüm Hakları Saklıdır</p>
      </div>
    </footer>
  );
}
