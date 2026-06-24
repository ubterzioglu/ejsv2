import Image from "next/image";

const identityImage = "/assets/workflow/identity-industry.jpg";

export function IdentitySection({ identity, lang }) {
  return (
    <section id="kimligimiz" className="content-section section identity-feature-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{identity.eyebrow}</p>
        {identity.title ? (
          <h2 className="section-title">{identity.title}</h2>
        ) : null}
        {identity.intro ? (
          <p className="section-intro">{identity.intro}</p>
        ) : null}
      </div>

      <div className="identity-feature-card">
        <div className="identity-feature-copy">
          {identity.tag ? (
            <span className="identity-feature-tag">{identity.tag}</span>
          ) : null}
          {identity.bullets?.length ? (
            <ul className="identity-feature-list">
              {identity.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {identity.body ? (
            <p className="identity-feature-body">{identity.body}</p>
          ) : null}
          {identity.highlight ? (
            <p className="identity-feature-highlight">{identity.highlight}</p>
          ) : null}
          {identity.cta?.label && identity.cta?.href ? (
            <a className="identity-feature-cta" href={identity.cta.href}>
              {identity.cta.label}
              <span aria-hidden="true"> -&gt;</span>
            </a>
          ) : null}
        </div>

        <div className="identity-feature-image-wrap">
          <Image
            src={identityImage}
            alt={lang === "tr" ? "Kimliğimiz görseli" : "Identity visual"}
            className="identity-feature-image"
            width={600}
            height={400}
            sizes="(max-width: 1040px) 100vw, 46vw"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
