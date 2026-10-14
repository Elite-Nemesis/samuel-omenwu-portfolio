import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  index: string; // "01"
  label: string; // small label above the heading
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

/** Shared wrapper so every section has the same heading structure and spacing. */
export function Section({ id, index, label, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="container">
        <header className="section__header" data-reveal>
          <p className="eyebrow">
            <span aria-hidden="true">{index} — </span>
            {label}
          </p>
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
          {intro && <p className="section__intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
