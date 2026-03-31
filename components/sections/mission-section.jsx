import Image from "next/image";

const missionImage = "/assets/workflow/step-2-factory.jpg";

export function MissionSection({ mission, lang }) {
  return (
    <section id="misyonumuz" className="content-section section mission-showcase">
      <div className="mission-copy">
        <h2 className="mission-showcase-title">{mission.eyebrow}</h2>
        <ul className="mission-bullets">
          {mission.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
    </section>
  );
}
