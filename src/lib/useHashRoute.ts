import { useEffect, useState } from 'react';

/**
 * A tiny router based on the URL hash.
 *
 *   #about, #projects        → the home page, scrolled to that section
 *   #/notes/<slug>           → a single Build Notes post
 *
 * Why not React Router? The site has exactly two kinds of page. Reading
 * window.location.hash and listening for "hashchange" covers that in ~30
 * lines, and hash URLs work on any static host with no server configuration.
 */

export type Route = { page: 'home'; section?: string } | { page: 'note'; slug: string };

export function parseHash(hash: string): Route {
  const value = decodeURIComponent(hash.replace(/^#/, ''));
  const note = value.match(/^\/notes\/([\w-]+)\/?$/);
  if (note) return { page: 'note', slug: note[1] };
  return { page: 'home', section: value || undefined };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
