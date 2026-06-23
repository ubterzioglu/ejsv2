import { createServerClient } from "@/lib/supabase/server";
import { HeroManager } from "./hero-manager";
import { AdminPageHeader } from "../components/admin-page-header";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        eyebrow="İçerik"
        title="Hero Slaytları"
        description="Ana sayfadaki video şovunu buradan yönetin: video, metin (4 dil), sıra ve yayın durumu."
      />

      {error ? (
        <p className="admin-error">
          Veri okunamadı: {error.message}. Supabase tablosu (hero_slides) oluşturuldu mu?
        </p>
      ) : (
        <HeroManager items={data ?? []} />
      )}
    </div>
  );
}
