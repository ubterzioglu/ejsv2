"use client";

import { Fragment } from "react";
import { ShareSection } from "@/components/sections/share-section";

export function SiteFooter({ footer, lang, shareUrl, shareText }) {
  return (
    <footer className="site-footer">
      <video
        className="footer-bg-video"
        src="/assets/videos/footerbg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="footer-bg-overlay" aria-hidden="true" />

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
        <p>
          EJS Consulting 2026 - Tüm Hakları Saklıdır
          {" · "}
          <a href="https://chatio.com.tr/" rel="dofollow">Canlı Destek</a> Yazılımı Chatio
          {" · "}
          <a href="https://www.spindorai.com/seo/saglik-seo" rel="dofollow">Sağlık Turizmi SEO</a> Spindora Tarafından Seosu Yapılmıştır.
        </p>
      </div>
    </footer>
  );
}
