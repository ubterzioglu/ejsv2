from __future__ import annotations

import argparse
import re
import sys
import time
import unicodedata
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as md

BASE_URL = "https://ejsconsulting.org"
BLOG_INDEX_URL = "https://ejsconsulting.org/blog/"

# Blog sayfasında görünen sabit URL listesi.
# Site bazen tekil sayfalarda verification/loader gösterebildiği için fallback olarak tutuluyor.
FALLBACK_POST_URLS = [
    "https://ejsconsulting.org/2024/11/11/yalin-donusumde-sizi-ne-bekliyor-pazartesi-baslayacaginiz-ve-ikinci-gunde-bozacaginiz-bir-diyet-gibi-olmamalidir/",
    "https://ejsconsulting.org/2024/09/10/turkiye-kobilerinin-kurumsallasma-cabalari-yapilmasi-gerekenlerturkiye-kobilerinin-kurumsallasma-cabalari/",
    "https://ejsconsulting.org/2024/09/09/turkiye-kobilerinin-kurumsalasma-cabalari/",
    "https://ejsconsulting.org/2024/09/09/turkiye-kobilerinin-kurumsalasma-cabalari-giris/",
    "https://ejsconsulting.org/2024/01/09/petek-saraciyede-yalin-donusum/",
    "https://ejsconsulting.org/2024/01/09/ilac-sektorunde-yalin-donusum-solid-ilac-uretimde-verimlilik-artisi/",
    "https://ejsconsulting.org/2023/04/04/degisim-esnasinda-direncle-basa-cikmak/",
    "https://ejsconsulting.org/2022/10/23/kobilerin-dijital-donusumunde-sektorel-icgoruler-ve-yol-haritasi-calistayi/",
    "https://ejsconsulting.org/2022/10/21/ilac-sektorunde-yalin-uretim-uygulamasi-world-medicine-yumusak-kapsul-uretim-bolumunde-elde-edilen-sonuclar/",
    "https://ejsconsulting.org/2022/08/30/ilac-sektorunde-yalin-uretim-uygulamasi/",
]

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/125.0 Safari/537.36"
)


@dataclass
class Post:
    title: str
    url: str
    date: str = ""
    author: str = ""
    category: str = ""
    body_markdown: str = ""


def slugify(text: str, max_len: int = 90) -> str:
    replacements = str.maketrans({
        "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u",
        "ş": "s", "Ş": "s", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c",
    })
    text = text.translate(replacements)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text[:max_len].strip("-") or "post"


def get_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
    })
    return session


def fetch(session: requests.Session, url: str, retries: int = 3, delay: float = 1.5) -> str:
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            response = session.get(url, timeout=30)
            response.raise_for_status()
            html = response.text
            # Bazı güvenlik eklentileri kısa süreli loader gösterebilir.
            if "Please wait while your request is being verified" in html and attempt < retries:
                time.sleep(delay * attempt)
                continue
            return html
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            if attempt < retries:
                time.sleep(delay * attempt)
    raise RuntimeError(f"Sayfa indirilemedi: {url}\n{last_error}")


def clean_soup(soup: BeautifulSoup) -> None:
    for selector in [
        "script", "style", "noscript", "svg", "iframe", "form",
        "header", "footer", "nav", ".navbar", ".menu", ".main-menu",
        ".comments-area", "#comments", ".comment-respond", ".widget-area", ".sidebar",
        ".post-navigation", ".navigation", ".pagination", ".breadcrumb",
    ]:
        for tag in soup.select(selector):
            tag.decompose()


def extract_text_by_labels(soup: BeautifulSoup, label: str) -> str:
    text = soup.get_text("\n", strip=True)
    pattern = rf"{re.escape(label)}\s*:?\s*([^\n]+)"
    match = re.search(pattern, text, flags=re.IGNORECASE)
    return match.group(1).strip() if match else ""


def remove_after_archive(markdown_text: str) -> str:
    # WordPress sağ kolonundaki Arşivler / Kategoriler kısmını içerikten temizler.
    patterns = [
        r"\n#{1,6}\s*Arşivler\b.*$",
        r"\nArşivler\b.*$",
        r"\n#{1,6}\s*Kategoriler\b.*$",
        r"\nKategoriler\b.*$",
    ]
    cleaned = markdown_text
    for pattern in patterns:
        cleaned = re.sub(pattern, "", cleaned, flags=re.IGNORECASE | re.DOTALL)
    return cleaned.strip()


def normalize_markdown(markdown_text: str) -> str:
    markdown_text = markdown_text.replace("\xa0", " ")
    markdown_text = re.sub(r"\n{3,}", "\n\n", markdown_text)
    markdown_text = re.sub(r"[ \t]+\n", "\n", markdown_text)
    markdown_text = markdown_text.replace("Þ", "-")
    markdown_text = re.sub(r"^\s*Yorum yapılmamış\s*$", "", markdown_text, flags=re.MULTILINE)
    markdown_text = remove_after_archive(markdown_text)
    return markdown_text.strip()


def find_article_container(soup: BeautifulSoup) -> Tag:
    candidates = [
        "article",
        ".post",
        ".entry-content",
        ".post-content",
        ".content-area",
        "main",
    ]
    for selector in candidates:
        found = soup.select_one(selector)
        if isinstance(found, Tag):
            return found
    body = soup.body
    if not isinstance(body, Tag):
        raise ValueError("HTML içinde body bulunamadı.")
    return body


