import { homepageContent } from "@/app/data/homepage-content";
import { getHeroSlides } from "@/lib/hero-slides";
import { HeroVideoCarousel } from "@/components/hero-video-carousel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpertSpotlight } from "@/components/expert-spotlight";
import { ProcessHighlight } from "@/components/process-highlight";
import { MethodologyCards } from "@/components/methodology-cards";
import { IdentitySection } from "@/components/sections/identity-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FounderStorySection } from "@/components/sections/founder-story-section";
import { ArticlesSection } from "@/components/sections/articles-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SectionDivider } from "@/components/section-divider";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const page = homepageContent[lang] ?? homepageContent.tr;
  const heroSlides = await getHeroSlides();

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareTextMap = {
    tr: "EJS Consulting ile mühendislik çözümlerini keşfedin.",
    en: "Discover engineering solutions with EJS Consulting.",
    de: "Entdecken Sie Engineering-Loesungen mit EJS Consulting.",
    bs: "Otkrijte inženjerska rješenja uz EJS Consulting.",
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
          <HeroVideoCarousel
            videos={heroSlides}
            ctaLabel={page.hero.ctaLabel}
            lang={lang}
          />
        </section>

        <IdentitySection identity={page.identity} lang={lang} />
        <SectionDivider />
        <ApproachSection approach={page.approach} />
        <SectionDivider />
        <MissionSection mission={page.mission} lang={lang} />
        <SectionDivider />
        <ProcessHighlight lang={lang} />
        <SectionDivider />

        <section
          id="calismamiz-hakkinda"
          className="content-section section methodology-section"
        >
          <div className="section-heading-block compact-heading methodology-heading">
            <p className="structure-label">{page.methodology.eyebrow}</p>
            <h2 className="section-title methodology-title">{page.methodology.title}</h2>
            <p className="section-intro methodology-intro">{page.methodology.intro}</p>
          </div>
          <MethodologyCards steps={page.methodology.steps} />
        </section>

        <SectionDivider />
        <ExpertiseSection expertise={page.expertise} />
        <SectionDivider />
        <ExpertSpotlight lang={lang} />
        <SectionDivider />
        <FounderStorySection founder={page.founder} lang={lang} />
        <SectionDivider />
        <ArticlesSection articles={page.articles} lang={lang} />
        <SectionDivider />
        <ReferencesSection references={page.references} />
        <SectionDivider />
        <ContactSection contact={page.contact} footer={page.footer} lang={lang} />
      </main>

      <SiteFooter footer={page.footer} lang={lang} shareUrl={shareUrl} shareText={shareText} />
    </div>
  );
}
