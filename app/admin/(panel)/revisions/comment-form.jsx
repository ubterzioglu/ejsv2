"use client";

import { useActionState, useEffect, useRef } from "react";
import { addRevisionComment } from "./actions";

const initialState = { error: null, ok: false };

/**
 * Bir revizyon talebine admin ic notu ekleme formu.
 * @param {{ revisionId: string }} props
 */
export function CommentForm({ revisionId }) {
  const [state, formAction, pending] = useActionState(
    addRevisionComment,
    initialState
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="admin-comment-form">
      <input type="hidden" name="revision_id" value={revisionId} />
      <textarea
        name="body"
        className="admin-textarea admin-textarea--small"
        placeholder="Not / yorum ekleyin..."
        required
      />
      {state.error ? <p className="admin-alert">{state.error}</p> : null}
      <div className="admin-form__actions">
        <button
          type="submit"
          className="admin-button--ghost"
          disabled={pending}
        >
          {pending ? "Ekleniyor..." : "Yorum ekle"}
        </button>
      </div>
    </form>
  );
}
