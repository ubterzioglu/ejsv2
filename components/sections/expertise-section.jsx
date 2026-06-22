"use client";

import { useState } from "react";

function ExpertiseCard({ area, detailsLabel }) {
  const [open, setOpen] = useState(false);
  const detailsId = `expertise-${area.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article className={`expertise-card ${open ? "is-open" : ""}`}>
      <h3 className="expertise-card-title">{area.title}</h3>
      <p className="expertise-card-summary">{area.summary}</p>

      <button
        type="button"
        className="expertise-toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
      >
        {detailsLabel}
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>

      {open ? (
        <div id={detailsId} className="expertise-details">
          {area.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="expertise-detail-paragraph">
              {paragraph}
            </p>
          ))}
          {area.details?.length ? (
            <ul className="expertise-detail-list">
              {area.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function ExpertiseSection({ expertise }) {
  return (
    <section id="uzmanlik-alanlarimiz" className="content-section section expertise-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{expertise.eyebrow}</p>
        <h2 className="section-title">{expertise.title}</h2>
        <p className="section-intro">{expertise.intro}</p>
      </div>

      <div className="expertise-grid">
        {expertise.areas.map((area) => (
          <ExpertiseCard
            key={area.title}
            area={area}
            detailsLabel={expertise.detailsLabel}
          />
        ))}
      </div>
    </section>
  );
}
