-- Admin revizyon yorumlarina gorsel eki destegi.
-- revision-files bucket'i (0009) zaten mevcut, sadece kolon ekleniyor.

alter table public.revision_comments
  add column if not exists image_url text;
