"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections } from "../sections";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">EJS Admin</div>

      <nav className="admin-sidebar__nav" aria-label="Admin bolumleri">
        {adminSections.map((section) => {
          const active = pathname.startsWith(section.href);
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

      <Link
        className="admin-sidebar__logout"
        href="/admin/logout"
        prefetch={false}
      >
        Cikis yap
      </Link>
    </aside>
  );
}
