const iconMap = {
  analysis: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Blueprint with magnifying glass - engineering analysis */}
      <rect x="12" y="16" width="40" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 24h16M16 32h24M16 40h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M51 47l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Industrial crane with rising load */}
      <path d="M12 52h40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 52V20l24-6v38" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20h16l8-6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M36 14v10l8-4v-12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="32" y="32" width="8" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  governance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Organizational blueprint with hierarchy */}
      <rect x="8" y="12" width="48" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="18" width="16" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="36" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="38" y="36" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M32 26v4M20 30h24M20 30v6M44 30v6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Industrial scale */}
      <path d="M32 8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 20h32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 20l-6 20h16l-6-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M48 20l-6 20h16l-6-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M32 16l-16 4M32 16l16 4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="44" width="8" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Clipboard with checkmark - quality assurance */}
      <rect x="14" y="14" width="36" height="42" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="10" width="16" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M22 36l8 8 14-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Drafting compass - engineering design */}
      <circle cx="32" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M28 24l-10 28M36 24l10 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 52h6M40 52h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 26v8" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="36" r="3" fill="currentColor" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Industrial timer/ process flow */}
      <rect x="16" y="10" width="32" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="46" width="32" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M22 18v8l10 8-10 8v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 18v8l-10 8 10 8v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="4" fill="currentColor" />
    </svg>
  ),
  budget: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {/* Calculator with gear - cost planning */}
      <rect x="14" y="12" width="36" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="18" y="16" width="28" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="26" cy="38" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M26 34v-2M26 42v2M22 38h-2M30 38h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="34" y="32" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="40" y="32" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="34" y="40" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="40" y="40" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

function MethodologyIcon({ type }) {
  return (
    <div className="methodology-icon-wrap" aria-hidden="true">
      {iconMap[type] ?? iconMap.analysis}
    </div>
  );
}

export function MethodologyCards({ steps }) {
  return (
    <div className="methodology-grid-refined">
      {steps.map((step) => (
        <article key={step.title} className="methodology-card-refined">
          <MethodologyIcon type={step.icon} />
          <div className="methodology-card-copy">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
