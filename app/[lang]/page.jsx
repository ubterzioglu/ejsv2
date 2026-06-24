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
        <SectionDivider
          topText="Verimlilik bir tesadüf değil, iyi tasarlanmış bir sürecin sonucudur."
          bottomText="Ölçemediğiniz süreci iyileştiremezsiniz."
          buttonLabel="Haberler"
          href="#ogren-ve-gelis"
        />
        <ApproachSection approach={page.approach} />
        <SectionDivider
          topText="Kalite, denetlenen değil; üretim sürecine işlenen bir alışkanlıktır."
          bottomText="İsraf görünür kılındığında ortadan kalkar."
          buttonLabel="Bülten"
          href="#ogren-ve-gelis"
        />
        <MissionSection mission={page.mission} lang={lang} />
        <SectionDivider
          topText="Her duruş bir maliyet, her darboğaz gizli bir fırsattır."
          bottomText="Sürekli iyileştirme küçük adımların disiplinidir."
          buttonLabel="Öğren ve Geliş"
          href="#ogren-ve-gelis"
        />
        <ProcessHighlight lang={lang} />
        <SectionDivider
          topText="Tasarım masada biter, gerçek sınav sahada başlar."
          bottomText="Kapasiteyi artıran, makine değil; doğru kurgulanmış akıştır."
          buttonLabel="Haberler"
          href="#ogren-ve-gelis"
        />

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

        <SectionDivider
          topText="Doğru metot, en pahalı makineden daha değerlidir."
          bottomText="Standart olmayan iş, tekrar edilemeyen başarıdır."
          buttonLabel="Bülten"
          href="#ogren-ve-gelis"
        />
        <ExpertiseSection expertise={page.expertise} />
        <SectionDivider
          topText="Uzmanlık, doğru soruyu sahada sormakla başlar."
          bottomText="Bilgi paylaşıldıkça çoğalan tek sermayedir."
          buttonLabel="Öğren ve Geliş"
          href="#ogren-ve-gelis"
        />
        <ExpertSpotlight lang={lang} />
        <SectionDivider
          topText="İyi mühendislik, karmaşığı sade kılma sanatıdır."
          bottomText="Tecrübe, yapılan hatalardan çıkarılan derslerin toplamıdır."
          buttonLabel="Haberler"
          href="#ogren-ve-gelis"
        />
        <FounderStorySection founder={page.founder} lang={lang} />
        <SectionDivider
          topText="Bir işi yapmanın daima daha iyi bir yolu vardır."
          bottomText="Gelişim, konfor alanının bittiği yerde başlar."
          buttonLabel="Bülten"
          href="#ogren-ve-gelis"
        />
        <ArticlesSection articles={page.articles} lang={lang} />
        <SectionDivider
          topText="Güven, zamanında teslim edilen sözlerle inşa edilir."
          bottomText="Referans, tamamlanmış işin en sade dilidir."
          buttonLabel="Öğren ve Geliş"
          href="#ogren-ve-gelis"
        />
        <ReferencesSection references={page.references} />
        <SectionDivider
          topText="Her büyük dönüşüm, tek bir doğru karar ile başlar."
          bottomText="Birlikte üretmek, birlikte büyümektir."
          buttonLabel="Haberler"
          href="#ogren-ve-gelis"
        />
        <ContactSection contact={page.contact} footer={page.footer} lang={lang} />
      </main>

      <SiteFooter footer={page.footer} lang={lang} shareUrl={shareUrl} shareText={shareText} />
    </div>
  );
}
