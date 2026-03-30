import { Fragment } from "react";

const iconMap = {
  analysis: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="24" y="19" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M28 15h8M29 27h6M29 33h6M29 39h4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 22h4M20 32h4M20 42h4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M20 42l10-10 7 7 13-15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 24h10v10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  governance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 42h20M24 42V24M40 42V24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 24l8-8 8 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="46" r="3" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="40" cy="46" r="3" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 18v28M24 22h16M16 46h32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 22l-8 12h16zM40 22l-8 12h16z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="18" y="18" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M24 32l5 5 11-13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M21 43l4-11 18-18a4 4 0 0 1 6 6L31 38l-10 5z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 19l7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 16h20M22 48h20M24 16c0 9 8 10 8 16s-8 7-8 16M40 16c0 9-8 10-8 16s8 7 8 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  budget: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 24h32v16H16z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 24v-4h20v4M22 40v4h20v-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="4" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
};

function HexIcon({ type }) {
  return (
    <div className="methodology-icon-wrap" aria-hidden="true">
      <svg viewBox="0 0 88 88" className="methodology-hex" focusable="false">
        <path d="M28 10h32l16 28-16 28H28L12 38z" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      <div className="methodology-icon-glyph">{iconMap[type] ?? iconMap.analysis}</div>
    </div>
  );
}

export function MethodologyCards({ steps }) {
  return (
    <div className="methodology-grid-refined">
      {steps.map((step) => (
        <article key={step.title} className="methodology-card-refined">
          <HexIcon type={step.icon} />
          <div className="methodology-card-copy">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
