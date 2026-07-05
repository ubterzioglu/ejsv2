"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createNews, updateNews, translateNewsFields } from "./actions";

const initialState = { error: null, ok: false };
const initialTranslateState = { error: null, ok: false, translations: null };

/**
 * @param {{ lang: string, editing?: object|null, onDone?: () => void }} props
 */
export function NewsForm({ lang, editing = null, onDone }) {
  const isEdit = Boolean(editing);
  const action = isEdit ? updateNews : createNews;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [translateState, translateAction, translating] = useActionState(
    translateNewsFields,
    initialTranslateState
  );
  const formRef = useRef(null);

  // Create modunda: TR alanlari + EN/DE/BS alanlari kontrollu state.
  // DeepL sonucu EN/DE/BS'ye yazilir, admin duzeltebilir.
  const [titleTr, setTitleTr] = useState(editing?.title ?? "");
  const [excerptTr, setExcerptTr] = useState(editing?.excerpt ?? "");
  const [bodyTr, setBodyTr] = useState(editing?.body ?? "");
  const [tagTr, setTagTr] = useState(editing?.tag ?? "");

  const [titleEn, setTitleEn] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [tagEn, setTagEn] = useState("");

  const [titleDe, setTitleDe] = useState("");
  const [excerptDe, setExcerptDe] = useState("");
  const [bodyDe, setBodyDe] = useState("");
  const [tagDe, setTagDe] = useState("");

  const [titleBs, setTitleBs] = useState("");
  const [excerptBs, setExcerptBs] = useState("");
  const [bodyBs, setBodyBs] = useState("");
  const [tagBs, setTagBs] = useState("");

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
      if (typeof en.tag === "string") setTagEn(en.tag);
    }
    if (de) {
      if (typeof de.title === "string") setTitleDe(de.title);
      if (typeof de.excerpt === "string") setExcerptDe(de.excerpt);
      if (typeof de.body === "string") setBodyDe(de.body);
      if (typeof de.tag === "string") setTagDe(de.tag);
    }
    if (bs) {
      if (typeof bs.title === "string") setTitleBs(bs.title);
      if (typeof bs.excerpt === "string") setExcerptBs(bs.excerpt);
      if (typeof bs.body === "string") setBodyBs(bs.body);
      if (typeof bs.tag === "string") setTagBs(bs.tag);
    }
  }

  // Kaydetme basarili oldugunda yeni kayit formunu temizle (render sirasinda).
  const [handledOk, setHandledOk] = useState(false);
  if (state.ok && !handledOk) {
    setHandledOk(true);
    if (!isEdit) {
      setTitleTr(""); setExcerptTr(""); setBodyTr(""); setTagTr("");
      setTitleEn(""); setExcerptEn(""); setBodyEn(""); setTagEn("");
      setTitleDe(""); setExcerptDe(""); setBodyDe(""); setTagDe("");
      setTitleBs(""); setExcerptBs(""); setBodyBs(""); setTagBs("");
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
          {isEdit ? "Haberi düzenle" : "Yeni haber"}
        </p>
        <p className="admin-form__hint">
          Başlık, etiket, özet, içerik ve kapak görselini yönetin.
        </p>
      </div>

      {isEdit ? (
        <input type="hidden" name="id" defaultValue={editing.id} />
      ) : null}
      {/* Edit modunda orijinal lang gizli input, create modunda yok (lang action'da kullanilmaz) */}
      {isEdit ? (
        <input type="hidden" name="lang" value={lang} readOnly />
      ) : null}
      <input
        type="hidden"
        name="existing_image_url"
        defaultValue={editing?.image_url ?? ""}
      />

      {/* ---- TÜRKÇE alanlar ---- */}
      <div className="admin-form__group">
        {isEdit ? null : (
          <p className="admin-label" style={{ fontWeight: 700, marginBottom: 4 }}>
            Türkçe
          </p>
        )}

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="news-title-tr">
            Başlık{isEdit ? "" : " (TR)"}
          </label>
          {isEdit ? (
            <input
              id="news-title-tr"
              name="title"
              className="admin-input"
              required
              defaultValue={editing?.title ?? ""}
            />
          ) : (
            <input
              id="news-title-tr"
              name="title_tr"
              className="admin-input"
              required
              value={titleTr}
              onChange={(e) => setTitleTr(e.target.value)}
            />
          )}
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="news-tag-tr">
            Etiket{isEdit ? "" : " (TR)"}
          </label>
          {isEdit ? (
            <input
              id="news-tag-tr"
              name="tag"
              className="admin-input"
              placeholder="örn. Duyuru, Etkinlik, Basın"
              defaultValue={editing?.tag ?? ""}
            />
          ) : (
            <input
              id="news-tag-tr"
              name="tag_tr"
              className="admin-input"
              placeholder="örn. Duyuru, Etkinlik, Basın"
              value={tagTr}
              onChange={(e) => setTagTr(e.target.value)}
            />
          )}
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="news-excerpt-tr">
            Özet{isEdit ? "" : " (TR)"}
          </label>
          {isEdit ? (
            <textarea
              id="news-excerpt-tr"
              name="excerpt"
              className="admin-textarea"
              required
              defaultValue={editing?.excerpt ?? ""}
            />
          ) : (
            <textarea
              id="news-excerpt-tr"
              name="excerpt_tr"
              className="admin-textarea"
              required
              value={excerptTr}
              onChange={(e) => setExcerptTr(e.target.value)}
            />
          )}
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="news-body-tr">
            İçerik{isEdit ? "" : " (TR)"}
          </label>
          {isEdit ? (
            <textarea
              id="news-body-tr"
              name="body"
              className="admin-textarea admin-textarea--large"
              defaultValue={editing?.body ?? ""}
            />
          ) : (
            <textarea
              id="news-body-tr"
              name="body_tr"
              className="admin-textarea admin-textarea--large"
              value={bodyTr}
              onChange={(e) => setBodyTr(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* ---- DeepL çeviri butonu (sadece create modunda) ---- */}
      {isEdit ? null : (
        <div className="admin-form__group">
          <div className="admin-form__row">
            <button
              type="submit"
              formAction={translateAction}
              className="admin-button--ghost"
              disabled={translating || !titleTr.trim()}
            >
              {translating ? "Çevriliyor..." : "Otomatik çevir (DeepL → EN/DE/BS)"}
            </button>
            {translateState.error ? (
              <p className="admin-alert">{translateState.error}</p>
            ) : null}
          </div>
        </div>
      )}

      {/* ---- EN / DE / BS alanlar (sadece create modunda) ---- */}
      {isEdit ? null : (
        <>
          {/* İngilizce */}
          <div className="admin-form__group">
            <p className="admin-label" style={{ fontWeight: 700, marginBottom: 4 }}>
              İngilizce
            </p>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-title-en">Başlık (EN)</label>
              <input
                id="news-title-en"
                name="title_en"
                className="admin-input"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-tag-en">Etiket (EN)</label>
              <input
                id="news-tag-en"
                name="tag_en"
                className="admin-input"
                value={tagEn}
                onChange={(e) => setTagEn(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-excerpt-en">Özet (EN)</label>
              <textarea
                id="news-excerpt-en"
                name="excerpt_en"
                className="admin-textarea"
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-body-en">İçerik (EN)</label>
              <textarea
                id="news-body-en"
                name="body_en"
                className="admin-textarea admin-textarea--large"
                value={bodyEn}
                onChange={(e) => setBodyEn(e.target.value)}
              />
            </div>
          </div>

          {/* Almanca */}
          <div className="admin-form__group">
            <p className="admin-label" style={{ fontWeight: 700, marginBottom: 4 }}>
              Almanca
            </p>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-title-de">Başlık (DE)</label>
              <input
                id="news-title-de"
                name="title_de"
                className="admin-input"
                value={titleDe}
                onChange={(e) => setTitleDe(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-tag-de">Etiket (DE)</label>
              <input
                id="news-tag-de"
                name="tag_de"
                className="admin-input"
                value={tagDe}
                onChange={(e) => setTagDe(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-excerpt-de">Özet (DE)</label>
              <textarea
                id="news-excerpt-de"
                name="excerpt_de"
                className="admin-textarea"
                value={excerptDe}
                onChange={(e) => setExcerptDe(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-body-de">İçerik (DE)</label>
              <textarea
                id="news-body-de"
                name="body_de"
                className="admin-textarea admin-textarea--large"
                value={bodyDe}
                onChange={(e) => setBodyDe(e.target.value)}
              />
            </div>
          </div>

          {/* Boşnakça */}
          <div className="admin-form__group">
            <p className="admin-label" style={{ fontWeight: 700, marginBottom: 4 }}>
              Boşnakça
            </p>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-title-bs">Başlık (BS)</label>
              <input
                id="news-title-bs"
                name="title_bs"
                className="admin-input"
                value={titleBs}
                onChange={(e) => setTitleBs(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-tag-bs">Etiket (BS)</label>
              <input
                id="news-tag-bs"
                name="tag_bs"
                className="admin-input"
                value={tagBs}
                onChange={(e) => setTagBs(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-excerpt-bs">Özet (BS)</label>
              <textarea
                id="news-excerpt-bs"
                name="excerpt_bs"
                className="admin-textarea"
                value={excerptBs}
                onChange={(e) => setExcerptBs(e.target.value)}
              />
            </div>
            <div className="admin-form__row">
              <label className="admin-label" htmlFor="news-body-bs">İçerik (BS)</label>
              <textarea
                id="news-body-bs"
                name="body_bs"
                className="admin-textarea admin-textarea--large"
                value={bodyBs}
                onChange={(e) => setBodyBs(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* ---- Görsel ve meta ---- */}
      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="news-image">
            Fotoğraf
          </label>
          {editing?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={editing.image_url} alt="" className="admin-card__thumb" />
          ) : null}
          <input
            id="news-image"
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
            <label className="admin-label" htmlFor="news-sort">
              Sıra
            </label>
            <input
              id="news-sort"
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
          <button type="button" className="admin-button--ghost" onClick={onDone}>
            İptal
          </button>
        ) : null}
      </div>
    </form>
  );
}
