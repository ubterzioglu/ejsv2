import Image from "next/image";

const highlightImage = "/assets/workflow/step-6-teamwork.jpg";

const highlightCopy = {
  tr: {
    text:
      "Tum sirketler icin standart bir cozum yoktur. Tum sureclerinizde kullandiginiz kaynaklarin alan, makine, insan, malzeme ve metot bazinda dogru ve verimli kullanilabilmesi icin tum surecleri, metodlari, uretim ve hizmet alanlarini ve teknik cozumleri tasarliyoruz; uretim ve hizmet kapasitelerini artiriyoruz.",
    alt: "Surec gelistirme calismasi",
  },
  en: {
    text:
      "There is no standard solution for every company. To help you use space, machinery, people, materials, and methods in the most effective way, we design processes, operating methods, production and service areas, and technical solutions that increase capacity.",
    alt: "Process improvement collaboration",
  },
};

export function ProcessHighlight({ lang }) {
  const copy = highlightCopy[lang] ?? highlightCopy.tr;

  return (
    <section className="process-highlight-section">
      <div className="process-highlight-shell section">
        <div className="process-highlight-image-card">
          <Image
            src={highlightImage}
            alt={copy.alt}
            className="process-highlight-image"
            width={700}
            height={450}
            sizes="(max-width: 1040px) 100vw, 28vw"
          />
        </div>

        <div className="process-highlight-copy">
          <p className="process-highlight-text">{copy.text}</p>
        </div>
      </div>
    </section>
  );
}
