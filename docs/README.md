# EJS Consulting Blog → Markdown

Bu paket, `https://ejsconsulting.org/blog/` altında görünen blog yazılarını Markdown formatına aktarmak için hazırlanmıştır.

## Çıktılar

Script çalışınca şunları üretir:

- `ejs_blog_export/ejs_blogs_all.md` → tüm blogların tek Markdown dosyası
- `ejs_blog_export/posts/*.md` → her blog için ayrı Markdown dosyası
- `ejs_blog_export/errors.md` → alınamayan sayfalar varsa hata listesi

## Windows PowerShell kullanım

```powershell
cd .\ejs_blog_md_tool
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python .\ejs_blog_to_markdown.py --out .\ejs_blog_export
```

Eğer site blog index taramasında sorun çıkarırsa sabit URL listesiyle çalıştır:

```powershell
python .\ejs_blog_to_markdown.py --out .\ejs_blog_export --only-fallback-urls
```

## Not

Site bazı tekil sayfalarda kısa süreli güvenlik doğrulaması/loader ekranı döndürebilir. Böyle olursa script birkaç kez tekrar dener; yine de hata kalırsa `errors.md` içine yazar.
