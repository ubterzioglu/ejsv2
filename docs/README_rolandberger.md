# Roland Berger Anasayfa → Markdown

`https://www.rolandberger.com/de/` anasayfasını scrape edip Markdown / JSON / ham HTML
olarak dışa aktarır. Aynı `.venv` ve bağımlılıkları (`requests`, `beautifulsoup4`,
`markdownify`) EJS blog aracıyla paylaşılır — ek kurulum gerekmez.

## Çıktılar

`--out` klasörü altında (varsayılan: `rolandberger_homepage/`):

- `homepage.md` → başlık, meta description, içerik, linkler ve görseller (okunabilir)
- `homepage.json` → aynı verinin yapısal hali (yeniden işleme için)
- `homepage_raw.html` → ham HTML (doğrulama / tekrar parse için)

## Çalıştırma (Windows PowerShell)

```powershell
cd C:\temp_private\EJS\docs
.\.venv\Scripts\Activate.ps1
python .\rolandberger_homepage_to_markdown.py --out .\rolandberger_homepage
```

Aktivasyon yapmadan, doğrudan venv python'u ile de çalışır:

```powershell
.\.venv\Scripts\python.exe .\rolandberger_homepage_to_markdown.py --out .\rolandberger_homepage
```

Farklı bir sayfayı denemek için:

```powershell
python .\rolandberger_homepage_to_markdown.py --url https://www.rolandberger.com/de/ --out .\rolandberger_homepage
```

## Not

- Anasayfa içeriğinin büyük kısmı normal HTML içinde geliyor; `requests` + `BeautifulSoup`
  yeterli. Carousel veya JS ile sonradan yüklenen ekstra içerikler eksik kalırsa aynı işi
  Playwright ile yapmak daha sağlam olur.
- `robots.txt` tarafında anasayfa için genel bir engel yok (yalnızca `/search/` disallow).
  Yine de yavaş ve saygılı scraping yapın.
