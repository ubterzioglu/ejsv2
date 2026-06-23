"use client";

import { useState } from "react";
import { UpdateForm } from "./update-form";
import { deleteUpdate } from "./actions";

/**
 * @param {{ lang: string, items: Array<object> }} props
 */
export function UpdatesManager({ lang, items }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="admin-content-layout">
      <aside className="admin-content-layout__side">
        <UpdateForm lang={lang} />
      </aside>

      <section className="admin-content-layout__main">
        <div className="admin-section-head">
          <div>
            <p className="admin-section-title">Mevcut makaleler</p>
            <p className="admin-section-subtitle">
              Sitede görünen yazıları buradan düzenleyin.
            </p>
          </div>
          <span className="admin-count-pill">{items.length} kayıt</span>
        </div>

        <div className="admin-list">
          {items.length === 0 ? (
            <div className="admin-empty-card">
              <strong>Henüz makale yok.</strong>
              <span>Yukarıdaki formla ilk yazınızı ekleyin.</span>
            </div>
          ) : (
            items.map((item) =>
              editingId === item.id ? (
                <UpdateForm
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
                      action={deleteUpdate}
                      onSubmit={(e) => {
                        if (!confirm("Bu makale silinsin mi?"))
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
