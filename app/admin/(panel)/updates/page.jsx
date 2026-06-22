import { createServerClient } from "@/lib/supabase/server";
import { defaultLocale } from "@/lib/locales";
import { UpdatesManager } from "./updates-manager";

export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  // Makaleler tek dil: Turkce.
  const lang = defaultLocale;

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
