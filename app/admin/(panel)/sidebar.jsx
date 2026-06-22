"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections } from "../sections";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand__badge">Yönetim Paneli</span>
        <div className="admin-brand__name">EJS Consulting</div>
        <div className="admin-brand__subtitle">İçerik yönetimi</div>

        <div className="admin-session">
          <div className="admin-session__label">Oturum</div>
          <div className="admin-session__actions">
            <Link
              className="admin-sidebar__logout"
              href="/admin/logout"
              prefetch={false}
            >
              Çıkış
            </Link>
          </div>
        </div>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin bölümleri">
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
              {section.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
