import Image from "next/image";

const missionImage = "/assets/workflow/mission-factory.jpg";

export function MissionSection({ mission, lang }) {
  return (
    <section id="misyonumuz" className="content-section section mission-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{mission.eyebrow}</p>
        {mission.title ? (
          <h2 className="section-title">{mission.title}</h2>
        ) : null}
        {mission.intro ? (
          <p className="section-intro">{mission.intro}</p>
        ) : null}
      </div>

      <div className="mission-showcase">
        <div className="mission-copy">
          <ul className="mission-bullets">
            {mission.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {mission.highlight ? (
            <p className="mission-highlight">{mission.highlight}</p>
          ) : null}
        </div>

        <div className="mission-image-card">
          <Image
            src={missionImage}
            alt={lang === "tr" ? "Misyon görseli" : "Mission visual"}
            className="mission-image"
            width={800}
            height={500}
            sizes="(max-width: 1040px) 100vw, 48vw"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
