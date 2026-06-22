/**
 * Tum admin sayfalari icin ortak baslik bandi.
 * @param {{ eyebrow?: string, title: string, description?: string, actions?: import("react").ReactNode }} props
 */
export function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="admin-page-header">
      <div>
        {eyebrow ? <span className="admin-kicker">{eyebrow}</span> : null}
        <h1 className="admin-page__title">{title}</h1>
        {description ? (
          <p className="admin-page__subtitle">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="admin-page-header__actions">{actions}</div>
      ) : null}
    </header>
  );
}
