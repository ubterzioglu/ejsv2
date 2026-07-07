import { createServerClient } from "@/lib/supabase/server";
import {
  setRevisionStatus,
  deleteRevision,
  deleteRevisionComment,
} from "./actions";
import { RevisionForm } from "./revision-form";
import { CommentForm } from "./comment-form";
import { AdminAccordion } from "../components/admin-accordion";
import { AdminPageHeader } from "../components/admin-page-header";

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

function RequestCard({ req, comments }) {
  return (
    <article className="admin-card">
      <div className="admin-card__head">
        <div>
          <h3 className="admin-card__title">
            {req.name || "İsimsiz"}
            {req.email ? (
              <span className="admin-card__muted"> · {req.email}</span>
            ) : null}
          </h3>
          <p className="admin-card__excerpt">{req.message}</p>
        </div>
        <span className={`admin-badge admin-badge--${req.status}`}>
          {STATUS_LABELS[req.status] ?? req.status}
        </span>
      </div>

      <div className="admin-card__actions admin-card__actions--row">
        {STATUS_ORDER.filter((s) => s !== req.status).map((s) => (
          <form key={s} action={setRevisionStatus}>
            <input type="hidden" name="id" value={req.id} />
            <input type="hidden" name="status" value={s} />
            <button
              type="submit"
              className={`admin-button--status admin-button--status-${s}`}
            >
              {STATUS_LABELS[s]} yap
            </button>
          </form>
        ))}
        <form action={deleteRevision} className="admin-card__actions-end">
          <input type="hidden" name="id" value={req.id} />
          <button type="submit" className="admin-button--danger">
            Sil
          </button>
        </form>
      </div>

      {req.attachment_url ? (
        <p className="admin-card__attachment">
          <a
            href={req.attachment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-attachment-link"
          >
            📎 {req.attachment_name || "Ekli dosya"}
          </a>
        </p>
      ) : null}

      <div className="admin-comments">
        <p className="admin-comments__title">Notlar / Yorumlar</p>
        {comments.length === 0 ? (
          <p className="admin-comments__empty">Henüz yorum yok.</p>
        ) : (
          <ul className="admin-comments__list">
            {comments.map((c) => (
              <li key={c.id} className="admin-comment">
                <div className="admin-comment__body">{c.body}</div>
                {c.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image_url}
                    alt=""
                    className="admin-comment__image"
                    loading="lazy"
                  />
                ) : null}
                <div className="admin-comment__foot">
                  <span className="admin-comment__meta">
                    {c.author ? `${c.author} · ` : ""}
                    {formatDate(c.created_at)}
                  </span>
                  <form action={deleteRevisionComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="admin-comment__delete">
                      Sil
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
        <CommentForm revisionId={req.id} />
      </div>

      <p className="admin-card__meta">{formatDate(req.created_at)}</p>
    </article>
  );
}

export default async function RevisionsPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("revision_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const requests = data ?? [];
  const counts = {
    new: requests.filter((r) => r.status === "new").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    done: requests.filter((r) => r.status === "done").length,
  };
  const activeRequests = requests.filter((r) => r.status !== "done");
  const doneRequests = requests.filter((r) => r.status === "done");

  // Yorumlari cek ve talep id'sine gore grupla.
  const { data: commentRows } = await supabase
    .from("revision_comments")
    .select("*")
    .order("created_at", { ascending: true });

  const commentsByRevision = {};
  for (const c of commentRows ?? []) {
    (commentsByRevision[c.revision_id] ??= []).push(c);
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Talepler"
        title="Revizyon İstekleri"
        description="Kullanıcı taleplerini, içerik notlarını ve yapılacak düzenlemeleri buradan takip edin."
      />

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (revision_requests) oluşturuldu mu?
        </p>
      ) : (
        <>
          <div className="admin-stats-grid">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="admin-stat-card">
                <div className="admin-stat-card__label">{STATUS_LABELS[s]}</div>
                <div className="admin-stat-card__value">{counts[s]}</div>
                <div className="admin-stat-card__hint">talep</div>
              </div>
            ))}
          </div>

          <div className="admin-content-layout">
            <aside className="admin-content-layout__side">
              <AdminAccordion
                title="Yeni revizyon isteği ekle"
                hint="Talebi panele kaydedin ve durumunu takip edin"
              >
                <RevisionForm />
              </AdminAccordion>
            </aside>

            <section className="admin-content-layout__main">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-title">Gelen talepler</p>
                  <p className="admin-section-subtitle">
                    Durumları güncelleyin veya kaydı kaldırın.
                  </p>
                </div>
                <span className="admin-count-pill">{requests.length} kayıt</span>
              </div>

              <div className="admin-list">
                {requests.length === 0 ? (
                  <div className="admin-empty-card">
                    <strong>Henüz revizyon isteği yok.</strong>
                    <span>Yukarıdaki formla yeni bir talep ekleyebilirsiniz.</span>
                  </div>
                ) : (
                  <>
                    {activeRequests.length === 0 ? (
                      <div className="admin-empty-card">
                        <strong>Aktif revizyon isteği yok.</strong>
                        <span>Tüm talepler tamamlandı.</span>
                      </div>
                    ) : (
                      activeRequests.map((req) => (
                        <RequestCard
                          key={req.id}
                          req={req}
                          comments={commentsByRevision[req.id] ?? []}
                        />
                      ))
                    )}

                    {doneRequests.length > 0 ? (
                      <div className="admin-done-group">
                        <div className="admin-section-head admin-section-head--sub">
                          <div>
                            <p className="admin-section-title">Tamamlananlar</p>
                            <p className="admin-section-subtitle">
                              Tamamlanmış revizyon istekleri.
                            </p>
                          </div>
                          <span className="admin-count-pill">
                            {doneRequests.length} kayıt
                          </span>
                        </div>
                        {doneRequests.map((req) => (
                          <RequestCard
                            key={req.id}
                            req={req}
                            comments={commentsByRevision[req.id] ?? []}
                          />
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
