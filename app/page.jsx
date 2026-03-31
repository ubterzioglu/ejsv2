"use client";

import { heroVideos, homepageContent } from "@/app/data/homepage-content";
import { useLanguage } from "@/lib/language-context";
import { HeroVideoCarousel } from "@/components/hero-video-carousel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpertSpotlight } from "@/components/expert-spotlight";
import { ProcessHighlight } from "@/components/process-highlight";
import { MethodologyCards } from "@/components/methodology-cards";
import { IdentitySection } from "@/components/sections/identity-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ArticlesSection } from "@/components/sections/articles-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ShareSection } from "@/components/sections/share-section";

// Share icons
const LinkedInIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 8.2v9.3H3.6V8.2zm.2-3a1.8 1.8 0 1 1-3.5 0 1.8 1.8 0 0 1 3.5 0M20.5 12.1v5.4h-2.9v-5.1c0-1.3-.5-2.1-1.7-2.1-.9 0-1.4.6-1.7 1.2-.1.2-.1.5-.1.8v5.2h-2.9V8.2h2.9v1.3c.4-.6 1.1-1.5 2.8-1.5 2.1 0 3.6 1.3 3.6 4.1" fill="currentColor" />
  </svg>
);

const XIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.8 3h3.1l-6.7 7.7L22 21h-6.1l-4.8-6.3L5.6 21H2.5l7.2-8.2L2 3h6.2l4.3 5.8zm-1.1 16h1.7L7.3 4.9H5.5z" fill="currentColor" />
  </svg>
);

const FacebookIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.6 1.5-1.6h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.6v8z" fill="currentColor" />
  </svg>
);

const EmailIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5m0 1.5v.3l8 5.3 8-5.3V8zm16 8V10l-7.6 5a.8.8 0 0 1-.8 0L4 10v6z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5m0 15.5c-1.2 0-2.4-.3-3.4-.9l-.2-.1-2.6.7.7-2.5-.2-.3a6.9 6.9 0 1 1 5.7 3.1m3.8-5.1c-.2-.1-1.2-.6-1.4-.6s-.3-.1-.5.1-.6.6-.7.8-.3.2-.5.1a5.7 5.7 0 0 1-1.7-1.1 6.4 6.4 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.3-.4.2-.3.1-.4c0-.1 0-.3-.1-.4l-.6-1.5c-.1-.3-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.3 2.3 0 0 0-.7 1.7c0 1 .7 2 1 2.4.1.1 2 3.1 4.9 4.2.7.3 1.2.4 1.7.5.7.1 1.3.1 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.2-.2-.4-.3" fill="currentColor" />
  </svg>
);

function buildShareLinks(shareUrl, shareText, lang) {
  return [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: LinkedInIcon },
    { label: "X", href: `https://x.com/intent/post?url=${shareUrl}&text=${shareText}`, icon: XIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: FacebookIcon },
    { label: lang === "tr" ? "E-posta" : "Email", href: `mailto:?subject=${encodeURIComponent("EJS Consulting")}&body=${shareText}%20${shareUrl}`, icon: EmailIcon },
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${shareUrl}`, icon: WhatsAppIcon },
  ];
}

export default function HomePage() {
  const { lang } = useLanguage();
  const page = homepageContent[lang];
  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(
    lang === "tr"
      ? "EJS Consulting ile muhendislik cozumlerini kesfedin."
      : "Discover engineering solutions with EJS Consulting.",
  );
  const footerContent = homepageContent[lang].footer;
  const shareLinks = buildShareLinks(shareUrl, shareText, lang);

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={page.utilityLinks}
        mainLinks={page.mainLinks}
        ariaLabels={page.ariaLabels}
      />

      <main className="hero-page">
        <section className="hero-stage">
          <HeroVideoCarousel videos={heroVideos} ctaLabel={page.hero.ctaLabel} />
        </section>

        <IdentitySection identity={page.identity} lang={lang} />
        <MissionSection mission={page.mission} lang={lang} />
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
        <ArticlesSection articles={page.articles} lang={lang} />
        <ShareSection shareLinks={shareLinks} lang={lang} />
        <ReferencesSection references={page.references} />
        <ContactSection contact={page.contact} lang={lang} />
      </main>

      <SiteFooter footer={footerContent} shareLinks={shareLinks} lang={lang} />
    </div>
  );
}
