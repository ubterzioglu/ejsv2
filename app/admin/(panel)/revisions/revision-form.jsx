"use client";

import { useActionState, useEffect, useRef } from "react";
import { createRevision } from "./actions";

const initialState = { error: null, ok: false };

export function RevisionForm() {
  const [state, formAction, pending] = useActionState(
    createRevision,
    initialState
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="admin-form"
    >
      <div className="admin-form__header">
        <p className="admin-form__title">Yeni revizyon isteği</p>
        <p className="admin-form__hint">
          Talebi panele kaydedin ve durumunu takip edin.
        </p>
      </div>

      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="name">
            İsim (opsiyonel)
          </label>
          <input id="name" name="name" className="admin-input" />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="email">
            E-posta (opsiyonel)
          </label>
          <input id="email" name="email" type="email" className="admin-input" />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="message">
            İstek / Mesaj
          </label>
          <textarea
            id="message"
            name="message"
            className="admin-textarea"
            required
          />
        </div>
      </div>

      {state.error ? <p className="admin-alert">{state.error}</p> : null}

      <div className="admin-form__actions">
        <button type="submit" className="admin-button" disabled={pending}>
          {pending ? "Kaydediliyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
}
