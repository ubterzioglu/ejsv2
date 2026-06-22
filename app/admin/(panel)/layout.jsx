import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import { AdminSidebar } from "./sidebar";
import "../admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }) {
  if (!(await isAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar__brand">
            <span className="admin-kicker">Yönetim merkezi</span>
            <strong>EJS Consulting</strong>
          </div>
          <div className="admin-topbar__actions">
            <Link href="/" className="admin-topbar__link">
              Siteyi görüntüle
            </Link>
            <span className="admin-status-pill">Güvenli oturum</span>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
