"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import "../admin.css";

const initialState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="admin-login">
      <form className="admin-login__card" action={formAction}>
        <h1 className="admin-login__title">EJS Admin</h1>
        <p className="admin-login__hint">Devam etmek icin sifrenizi girin.</p>

        <label className="admin-login__label" htmlFor="password">
          Sifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-login__input"
        />

        {state?.error ? (
          <p className="admin-login__error">{state.error}</p>
        ) : null}

        <button type="submit" className="admin-login__button" disabled={pending}>
          {pending ? "Giris yapiliyor..." : "Giris yap"}
        </button>
      </form>
    </div>
  );
}
