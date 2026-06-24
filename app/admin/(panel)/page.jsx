import Link from "next/link";
import { adminSections } from "../sections";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div>
      <section className="admin-hero">
        <span className="admin-kicker">Kontrol paneli</span>
        <h1 className="admin-page__title">
          EJS Consulting Yönetim Merkezi
        </h1>
        <p className="admin-page__subtitle">
          Makaleleri, site güncellemelerini ve revizyon taleplerini tek yerden
          yönetin.
        </p>
      </section>

      <section className="admin-readme-card">
        <span className="admin-kicker">Beni oku</span>
        <h2 className="admin-readme-card__title">Panele hoş geldiniz</h2>
        <p className="admin-card__excerpt">
          Bu panel, EJS Consulting web sitesinin içeriğini kod bilgisi
          gerektirmeden yönetmeniz için hazırlandı. Sol menüdeki her bölüm,
          sitenin belirli bir alanını (hero slaytları, makaleler, güncellemeler
          ve revizyon talepleri) düzenlemenizi sağlar. Yaptığınız değişiklikler
          kaydedildiği anda canlı siteye yansır; ayrı bir yayınlama adımına
          gerek yoktur. Tüm içerik ve görseller güvenli şekilde saklanır, bu
          yüzden gönül rahatlığıyla deneyebilir ve düzenleyebilirsiniz. Nereden
          başlayacağınızdan emin değilseniz sol menüdeki “Yardım / Rehber”
          bölümünü açın; her alanın nasıl kullanıldığını adım adım anlatır.
        </p>
      </section>

      <section className="admin-dashboard-grid admin-dashboard-grid--2x2">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="admin-dashboard-card"
          >
            <span className="admin-dashboard-card__title">{section.label}</span>
            <span className="admin-dashboard-card__text">
              {section.description}
            </span>
            <span className="admin-dashboard-card__action">Aç →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
