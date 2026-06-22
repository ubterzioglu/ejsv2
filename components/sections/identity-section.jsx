import Image from "next/image";

const identityImage = "/assets/workflow/step-6-teamwork.jpg";

export function IdentitySection({ identity, lang }) {
  return (
    <section id="kimligimiz" className="content-section section identity-feature-section">
      <div className="identity-feature-top">
        <div className="identity-feature-heading">
          <p className="structure-label">{identity.eyebrow}</p>
          <h1 className="identity-feature-title">{identity.title}</h1>
        </div>
      </div>

      <div className="identity-feature-card">
        <div className="identity-feature-copy">
          {identity.tag ? (
            <span className="identity-feature-tag">{identity.tag}</span>
          ) : null}
          <p className="identity-feature-body">{identity.body}</p>
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
