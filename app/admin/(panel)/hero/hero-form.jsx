"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createSlide, updateSlide, translateCaptions } from "./actions";

const initialState = { error: null, ok: false };
const initialTranslateState = { error: null, ok: false, translations: null };

/**
 * @param {{ editing?: object|null, onDone?: () => void }} props
 */
export function HeroForm({ editing = null, onDone }) {
  const isEdit = Boolean(editing);
  const action = isEdit ? updateSlide : createSlide;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [translateState, translateAction, translating] = useActionState(
    translateCaptions,
    initialTranslateState
  );
  const formRef = useRef(null);

  // EN/DE/BS alanlari kontrollu: DeepL sonucu bunlara yazilir, admin duzeltebilir.
  const [captionTr, setCaptionTr] = useState(editing?.caption_tr ?? "");
  const [captionEn, setCaptionEn] = useState(editing?.caption_en ?? "");
  const [captionDe, setCaptionDe] = useState(editing?.caption_de ?? "");
  const [captionBs, setCaptionBs] = useState(editing?.caption_bs ?? "");

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
    if (typeof en === "string") setCaptionEn(en);
    if (typeof de === "string") setCaptionDe(de);
    if (typeof bs === "string") setCaptionBs(bs);
  }

  // Kaydetme basarili oldugunda yeni kayit formunu temizle (render sirasinda).
  const [handledOk, setHandledOk] = useState(false);
  if (state.ok && !handledOk) {
    setHandledOk(true);
    if (!isEdit) {
      setCaptionTr("");
      setCaptionEn("");
      setCaptionDe("");
      setCaptionBs("");
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
      className={"admin-form" + (isEdit ? "" : " admin-form--sticky")}
      encType="multipart/form-data"
    >
      <div className="admin-form__header">
        <p className="admin-form__title">
          {isEdit ? "Slaytı düzenle" : "Yeni slayt"}
        </p>
        <p className="admin-form__hint">
          Video, metin (4 dil), sıra ve yayın durumunu yönetin.
        </p>
      </div>

      {isEdit ? (
        <input type="hidden" name="id" defaultValue={editing.id} />
      ) : null}
      <input
        type="hidden"
        name="existing_video_url"
        defaultValue={editing?.video_url ?? ""}
      />

      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="title">
            Başlık (dahili etiket)
          </label>
          <input
            id="title"
            name="title"
            className="admin-input"
            required
            defaultValue={editing?.title ?? ""}
            placeholder="Örn. Akıllı fabrika otomasyonu"
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="video_url">
            Video URL
          </label>
          <input
            id="video_url"
            name="video_url"
            type="url"
            className="admin-input"
            defaultValue={editing?.video_url ?? ""}
            placeholder="https://videos.pexels.com/..."
          />
          <span className="admin-field-help">
            Royalty-free bir video bağlantısı yapıştırın veya aşağıdan dosya yükleyin.
          </span>
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="video">
            Video dosyası (yükle)
          </label>
          <input
            id="video"
            name="video"
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className="admin-input"
          />
          <span className="admin-field-help">
            MP4 / WebM / MOV, en fazla 200 MB. Dosya yüklenirse URL yerine bu kullanılır.
            {isEdit ? " Boş bırakılırsa mevcut video korunur." : ""}
          </span>
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="credit_url">
            Kaynak (atıf) URL
          </label>
          <input
            id="credit_url"
            name="credit_url"
            type="url"
            className="admin-input"
            defaultValue={editing?.credit_url ?? ""}
            placeholder="https://www.pexels.com/video/..."
          />
        </div>
      </div>

      <div className="admin-form__group">
        <div className="admin-form__row">
          <label className="admin-label" htmlFor="caption_tr">
            Metin — Türkçe
          </label>
          <textarea
            id="caption_tr"
            name="caption_tr"
            className="admin-textarea"
            required
            value={captionTr}
            onChange={(e) => setCaptionTr(e.target.value)}
          />
        </div>

        <div className="admin-form__row">
          <button
            type="submit"
            formAction={translateAction}
            className="admin-button--ghost"
            disabled={translating || !captionTr.trim()}
          >
            {translating ? "Çevriliyor..." : "Otomatik çevir (DeepL → EN/DE/BS)"}
          </button>
          {translateState.error ? (
            <p className="admin-alert">{translateState.error}</p>
          ) : null}
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="caption_en">
            Metin — İngilizce
          </label>
          <textarea
            id="caption_en"
            name="caption_en"
            className="admin-textarea"
            value={captionEn}
            onChange={(e) => setCaptionEn(e.target.value)}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="caption_de">
            Metin — Almanca
          </label>
          <textarea
            id="caption_de"
            name="caption_de"
            className="admin-textarea"
            value={captionDe}
            onChange={(e) => setCaptionDe(e.target.value)}
          />
        </div>

        <div className="admin-form__row">
          <label className="admin-label" htmlFor="caption_bs">
            Metin — Boşnakça
          </label>
          <textarea
            id="caption_bs"
            name="caption_bs"
            className="admin-textarea"
            value={captionBs}
            onChange={(e) => setCaptionBs(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-form__group">
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
