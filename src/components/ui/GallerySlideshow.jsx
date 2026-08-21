import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

/**
 * GallerySlideshow
 * ─────────────────────────────────────────────────────────────────────────
 * Responsive photo grid for the remaining package photos (after the hero
 * image). Clicking any thumbnail opens a full-screen lightbox with
 * prev/next navigation and keyboard support (Esc / ← / →).
 */
export default function GallerySlideshow({ images = [], title = '' }) {
  const slides = images
    .map((img) => (typeof img === 'string' ? { url: img } : img))
    .filter((img) => img?.url);

  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const goTo = useCallback((i) => {
    setOpenIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);
  const next = useCallback(() => goTo(openIndex + 1), [goTo, openIndex]);
  const prev = useCallback(() => goTo(openIndex - 1), [goTo, openIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  if (slides.length === 0) return null;

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slides.map((img, i) => (
          <button
            key={img.url + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-navy-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={img.url}
              alt={img.caption || `${title} — photo ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-colors flex items-center justify-center">
              <Expand className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <img
            src={slides[openIndex].url}
            alt={slides[openIndex].caption || `${title} — photo ${openIndex + 1}`}
            className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {slides.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
              {openIndex + 1} / {slides.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
