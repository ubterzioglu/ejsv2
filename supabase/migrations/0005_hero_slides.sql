-- Hero (ana sayfa video sov) slaytlari tablosu.
-- Slaytlar admin panelden yonetilir; her slayt tek satirdir ve caption'lari
-- 4 dilde (tr/en/de/bs) duz sutunlarda tutar.
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Tablo
create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,                  -- dahili etiket (orn. "Smart factory automation")
  video_url text not null,              -- yapistirilmis URL veya Storage public URL
  credit_url text,                      -- royalty-free kaynak atfi
  caption_tr text not null,
  caption_en text,
  caption_de text,
  caption_bs text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hero_slides enable row level security;

-- 2) Public yalnizca yayinlanmis slaytlari okuyabilir
drop policy if exists "hero_slides_read_published" on public.hero_slides;
create policy "hero_slides_read_published" on public.hero_slides
  for select using (published = true);

-- Yazma yalnizca service-role ile (admin server action). anon yazamaz.

-- 3) updated_at otomatik guncelleme (set_updated_at fonksiyonu 0001'de tanimli)
drop trigger if exists trg_hero_slides_updated_at on public.hero_slides;
create trigger trg_hero_slides_updated_at
  before update on public.hero_slides
  for each row execute function public.set_updated_at();

-- 4) Video bucket'i (article-images'tan daha yuksek boyut limiti)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hero-videos', 'hero-videos', true, 209715200,  -- 200 MB
  array['video/mp4','video/webm','video/quicktime']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 209715200,
  allowed_mime_types = array['video/mp4','video/webm','video/quicktime'];

-- 5) Bucket policy: herkes (anon) videolari okuyabilir (public site icin)
drop policy if exists "hero_videos_public_read" on storage.objects;
create policy "hero_videos_public_read" on storage.objects
  for select using (bucket_id = 'hero-videos');

-- Yazma yalnizca service-role ile yapilir (admin server action).
