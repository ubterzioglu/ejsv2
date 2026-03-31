const referenceImages = [
  "/assets/references/1.jpg",
  "/assets/references/2.jpg",
  "/assets/references/3.jpg",
  "/assets/references/4.jpg",
  "/assets/references/5.jpg",
  "/assets/references/6.jpg",
  "/assets/references/7.jpg",
  "/assets/references/8.jpg",
  "/assets/references/9.jpg",
  "/assets/references/10.jpg",
];

export function ReferencesSection({ references }) {
  return (
    <section id="referanslar" className="content-section section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{references.eyebrow}</p>
        <h2 className="section-title">{references.title}</h2>
        <p className="section-intro">{references.intro}</p>
      </div>
      <div className="reference-carousel">
        <div className="reference-track">
          {[...referenceImages, ...referenceImages].map((image, index) => (
          <div key={index} className="reference-card">
               <img
                 src={image}
                 alt={`${references.eyebrow} ${(index % referenceImages.length) + 1}`}
                 className="reference-image"
                 loading="lazy"
                 fetchPriority="low"
                 decoding="async"
               />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
