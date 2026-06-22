-- Makaleler (blog yazilari) tablosu.
-- "updates" tablosu artik yalnizca panel/site GUNCELLEMELERI icindir;
-- blog yazilari bu ayri "articles" tablosunda tutulur.
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Tablo
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('tr','en','de')),
  title text not null,
  excerpt text not null,
  body text,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

-- 2) Public yalnizca yayinlanmis kayitlari okuyabilir
drop policy if exists "articles_read_published" on public.articles;
create policy "articles_read_published" on public.articles
  for select using (published = true);

-- Yazma yalnizca service-role ile (admin server action). anon yazamaz.

-- 3) updated_at otomatik guncelleme (set_updated_at fonksiyonu 0001'de tanimli)
drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- Not: Gorseller icin "article-images" Storage bucket'i 0003 ile zaten olusturulmustur.
