import { useEffect } from 'react';

/**
 * Fades [data-reveal] elements in as they enter the viewport. The hidden start state only applies when
 * <html> has .motion-ok (set in main.tsx when reduced motion is not requested), so content is always
 * visible without JavaScript or with reduced motion.
 */
export function useReveal(dep: unknown) {
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'),
    );
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
