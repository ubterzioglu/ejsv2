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
    <form ref={formRef} action={formAction} className="admin-form">
      <p className="admin-section-title">
        {isEdit ? "Yaziyi duzenle" : "Yeni yazi ekle"}
      </p>

      {isEdit ? <input type="hidden" name="id" defaultValue={editing.id} /> : null}
      <input type="hidden" name="lang" value={lang} readOnly />

      <div className="admin-form__row">
        <label className="admin-label" htmlFor="title">Baslik</label>
        <input
          id="title"
          name="title"
          className="admin-input"
          required
          defaultValue={editing?.title ?? ""}
        />
      </div>

      <div className="admin-form__row">
        <label className="admin-label" htmlFor="excerpt">Ozet</label>
        <textarea
          id="excerpt"
          name="excerpt"
          className="admin-textarea"
          required
          defaultValue={editing?.excerpt ?? ""}
        />
      </div>

      <div className="admin-form__row admin-form__row--inline">
        <label className="admin-label" htmlFor="sort_order">
          Sira
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            className="admin-input"
            style={{ width: 90, marginLeft: 8 }}
            defaultValue={editing?.sort_order ?? 0}
          />
        </label>
        <label className="admin-checkbox">
          <input
            type="checkbox"
            name="published"
            defaultChecked={editing ? editing.published : true}
          />
          Yayinda
        </label>
      </div>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" className="admin-button" disabled={pending}>
          {pending ? "Kaydediliyor..." : isEdit ? "Guncelle" : "Ekle"}
        </button>
        {isEdit ? (
          <button type="button" className="admin-button--ghost" onClick={onDone}>
            Iptal
          </button>
        ) : null}
      </div>
    </form>
  );
}
