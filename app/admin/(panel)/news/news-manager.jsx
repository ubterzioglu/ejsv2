"use client";

import { useState } from "react";
import { NewsForm } from "./news-form";
import { AdminAccordion } from "../components/admin-accordion";
import { deleteNews } from "./actions";

/**
 * @param {{ lang: string, items: Array<object> }} props
 */
export function NewsManager({ lang, items }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="admin-content-layout">
      <aside className="admin-content-layout__side">
        <AdminAccordion
          title="Yeni haber ekle"
          hint="Başlık, etiket, özet, içerik ve kapak görseli"
        >
          <NewsForm lang={lang} />
        </AdminAccordion>
      </aside>

      <section className="admin-content-layout__main">
        <div className="admin-section-head">
          <div>
            <p className="admin-section-title">Mevcut haberler</p>
            <p className="admin-section-subtitle">
              Haberler sayfasında görünen kayıtları buradan düzenleyin.
            </p>
          </div>
          <span className="admin-count-pill">{items.length} kayıt</span>
        </div>

        <div className="admin-list">
          {items.length === 0 ? (
            <div className="admin-empty-card">
              <strong>Henüz haber yok.</strong>
              <span>Yukarıdaki formla ilk haberinizi ekleyin.</span>
            </div>
          ) : (
            items.map((item) =>
              editingId === item.id ? (
                <NewsForm
                  key={item.id}
                  lang={lang}
                  editing={item}
                  onDone={() => setEditingId(null)}
                />
              ) : (
                <article key={item.id} className="admin-card admin-card--article">
                  <div className="admin-card__media">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt=""
                        className="admin-card__thumb"
                      />
                    ) : (
                      <div className="admin-card__placeholder">EJS</div>
                    )}
                  </div>

                  <div className="admin-card__body">
                    <h3 className="admin-card__title">{item.title}</h3>
                    {item.tag ? (
                      <p className="admin-card__muted">#{item.tag}</p>
                    ) : null}
                    <p className="admin-card__excerpt">{item.excerpt}</p>
                    <div className="admin-card__meta">
                      <span
                        className={
                          "admin-badge " +
                          (item.published
                            ? "admin-badge--success"
                            : "admin-badge--draft")
                        }
                      >
                        {item.published ? "Yayında" : "Taslak"}
                      </span>
                      <span>Sıra: {item.sort_order}</span>
                    </div>
                  </div>

                  <div className="admin-card__actions">
                    <button
                      type="button"
                      className="admin-button--ghost"
                      onClick={() => setEditingId(item.id)}
                    >
                      Düzenle
                    </button>
                    <form
                      action={deleteNews}
                      onSubmit={(e) => {
                        if (!confirm("Bu haber silinsin mi?"))
                          e.preventDefault();
                      }}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button className="admin-button--danger" type="submit">
                        Sil
                      </button>
                    </form>
                  </div>
                </article>
              )
            )
          )}
        </div>
      </section>
    </div>
  );
}
