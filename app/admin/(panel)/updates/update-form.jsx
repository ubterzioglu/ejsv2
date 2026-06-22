"use client";

import { useActionState, useEffect, useRef } from "react";
import { createUpdate, updateUpdate } from "./actions";

const initialState = { error: null, ok: false };

/**
 * @param {{ lang: string, editing?: object|null, onDone?: () => void }} props
 */
export function UpdateForm({ lang, editing = null, onDone }) {
  const isEdit = Boolean(editing);
  const action = isEdit ? updateUpdate : createUpdate;
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) {
      if (!isEdit) formRef.current?.reset();
      onDone?.();
    }
  }, [state.ok, isEdit, onDone]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={"admin-form" + (isEdit ? "" : " admin-form--sticky")}
      encType="multipart/form-data"
    >
      <div className="admin-form__header">
        <p className="admin-form__title">
          {isEdit ? "Makaleyi düzenle" : "Yeni makale"}
        </p>
        <p className="admin-form__hint">
          Başlık, özet, içerik ve kapak görselini yönetin.
        </p>
      </div>

      {isEdit ? (
        <input type="hidden" name="id" defaultValue={editing.id} />
      ) : null}
      <input type="hidden" name="lang" value={lang} readOnly />
      <input
        type="hidden"
        name="existing_image_url"
        defaultValue={editing?.image_url ?? ""}
      />

      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="title">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            className="admin-input"
            required
            defaultValue={editing?.title ?? ""}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="excerpt">
            Özet
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="admin-textarea"
            required
            defaultValue={editing?.excerpt ?? ""}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="body">
            İçerik (yazı)
          </label>
          <textarea
            id="body"
            name="body"
            className="admin-textarea admin-textarea--large"
            defaultValue={editing?.body ?? ""}
          />
        </div>
      </div>

      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="image">
            Fotoğraf
          </label>
          {editing?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={editing.image_url}
              alt=""
              className="admin-card__thumb"
            />
          ) : null}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="admin-input"
          />
          <span className="admin-field-help">
            JPEG / PNG / WebP / GIF, en fazla 5 MB.
            {isEdit ? " Boş bırakılırsa mevcut görsel korunur." : ""}
          </span>
        </div>

        <div className="admin-form__row admin-form__row--inline">
          <div className="admin-form__row">
            <label className="admin-label" htmlFor="sort_order">
              Sıra
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              className="admin-input admin-input--small"
              defaultValue={editing?.sort_order ?? 0}
            />
          </div>
          <label className="admin-toggle">
            <input
              type="checkbox"
              name="published"
              defaultChecked={editing ? editing.published : true}
            />
            Yayında
          </label>
        </div>
      </div>

      {state.error ? <p className="admin-alert">{state.error}</p> : null}

      <div className="admin-form__actions">
        <button type="submit" className="admin-button" disabled={pending}>
          {pending ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Ekle"}
        </button>
        {isEdit ? (
          <button
            type="button"
            className="admin-button--ghost"
            onClick={onDone}
          >
            İptal
          </button>
        ) : null}
      </div>
    </form>
  );
}
