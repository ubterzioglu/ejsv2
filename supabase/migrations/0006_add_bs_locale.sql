-- Bosnakca (bs) dilini mevcut tablolarin lang check kisitlarina ekler.
-- 0001 (updates), 0002 (changelog) ve 0004 (articles) tablolarinda lang
-- check'i ('tr','en','de') idi; artik 'bs' de gecerli.
-- Supabase SQL Editor'da bir kez calistirin.

-- updates
alter table public.updates drop constraint if exists updates_lang_check;
alter table public.updates
  add constraint updates_lang_check check (lang in ('tr','en','de','bs'));

-- articles
alter table public.articles drop constraint if exists articles_lang_check;
alter table public.articles
  add constraint articles_lang_check check (lang in ('tr','en','de','bs'));

-- changelog (0002). Tablo adi changelog ise asagisi gecerlidir; degilse atlayin.
do $$
begin
  if exists (select 1 from information_schema.tables
             where table_schema = 'public' and table_name = 'changelog') then
    execute 'alter table public.changelog drop constraint if exists changelog_lang_check';
    execute 'alter table public.changelog add constraint changelog_lang_check check (lang in (''tr'',''en'',''de'',''bs''))';
  end if;
end $$;
