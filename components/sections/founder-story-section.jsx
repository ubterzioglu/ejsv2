import Image from "next/image";

const founderPhoto = "/assets/enveramain.jpeg";

export function FounderStorySection({ founder, lang }) {
  return (
    <section id="kurucumuzun-hikayesi" className="content-section section founder-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{founder.eyebrow}</p>
        <h2 className="section-title founder-title">{founder.subtitle}</h2>
      </div>

      <div className="founder-layout">
        <div className="founder-image-wrap">
          <Image
            src={founderPhoto}
            alt={founder.name}
            className="founder-image"
            width={460}
            height={560}
            sizes="(max-width: 1040px) 100vw, 38vw"
          />
          <div className="founder-meta">
            <p className="founder-name">{founder.name}</p>
            <p className="founder-role">{founder.role}</p>
          </div>
        </div>

        <div className="founder-copy">
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="founder-paragraph">
              {paragraph}
            </p>
          ))}

          <div className="founder-languages">
            <span className="founder-languages-label">{founder.languagesLabel}:</span>
            <span className="founder-languages-list">{founder.languages}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
