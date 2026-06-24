// Bolumler arasi gecis: dikey cizgilerle bagli, ustte ve altta kucuk italik
// yazi, ortada kirmizi bir CTA buton (sag ok ile). Ikinci referans gorseldeki
// yapiya gore. Icerikler simdilik placeholder; buton href="#" placeholder.
export function SectionDivider({
  topText = "",
  bottomText = "",
  buttonLabel = "Haberler",
  href = "#ogren-ve-gelis",
}) {
  return (
    <div className="section-divider">
      <span className="section-divider__line" />

      {topText ? (
        <p className="section-divider__text">{topText}</p>
      ) : null}

      <span className="section-divider__line" />

      <a className="section-divider__cta" href={href}>
        <span className="section-divider__cta-label">{buttonLabel}</span>
        <span className="section-divider__cta-arrow" aria-hidden="true">
          →
        </span>
      </a>

      <span className="section-divider__line" />

      {bottomText ? (
        <p className="section-divider__text">{bottomText}</p>
      ) : null}

      <span className="section-divider__line" />
    </div>
  );
}
