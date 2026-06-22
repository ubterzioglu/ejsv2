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
      <main className="admin-main">{children}</main>
    </div>
  );
}
