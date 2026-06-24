import { createServerClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "../components/admin-page-header";
import { deleteSubscriber } from "./actions";

export const dynamic = "force-dynamic";

const TOPIC_LABELS = {
  company: "Şirket Güncellemeleri",
  insight: "EJS Insight Bülteni",
  sector: "Sektörel İçgörüler",
};

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 16).replace("T", " ");
}

export default async function SubscribersPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  const subs = data ?? [];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Bülten"
        title="Bülten Aboneleri"
        description="Bülten sayfasındaki formdan gelen abonelikleri buradan görüntüleyin ve yönetin."
      />

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (subscriptions) oluşturuldu mu?
        </p>
      ) : (
        <>
          <div className="admin-section-head">
            <div>
              <p className="admin-section-title">Aboneler</p>
              <p className="admin-section-subtitle">
                En yeni abonelikler en üstte listelenir.
              </p>
            </div>
            <span className="admin-count-pill">{subs.length} kayıt</span>
          </div>

          <div className="admin-list">
            {subs.length === 0 ? (
              <div className="admin-empty-card">
                <strong>Henüz abone yok.</strong>
                <span>Bülten sayfasından gelen kayıtlar burada görünecek.</span>
              </div>
            ) : (
              subs.map((sub) => (
                <article key={sub.id} className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <h3 className="admin-card__title">
                        {[sub.salutation, sub.first_name, sub.last_name]
                          .filter(Boolean)
                          .join(" ")}
                        <span className="admin-card__muted"> · {sub.email}</span>
                      </h3>
                      <p className="admin-card__excerpt">
                        {[sub.job_title, sub.company, sub.country]
                          .filter(Boolean)
                          .join(" — ")}
                      </p>
                      {sub.topics?.length ? (
                        <p className="admin-card__excerpt">
                          {sub.topics
                            .map((t) => TOPIC_LABELS[t] ?? t)
                            .join(", ")}
                        </p>
                      ) : null}
                    </div>
                    <span className="admin-badge admin-badge--success">
                      {sub.lang?.toUpperCase() ?? "TR"}
                    </span>
                  </div>

                  <div className="admin-card__actions admin-card__actions--row">
                    <form
                      action={deleteSubscriber}
                      className="admin-card__actions-end"
                    >
                      <input type="hidden" name="id" value={sub.id} />
                      <button type="submit" className="admin-button--danger">
                        Sil
                      </button>
                    </form>
                  </div>

                  <p className="admin-card__meta">{formatDate(sub.created_at)}</p>
                </article>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
