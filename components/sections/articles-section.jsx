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
        {articles.items.map((article) => {
          const href = article.slug
            ? `/${lang}/ogren-ve-gelis/${article.slug}`
            : "#iletisim";
          return (
            <article key={article.title} className="article-card">
              <span className="article-kicker">{articles.eyebrow}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link href={href} className="article-link">
                {articles.cta}
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
