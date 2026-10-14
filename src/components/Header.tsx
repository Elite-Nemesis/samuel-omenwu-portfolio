import { useEffect, useState } from 'react';
import { site } from '../content/site';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Build Notes' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Sticky header. On small screens the links collapse behind a "Menu" button.
 * aria-expanded tells screen readers whether the menu is open, and Escape closes it.
 */
export function Header({ activeSection }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            SO
          </span>
          <span className="brand__name">{site.name}</span>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="site-nav" aria-label="Main" className={`site-nav${open ? ' is-open' : ''}`}>
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
