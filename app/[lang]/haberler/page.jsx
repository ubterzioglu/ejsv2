import Image from "next/image";
import { homepageContent } from "@/app/data/homepage-content";
import { createServerClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { defaultLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

// Haberler sayfasina ozel, dile gore yerellestirilmis metinler.
const newsStrings = {
  tr: {
    eyebrow: "Haberler",
    title: "En son haberler",
    intro:
      "EJS Consulting'ten güncel duyurular, etkinlikler ve sektörel gelişmeler.",
    empty: "Henüz haber eklenmedi.",
  },
  en: {
    eyebrow: "News",
    title: "Latest news",
    intro: "Current announcements, events, and industry updates from EJS Consulting.",
    empty: "No news has been added yet.",
  },
  de: {
    eyebrow: "Neuigkeiten",
    title: "Aktuelle Neuigkeiten",
    intro: "Aktuelle Ankündigungen, Veranstaltungen und Branchennews von EJS Consulting.",
    empty: "Es wurden noch keine Neuigkeiten hinzugefügt.",
  },
  bs: {
    eyebrow: "Vijesti",
    title: "Najnovije vijesti",
    intro: "Aktuelne najave, događaji i novosti iz industrije od EJS Consultinga.",
    empty: "Još nisu dodane vijesti.",
  },
};

// Header/footer linkleri ana sayfa ankrlarini (#bolum) kullanir; alt sayfada
// bunlar ana sayfaya cozumlenmeli: "#anchor" -> "/{lang}#anchor".
function withLangBase(links, lang) {
  return (links ?? []).map((link) =>
    link.href?.startsWith("#") ? { ...link, href: `/${lang}${link.href}` } : link,
  );
}

export default async function NewsPage({ params }) {
  const { lang } = await params;
  const t = newsStrings[lang] ?? newsStrings[defaultLocale];
  const content = homepageContent[lang] ?? homepageContent[defaultLocale];

  const supabase = createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("lang", lang)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = data ?? [];

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(t.title);

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={withLangBase(content.utilityLinks, lang)}
        mainLinks={withLangBase(content.mainLinks, lang)}
        ariaLabels={content.ariaLabels}
      />

      <main className="hero-page">
        <section className="content-section section news-page">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{t.eyebrow}</p>
            <h1 className="section-title">{t.title}</h1>
            <p className="section-intro">{t.intro}</p>
          </div>

          {items.length === 0 ? (
            <p className="news-empty">{t.empty}</p>
          ) : (
            <div className="news-grid">
              {items.map((item) => (
                <article key={item.id} className="news-card">
                  {item.image_url ? (
                    <div className="news-card__media">
                      {/* Kullanici yukledigi uzak gorsel; next/image yerine
                          standart img (host whitelist gerektirmesin diye). */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="news-card__image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}

                  <div className="news-card__body">
                    {item.tag ? (
                      <span className="news-card__tag">{item.tag}</span>
                    ) : null}
                    <h2 className="news-card__title">{item.title}</h2>
                    <p className="news-card__excerpt">{item.excerpt}</p>
                    {item.body ? (
                      <p className="news-card__text">{item.body}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter
        footer={{ ...content.footer, links: withLangBase(content.footer.links, lang) }}
        lang={lang}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
}
