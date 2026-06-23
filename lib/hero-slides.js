import "server-only";
import { createServerClient } from "@/lib/supabase/server";
import { heroVideos } from "@/app/data/homepage-content";

/**
 * Yayinlanmis hero slaytlarini DB'den okur ve HeroVideoCarousel'in
 * bekledigi sekle donusturur:
 *   { title, src, creditUrl, captions: { tr, en, de, bs } }
 *
 * Hata olursa veya tablo bossa, koddaki statik heroVideos'a duser
 * (site asla bos hero gostermez).
 *
 * @returns {Promise<Array<object>>}
 */
export async function getHeroSlides() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return heroVideos;
    }

    return data.map((row) => ({
      title: row.title,
      src: row.video_url,
      creditUrl: row.credit_url ?? null,
      captions: {
        tr: row.caption_tr ?? "",
        en: row.caption_en ?? row.caption_tr ?? "",
        de: row.caption_de ?? row.caption_tr ?? "",
        bs: row.caption_bs ?? row.caption_tr ?? "",
      },
    }));
  } catch {
    // Supabase yapilandirmasi eksik vb. durumlarda statik fallback.
    return heroVideos;
  }
}
