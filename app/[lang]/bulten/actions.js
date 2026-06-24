"use server";

import { createServerClient } from "@/lib/supabase/server";
import { locales } from "@/lib/locales";

const VALID_TOPICS = ["company", "insight", "sector"];

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Public abonelik formu server action'i.
 * Anon kullaniciya acik; veriyi service-role client ile "subscriptions"
 * tablosuna yazar (RLS public insert policy de buna izin verir).
 *
 * @returns {{ ok?: boolean, error?: string }}
 */
export async function createSubscription(_prevState, formData) {
  const lang = String(formData.get("lang") ?? "tr").trim();
  const salutation = String(formData.get("salutation") ?? "").trim();
  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const jobTitle = String(formData.get("job_title") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const consent = formData.get("consent") === "on";
  const topics = formData
    .getAll("topics")
    .map((t) => String(t))
    .filter((t) => VALID_TOPICS.includes(t));

  // Dogrulama (sistem siniri: dis girdiye guvenme).
  if (!firstName) return { error: "missing_first_name" };
  if (!lastName) return { error: "missing_last_name" };
  if (!email || !isEmail(email)) return { error: "invalid_email" };
  if (!company) return { error: "missing_company" };
  if (!jobTitle) return { error: "missing_job_title" };
  if (!consent) return { error: "missing_consent" };

  const safeLang = locales.includes(lang) ? lang : "tr";

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("subscriptions").insert({
      salutation: salutation || null,
      first_name: firstName,
      last_name: lastName,
      email,
      company: company || null,
      job_title: jobTitle || null,
      country: country || null,
      topics,
      consent,
      lang: safeLang,
    });

    if (error) return { error: "server" };
    return { ok: true };
  } catch {
    return { error: "server" };
  }
}
