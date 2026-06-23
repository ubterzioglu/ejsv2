"use client";

import Image from "next/image";
import { useState } from "react";

const contactLogo = "/assets/ejsmenulogo.png";

export function ContactSection({ contact, footer, lang }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError(lang === "tr" ? "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin." : "An error occurred while sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="iletisim" className="content-section section contact-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{contact.eyebrow}</p>
        <h2 className="section-title">{contact.title}</h2>
        <p className="section-intro">{contact.intro}</p>
      </div>

      <div className="contact-merge-shell">
        <article className="contact-card contact-details contact-details-premium">
          <div className="contact-brand-block">
            <div className="contact-logo-wrap" aria-hidden="true">
              <Image
                src={contactLogo}
                alt=""
                className="contact-logo-mark"
                width={240}
                height={240}
                sizes="(max-width: 760px) 160px, 240px"
                loading="eager"
              />
            </div>

            <div className="contact-brand-copy">
              <p className="contact-kicker">{footer?.eyebrow ?? contact.eyebrow}</p>
              <h3>{contact.companyName}</h3>
              <p className="contact-company-note">{contact.companyNote}</p>
            </div>
          </div>

          <div className="contact-office-panel">
            <div className="contact-office-heading">
              <p className="contact-office-label">{footer?.title ?? "Office"}</p>
              <p className="contact-office-name">{footer?.officeName ?? contact.companyName}</p>
            </div>

            <div className="contact-office-details">
              <p className="contact-address-line">
                {footer?.addressLines?.[0] ?? contact.address}
              </p>

              <div className="contact-lines contact-lines-premium">
                {contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                    {phone}
                  </a>
                ))}
              </div>

              <div className="contact-inline-links">
                {footer?.contactRows?.map((row) => (
                  <a
                    key={row.label}
                    href={row.href === "#iletisim" ? "#iletisim-form" : row.href}
                    className="contact-inline-link"
                  >
                    <span>{row.label}</span>
                    {row.value}
                  </a>
                ))}
              </div>

              <p className="contact-hours">{contact.hours}</p>
            </div>
          </div>
        </article>

        <form
          id="iletisim-form"
          className="contact-card contact-form contact-form-premium"
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <p className="contact-success">
              {lang === "tr"
                ? "Mesajınız alındı, en kısa sürede dönüş yapacağız."
                : "Your message has been received. We will get back to you shortly."}
            </p>
          ) : (
            <>
              {error && (
                <div className="contact-error" role="alert">
                  {error}
                </div>
              )}
              <label>
                <span>{contact.fields.name}</span>
                <input
                  type="text"
                  placeholder={contact.placeholders.name}
                  disabled={loading}
                  required
                />
              </label>
              <label>
                <span>{contact.fields.email}</span>
                <input
                  type="email"
                  placeholder={contact.placeholders.email}
                  disabled={loading}
                  required
                />
              </label>
              <label className="full-span">
                <span>{contact.fields.message}</span>
                <textarea
                  placeholder={contact.placeholders.message}
                  rows={5}
                  disabled={loading}
                  required
                />
              </label>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <span className="button-loading">
                    <span className="spinner" aria-hidden="true"></span>
                    {lang === "tr" ? "Gönderiliyor..." : "Sending..."}
                  </span>
                ) : (
                  contact.fields.submit
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
