"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections } from "../sections";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand__copy">
          <span className="admin-brand__badge">Yönetim Paneli</span>
          <div className="admin-brand__name">EJS Consulting</div>
          <div className="admin-brand__subtitle">İçerik ve talep yönetimi</div>
          <div className="admin-brand__actions">
            <Link href="/" className="admin-brand__link">
              Siteyi görüntüle
            </Link>
            <span className="admin-status-pill">Güvenli oturum</span>
          </div>
        </div>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin bölümleri">
        <Link
          href="/admin"
          className={
            "admin-sidebar__link" +
            (pathname === "/admin" ? " admin-sidebar__link--active" : "")
          }
        >
          <span className="admin-sidebar__link-main">Ana sayfa</span>
          <span className="admin-sidebar__link-sub">Panel genel görünümü</span>
        </Link>
        {adminSections.map((section) => {
          const active =
            pathname === section.href ||
            pathname.startsWith(section.href + "/");
          return (
            <Link
              key={section.href}
              href={section.href}
              className={
                "admin-sidebar__link" +
                (active ? " admin-sidebar__link--active" : "")
              }
            >
              <span className="admin-sidebar__link-main">{section.label}</span>
              {section.description ? (
                <span className="admin-sidebar__link-sub">
                  {section.description}
                </span>
              ) : null}
            </Link>
          );
        })}

        <Link
          href="/admin/rehber"
          className={
            "admin-sidebar__link" +
            (pathname === "/admin/rehber" ||
            pathname.startsWith("/admin/rehber/")
              ? " admin-sidebar__link--active"
              : "")
          }
        >
          <span className="admin-sidebar__link-main">Yardım / Rehber</span>
          <span className="admin-sidebar__link-sub">
            Her bölüm nasıl kullanılır
          </span>
        </Link>
      </nav>

      <div className="admin-session">
        <div>
          <div className="admin-session__label">Oturum</div>
          <div className="admin-session__text">Admin erişimi aktif</div>
        </div>
        <Link
          className="admin-sidebar__logout"
          href="/admin/logout"
          prefetch={false}
        >
          Çıkış
        </Link>
      </div>
    </aside>
  );
}
