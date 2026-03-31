"use client";

import { useState } from "react";

export function ContactSection({ contact, lang }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="iletisim" className="content-section section contact-section">
      <div className="section-heading-block compact-heading">
        <p className="structure-label">{contact.eyebrow}</p>
        <h2 className="section-title">{contact.title}</h2>
        <p className="section-intro">{contact.intro}</p>
      </div>

      <div className="contact-grid">
        <article className="contact-card contact-details">
          <h3>{contact.companyName}</h3>
          <p>{contact.companyNote}</p>
          <p>{contact.address}</p>
          <div className="contact-lines">
            {contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                {phone}
              </a>
            ))}
          </div>
          <p>{contact.hours}</p>
        </article>

        <form
          className="contact-card contact-form"
          onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}
        >
          {submitted ? (
            <p className="contact-success">
              {lang === "tr"
                ? "Mesajınız alındı, en kısa sürede dönüş yapacağız."
                : "Your message has been received. We will get back to you shortly."}
            </p>
          ) : (
            <>
              <label>
                <span>{contact.fields.name}</span>
                <input type="text" placeholder={contact.placeholders.name} />
              </label>
              <label>
                <span>{contact.fields.email}</span>
                <input type="email" placeholder={contact.placeholders.email} />
              </label>
              <label className="full-span">
                <span>{contact.fields.message}</span>
                <textarea placeholder={contact.placeholders.message} rows={5} />
              </label>
              <button type="submit" className="submit-button">
                {contact.fields.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
