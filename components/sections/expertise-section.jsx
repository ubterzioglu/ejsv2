"use client";

import { useState } from "react";
import Image from "next/image";

function ExpertiseAccordionItem({ area, index, isOpen, onToggle }) {
  const baseId = `expertise-${index}`;
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={`expertise-item ${isOpen ? "is-open" : ""}`}>
      <h3 className="expertise-item-heading">
        <button
          type="button"
          id={headerId}
          className="expertise-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="expertise-trigger-title">{area.title}</span>
          <span className="expertise-trigger-icon" aria-hidden="true">
            {isOpen ? "–" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="expertise-panel"
        hidden={!isOpen}
      >
        <div
          className={`expertise-panel-inner ${
            area.image ? "has-media" : ""
          }`}
        >
          <div className="expertise-panel-content">
            {area.summary ? (
              <p className="expertise-panel-summary">{area.summary}</p>
            ) : null}

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

          {area.image ? (
            <div className="expertise-panel-media">
              <Image
                src={area.image}
                alt={area.title}
                className="expertise-panel-image"
                width={640}
                height={520}
                sizes="(max-width: 880px) 100vw, 38vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ExpertiseSection({ expertise }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="uzmanlik-alanlarimiz" className="content-section section expertise-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{expertise.eyebrow}</p>
        {expertise.title ? (
          <h2 className="section-title">{expertise.title}</h2>
        ) : null}
        <p className="section-intro">{expertise.intro}</p>
      </div>

      <div className="expertise-accordion">
        {expertise.areas.map((area, index) => (
          <ExpertiseAccordionItem
            key={area.title}
            area={area}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
