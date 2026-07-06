import { locales } from "@/lib/locales";
import { homepageContent } from "@/app/data/homepage-content";

const BASE_URL = "https://ejsconsulting.com";

export default function sitemap() {
  const now = new Date();
  const entries = [];

  for (const lang of locales) {
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: lang === "tr" ? 1 : 0.9,
    });

    entries.push({
      url: `${BASE_URL}/${lang}/bulten`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });

    entries.push({
      url: `${BASE_URL}/${lang}/haberler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    entries.push({
      url: `${BASE_URL}/${lang}/ogren-ve-gelis`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const page = homepageContent[lang] ?? homepageContent.tr;
    for (const article of page.articles?.items ?? []) {
      if (!article.slug) continue;
      entries.push({
        url: `${BASE_URL}/${lang}/ogren-ve-gelis/${article.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
