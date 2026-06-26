import { notFound } from "next/navigation";
import Link from "next/link";
import { homepageContent } from "@/app/data/homepage-content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const SUPPORTED_LANGS = ["tr", "en", "de", "bs"];

const backLabels = {
  tr: "Tüm yazılara dön",
  en: "Back to all articles",
  de: "Zurück zu allen Artikeln",
  bs: "Nazad na sve članke",
};

function getPage(lang) {
  return homepageContent[lang] ?? homepageContent.tr;
}

function findArticle(page, slug) {
  return page.articles?.items?.find((item) => item.slug === slug) ?? null;
}

// Header/footer links use in-page anchors (#section). On a sub-page those must
// resolve against the homepage, so we rewrite "#anchor" -> "/{lang}#anchor".
function withLangBase(links, lang) {
  return (links ?? []).map((link) =>
    link.href?.startsWith("#")
      ? { ...link, href: `/${lang}${link.href}` }
      : link,
  );
}

export function generateStaticParams() {
  const params = [];
  for (const lang of SUPPORTED_LANGS) {
    const page = getPage(lang);
    for (const item of page.articles?.items ?? []) {
      if (item.slug) {
        params.push({ lang, slug: item.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const page = getPage(lang);
  const article = findArticle(page, slug);
  if (!article) {
    return { title: "EJS Consulting" };
  }
  return {
    title: `${article.title} | EJS Consulting`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { lang, slug } = await params;
  const page = getPage(lang);
  const article = findArticle(page, slug);

  if (!article) {
    notFound();
  }

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(article.title);
  const backLabel = backLabels[lang] ?? backLabels.tr;
  const paragraphs = article.body ?? [article.excerpt];

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={withLangBase(page.utilityLinks, lang)}
        mainLinks={withLangBase(page.mainLinks, lang)}
        ariaLabels={page.ariaLabels}
      />

      <main className="hero-page">
        <article className="content-section section article-detail">
          <div className="article-detail-inner">
            <p className="structure-label">{page.articles.eyebrow}</p>
            <h1 className="section-title article-detail-title">{article.title}</h1>
            <div className="article-detail-body">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link href={`/${lang}/ogren-ve-gelis`} className="article-link">
              <span aria-hidden="true">← </span>
              {backLabel}
            </Link>
          </div>
        </article>
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
