import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { locales, defaultLocale } from "@/lib/locales";
import { UpdatesManager } from "./updates-manager";

export const dynamic = "force-dynamic";

const LANG_LABELS = { tr: "TR", en: "EN", de: "DE" };

export default async function UpdatesPage({ searchParams }) {
  const params = await searchParams;
  const lang = locales.includes(params?.lang) ? params.lang : defaultLocale;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("updates")
    .select("*")
    .eq("lang", lang)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="admin-page__title">Makaleler</h1>
      <p className="admin-page__subtitle">
        Ana sayfadaki &quot;Yazılarımız&quot; bölümünü buradan yönetin.
      </p>

      <div className="admin-tabs">
        {locales.map((code) => (
          <Link
            key={code}
            href={`/admin/updates?lang=${code}`}
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
          Veri okunamadı: {error.message}. Supabase tablosu (updates) oluşturuldu mu?
        </p>
      ) : (
        <UpdatesManager lang={lang} items={data ?? []} />
      )}
    </div>
  );
}
