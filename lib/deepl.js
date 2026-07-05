import "server-only";

/**
 * DeepL ceviri yardimcisi (server-only).
 * Ham metni TR kaynagindan hedef dillere cevirir.
 * DEEPL_API_KEY .env.local icinde tanimli olmali.
 *
 * Ucretsiz anahtarlar ":fx" ile biter ve api-free.deepl.com'a gider;
 * pro anahtarlar api.deepl.com'a gider.
 */

// Ic dil kodlarimiz -> DeepL hedef dil kodlari
const DEEPL_TARGET = {
  en: "EN-US",
  de: "DE",
  bs: "BS",
  tr: "TR",
};

function deeplHost(apiKey) {
  return apiKey.endsWith(":fx")
    ? "https://api-free.deepl.com"
    : "https://api.deepl.com";
}

/**
 * Tek bir metni hedef dile cevirir.
 * @param {string} text Cevrilecek metin (bos ise aynen doner)
 * @param {string} targetLang Ic dil kodu: "en" | "de" | "bs"
 * @param {string} [sourceLang] Ic dil kodu (varsayilan "tr")
 * @returns {Promise<string>} Cevrilen metin
 */
export async function translateText(text, targetLang, sourceLang = "tr") {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPL_API_KEY tanimli degil (.env.local).");
  }

  const trimmed = (text ?? "").trim();
  if (!trimmed) return "";

  const target = DEEPL_TARGET[targetLang];
  if (!target) {
    throw new Error(`Desteklenmeyen hedef dil: ${targetLang}`);
  }
  const source = DEEPL_TARGET[sourceLang] ?? "TR";

  const params = new URLSearchParams();
  params.append("text", trimmed);
  params.append("target_lang", target);
  // Kaynak dili belirtmek kaliteyi artirir ve yanlis algilamayi onler.
  params.append("source_lang", source.split("-")[0]);

  const res = await fetch(`${deeplHost(apiKey)}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepL hatasi (${res.status}): ${detail || res.statusText}`);
  }

  const data = await res.json();
  return data?.translations?.[0]?.text ?? "";
}

/**
 * Bir TR metni birden cok hedef dile cevirir.
 * @param {string} text TR kaynak metin
 * @param {string[]} [targets] Ic dil kodlari (varsayilan ["en","de","bs"])
 * @returns {Promise<Record<string,string>>} ornek: { en, de, bs }
 */
export async function translateMany(text, targets = ["en", "de", "bs"]) {
  const entries = await Promise.all(
    targets.map(async (lang) => [lang, await translateText(text, lang, "tr")])
  );
  return Object.fromEntries(entries);
}

/**
 * Birden cok alani (baslik, ozet, icerik vb.) tek bir kaynak dilden
 * birden cok hedef dile cevirir. Makale/Haber gibi cok alanli formlar icin.
 *
 * @param {Record<string,string>} fields Alan adi -> kaynak metin ({ title, excerpt, body })
 * @param {string[]} targets Hedef ic dil kodlari (kaynak dil haric)
 * @param {string} [sourceLang] Kaynak ic dil kodu (varsayilan "tr")
 * @returns {Promise<Record<string, Record<string,string>>>}
 *   ornek: { en: { title, excerpt, body }, de: {...}, bs: {...} }
 */
export async function translateFields(fields, targets, sourceLang = "tr") {
  const fieldNames = Object.keys(fields);

  // Tum (dil, alan) ciftlerini tek seferde paralel cevir.
  const jobs = [];
  for (const lang of targets) {
    for (const name of fieldNames) {
      jobs.push(
        translateText(fields[name] ?? "", lang, sourceLang).then((text) => ({
          lang,
          name,
          text,
        }))
      );
    }
  }

  const results = await Promise.all(jobs);

  const byLang = {};
  for (const lang of targets) byLang[lang] = {};
  for (const { lang, name, text } of results) {
    byLang[lang][name] = text;
  }
  return byLang;
}
