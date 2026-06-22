import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { locales, defaultLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

const LANG_LABELS = { tr: "TR", en: "EN", de: "DE" };

export default async function UpdatesFeedPage({ searchParams }) {
  const params = await searchParams;
  const lang = locales.includes(params?.lang) ? params.lang : defaultLocale;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("changelog")
    .select("*")
    .eq("lang", lang)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = data ?? [];

  return (
    <div>
      <h1 className="admin-page__title">Güncellemeler</h1>
      <p className="admin-page__subtitle">
        Panel ve site güncellemeleri (salt-okunur). Buradan ekleme veya
        düzenleme yapılmaz.
      </p>

      <div className="admin-tabs">
        {locales.map((code) => (
          <Link
            key={code}
            href={`/admin/updates-feed?lang=${code}`}
            className={
              "admin-tab" + (code === lang ? " admin-tab--active" : "")
            }
          >
            {LANG_LABELS[code]}
          </Link>
        ))}
      </div>

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (changelog)
          oluşturuldu mu?
        </p>
      ) : items.length === 0 ? (
        <p className="admin-empty">Bu dilde henüz güncelleme yok.</p>
      ) : (
        <div className="admin-list">
          {items.map((item) => (
            <article key={item.id} className="admin-card">
              <h3 className="admin-card__title">{item.title}</h3>
              <p className="admin-card__excerpt">{item.body}</p>
              <p className="admin-card__meta">Sıra: {item.sort_order}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
