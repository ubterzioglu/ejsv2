-- Bulten abonelikleri (Subscription Center) tablosu.
-- /{lang}/bulten sayfasindaki formdan gelen abonelikler burada tutulur.
-- Bu tablo, ANON (public) tarafindan INSERT'e izin verir; okuma/silme yalnizca
-- service-role (admin) ile yapilir.
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Tablo
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  salutation text,
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  job_title text,
  country text,
  topics text[] not null default '{}',
  consent boolean not null default false,
  lang text not null default 'tr' check (lang in ('tr','en','de','bs')),
  created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

-- 2) Public (anon) yalnizca INSERT yapabilir; okuma yok.
drop policy if exists "subscriptions_public_insert" on public.subscriptions;
create policy "subscriptions_public_insert" on public.subscriptions
  for insert with check (true);

-- Okuma/silme yalnizca service-role ile (admin server action). anon okuyamaz.

-- 3) Ayni e-posta + dil icin tekrari onlemek adina yumusak bir indeks (opsiyonel).
create index if not exists subscriptions_email_idx on public.subscriptions (email);
create index if not exists subscriptions_created_idx on public.subscriptions (created_at desc);
