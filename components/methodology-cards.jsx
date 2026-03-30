import { Fragment } from "react";

const iconMap = {
  analysis: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M32 18v28M18 32h28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 48l12-12 8 8 12-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 28h8v8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  governance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 16v32M20 48h24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="24" width="24" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 16v32M20 20h24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 32l-4 12h8zM44 32l-4 12h8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M24 32l6 6 10-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M40 16l8 8-24 24H16v-8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 20l8 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M20 16h24M20 48h24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 16c0 8 8 12 8 16s-8 8-8 16M40 16c0 8-8 12-8 16s8 8 8 16" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  budget: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="16" y="22" width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M32 26v12M26 32h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
