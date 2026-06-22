import { createServerClient } from "@/lib/supabase/server";
import { defaultLocale } from "@/lib/locales";
import { UpdatesManager } from "./updates-manager";
import { AdminPageHeader } from "../components/admin-page-header";

export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  // Makaleler tek dil: Turkce.
  const lang = defaultLocale;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("lang", lang)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        eyebrow="İçerik"
        title="Makaleler"
        description='Ana sayfadaki "Yazılarımız" bölümünde görünen içerikleri buradan oluşturun, düzenleyin ve yayına alın.'
      />

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (articles) oluşturuldu mu?
        </p>
      ) : (
        <UpdatesManager lang={lang} items={data ?? []} />
      )}
    </div>
  );
}
