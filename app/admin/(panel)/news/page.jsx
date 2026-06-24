import { createServerClient } from "@/lib/supabase/server";
import { defaultLocale } from "@/lib/locales";
import { NewsManager } from "./news-manager";
import { AdminPageHeader } from "../components/admin-page-header";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  // Haberler tek dil: Turkce (digerleri ileride eklenebilir).
  const lang = defaultLocale;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("lang", lang)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        eyebrow="İçerik"
        title="Haberler"
        description="Haberler sayfasında görünen içerikleri buradan oluşturun, düzenleyin ve yayına alın."
      />

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (news) oluşturuldu mu?
        </p>
      ) : (
        <NewsManager lang={lang} items={data ?? []} />
      )}
    </div>
  );
}
