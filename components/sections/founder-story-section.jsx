import Image from "next/image";

const founderPhoto = "/assets/yenikurucu.png";

export function FounderStorySection({ founder, lang }) {
  return (
    <section id="kurucumuzun-hikayesi" className="content-section section founder-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{founder.eyebrow}</p>
        {founder.title ? (
          <h2 className="section-title">{founder.title}</h2>
        ) : null}
        {founder.intro ? (
          <p className="section-intro">{founder.intro}</p>
        ) : null}
      </div>

      <div className="founder-layout">
        <div className="founder-image-wrap">
          <Image
            src={founderPhoto}
            alt={founder.name}
            className="founder-image"
            width={1260}
            height={848}
            sizes="(max-width: 1040px) 100vw, 38vw"
          />
          <div className="founder-meta">
            <p className="founder-name">{founder.name}</p>
            <p className="founder-role">{founder.role}</p>
          </div>

          <p className="founder-caption">{founder.subtitle}</p>
        </div>

        <div className="founder-copy">
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="founder-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
