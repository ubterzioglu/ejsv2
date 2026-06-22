-- Makaleler: yazi govdesi (body) ve gorsel (image_url) alanlari
-- + makale gorselleri icin public Storage bucket'i.
-- Supabase SQL Editor'da bir kez calistirin.

-- 1) Yeni sutunlar
alter table public.updates
  add column if not exists body text,
  add column if not exists image_url text;

-- 2) Gorsel bucket'i (public okuma)
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

-- 3) Bucket policy'leri
-- Herkes (anon) gorselleri okuyabilir (public site icin)
drop policy if exists "article_images_public_read" on storage.objects;
create policy "article_images_public_read" on storage.objects
  for select using (bucket_id = 'article-images');

-- Yazma yalnizca service-role ile yapilir (admin server action).
-- anon yukleme/silme yapamaz; ek insert/update/delete policy tanimlanmaz.
