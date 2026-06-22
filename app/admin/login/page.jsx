"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import "../admin.css";

const initialState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="admin-login">
      <div className="admin-login__shell">
        <section className="admin-login__intro">
          <div className="admin-brand__mark admin-brand__mark--large">EJS</div>
          <span className="admin-login__badge">Yönetim Paneli</span>
          <h1 className="admin-login__title">EJS Consulting</h1>
          <p className="admin-login__hint">
            İçerikleri, güncellemeleri ve revizyon taleplerini güvenli şekilde
            yönetin.
          </p>
        </section>

        <form className="admin-login__card" action={formAction}>
          <label className="admin-login__label" htmlFor="password">
            Şifre
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

          <button
            type="submit"
            className="admin-login__button"
            disabled={pending}
          >
            {pending ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
