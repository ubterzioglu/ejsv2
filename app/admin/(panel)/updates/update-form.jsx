"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createUpdate, updateUpdate, translateArticleFields } from "./actions";

const initialState = { error: null, ok: false };
const initialTranslateState = { error: null, ok: false, translations: null };

/**
 * @param {{ lang: string, editing?: object|null, onDone?: () => void }} props
 */
export function UpdateForm({ lang, editing = null, onDone }) {
  const isEdit = Boolean(editing);
  const action = isEdit ? updateUpdate : createUpdate;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [translateState, translateAction, translating] = useActionState(
    translateArticleFields,
    initialTranslateState
  );
  const formRef = useRef(null);

  // TR alanlari
  const [titleTr, setTitleTr] = useState(editing?.title ?? "");
  const [excerptTr, setExcerptTr] = useState(editing?.excerpt ?? "");
  const [bodyTr, setBodyTr] = useState(editing?.body ?? "");

  // EN alanlari
  const [titleEn, setTitleEn] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [bodyEn, setBodyEn] = useState("");

  // DE alanlari
  const [titleDe, setTitleDe] = useState("");
  const [excerptDe, setExcerptDe] = useState("");
  const [bodyDe, setBodyDe] = useState("");

  // BS alanlari
  const [titleBs, setTitleBs] = useState("");
  const [excerptBs, setExcerptBs] = useState("");
  const [bodyBs, setBodyBs] = useState("");

  // DeepL sonucu degistiginde render sirasinda state'i guncelle
  // (React'in onerdigi "render sirasinda onceki degeri izle" deseni; effect kullanmaz).
  const [seenTranslations, setSeenTranslations] = useState(null);
  if (
    translateState.ok &&
    translateState.translations &&
    translateState.translations !== seenTranslations
  ) {
    setSeenTranslations(translateState.translations);
    const { en, de, bs } = translateState.translations;
    if (en) {
      if (typeof en.title === "string") setTitleEn(en.title);
      if (typeof en.excerpt === "string") setExcerptEn(en.excerpt);
      if (typeof en.body === "string") setBodyEn(en.body);
    }
    if (de) {
      if (typeof de.title === "string") setTitleDe(de.title);
      if (typeof de.excerpt === "string") setExcerptDe(de.excerpt);
      if (typeof de.body === "string") setBodyDe(de.body);
    }
    if (bs) {
      if (typeof bs.title === "string") setTitleBs(bs.title);
      if (typeof bs.excerpt === "string") setExcerptBs(bs.excerpt);
      if (typeof bs.body === "string") setBodyBs(bs.body);
    }
  }

  // Kaydetme basarili oldugunda yeni kayit formunu temizle (render sirasinda).
  const [handledOk, setHandledOk] = useState(false);
  if (state.ok && !handledOk) {
    setHandledOk(true);
    if (!isEdit) {
      setTitleTr(""); setExcerptTr(""); setBodyTr("");
      setTitleEn(""); setExcerptEn(""); setBodyEn("");
      setTitleDe(""); setExcerptDe(""); setBodyDe("");
      setTitleBs(""); setExcerptBs(""); setBodyBs("");
    }
  }

  // onDone dis sistem (parent) guncellemesi oldugu icin effect'te kalir.
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
      className="admin-form"
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
      {/* Edit modunda lang hidden input korunur; create modunda alan adlari lang_suffix icerir */}
      {isEdit ? (
        <input type="hidden" name="lang" value={lang} readOnly />
      ) : null}
      <input
        type="hidden"
        name="existing_image_url"
        defaultValue={editing?.image_url ?? ""}
      />

      {/* ── Türkçe alanlar ── */}
      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor={isEdit ? "title" : "title_tr"}>
            Başlık — Türkçe
          </label>
          <input
            id={isEdit ? "title" : "title_tr"}
            name={isEdit ? "title" : "title_tr"}
            className="admin-input"
            required
            value={titleTr}
            onChange={(e) => setTitleTr(e.target.value)}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor={isEdit ? "excerpt" : "excerpt_tr"}>
            Özet — Türkçe
          </label>
          <textarea
            id={isEdit ? "excerpt" : "excerpt_tr"}
            name={isEdit ? "excerpt" : "excerpt_tr"}
            className="admin-textarea"
            required
            value={excerptTr}
            onChange={(e) => setExcerptTr(e.target.value)}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor={isEdit ? "body" : "body_tr"}>
            İçerik (yazı) — Türkçe
          </label>
          <textarea
            id={isEdit ? "body" : "body_tr"}
            name={isEdit ? "body" : "body_tr"}
            className="admin-textarea admin-textarea--large"
            value={bodyTr}
            onChange={(e) => setBodyTr(e.target.value)}
          />
        </div>

        {/* Çeviri butonu — yalnızca create modunda (4 dil birden yazılır) */}
        {isEdit ? null : (
          <div className="admin-form__row">
            <button
              type="submit"
              formAction={translateAction}
              className="admin-button--ghost"
              disabled={translating || !titleTr.trim() || !excerptTr.trim()}
            >
              {translating ? "Çevriliyor..." : "Otomatik çevir (DeepL → EN/DE/BS)"}
            </button>
            {translateState.error ? (
              <p className="admin-alert">{translateState.error}</p>
            ) : null}
          </div>
        )}
      </div>

      {/* ── Çoklu dil alanları (yalnızca create modunda) ── */}
      {isEdit ? null : (
        <>
          {/* İngilizce */}
          <div className="admin-form__group">
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="title_en">
                Başlık — İngilizce
              </label>
              <input
                id="title_en"
                name="title_en"
                className="admin-input"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="excerpt_en">
                Özet — İngilizce
              </label>
              <textarea
                id="excerpt_en"
                name="excerpt_en"
                className="admin-textarea"
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="body_en">
                İçerik (yazı) — İngilizce
              </label>
              <textarea
                id="body_en"
                name="body_en"
                className="admin-textarea admin-textarea--large"
                value={bodyEn}
                onChange={(e) => setBodyEn(e.target.value)}
              />
            </div>
          </div>

          {/* Almanca */}
          <div className="admin-form__group">
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="title_de">
                Başlık — Almanca
              </label>
              <input
                id="title_de"
                name="title_de"
                className="admin-input"
                value={titleDe}
                onChange={(e) => setTitleDe(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="excerpt_de">
                Özet — Almanca
              </label>
              <textarea
                id="excerpt_de"
                name="excerpt_de"
                className="admin-textarea"
                value={excerptDe}
                onChange={(e) => setExcerptDe(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="body_de">
                İçerik (yazı) — Almanca
              </label>
              <textarea
                id="body_de"
                name="body_de"
                className="admin-textarea admin-textarea--large"
                value={bodyDe}
                onChange={(e) => setBodyDe(e.target.value)}
              />
            </div>
          </div>

          {/* Boşnakça */}
          <div className="admin-form__group">
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="title_bs">
                Başlık — Boşnakça
              </label>
              <input
                id="title_bs"
                name="title_bs"
                className="admin-input"
                value={titleBs}
                onChange={(e) => setTitleBs(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="excerpt_bs">
                Özet — Boşnakça
              </label>
              <textarea
                id="excerpt_bs"
                name="excerpt_bs"
                className="admin-textarea"
                value={excerptBs}
                onChange={(e) => setExcerptBs(e.target.value)}
              />
            </div>

            <div className="admin-form__row">
              <label className="admin-label" htmlFor="body_bs">
                İçerik (yazı) — Boşnakça
              </label>
              <textarea
                id="body_bs"
                name="body_bs"
                className="admin-textarea admin-textarea--large"
                value={bodyBs}
                onChange={(e) => setBodyBs(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Görsel / meta ── */}
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