def parse_post(html: str, url: str) -> Post:
    soup = BeautifulSoup(html, "html.parser")
    clean_soup(soup)

    h1 = soup.find("h1")
    title = h1.get_text(" ", strip=True) if h1 else ""
    if not title:
        title = (soup.title.get_text(" ", strip=True) if soup.title else url).split("|")[0].strip()

    date = extract_text_by_labels(soup, "Yayınlayan")  # geçici fallback için aşağıda düzeltilir
    author = ""
    category = ""

    page_text_lines = [line.strip() for line in soup.get_text("\n").splitlines() if line.strip()]
    for idx, line in enumerate(page_text_lines):
        if "Yayınlayan:" in line:
            author = line.split("Yayınlayan:", 1)[1].strip()
            # Önceki satır genellikle tarih oluyor.
            if idx > 0:
                date = page_text_lines[idx - 1].lstrip("*•- ").strip()
        if "Kategori:" in line:
            category = line.split("Kategori:", 1)[1].strip()

    article = find_article_container(soup)
    content = article.select_one(".entry-content, .post-content") or article
    markdown_body = md(str(content), heading_style="ATX", bullets="-")
    markdown_body = normalize_markdown(markdown_body)

    # Başlık/metayı body içinde tekrar yakaladıysa temizle.
    markdown_body = re.sub(rf"^#\s*{re.escape(title)}\s*", "", markdown_body, flags=re.IGNORECASE).strip()

    return Post(
        title=title,
        url=url,
        date=date,
        author=author,
        category=category,
        body_markdown=markdown_body,
    )


def discover_post_urls(session: requests.Session) -> list[str]:
    try:
        html = fetch(session, BLOG_INDEX_URL)
    except Exception:
        return FALLBACK_POST_URLS.copy()

    soup = BeautifulSoup(html, "html.parser")
    urls: list[str] = []
    for a in soup.find_all("a", href=True):
        href = urljoin(BASE_URL, a["href"])
        parsed = urlparse(href)
        if parsed.netloc != "ejsconsulting.org":
            continue
        if re.search(r"/20\d{2}/\d{2}/\d{2}/", parsed.path):
            clean_url = href.split("#", 1)[0]
            if clean_url not in urls:
                urls.append(clean_url)
    return urls or FALLBACK_POST_URLS.copy()


def build_combined_markdown(posts: Iterable[Post]) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    parts = [
        "# EJS Consulting Blog Yazıları",
        "",
        f"Kaynak blog sayfası: {BLOG_INDEX_URL}",
        f"Oluşturulma zamanı: {now}",
        "",
        "---",
        "",
        "## İçindekiler",
        "",
    ]
    posts = list(posts)
    for idx, post in enumerate(posts, start=1):
        parts.append(f"{idx}. [{post.title}](#{slugify(post.title)})")
    parts.extend(["", "---", ""])

    for idx, post in enumerate(posts, start=1):
        parts.extend([
            f"## {idx}. {post.title}",
            "",
            f"Kaynak: {post.url}",
            f"Tarih: {post.date or '-'}",
            f"Yazar: {post.author or '-'}",
            f"Kategori: {post.category or '-'}",
            "",
            post.body_markdown,
            "",
            "---",
            "",
        ])
    return "\n".join(parts).strip() + "\n"


def write_individual_posts(posts: Iterable[Post], output_dir: Path) -> None:
    posts_dir = output_dir / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)
    for idx, post in enumerate(posts, start=1):
        filename = f"{idx:02d}-{slugify(post.title)}.md"
        content = "\n".join([
            "---",
            f"title: {post.title}",
            f"date: {post.date}",
            f"author: {post.author}",
            f"category: {post.category}",
            f"source: {post.url}",
            "---",
            "",
            f"# {post.title}",
            "",
            post.body_markdown,
            "",
        ]).strip() + "\n"
        (posts_dir / filename).write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="EJS Consulting blog yazılarını Markdown dosyalarına aktarır.")
    parser.add_argument("--out", default="ejs_blog_export", help="Çıktı klasörü")
    parser.add_argument("--only-fallback-urls", action="store_true", help="Blog sayfasını taramadan sabit URL listesini kullan")
    args = parser.parse_args()

    output_dir = Path(args.out)
    output_dir.mkdir(parents=True, exist_ok=True)

    session = get_session()
    urls = FALLBACK_POST_URLS.copy() if args.only_fallback_urls else discover_post_urls(session)

    print(f"Bulunan URL sayısı: {len(urls)}")
    posts: list[Post] = []
    errors: list[str] = []

    for idx, url in enumerate(urls, start=1):
        print(f"[{idx}/{len(urls)}] İndiriliyor: {url}")
        try:
            html = fetch(session, url)
            if "Please wait while your request is being verified" in html:
                raise RuntimeError("Site verification/loader ekranı döndürdü.")
            posts.append(parse_post(html, url))
        except Exception as exc:  # noqa: BLE001
            errors.append(f"- {url}\n  Hata: {exc}")

    if posts:
        combined = build_combined_markdown(posts)
        (output_dir / "ejs_blogs_all.md").write_text(combined, encoding="utf-8")
        write_individual_posts(posts, output_dir)

    if errors:
        (output_dir / "errors.md").write_text("# Hatalar\n\n" + "\n\n".join(errors) + "\n", encoding="utf-8")

    print("\nTamamlandı.")
    print(f"Ana dosya: {output_dir / 'ejs_blogs_all.md'}")
    print(f"Tekil dosyalar: {output_dir / 'posts'}")
    if errors:
        print(f"Bazı sayfalar alınamadı. Detay: {output_dir / 'errors.md'}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
