"use client";

import { useState } from "react";
import { UpdateForm } from "./update-form";
import { deleteUpdate } from "./actions";

const LANG_LABELS = { tr: "Turkce", en: "English", de: "Deutsch" };

/**
 * @param {{ lang: string, items: Array<object> }} props
 */
export function UpdatesManager({ lang, items }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <>
      <div className="admin-list">
        {items.length === 0 ? (
          <p className="admin-empty">Bu dilde henuz yazi yok.</p>
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
                  <div>
                    <h3 className="admin-card__title">{item.title}</h3>
                    <p className="admin-card__excerpt">{item.excerpt}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      className="admin-button--ghost"
                      onClick={() => setEditingId(item.id)}
                    >
                      Duzenle
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
                  Sira: {item.sort_order} ·{" "}
                  {item.published ? "Yayinda" : "Taslak"} ·{" "}
                  {LANG_LABELS[item.lang] ?? item.lang}
                </p>
              </article>
            )
          )
        )}
      </div>

      <UpdateForm lang={lang} />
    </>
  );
}
