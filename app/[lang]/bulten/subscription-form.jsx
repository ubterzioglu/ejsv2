"use client";

import { useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import { createSubscription } from "./actions";

const initialState = { ok: false, error: null };

/**
 * @param {{ lang: string, strings: object, backHref: string }} props
 */
export function SubscriptionForm({ lang, strings: t, backHref }) {
  const [state, formAction, pending] = useActionState(
    createSubscription,
    initialState,
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  const errorMessage = state.error
    ? t.errors[state.error] ?? t.errors.server
    : null;

  return (
    <form ref={formRef} action={formAction} className="subscription-form">
      <input type="hidden" name="lang" value={lang} readOnly />

      {/* Abonelik tercihleri: 3 kart (gorsel + aciklama + secim kutusu) */}
      <fieldset className="subscription-topics">
        <legend className="subscription-topics__legend">{t.topicsTitle}</legend>
        <div className="subscription-topics__grid">
          {t.topics.map((topic) => (
            <label key={topic.key} className="subscription-topic">
              <span className="subscription-topic__media">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  className="subscription-topic__image"
                  width={320}
                  height={200}
                  sizes="(max-width: 760px) 100vw, 30vw"
                />
              </span>
              <span className="subscription-topic__body">
                <span className="subscription-topic__title">{topic.title}</span>
                <span className="subscription-topic__text">{topic.text}</span>
                <span className="subscription-topic__check">
                  <input type="checkbox" name="topics" value={topic.key} />
                  <span>{topic.title}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Kisisel bilgiler */}
      <div className="subscription-fields">
        <label className="subscription-field">
          <span>{t.fields.salutation}*</span>
          <select name="salutation" defaultValue="" required>
            <option value="" disabled>
              {t.fields.salutationPlaceholder}
            </option>
            {t.fields.salutationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label className="subscription-field">
          <span>{t.fields.firstName}*</span>
          <input type="text" name="first_name" required />
        </label>

        <label className="subscription-field">
          <span>{t.fields.lastName}*</span>
          <input type="text" name="last_name" required />
        </label>

        <label className="subscription-field">
          <span>{t.fields.email}*</span>
          <input type="email" name="email" required />
        </label>

        <label className="subscription-field">
          <span>{t.fields.company}*</span>
          <input type="text" name="company" required />
        </label>

        <label className="subscription-field">
          <span>{t.fields.jobTitle}*</span>
          <input type="text" name="job_title" required />
        </label>

        <label className="subscription-field">
          <span>{t.fields.country}</span>
          <select name="country" defaultValue="">
            <option value="" disabled>
              {t.fields.countryPlaceholder}
            </option>
            {t.fields.countryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="subscription-consent">
        <input type="checkbox" name="consent" />
        <span>{t.consent}</span>
      </label>

      {state.ok ? <p className="contact-success">{t.success}</p> : null}
      {errorMessage ? <p className="contact-error">{errorMessage}</p> : null}

      <div className="subscription-actions">
        <a className="subscription-back" href={backHref}>
          {t.back}
        </a>
        <button type="submit" className="submit-button" disabled={pending}>
          {pending ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
