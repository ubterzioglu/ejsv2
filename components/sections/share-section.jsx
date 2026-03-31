"use client";

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 8.2v9.3H3.6V8.2zm.2-3a1.8 1.8 0 1 1-3.5 0 1.8 1.8 0 0 1 3.5 0M20.5 12.1v5.4h-2.9v-5.1c0-1.3-.5-2.1-1.7-2.1-.9 0-1.4.6-1.7 1.2-.1.2-.1.5-.1.8v5.2h-2.9V8.2h2.9v1.3c.4-.6 1.1-1.5 2.8-1.5 2.1 0 3.6 1.3 3.6 4.1" fill="currentColor" />
  </svg>
);

const XIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.8 3h3.1l-6.7 7.7L22 21h-6.1l-4.8-6.3L5.6 21H2.5l7.2-8.2L2 3h6.2l4.3 5.8zm-1.1 16h1.7L7.3 4.9H5.5z" fill="currentColor" />
  </svg>
);

const FacebookIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.6 1.5-1.6h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.6v8z" fill="currentColor" />
  </svg>
);

const EmailIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5m0 1.5v.3l8 5.3 8-5.3V8zm16 8V10l-7.6 5a.8.8 0 0 1-.8 0L4 10v6z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5m0 15.5c-1.2 0-2.4-.3-3.4-.9l-.2-.1-2.6.7.7-2.5-.2-.3a6.9 6.9 0 1 1 5.7 3.1m3.8-5.1c-.2-.1-1.2-.6-1.4-.6s-.3-.1-.5.1-.6.6-.7.8-.3.2-.5.1a5.7 5.7 0 0 1-1.7-1.1 6.4 6.4 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.3-.4.2-.3.1-.4c0-.1 0-.3-.1-.4l-.6-1.5c-.1-.3-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.3 2.3 0 0 0-.7 1.7c0 1 .7 2 1 2.4.1.1 2 3.1 4.9 4.2.7.3 1.2.4 1.7.5.7.1 1.3.1 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.2-.2-.4-.3" fill="currentColor" />
  </svg>
);

const shareLabels = { tr: "E-posta", en: "Email", de: "E-Mail" };
const shareTitles = { tr: "Sayfamizi paylasin", en: "Share this page", de: "Seite teilen" };
const shareAriaLabels = { tr: "Paylasim baglantilari", en: "Share links", de: "Teilen-Links" };

export function ShareSection({ lang, shareUrl, shareText }) {
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: LinkedInIcon },
    { label: "X", href: `https://x.com/intent/post?url=${shareUrl}&text=${shareText}`, icon: XIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: FacebookIcon },
    { label: shareLabels[lang] ?? "Email", href: `mailto:?subject=${encodeURIComponent("EJS Consulting")}&body=${shareText}%20${shareUrl}`, icon: EmailIcon },
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${shareUrl}`, icon: WhatsAppIcon },
  ];

  return (
    <section className="content-section section share-section">
      <div className="footer-share-inner section">
        <p className="footer-share-title">{shareTitles[lang] ?? shareTitles.en}</p>
        <div className="footer-share-icons" aria-label={shareAriaLabels[lang] ?? shareAriaLabels.en}>
          {links.map((item) => (
            <a
              key={item.label}
              className="footer-share-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
