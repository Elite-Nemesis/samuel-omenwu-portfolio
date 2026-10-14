import { useEffect } from 'react';

/**
 * Adds the class "is-visible" to every element with data-reveal once it
 * scrolls into view. The actual fade-up lives in CSS (see .reveal in global.css).
 *
 * Content is visible by default; the hidden starting state only applies after
 * this script adds "js-reveal" to <html>. So if JavaScript fails, or the user
 * prefers reduced motion, nothing ever stays invisible.
 */
export function useReveal(dependency: unknown) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('js-reveal');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once, then stop watching
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dependency]);
}
