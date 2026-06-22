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
    <>
      {/* Once ekleme formu */}
      <UpdateForm lang={lang} />

      <p className="admin-section-title" style={{ marginTop: 28 }}>
        Mevcut makaleler
      </p>

      <div className="admin-list">
        {items.length === 0 ? (
          <p className="admin-empty">Henüz makale yok.</p>
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
              <article key={item.id} className="admin-card">
                <div className="admin-card__head">
                  <div style={{ display: "flex", gap: 14, minWidth: 0 }}>
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt=""
                        className="admin-card__thumb"
                      />
                    ) : null}
                    <div style={{ minWidth: 0 }}>
                      <h3 className="admin-card__title">{item.title}</h3>
                      <p className="admin-card__excerpt">{item.excerpt}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      className="admin-button--ghost"
                      onClick={() => setEditingId(item.id)}
                    >
                      Düzenle
                    </button>
                    <form action={deleteUpdate}>
                      <input type="hidden" name="id" value={item.id} />
                      <button className="admin-button--danger" type="submit">
                        Sil
                      </button>
                    </form>
                  </div>
                </div>
                <p className="admin-card__meta">
                  Sıra: {item.sort_order} ·{" "}
                  {item.published ? "Yayında" : "Taslak"}
                </p>
              </article>
            )
          )
        )}
      </div>
    </>
  );
}
