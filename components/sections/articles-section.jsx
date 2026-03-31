export function ArticlesSection({ articles, lang }) {
  return (
    <section id="yazilarimiz" className="content-section section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{articles.eyebrow}</p>
        <h2 className="section-title">{articles.title}</h2>
        <p className="section-intro">{articles.intro}</p>
      </div>
      <div className="article-grid">
        {articles.items.map((article) => (
          <article key={article.title} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <a href="#iletisim" className="article-link">
              {lang === "tr" ? "Detay konusalim" : "Discuss details"}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
