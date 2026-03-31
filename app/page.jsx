"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { heroVideos, homepageContent } from "@/app/data/homepage-content";
import { ExpertSpotlight } from "@/components/expert-spotlight";
import { ProcessHighlight } from "@/components/process-highlight";
import { HeroVideoCarousel } from "@/components/hero-video-carousel";
import { MethodologyCards } from "@/components/methodology-cards";
import { SiteHeader } from "@/components/site-header";

const referenceImages = [
  "/assets/references/1.jpg",
  "/assets/references/2.jpg",
  "/assets/references/3.jpg",
  "/assets/references/4.jpg",
  "/assets/references/5.jpg",
  "/assets/references/6.jpg",
];

const footerLogo = "/assets/ejsmenulogo.png";
const missionImage = "/assets/workflow/step-2-factory.jpg";
const identityImage = "/assets/workflow/step-2-factory.jpg";

export default function HomePage() {
  const [lang, setLang] = useState("tr");
  const page = homepageContent[lang];
  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(
    lang === "tr"
      ? "EJS Consulting ile muhendislik cozumlerini kesfedin."
      : "Discover engineering solutions with EJS Consulting.",
  );
  const footerContent =
    lang === "tr"
      ? {
          eyebrow: "Merkez",
          title: "Merkez Ofis",
          officeName: "Istanbul Office",
          addressLines: [
            "EJS Muhendislik Danismanlik ve Egitim",
            "Aydintepe Mah. Alaaddin Sk. No.7",
            "Evora Sitesi A Parsel, A13, Ic Kapi No: 19",
            "Tuzla / Istanbul",
            "Turkiye",
          ],
          contactRows: [
            { label: "Telefon", value: "+90 216 906 03 25", href: "tel:+902169060325" },
            { label: "Mobil", value: "+90 532 636 72 00", href: "tel:+905326367200" },
            { label: "Mail", value: "Mesaj gonderin", href: "#iletisim" },
          ],
          links: [
            { label: "Yazilarimiz", href: "#yazilarimiz" },
            { label: "Kurumsal", href: "#kimligimiz" },
            { label: "Yardim", href: "#iletisim" },
            { label: "Gizlilik", href: "#top" },
            { label: "Cerezler", href: "#top" },
            { label: "Iletisim", href: "#iletisim" },
          ],
          navLabel: "Alt gezinme",
        }
      : {
          eyebrow: "Headquarters",
          title: "Head Office",
          officeName: "Istanbul Office",
          addressLines: [
            "EJS Engineering Consulting & Training",
            "Aydintepe Mah. Alaaddin Sk. No.7",
            "Evora Sitesi A Parsel, A13, Unit 19",
            "Tuzla / Istanbul",
            "Turkey",
          ],
          contactRows: [
            { label: "Phone", value: "+90 216 906 03 25", href: "tel:+902169060325" },
            { label: "Mobile", value: "+90 532 636 72 00", href: "tel:+905326367200" },
            { label: "Mail", value: "Send a message", href: "#iletisim" },
          ],
          links: [
            { label: "Newsroom", href: "#yazilarimiz" },
            { label: "Legal", href: "#kimligimiz" },
            { label: "Help", href: "#iletisim" },
            { label: "Privacy", href: "#top" },
            { label: "Cookies", href: "#top" },
            { label: "Contact", href: "#iletisim" },
          ],
          navLabel: "Footer navigation",
        };

  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 8.2v9.3H3.6V8.2zm.2-3a1.8 1.8 0 1 1-3.5 0 1.8 1.8 0 0 1 3.5 0M20.5 12.1v5.4h-2.9v-5.1c0-1.3-.5-2.1-1.7-2.1-.9 0-1.4.6-1.7 1.2-.1.2-.1.5-.1.8v5.2h-2.9V8.2h2.9v1.3c.4-.6 1.1-1.5 2.8-1.5 2.1 0 3.6 1.3 3.6 4.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "X",
      href: `https://x.com/intent/post?url=${shareUrl}&text=${shareText}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.8 3h3.1l-6.7 7.7L22 21h-6.1l-4.8-6.3L5.6 21H2.5l7.2-8.2L2 3h6.2l4.3 5.8zm-1.1 16h1.7L7.3 4.9H5.5z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.6 1.5-1.6h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.6v8z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: lang === "tr" ? "E-posta" : "Email",
      href: `mailto:?subject=${encodeURIComponent("EJS Consulting")}&body=${shareText}%20${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5m0 1.5v.3l8 5.3 8-5.3V8zm16 8V10l-7.6 5a.8.8 0 0 1-.8 0L4 10v6z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5m0 15.5c-1.2 0-2.4-.3-3.4-.9l-.2-.1-2.6.7.7-2.5-.2-.3a6.9 6.9 0 1 1 5.7 3.1m3.8-5.1c-.2-.1-1.2-.6-1.4-.6s-.3-.1-.5.1-.6.6-.7.8-.3.2-.5.1a5.7 5.7 0 0 1-1.7-1.1 6.4 6.4 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.3-.4.2-.3.1-.4c0-.1 0-.3-.1-.4l-.6-1.5c-.1-.3-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.3 2.3 0 0 0-.7 1.7c0 1 .7 2 1 2.4.1.1 2 3.1 4.9 4.2.7.3 1.2.4 1.7.5.7.1 1.3.1 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.2-.2-.4-.3" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={page.utilityLinks}
        mainLinks={page.mainLinks}
        lang={lang}
        onLangChange={setLang}
      />

      <main className="hero-page">
        <section className="hero-stage">
          <HeroVideoCarousel videos={heroVideos} ctaLabel={page.hero.ctaLabel} />
        </section>

        <section id="kimligimiz" className="content-section section identity-feature-section">
          <div className="identity-feature-top">
            <div className="identity-feature-heading">
              <p className="structure-label">{page.identity.eyebrow}</p>
              <h1 className="identity-feature-title">{page.identity.title}</h1>
            </div>
          </div>

          <div className="identity-feature-card">
            <div className="identity-feature-copy">
              <span className="identity-feature-tag">{lang === "tr" ? "Yaklasim" : "Approach"}</span>
              <p className="identity-feature-intro">{page.identity.intro}</p>
              <ul className="identity-feature-list">
                {page.identity.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="identity-feature-image-wrap">
              <Image
                src={identityImage}
                alt={lang === "tr" ? "Kimligimiz gorseli" : "Identity visual"}
                className="identity-feature-image"
                sizes="(max-width: 1040px) 100vw, 46vw"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section id="misyonumuz" className="content-section section mission-showcase">
          <div className="mission-copy">
            <h2 className="mission-showcase-title">{page.mission.eyebrow}</h2>
            <ul className="mission-bullets">
              {page.mission.bullets.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mission-image-card">
            <Image
              src={missionImage}
              alt={lang === "tr" ? "Misyon gorseli" : "Mission visual"}
              className="mission-image"
              sizes="(max-width: 1040px) 100vw, 48vw"
              loading="eager"
            />
          </div>
        </section>

        <ProcessHighlight lang={lang} />

        <section id="metodoloji" className="content-section section methodology-section">
          <div className="section-heading-block compact-heading methodology-heading">
            <p className="structure-label">{page.methodology.eyebrow}</p>
            <h2 className="section-title methodology-title">{page.methodology.title}</h2>
            <p className="section-intro methodology-intro">{page.methodology.intro}</p>
          </div>
          <MethodologyCards steps={page.methodology.steps} />
        </section>

        <ExpertSpotlight lang={lang} />

        <section id="yazilarimiz" className="content-section section">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{page.articles.eyebrow}</p>
            <h2 className="section-title">{page.articles.title}</h2>
            <p className="section-intro">{page.articles.intro}</p>
          </div>
          <div className="article-grid">
            {page.articles.items.map((article) => (
              <article key={article.title} className="article-card">
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <a href="#iletisim" className="article-link">
                  {lang === "tr" ? "Detay konusalim" : "Discuss details"}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section share-section">
          <div className="footer-share-inner section">
            <p className="footer-share-title">
              {lang === "tr" ? "Sayfamizi paylasin" : "Share this page"}
            </p>

            <div className="footer-share-icons" aria-label={lang === "tr" ? "Paylasim baglantilari" : "Share links"}>
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  className="footer-share-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="referanslar" className="content-section section">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{page.references.eyebrow}</p>
            <h2 className="section-title">{page.references.title}</h2>
            <p className="section-intro">{page.references.intro}</p>
          </div>
          <div className="reference-carousel">
            <div className="reference-track">
              {[...referenceImages, ...referenceImages].map((image, index) => (
                <div key={index} className="reference-card">
                  <img
                    src={image.src}
                    alt={`${page.references.eyebrow} ${(index % referenceImages.length) + 1}`}
                    className="reference-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="iletisim" className="content-section section contact-section">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{page.contact.eyebrow}</p>
            <h2 className="section-title">{page.contact.title}</h2>
            <p className="section-intro">{page.contact.intro}</p>
          </div>

          <div className="contact-grid">
            <article className="contact-card contact-details">
              <h3>{page.contact.companyName}</h3>
              <p>{page.contact.companyNote}</p>
              <p>{page.contact.address}</p>
              <div className="contact-lines">
                {page.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                    {phone}
                  </a>
                ))}
              </div>
              <p>{page.contact.hours}</p>
            </article>

            <form className="contact-card contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                <span>{page.contact.fields.name}</span>
                <input type="text" placeholder={page.contact.placeholders.name} />
              </label>
              <label>
                <span>{page.contact.fields.email}</span>
                <input type="email" placeholder={page.contact.placeholders.email} />
              </label>
              <label className="full-span">
                <span>{page.contact.fields.message}</span>
                <textarea placeholder={page.contact.placeholders.message} rows={5} />
              </label>
              <button type="submit" className="submit-button">
                {page.contact.fields.submit}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-shell section">
          <div className="footer-left-column">
            <div className="footer-logo-panel" aria-hidden="true">
              <Image
                src={footerLogo}
                alt=""
                className="footer-logo-mark"
                sizes="(max-width: 760px) 220px, 320px"
              />
            </div>
          </div>

          <div className="footer-copy-column">
            <div className="footer-heading-block">
              <p className="structure-label footer-eyebrow">{footerContent.eyebrow}</p>
              <h2 className="footer-title">{footerContent.title}</h2>
            </div>

            <div className="footer-copy-grid">
              <div className="footer-office-block">
                <h3>{footerContent.officeName}</h3>
                <div className="footer-address">
                  {footerContent.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="footer-contact-block">
                {footerContent.contactRows.map((row) => (
                  <div key={row.label} className="footer-contact-row">
                    <span>{row.label}:</span>
                    <a href={row.href}>{row.value}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <nav className="footer-nav" aria-label={footerContent.navLabel}>
            {footerContent.links.map((link, index) => (
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
    </div>
  );
}


