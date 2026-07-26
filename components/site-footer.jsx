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
          <a href="https://ufuksoynakliyat.com.tr/kartal-evden-eve-nakliyat" rel="dofollow">Kartal Evden Eve Nakliyat</a> Firması Ufuksoy Nakliyat A.Ş
          {" · "}
          <a href="https://tekhurdametal.com/hurda-fiyatlari/" rel="dofollow">Hurda Fiyatları</a> Tek Hurda Metal
          {" · "}
          <a href="https://lionerotik.com/urunler/fetis-urunleri" rel="dofollow">Antalya Seks Shop</a> Lion Erotik
        </p>
      </div>
    </footer>
  );
}
