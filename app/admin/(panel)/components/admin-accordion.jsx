/**
 * Varsayilan kapali akordeon kart. Form gibi icerikleri sarmak icin kullanilir.
 * Native <details>/<summary> kullanir: ekstra state/JS gerektirmez, erisilebilirdir.
 *
 * @param {{ title: string, hint?: string, defaultOpen?: boolean, children: import("react").ReactNode }} props
 */
export function AdminAccordion({ title, hint, defaultOpen = false, children }) {
  return (
    <details className="admin-accordion" open={defaultOpen}>
      <summary className="admin-accordion__summary">
        <span className="admin-accordion__heading">
          <span className="admin-accordion__title">{title}</span>
          {hint ? <span className="admin-accordion__hint">{hint}</span> : null}
        </span>
        <span className="admin-accordion__chevron" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="admin-accordion__body">{children}</div>
    </details>
  );
}
