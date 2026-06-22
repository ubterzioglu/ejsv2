import { createServerClient } from "@/lib/supabase/server";
import { setRevisionStatus, deleteRevision } from "./actions";
import { RevisionForm } from "./revision-form";

export const dynamic = "force-dynamic";

const STATUS_LABELS = {
  new: "Yeni",
  in_progress: "Devam ediyor",
  done: "Tamamlandı",
};
const STATUS_ORDER = ["new", "in_progress", "done"];

function formatDate(value) {
  if (!value) return "";
  // Sunucuda sabit format (locale farklarini onlemek icin ISO tarih kismi)
  return new Date(value).toISOString().slice(0, 16).replace("T", " ");
}

export default async function RevisionsPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("revision_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="admin-page__title">Revizyon İstekleri</h1>
      <p className="admin-page__subtitle">
        Kullanıcı isteklerini buraya girin ve durumlarını takip edin.
      </p>

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (revision_requests) oluşturuldu mu?
        </p>
      ) : (
        <>
          <div className="admin-list">
            {(data ?? []).length === 0 ? (
              <p className="admin-empty">Henüz revizyon isteği yok.</p>
            ) : (
              data.map((req) => (
                <article key={req.id} className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <h3 className="admin-card__title">
                        {req.name || "İsimsiz"}
                        {req.email ? (
                          <span className="admin-card__muted">
                            {" "}
                            · {req.email}
                          </span>
                        ) : null}
                      </h3>
                      <p className="admin-card__excerpt">{req.message}</p>
                    </div>
                    <span className={`admin-badge admin-badge--${req.status}`}>
                      {STATUS_LABELS[req.status] ?? req.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 12,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {STATUS_ORDER.filter((s) => s !== req.status).map((s) => (
                      <form key={s} action={setRevisionStatus}>
                        <input type="hidden" name="id" value={req.id} />
                        <input type="hidden" name="status" value={s} />
                        <button type="submit" className="admin-button--ghost">
                          {STATUS_LABELS[s]} yap
                        </button>
                      </form>
                    ))}
                    <form action={deleteRevision} style={{ marginLeft: "auto" }}>
                      <input type="hidden" name="id" value={req.id} />
                      <button type="submit" className="admin-button--danger">
                        Sil
                      </button>
                    </form>
                  </div>

                  <p className="admin-card__meta">{formatDate(req.created_at)}</p>
                </article>
              ))
            )}
          </div>

          <RevisionForm />
        </>
      )}
    </div>
  );
}
