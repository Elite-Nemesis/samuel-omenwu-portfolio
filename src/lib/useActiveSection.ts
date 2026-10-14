import { useEffect, useState } from 'react';

/** Tracks which section is in the middle of the screen, to highlight it in the nav. */
export function useActiveSection(ids: string[], enabled: boolean): string | undefined {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // A thin band across the middle of the viewport: whichever section crosses it is "active".
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : undefined;
}
