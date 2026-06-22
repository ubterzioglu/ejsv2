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

      <section className="admin-dashboard-grid">
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

      <section className="admin-panel-grid">
        <div className="admin-panel-card">
          <h3>Bugünkü odak</h3>
          <ul className="admin-update-list">
            <li>Yeni makaleleri yayına alın ve sıralamayı güncel tutun.</li>
            <li>Bekleyen revizyon taleplerini gözden geçirin.</li>
            <li>Güncellemeler kaydını sade ve takip edilebilir tutun.</li>
          </ul>
        </div>
        <div className="admin-panel-card">
          <h3>Panel notları</h3>
          <p className="admin-card__excerpt">
            İçerikler ve görseller güvenli şekilde Supabase üzerinde saklanır.
            Değişiklikler kaydedildiği anda ana sayfaya yansır. Sol menüden
            ilgili bölüme geçerek düzenlemelerinizi yapabilirsiniz.
          </p>
        </div>
      </section>
    </div>
  );
}
