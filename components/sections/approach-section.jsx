export function ApproachSection({ approach }) {
  return (
    <section id="yaklasimimiz" className="content-section section approach-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{approach.eyebrow}</p>
        {approach.title ? (
          <h2 className="section-title">{approach.title}</h2>
        ) : null}
        {approach.intro ? (
          <p className="section-intro">{approach.intro}</p>
        ) : null}
      </div>

      <div className="approach-body">
        {approach.body.map((paragraph) => (
          <p key={paragraph} className="approach-paragraph">
            {paragraph}
          </p>
        ))}
        <span className="approach-highlight">{approach.highlight}</span>
      </div>
    </section>
  );
}
