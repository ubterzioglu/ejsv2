"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections } from "../sections";

export function AdminSidebar() {
  const pathname = usePathname();
  // Mobilde sidebar bir off-canvas drawer'a donusur; bu state acik/kapaliyi tutar.
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  // Drawer aciksa: Esc ile kapat + arka plan kaydirmasini kilitle.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobilde gorunur hamburger tetikleyici (masaustunde gizli). */}
      <button
        type="button"
        className="admin-drawer-toggle"
        aria-expanded={isOpen}
        aria-controls="admin-sidebar"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="admin-drawer-toggle__icon" aria-hidden="true">
          ☰
        </span>
        Menü
      </button>

      {/* Drawer aciksa arkadaki icerigi karartan tiklanabilir overlay. */}
      <div
        className={"admin-drawer-overlay" + (isOpen ? " is-visible" : "")}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        id="admin-sidebar"
        className={"admin-sidebar" + (isOpen ? " is-open" : "")}
      >
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

          {/* Drawer ic kapatma butonu (yalnizca mobilde gorunur). */}
          <button
            type="button"
            className="admin-drawer-close"
            onClick={close}
            aria-label="Menüyü kapat"
          >
            ✕
          </button>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin bölümleri">
          <Link
            href="/admin"
            onClick={close}
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
                onClick={close}
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
            onClick={close}
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
            onClick={close}
          >
            Çıkış
          </Link>
        </div>
      </aside>
    </>
  );
}
