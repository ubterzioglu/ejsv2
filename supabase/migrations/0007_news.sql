-- Haberler (news) tablosu.
-- Ana sayfadan bagimsiz, kendi /haberler sayfasinda listelenen haber kartlari.
-- "articles" tablosuna benzer; ek olarak bir "tag" alani vardir.
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Tablo
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('tr','en','de','bs')),
  title text not null,
  excerpt text not null,
  body text,
  tag text,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news enable row level security;

-- 2) Public yalnizca yayinlanmis kayitlari okuyabilir
drop policy if exists "news_read_published" on public.news;
create policy "news_read_published" on public.news
  for select using (published = true);

-- Yazma yalnizca service-role ile (admin server action). anon yazamaz.

-- 3) updated_at otomatik guncelleme (set_updated_at fonksiyonu 0001'de tanimli)
drop trigger if exists trg_news_updated_at on public.news;
create trigger trg_news_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

-- Not: Gorseller icin "article-images" Storage bucket'i 0003 ile zaten
-- olusturulmustur; haberler de ayni bucket'i kullanir.
