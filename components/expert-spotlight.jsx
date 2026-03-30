"use client";

import Image from "next/image";
import profilePhoto from "@/old/src/assets/ejsprofil.png";

const spotlightCopy = {
  tr: {
    quote:
      "Basarili bir donusum, uygulamayi konseptin dogal bir parcasi haline getirir ve bunu musteriyle birlikte sahada kurar.",
    name: "Envera Jahovic Sarayli",
    title: "Kurucu Danisman",
    location: "EJS Consulting, Istanbul",
    primaryCta: "Tum Uzmanliklar",
    secondaryCta: "Tam Profili Inceleyin",
  },
  en: {
    quote:
      "A successful transformation makes execution part of the concept itself and builds it together with the client on the ground.",
    name: "Envera Jahovic Sarayli",
    title: "Founder Consultant",
    location: "EJS Consulting, Istanbul",
    primaryCta: "All Expertise",
    secondaryCta: "View Full Profile",
  },
};

export function ExpertSpotlight({ lang }) {
  const copy = spotlightCopy[lang] ?? spotlightCopy.tr;

  return (
    <section className="expert-spotlight-section">
      <div className="expert-spotlight-shell section">
        <div className="expert-portrait-wrap">
          <div className="expert-portrait-ring">
            <Image
              src={profilePhoto}
              alt={copy.name}
              className="expert-portrait-image"
              sizes="(max-width: 760px) 240px, 340px"
            />
          </div>
        </div>

        <div className="expert-spotlight-copy">
          <blockquote className="expert-quote">“{copy.quote}”</blockquote>

          <div className="expert-meta">
            <p className="expert-name">{copy.name}</p>
            <p className="expert-role">{copy.title}</p>
            <p className="expert-role">{copy.location}</p>
          </div>

          <div className="expert-cta-row">
            <a href="#metodoloji" className="expert-cta expert-cta-primary">
              {copy.primaryCta}
            </a>
            <a href="#iletisim" className="expert-cta expert-cta-secondary">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
