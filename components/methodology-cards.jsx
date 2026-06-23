const iconMap = {
  analysis: (
    // Free assessment - document under magnifier
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="9" y="6" width="22" height="30" rx="3" fill="currentColor" opacity="0.12" />
      <path d="M14 14h12M14 20h12M14 26h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="30" cy="30" r="9" fill="currentColor" opacity="0.1" />
      <path d="M36.5 36.5l5 5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    // Efficiency optimization - upward bars with arrow
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="9" y="28" width="6" height="11" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="19" y="22" width="6" height="17" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="29" y="15" width="6" height="24" rx="1.5" fill="currentColor" opacity="0.7" />
      <path d="M11 22l9-7 6 4 11-11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 8h7v7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  governance: (
    // Institutional capability - pillared building
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6l16 8H8l16-8z" fill="currentColor" opacity="0.18" />
      <path d="M24 6l16 8H8l16-8z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M13 18v15M21 18v15M27 18v15M35 18v15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8 37h32" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6 42h36" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  balance: (
    // Transparency - balanced scale
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 8v30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11 14h26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24" cy="9" r="3" fill="currentColor" />
      <path d="M11 14l-5 11h10l-5-11z" fill="currentColor" opacity="0.15" />
      <path d="M11 14l-5 11h10l-5-11z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M37 14l-5 11h10l-5-11z" fill="currentColor" opacity="0.15" />
      <path d="M37 14l-5 11h10l-5-11z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 38h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  check: (
    // Professionalism - badge with check
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5l5 3.5 6-.4 1.8 5.8 4.9 3.5-2 5.7 2 5.7-4.9 3.5L35 38l-6-.4L24 41l-5-3.4-6 .4-1.8-5.8L6.3 28.7l2-5.7-2-5.7 4.9-3.5L13 8.1l6 .4L24 5z" fill="currentColor" opacity="0.14" />
      <path d="M24 5l5 3.5 6-.4 1.8 5.8 4.9 3.5-2 5.7 2 5.7-4.9 3.5L35 38l-6-.4L24 41l-5-3.4-6 .4-1.8-5.8L6.3 28.7l2-5.7-2-5.7 4.9-3.5L13 8.1l6 .4L24 5z" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M17 23.5l5 5 9-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (
    // Continuous improvement - circular refresh with spark
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" fill="currentColor" opacity="0.1" />
      <path d="M37 18a15 15 0 1 0 1.6 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M37 10v8h-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 17l2.2 4.8L31 24l-4.8 2.2L24 31l-2.2-4.8L17 24l4.8-2.2L24 17z" fill="currentColor" />
    </svg>
  ),
  hourglass: (
    // Execution to results - target with arrow
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.45" />
      <circle cx="24" cy="24" r="11" fill="currentColor" opacity="0.12" />
      <circle cx="24" cy="24" r="11" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M24 24l13-13M31 11h6v6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  budget: (
    // Budget control - coin stack with check
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="20" cy="13" rx="13" ry="5" fill="currentColor" opacity="0.16" />
      <ellipse cx="20" cy="13" rx="13" ry="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M7 13v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 21v8c0 2.8 5.8 5 13 5 1.2 0 2.4-.06 3.5-.18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="34" cy="33" r="9" fill="currentColor" opacity="0.14" />
      <circle cx="34" cy="33" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M30 33l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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
      {steps.map((step, index) => (
        <article key={step.title} className="methodology-card-refined">
          <div className="methodology-card-index">
            <MethodologyIcon type={step.icon} />
            <span className="methodology-card-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="methodology-card-copy">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
