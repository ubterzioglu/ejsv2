const referenceBrands = [
  { src: "/assets/references/1.jpg", name: "GENBA Group" },
  { src: "/assets/references/2.jpg", name: "World Medicine" },
  { src: "/assets/references/3.jpg", name: "Trakya Verimlilik Platformu" },
  { src: "/assets/references/4.jpg", name: "Yurtbay Seramik" },
  { src: "/assets/references/5.jpg", name: "ALP Havacılık" },
  { src: "/assets/references/6.jpg", name: "P3 Group GmbH" },
  { src: "/assets/references/7.jpg", name: "Dalgakıran Kompresör" },
  { src: "/assets/references/8.jpg", name: "TES Elektrik" },
  { src: "/assets/references/9.jpg", name: "Petek Saraciye" },
  { src: "/assets/references/10.jpg", name: "Avrasya Kırtasiye" },
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
          {[...referenceBrands, ...referenceBrands].map((brand, index) => (
            <div key={index} className="reference-card">
              <div className="reference-logo">
                {/* Bilincli tercih: CSS marquee (width:max-content) icinde 20 dekoratif logo;
                    next/image bu sonsuz kayan serit duzenine uymuyor. Perf elle yonetiliyor. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="reference-image"
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>
              <p className="reference-name">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
