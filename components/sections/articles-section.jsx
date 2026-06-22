export function ArticlesSection({ articles }) {
  return (
    <section id="ogren-ve-gelis" className="content-section section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{articles.eyebrow}</p>
        <h2 className="section-title">{articles.title}</h2>
        <p className="section-intro">{articles.intro}</p>
      </div>
      <div className="article-grid">
        {articles.items.map((article, index) => (
          <article
            key={article.title}
            className={`article-card${index === 0 ? " article-card-featured" : ""}`}
          >
            <span className="article-kicker">{articles.eyebrow}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <a href="#iletisim" className="article-link">
              {articles.ctaLabel}
              <span aria-hidden="true"> →</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
