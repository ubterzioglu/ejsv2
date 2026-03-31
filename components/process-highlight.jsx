import Image from "next/image";

const highlightImage = "/assets/workflow/step-6-teamwork.jpg";

const highlightCopy = {
  tr: {
    text:
      "Tüm şirketler için standart bir çözüm yoktur. Tüm süreçlerinizde kullandığınız kaynakların alan, makine, insan, malzeme ve metot bazında doğru ve verimli kullanılabilmesi için tüm süreçleri, metodları, üretim ve hizmet alanlarını ve teknik çözümleri tasarlıyoruz; üretim ve hizmet kapasitelerini artırıyoruz.",
    alt: "Süreç geliştirme çalışması",
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
