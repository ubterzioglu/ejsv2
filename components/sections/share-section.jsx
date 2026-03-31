export function ShareSection({ shareLinks, lang }) {
  return (
    <section className="content-section section share-section">
      <div className="footer-share-inner section">
        <p className="footer-share-title">
          {lang === "tr" ? "Sayfamizi paylasin" : "Share this page"}
        </p>

        <div
          className="footer-share-icons"
          aria-label={lang === "tr" ? "Paylasim baglantilari" : "Share links"}
        >
          {shareLinks.map((item) => (
            <a
              key={item.label}
              className="footer-share-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
