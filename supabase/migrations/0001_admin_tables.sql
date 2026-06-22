-- Admin paneli tablolari
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Guncellemeler (Yazilarimiz / articles)
create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('tr','en','de')),
  title text not null,
  excerpt text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.updates enable row level security;

-- Public yalnizca yayinlanmis kayitlari okuyabilir
drop policy if exists "updates_read_published" on public.updates;
create policy "updates_read_published" on public.updates
  for select using (published = true);

-- Yazma yalnizca service-role ile (admin server action). anon yazamaz.

-- 2) Revizyon Istekleri (kullanici istekleri)
create table if not exists public.revision_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','done')),
  created_at timestamptz not null default now()
);

alter table public.revision_requests enable row level security;

-- Public (anon) yeni revizyon istegi olusturabilir (site formundan girilebilsin)
drop policy if exists "revision_insert_public" on public.revision_requests;
create policy "revision_insert_public" on public.revision_requests
  for insert with check (true);

-- Okuma/guncelleme/silme yalnizca service-role (admin) ile yapilir; anon icin select policy yok.

-- updated_at otomatik guncelleme (updates)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_updates_updated_at on public.updates;
create trigger trg_updates_updated_at
  before update on public.updates
  for each row execute function public.set_updated_at();
