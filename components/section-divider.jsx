// Bolumler arasi gecis: dikey cizgi + ortada tiklanabilir dekoratif etiket.
// Etikete basildiginda bir sonraki bolume yumusakca kaydirir (CSS smooth scroll
// + section scroll-margin-top bunu halleder).
export function SectionDivider({ label, href }) {
  return (
    <div className="section-divider" aria-hidden={label ? undefined : "true"}>
      <span className="section-divider__line" />
      {label && href ? (
        <a className="section-divider__label" href={href}>
          {label}
        </a>
      ) : null}
      <span className="section-divider__line" />
    </div>
  );
}
