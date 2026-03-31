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
          <span className="identity-feature-tag">{lang === "tr" ? "Yaklasim" : "Approach"}</span>
          <p className="identity-feature-intro">{identity.intro}</p>
          <ul className="identity-feature-list">
            {identity.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
