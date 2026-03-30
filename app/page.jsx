import {
  approachPoints,
  events,
  expertiseCards,
  footerColumns,
  industries,
  insights,
  mainLinks,
  metrics,
  utilityLinks,
} from "@/app/data/homepage-content";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="page-shell">
      <SiteHeader utilityLinks={utilityLinks} mainLinks={mainLinks} />

      <main>
        <section className="hero section">
          <div className="section-eyebrow">Unternehmensberatung</div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">Neue Klarheit fuer komplexe Entscheidungen</p>
              <h1>
                Strategische Perspektiven, die aus Unsicherheit{" "}
                <span>konkrete Bewegung</span> machen.
              </h1>
              <p className="hero-text">
                Diese Startseite uebersetzt die ruhige, praezise Sprache grosser
                Beratungshaeuser in eine App-Router-Struktur. Inhalte, Karten und
                Navigation sind jetzt React-basiert und spaeter leicht austauschbar.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#insights">
                  Insights ansehen
                </a>
                <a className="button button-secondary" href="#expertise">
                  Leistungsfelder
                </a>
              </div>
            </div>

            <aside className="hero-aside">
              <div className="hero-panel">
                <div className="panel-meta">
                  <span>Empfohlen</span>
                  <span>Q2 / 2026</span>
                </div>

                <h2>Trendradar fuer Industrien im Umbruch</h2>
                <p>
                  Eine prominente Buehne fuer eine Leitpublikation, Studie oder
                  Kampagne. Die Komposition ist bewusst grosszuegig, damit spaetere
                  Inhalte hochwertig wirken.
                </p>
                <a href="#insights">Mehr erfahren</a>
              </div>

              <dl className="hero-metrics" aria-label="Kennzahlen">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div className="hero-band">
            <p>Industries</p>
            <ul>
              {industries.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-slab" id="insights">
          <div className="section-heading">
            <div>
              <p className="section-label">Aktuelles</p>
              <h2>Insights fuer reale Geschaeftsergebnisse</h2>
            </div>
            <a href="#insights" className="text-link">
              Alle Publikationen ansehen
            </a>
          </div>

          <div className="insight-layout">
            <article className="feature-card">
              <div className="card-visual visual-grid">
                <span>Lead Study</span>
              </div>
              <div className="card-body">
                <p className="card-tag">{insights.featured.label}</p>
                <h3>{insights.featured.title}</h3>
                <p>{insights.featured.description}</p>
              </div>
            </article>

            <div className="insight-stack">
              {insights.secondary.map((item) => (
                <article
                  key={item.title}
                  className={`mini-card ${item.accent ? "accent" : ""}`}
                >
                  <p className="card-tag">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="expertise">
          <div className="section-heading">
            <div>
              <p className="section-label">Expertise</p>
              <h2>Branchenwissen und funktionale Exzellenz in einem Raster</h2>
            </div>
            <p className="section-intro">
              Die Karten sind modular aufgebaut. So lassen sich spaeter Branchen,
              Services oder Themenwelten austauschen, ohne das Layout neu zu bauen.
            </p>
          </div>

          <div className="expertise-grid">
            {expertiseCards.map((card) => (
              <article key={card.number} className="expert-card">
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section approach-section" id="approach">
          <div className="approach-panel">
            <div className="approach-copy">
              <p className="section-label">Unser Beratungsansatz</p>
              <h2>Analytische Schaerfe, klare Prioritaeten und saubere Umsetzung.</h2>
              <p>
                Dieses Segment funktioniert als Marken- oder Methodikbuehne. Die
                diagonalen Linien und die dunklere Flaeche geben der Seite in der
                Mitte einen bewusst markanten Taktwechsel.
              </p>
            </div>

            <div className="approach-points">
              {approachPoints.map((point, index) => (
                <div key={point}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-slab" id="events">
          <div className="section-heading">
            <div>
              <p className="section-label">Internationale Events</p>
              <h2>Kuratiert, kompakt und fuer Entscheider inszeniert</h2>
            </div>
            <a href="#events" className="text-link">
              Mehr Events
            </a>
          </div>

          <div className="event-list">
            {events.map((event) => (
              <article key={event.title} className="event-card">
                <div className="event-date">
                  <span>{event.day}</span>
                  <small>{event.date}</small>
                </div>
                <div className="event-body">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section career-section" id="career">
          <div className="career-grid">
            <article className="career-card">
              <p className="section-label">Join Us</p>
              <h2>Karrierethemen in einer ruhigeren, menschenzentrierten Zone</h2>
              <p>
                Dieses Feld ist fuer Recruiting Stories, Kultur, Entwicklung oder
                Bewerbungswege gedacht und bricht den eher analytischen Rhythmus der
                oberen Bereiche auf.
              </p>
              <a className="button button-primary" href="#contact">
                Karrierebereich oeffnen
              </a>
            </article>

            <article className="career-story">
              <p className="card-tag">Look behind the scenes</p>
              <h3>
                Raum fuer Storytelling ueber Kultur, Lernen und internationale Wege
              </h3>
              <p>
                Eine editoriale Karte fuer Mitarbeitergeschichten, Podcasts oder
                kurze Video-Teaser.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer section" id="contact">
        <div className="footer-top">
          <div>
            <p className="section-label">Kontaktieren Sie uns</p>
            <h2>Wir gestalten die naechsten Inhalte spaeter, das Fundament steht.</h2>
          </div>
          <a className="button button-primary" href="mailto:info@example.com">
            Kontakt
          </a>
        </div>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="footer-title">{column.title}</p>
              {column.items?.map((item) => (
                <p key={item}>{item}</p>
              ))}
              {column.links?.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>(c) 2026 Roland Berger inspired layout</p>
          <p>Impressum / Datenschutz / Cookies</p>
        </div>
      </footer>
    </div>
  );
}
