-- Guncellemeler (changelog) tablosu
-- Salt-okunur panel bolumu icin. Supabase SQL Editor'da bir kez calistirin.

create table if not exists public.changelog (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('tr','en','de')),
  title text not null,
  body text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.changelog enable row level security;

-- Public yalnizca yayinlanmis kayitlari okuyabilir
drop policy if exists "changelog_read_published" on public.changelog;
create policy "changelog_read_published" on public.changelog
  for select using (published = true);

-- Yazma yok: panel bu tabloyu salt-okunur gosterir.
-- Icerik service-role (seed scripti) veya SQL Editor ile girilir; anon/panel yazamaz.
