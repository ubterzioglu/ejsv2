-- Revizyon istekleri: dosya ekleri + admin yorumlari.
-- 1) revision_requests'e dosya eki alanlari (site formundan yuklenen tek dosya).
-- 2) Admin ic notlari/yorumlari icin ayri revision_comments tablosu.
-- 3) Ekler icin public Storage bucket'i (revision-files).
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Dosya eki alanlari (kullanici bir dosya ekleyebilir)
alter table public.revision_requests
  add column if not exists attachment_url text,
  add column if not exists attachment_name text;

-- 2) Admin yorumlari (her talebe birden cok ic not eklenebilir)
create table if not exists public.revision_comments (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.revision_requests(id) on delete cascade,
  author text,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_revision_comments_revision_id
  on public.revision_comments(revision_id);

alter table public.revision_comments enable row level security;

-- Okuma/yazma yalnizca service-role (admin server action) ile yapilir.
-- anon icin policy yok -> public erisemez.

-- 3) Ekler icin Storage bucket'i.
-- Public okuma: admin panelde ve gerekirse linkle erisim icin.
insert into storage.buckets (id, name, public)
values ('revision-files', 'revision-files', true)
on conflict (id) do update set public = true;

-- Herkes (anon) ekleri okuyabilir (public link ile erisim icin)
drop policy if exists "revision_files_public_read" on storage.objects;
create policy "revision_files_public_read" on storage.objects
  for select using (bucket_id = 'revision-files');

-- Public (anon) revizyon formundan dosya YUKLEYEBILIR
-- (revision_insert_public policy'si ile tutarli: site formu anon calisir).
drop policy if exists "revision_files_public_insert" on storage.objects;
create policy "revision_files_public_insert" on storage.objects
  for insert with check (bucket_id = 'revision-files');

-- Silme/guncelleme yalnizca service-role (admin) ile yapilir.
