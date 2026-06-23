"use client";

import { Fragment } from "react";
import { ShareSection } from "@/components/sections/share-section";

export function SiteFooter({ footer, lang, shareUrl, shareText }) {
  return (
    <footer className="site-footer">
      <div className="footer-shell section">
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

      <ShareSection lang={lang} shareUrl={shareUrl} shareText={shareText} />

      <div className="footer-copyright">
        <p>EJS Consulting 2026 - Tüm Hakları Saklıdır</p>
      </div>
    </footer>
  );
}
