from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as md

# Windows konsolu cp1252 olabilir; Türkçe çıktının patlamaması için UTF-8'e geç.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

# Roland Berger Almanca anasayfası.
HOME_URL = "https://www.rolandberger.com/de/"
BASE_URL = "https://www.rolandberger.com"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/125.0 Safari/537.36"
)


@dataclass
class Link:
    text: str
    url: str


@dataclass
class Image:
    alt: str
    src: str


@dataclass
class HomePage:
    url: str
    title: str = ""
    meta_description: str = ""
    text_markdown: str = ""
    links: list[Link] = field(default_factory=list)
    images: list[Image] = field(default_factory=list)


def get_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
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
    # Sadece teknik/gürültü tagleri at; içerik tutulur.
    for selector in ["script", "style", "noscript", "svg", "iframe"]:
        for tag in soup.select(selector):
            tag.decompose()


def normalize_markdown(markdown_text: str) -> str:
    markdown_text = markdown_text.replace("\xa0", " ")
    markdown_text = re.sub(r"\n{3,}", "\n\n", markdown_text)
    markdown_text = re.sub(r"[ \t]+\n", "\n", markdown_text)
    return markdown_text.strip()


def extract_meta_description(soup: BeautifulSoup) -> str:
    for attrs in ({"name": "description"}, {"property": "og:description"}):
        tag = soup.find("meta", attrs=attrs)
        if isinstance(tag, Tag) and tag.get("content"):
            return tag["content"].strip()
    return ""


def find_main_container(soup: BeautifulSoup) -> Tag:
    for selector in ["main", "#main", ".main-content", "article", "[role=main]"]:
        found = soup.select_one(selector)
        if isinstance(found, Tag):
            return found
    body = soup.body
    if not isinstance(body, Tag):
        raise ValueError("HTML içinde body bulunamadı.")
    return body


def extract_links(soup: BeautifulSoup, base_url: str) -> list[Link]:
    links: list[Link] = []
    seen: set[str] = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not href or href.startswith(("#", "javascript:", "mailto:", "tel:")):
            continue
        full = urljoin(base_url, href).split("#", 1)[0]
        if full in seen:
            continue
        seen.add(full)
        links.append(Link(text=a.get_text(" ", strip=True), url=full))
    return links


def extract_images(soup: BeautifulSoup, base_url: str) -> list[Image]:
    images: list[Image] = []
    seen: set[str] = set()
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src") or img.get("data-lazy-src")
        if not src:
            continue
        full = urljoin(base_url, src.strip())
        if full in seen:
            continue
        seen.add(full)
        images.append(Image(alt=(img.get("alt") or "").strip(), src=full))
    return images


def parse_homepage(html: str, url: str) -> HomePage:
    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.get_text(" ", strip=True) if soup.title else ""
    meta_description = extract_meta_description(soup)

    # Link ve görselleri temizlemeden önce, tüm sayfadan topla.
    links = extract_links(soup, url)
    images = extract_images(soup, url)

    clean_soup(soup)
    container = find_main_container(soup)
    text_markdown = normalize_markdown(md(str(container), heading_style="ATX", bullets="-"))

    return HomePage(
        url=url,
        title=title,
        meta_description=meta_description,
        text_markdown=text_markdown,
        links=links,
        images=images,
    )


def write_outputs(page: HomePage, raw_html: str, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    # 1) Ham HTML (yeniden parse / doğrulama için).
    (output_dir / "homepage_raw.html").write_text(raw_html, encoding="utf-8")

    # 2) Yapısal JSON.
    data = {
        "url": page.url,
        "title": page.title,
        "meta_description": page.meta_description,
        "text_markdown": page.text_markdown,
        "links": [link.__dict__ for link in page.links],
        "images": [image.__dict__ for image in page.images],
    }
    (output_dir / "homepage.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # 3) Okunabilir Markdown.
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    parts = [
        f"# {page.title or 'Roland Berger — Anasayfa'}",
        "",
        f"Kaynak: {page.url}",
        f"Oluşturulma zamanı: {now}",
        "",
        "## Meta Description",
        "",
        page.meta_description or "-",
        "",
        "## İçerik",
        "",
        page.text_markdown,
        "",
        "## Linkler",
        "",
    ]
    for link in page.links:
        parts.append(f"- [{link.text or link.url}]({link.url})")
    parts.extend(["", "## Görseller", ""])
    for image in page.images:
        parts.append(f"- Alt: {image.alt or '-'} | {image.src}")
    (output_dir / "homepage.md").write_text("\n".join(parts).strip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Roland Berger anasayfasını Markdown/JSON/HTML olarak dışa aktarır."
    )
    parser.add_argument("--url", default=HOME_URL, help="Scrape edilecek sayfa URL'si")
    parser.add_argument("--out", default="rolandberger_homepage", help="Çıktı klasörü")
    args = parser.parse_args()

    output_dir = Path(args.out)
    session = get_session()

    print(f"İndiriliyor: {args.url}")
    html = fetch(session, args.url)
    if "Please wait while your request is being verified" in html:
        print("UYARI: Site güvenlik doğrulama ekranı döndürdü; içerik eksik olabilir.")

    page = parse_homepage(html, args.url)
    write_outputs(page, html, output_dir)

    print("\nTamamlandı.")
    print(f"Başlık     : {page.title}")
    print(f"Link sayısı: {len(page.links)}")
    print(f"Görsel     : {len(page.images)}")
    print(f"Çıktılar   : {output_dir.resolve()}")
    print(f"  - {output_dir / 'homepage_raw.html'}")
    print(f"  - {output_dir / 'homepage.json'}")
    print(f"  - {output_dir / 'homepage.md'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
