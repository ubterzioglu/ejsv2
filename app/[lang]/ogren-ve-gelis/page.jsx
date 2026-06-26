import Link from "next/link";
import { homepageContent } from "@/app/data/homepage-content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const SUPPORTED_LANGS = ["tr", "en", "de", "bs"];

function getPage(lang) {
  return homepageContent[lang] ?? homepageContent.tr;
}

// Header/footer links use in-page anchors (#section). On a sub-page those must
// resolve against the homepage, so we rewrite "#anchor" -> "/{lang}#anchor".
function withLangBase(links, lang) {
  return (links ?? []).map((link) =>
    link.href?.startsWith("#") ? { ...link, href: `/${lang}${link.href}` } : link,
  );
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const page = getPage(lang);
  return {
    title: `${page.articles?.title ?? "Öğren ve Geliş"} | EJS Consulting`,
    description: page.articles?.intro,
  };
}

export default async function ArticlesIndexPage({ params }) {
  const { lang } = await params;
  const page = getPage(lang);
  const articles = page.articles ?? { items: [] };
  const items = articles.items ?? [];

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(articles.title ?? "EJS Consulting");

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={withLangBase(page.utilityLinks, lang)}
        mainLinks={withLangBase(page.mainLinks, lang)}
        ariaLabels={page.ariaLabels}
      />

      <main className="hero-page">
        <section id="ogren-ve-gelis" className="content-section section">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{articles.eyebrow}</p>
            <h1 className="section-title">{articles.title}</h1>
            {articles.intro ? (
              <p className="section-intro">{articles.intro}</p>
            ) : null}
          </div>

          <div className="article-grid">
            {items.map((article, index) => {
              const href = article.slug
                ? `/${lang}/ogren-ve-gelis/${article.slug}`
                : `/${lang}#iletisim`;
              return (
                <article key={article.title} className="article-card">
                  <div className="article-card-head">
                    <span className="article-kicker">{articles.eyebrow}</span>
                    <span className="article-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link href={href} className="article-link">
                    <span className="article-link-label">{articles.cta}</span>
                    <span className="article-link-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter
        footer={{ ...page.footer, links: withLangBase(page.footer.links, lang) }}
        lang={lang}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
}
