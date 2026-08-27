import { useEffect, useRef } from 'react';

/**
 * Observes all `.scroll-reveal` children of the returned ref's element.
 * Supports dynamically loaded/fetched items via MutationObserver.
 * When an element enters the viewport it receives the `.is-visible` class
 * (triggering the CSS animations defined in index.css).
 *
 * @param {object} options
 * @param {number} [options.threshold=0.1]  — visibility threshold (0–1)
 * @param {boolean} [options.once=true]      — unobserve after first reveal
 * @returns {React.RefObject}
 */
export default function useScrollReveal({ threshold = 0.1, once = true } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observedSet = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    const observeTargets = () => {
      const targets = el.querySelectorAll('.scroll-reveal');
      targets.forEach((t) => {
        if (!observedSet.has(t)) {
          observedSet.add(t);
          // Check if already in viewport immediately
          const rect = t.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            t.classList.add('is-visible');
            if (!once) observer.observe(t);
          } else {
            observer.observe(t);
          }
        }
      });
    };

    // Observe existing elements immediately
    observeTargets();

    // Watch for dynamically added DOM elements (e.g. from API fetches)
    const mutationObserver = new MutationObserver(() => {
      observeTargets();
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, once]);

  return containerRef;
}
