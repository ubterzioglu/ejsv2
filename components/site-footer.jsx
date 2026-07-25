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
          {" · "}
          <a href="https://ufuksoynakliyat.com.tr/kartal-evden-eve-nakliyat" rel="dofollow">Kartal Evden Eve Nakliyat</a> Firması Ufuksoy Nakliyat A.Ş
          {" · "}
          <a href="https://tekhurdametal.com/istanbul-hurdaci/" rel="dofollow">İstanbul Hurdacı</a> Firması Tek Hurda Metal A.Ş
          {" · "}
          <a href="https://tekhurdametal.com/hurda-fiyatlari/" rel="dofollow">Hurda Fiyatları</a> Tek Hurda Metal
          {" · "}
          <a href="https://tekhurdametal.com/hurda-demir-fiyatlari/" rel="dofollow">Demir Hurda Fiyatları</a> Tek Hurda Metal
          {" · "}
          <a href="https://tekhurdametal.com/beylikduzu-hurdaci/" rel="dofollow">Beylikdüzü Hurdacı</a> Firması Tek Hurda Metal A.Ş
          {" · "}
          <a href="https://lionerotik.com/urunler/fetis-urunleri" rel="dofollow">Antalya Sex Shop</a> Lion Erotik
          {" · "}
          <a href="https://lionerotik.com/urunler/fetis-urunleri" rel="dofollow">Antalya Erotik Shop</a> Lion Erotik
          {" · "}
          <a href="https://lionerotik.com/urunler/fetis-urunleri" rel="dofollow">Antalya Seks Shop</a> Lion Erotik
        </p>
      </div>
    </footer>
  );
}
