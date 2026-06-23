// Site icerigini (homepageContent[lang]) aranabilir kayitlara donusturur ve
// basit, bagimsiz (backend'siz) bir metin aramasi saglar. Tum icerik tek bir
// sayfada (SSG) yer aldigi icin sonuclar sayfa ici capalara (#anchor) baglanir.

// Her bolum anahtarinin sayfadaki capa kimligi ile eslesmesi.
const SECTION_ANCHORS = {
  identity: "kimligimiz",
  approach: "yaklasimimiz",
  mission: "misyonumuz",
  methodology: "calismamiz-hakkinda",
  expertise: "uzmanlik-alanlarimiz",
  founder: "kurucumuzun-hikayesi",
  articles: "ogren-ve-gelis",
  references: "referanslar",
  contact: "iletisim",
};

// Bir kaydin metin alanlarini tek bir aranabilir dizeye indirger.
function toHaystack(parts) {
  return parts
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" · ")
    .toLowerCase();
}

// Uzun metni, ilk eslesmenin etrafindan kisa bir parca olarak kirpar.
function makeSnippet(text, query, maxLength = 160) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const lower = text.toLowerCase();
  const matchAt = query ? lower.indexOf(query) : -1;

  if (matchAt < 0) {
    return `${text.slice(0, maxLength).trimEnd()}…`;
  }

  const start = Math.max(0, matchAt - Math.floor(maxLength / 3));
  const end = Math.min(text.length, start + maxLength);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

// homepageContent[lang] -> aranabilir kayit dizisi.
// Her kayit: { section, title, body, href }
export function buildSearchIndex(content) {
  if (!content) return [];

  const entries = [];
  // href verilmezse bolumun sayfa ici capasina (#anchor) baglanir; makale
  // gibi kendi sayfasi olan kayitlar icin acik bir href gecirilebilir.
  const add = (section, title, bodyParts, href) => {
    const body = bodyParts
      .filter((value) => typeof value === "string" && value.length > 0)
      .join(" ");
    if (!title && !body) return;
    entries.push({
      section,
      title: title ?? "",
      body,
      href: href ?? `#${SECTION_ANCHORS[section] ?? ""}`,
    });
  };

  const { identity, approach, mission, methodology, expertise, founder, articles, references, contact } =
    content;

  // Bolum etiketi (eyebrow) de aranabilir olmali; orn. "misyonumuz",
  // "iletişim" gibi navigasyon kelimeleriyle de bolume ulasilabilsin.
  if (identity) {
    add("identity", identity.title, [identity.eyebrow, identity.intro, identity.body, identity.highlight, ...(identity.bullets ?? [])]);
  }
  if (approach) {
    add("approach", approach.highlight ?? approach.eyebrow, [approach.eyebrow, ...(approach.body ?? [])]);
  }
  if (mission) {
    add("mission", mission.title, [mission.eyebrow, mission.intro, mission.highlight, ...(mission.bullets ?? [])]);
  }
  if (methodology) {
    add("methodology", methodology.title, [methodology.eyebrow, methodology.intro]);
    (methodology.steps ?? []).forEach((step) => {
      add("methodology", step.title, [step.description]);
    });
  }
  if (expertise) {
    add("expertise", expertise.title, [expertise.eyebrow, expertise.intro]);
    (expertise.areas ?? []).forEach((area) => {
      add("expertise", area.title, [area.summary, ...(area.paragraphs ?? []), ...(area.details ?? [])]);
    });
  }
  if (founder) {
    add("founder", founder.name ?? founder.eyebrow, [founder.eyebrow, founder.subtitle, founder.role, ...(founder.paragraphs ?? [])]);
  }
  if (articles) {
    add("articles", articles.title, [articles.eyebrow, articles.intro]);
    (articles.items ?? []).forEach((item) => {
      // Makalelerin kendi sayfasi var; sonuc dogrudan o sayfaya baglanir.
      const href = item.slug ? `/ogren-ve-gelis/${item.slug}` : undefined;
      add("articles", item.title, [item.excerpt, ...(item.body ?? [])], href);
    });
  }
  if (references) {
    add("references", references.title, [references.eyebrow, references.intro]);
  }
  if (contact) {
    add("contact", contact.title, [contact.eyebrow, contact.intro, contact.companyName, contact.address]);
  }

  return entries;
}

// Index uzerinde arama yapar; basit token bazli puanlamayla siralar.
// Donus: { section, title, href, snippet }[]
export function searchContent(index, rawQuery, limit = 20) {
  const query = (rawQuery ?? "").trim().toLowerCase();
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);

  const scored = [];
  for (const entry of index) {
    const haystack = toHaystack([entry.title, entry.body]);
    const titleLower = (entry.title ?? "").toLowerCase();

    let score = 0;
    let allTokensPresent = true;

    for (const token of tokens) {
      const inTitle = titleLower.includes(token);
      const inBody = haystack.includes(token);
      if (!inTitle && !inBody) {
        allTokensPresent = false;
        break;
      }
      if (inTitle) score += 3;
      if (inBody) score += 1;
    }

    if (!allTokensPresent) continue;

    // Tam ifade eslesmesi ekstra puan kazanir.
    if (titleLower.includes(query)) score += 5;
    else if (haystack.includes(query)) score += 2;

    scored.push({
      section: entry.section,
      title: entry.title,
      href: entry.href,
      snippet: makeSnippet(entry.body || entry.title, query),
      score,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ score, ...rest }) => rest);
}
