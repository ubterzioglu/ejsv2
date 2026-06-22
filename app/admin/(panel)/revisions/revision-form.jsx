"use client";

import { useActionState, useEffect, useRef } from "react";
import { createRevision } from "./actions";

const initialState = { error: null, ok: false };

export function RevisionForm() {
  const [state, formAction, pending] = useActionState(createRevision, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="admin-form">
      <p className="admin-section-title">Yeni revizyon istegi</p>

      <div className="admin-form__row">
        <label className="admin-label" htmlFor="name">Isim (opsiyonel)</label>
        <input id="name" name="name" className="admin-input" />
      </div>

      <div className="admin-form__row">
        <label className="admin-label" htmlFor="email">E-posta (opsiyonel)</label>
        <input id="email" name="email" type="email" className="admin-input" />
      </div>

      <div className="admin-form__row">
        <label className="admin-label" htmlFor="message">Istek / Mesaj</label>
        <textarea id="message" name="message" className="admin-textarea" required />
      </div>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <button type="submit" className="admin-button" disabled={pending}>
        {pending ? "Kaydediliyor..." : "Ekle"}
      </button>
    </form>
  );
}
