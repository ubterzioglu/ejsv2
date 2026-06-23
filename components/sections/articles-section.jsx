import Link from "next/link";

export function ArticlesSection({ articles, lang }) {
  return (
    <section id="ogren-ve-gelis" className="content-section section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{articles.eyebrow}</p>
        <h2 className="section-title">{articles.title}</h2>
        <p className="section-intro">{articles.intro}</p>
      </div>
      <div className="article-grid">
        {articles.items.map((article, index) => {
          const href = article.slug
            ? `/${lang}/ogren-ve-gelis/${article.slug}`
            : "#iletisim";
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
  );
}
