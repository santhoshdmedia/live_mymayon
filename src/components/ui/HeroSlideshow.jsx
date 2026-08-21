import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * HeroSlideshow
 * ─────────────────────────────────────────────────────────────────────────
 * Full-bleed image slideshow for the package detail hero. Accepts the
 * `images` array returned by the API (each item: { url, ... }) and falls
 * back to a single `heroImage` string, then to the navy radial gradient
 * placeholder if no images exist at all.
 *
 * - Auto-advances every 5s, pauses on hover/focus and while a touch drag
 *   is in progress.
 * - Swipeable on touch devices.
 * - Dot indicators + prev/next arrows, styled with the site's navy/gold
 *   palette so it matches the rest of the page.
 */
export default function HeroSlideshow({ images = [], heroImage, alt = '' }) {
  const slides = images.length > 0
    ? images.map((img) => (typeof img === 'string' ? img : img?.url)).filter(Boolean)
    : (heroImage ? [heroImage] : []);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const hasMultiple = slides.length > 1;

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance
  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [hasMultiple, isPaused, slides.length]);

  // Reset to first slide if the slide list changes (e.g. navigating between packages)
  useEffect(() => {
    setIndex(0);
  }, [slides.length, slides[0]]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
    setIsPaused(false);
  };

  if (slides.length === 0) {
    return <div className="w-full h-full bg-navy-radial" aria-hidden="true" />;
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={i === 0 ? alt : `${alt} — photo ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-70 z-10' : 'opacity-0 z-0'
          }`}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          decoding="async"
          aria-hidden={i !== index}
        />
      ))}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/40 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-navy-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/40 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-navy-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute top-4 right-4 z-20 rounded-full bg-navy-900/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {index + 1} / {slides.length}
          </div>

          <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}