import { heroVideos, homepageContent } from "@/app/data/homepage-content";
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

export default async function HomePage({ params }) {
  const { lang } = await params;
  const page = homepageContent[lang] ?? homepageContent.tr;

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareTextMap = {
    tr: "EJS Consulting ile muhendislik cozumlerini kesfedin.",
    en: "Discover engineering solutions with EJS Consulting.",
    de: "Entdecken Sie Engineering-Loesungen mit EJS Consulting.",
  };
  const shareText = encodeURIComponent(shareTextMap[lang] ?? shareTextMap.tr);

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
        <ShareSection lang={lang} shareUrl={shareUrl} shareText={shareText} />
        <ReferencesSection references={page.references} />
        <ContactSection contact={page.contact} lang={lang} />
      </main>

      <SiteFooter footer={page.footer} lang={lang} />
    </div>
  );
}
