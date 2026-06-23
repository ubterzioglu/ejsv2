"use client";

import { useState } from "react";
import { HeroForm } from "./hero-form";
import { AdminAccordion } from "../components/admin-accordion";
import { deleteSlide } from "./actions";

/**
 * @param {{ items: Array<object> }} props
 */
export function HeroManager({ items }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="admin-content-layout">
      <aside className="admin-content-layout__side">
        <AdminAccordion
          title="Yeni slayt ekle"
          hint="Video, metin (4 dil), sıra ve yayın durumu"
        >
          <HeroForm />
        </AdminAccordion>
      </aside>

      <section className="admin-content-layout__main">
        <div className="admin-section-head">
          <div>
            <p className="admin-section-title">Mevcut slaytlar</p>
            <p className="admin-section-subtitle">
              Ana sayfa hero video şovundaki slaytları buradan düzenleyin.
            </p>
          </div>
          <span className="admin-count-pill">{items.length} slayt</span>
        </div>

        <div className="admin-list">
          {items.length === 0 ? (
            <div className="admin-empty-card">
              <strong>Henüz slayt yok.</strong>
              <span>
                Yukarıdaki formla ilk slaytı ekleyin. Tablo boşken site
                varsayılan videoları gösterir.
              </span>
            </div>
          ) : (
            items.map((item) =>
              editingId === item.id ? (
                <HeroForm
                  key={item.id}
                  editing={item}
                  onDone={() => setEditingId(null)}
                />
              ) : (
                <article key={item.id} className="admin-card admin-card--article">
                  <div className="admin-card__media">
                    {item.video_url ? (
                      <video
                        src={item.video_url}
                        className="admin-card__thumb"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div className="admin-card__placeholder">EJS</div>
                    )}
                  </div>

                  <div className="admin-card__body">
                    <h3 className="admin-card__title">{item.title}</h3>
                    <p className="admin-card__excerpt">{item.caption_tr}</p>
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
                      action={deleteSlide}
                      onSubmit={(e) => {
                        if (!confirm("Bu slayt silinsin mi?"))
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
