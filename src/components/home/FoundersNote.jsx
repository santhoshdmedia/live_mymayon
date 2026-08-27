import { useEffect, useRef, useState } from 'react';
import { TriangleWatermark } from '../ui/Ornament';
import founderImg from '../../assets/founder.png';

export default function FoundersNote() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founders-note"
      className="relative py-20 lg:py-32 bg-navy-radial text-cream overflow-hidden"
    >
      {/* Decorative watermarks */}
      <TriangleWatermark className="absolute -top-20 -right-20 w-[480px] h-[480px] opacity-[0.06] rotate-12" />
      <TriangleWatermark className="absolute -bottom-28 -left-28 w-[380px] h-[380px] opacity-[0.04] -rotate-6" />

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section eyebrow */}
        <div className={`text-center mb-14 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gold-400">
            <span className="w-8 h-[1.5px] bg-gold-500 rounded-full" />
            Founder's Note
            <span className="w-8 h-[1.5px] bg-gold-500 rounded-full" />
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo column */}
          <div className={`lg:col-span-4 flex justify-center transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Gold accent frame */}
              <div className="absolute -inset-3 rounded-2xl border border-gold-500/20 group-hover:border-gold-500/40 transition-colors duration-500" />
              <div className="absolute -inset-6 rounded-3xl border border-gold-500/10" />

              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold-500/50 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold-500/50 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold-500/50 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold-500/50 rounded-br-lg" />

              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl w-[280px] sm:w-[320px] aspect-[3/4]">
                <img
                  src={founderImg}
                  alt="Kavinnishesh Ramraj — Founder, MYMAYON"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/80 to-transparent" />
              </div>

              {/* Name plate below photo */}
              <div className="mt-5 text-center">
                <p className="font-display text-lg font-semibold text-cream tracking-wide">Kavinnishesh Ramraj</p>
                <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mt-1">Founder, MYMAYON</p>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className={`lg:col-span-8 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Opening quote mark */}
            <div className={`mb-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <svg className="w-10 h-10 text-gold-500/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>

            {/* Welcome heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-snug mb-8 text-cream">
              Welcome to Tamil Nadu —
              <span className="block text-gold-400 mt-1">where every journey begins with a story.</span>
            </h2>

            {/* Decorative line */}
            <div className={`w-16 h-[2px] bg-gradient-to-r from-gold-500 to-gold-500/0 mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />

            {/* Body copy */}
            <div className="space-y-5 text-[1.05rem] sm:text-lg leading-relaxed text-navy-100 font-accent">
              <p>
                At MYMAYON, we believe travel is not merely about visiting places; it is about walking through
                history, experiencing living cultures, meeting people, and understanding the soul of a land.
              </p>
              <p>
                We take you beyond the familiar — to the ancient trade routes, timeless civilizations, enduring
                traditions, and stories that shaped this land.
              </p>
              <p>
                Not simply because we are proud of our heritage, but because we believe it deserves to be
                experienced, understood, and shared with the world.
              </p>
            </div>

            {/* Highlighted closing line */}
            <div className="mt-10 pl-5 border-l-2 border-gold-500/60">
              <p className="font-display text-xl sm:text-2xl italic text-gold-300 leading-snug">
                "Come as a traveller. Leave as one of us."
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold-500/40" />
              <div>
                <p className="font-display text-lg font-semibold text-cream">Kavinnishesh Ramraj</p>
                <p className="text-gold-500 text-sm tracking-wider uppercase">Founder, MYMAYON</p>
              </div>
            </div>

            {/* Atithi Devo Bhava */}
            <p className="mt-8 text-sm text-gold-400/70 tracking-[0.2em] uppercase font-semibold italic">
              Atithi Devo Bhava
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
