import { useEffect, useRef, useState } from 'react';
import { TriangleWatermark } from '../ui/Ornament';
import founderImg from '../../assets/founder2.png';
import { Sparkles, Quote } from 'lucide-react';

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
      {/* Decorative watermarks with slow spin */}
      <TriangleWatermark className="absolute -top-24 -right-24 w-[520px] h-[520px] opacity-[0.06] animate-slow-spin pointer-events-none" />
      <TriangleWatermark className="absolute -bottom-32 -left-32 w-[420px] h-[420px] opacity-[0.04] animate-slow-spin pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '50s' }} />

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section eyebrow */}
        <div className={`text-center mb-14 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gold-400 bg-navy-800/80 px-4 py-1.5 rounded-full border border-gold-500/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Founder's Note
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo column with interactive animations */}
          <div className={`lg:col-span-4 flex justify-center transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-95'}`}>
            <div className="relative group perspective-1000">
              {/* Outer glowing frames */}
              <div className="absolute -inset-3 rounded-2xl border border-gold-500/30 group-hover:border-gold-400/70 transition-all duration-700 animate-gold-glow" />
              <div className="absolute -inset-6 rounded-3xl border border-gold-500/10 group-hover:scale-105 transition-transform duration-700" />

              {/* Animated corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold-400 rounded-tl-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold-400 rounded-tr-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold-400 rounded-bl-lg group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold-400 rounded-br-lg group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />

              {/* Floating Quote Badge */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-gold-500 text-navy-900 flex items-center justify-center shadow-xl z-20 animate-float-slow border border-gold-300">
                <Quote className="w-6 h-6 fill-navy-900 text-navy-900" />
              </div>

              {/* Photo Card */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl w-[280px] sm:w-[320px] aspect-[3/4] bg-navy-800 transform group-hover:scale-[1.02] group-hover:-rotate-1 transition-all duration-700">
                <img
                  src={founderImg}
                  alt="Kavinnishesh Ramraj — Founder, MYMAYON"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />

                {/* Internal shine sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
              </div>

              {/* Name plate below photo */}
              <div className="mt-6 text-center transform group-hover:translate-y-0.5 transition-transform duration-300">
                <p className="font-display text-xl font-bold text-cream tracking-wide flex items-center justify-center gap-1.5">
                  Kavinnishesh Ramraj
                  <Sparkles className="w-4 h-4 text-gold-400 inline animate-pulse" />
                </p>
                <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mt-1">Founder, MYMAYON</p>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className={`lg:col-span-8 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Opening quote mark icon */}
            <div className={`mb-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`}>
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-gold-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>
            </div>

            {/* Welcome heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-snug mb-8 text-cream">
              Welcome to Tamil Nadu —
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 mt-1 animate-text-shimmer">
                where every journey begins with a story.
              </span>
            </h2>

            {/* Expanding decorative line */}
            <div className={`h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-transparent mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'}`} />

            {/* Body copy with staggered fade */}
            <div className="space-y-5 text-[1.05rem] sm:text-lg leading-relaxed text-navy-100 font-accent">
              <p className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                At MYMAYON, we believe travel is not merely about visiting places; it is about walking through
                history, experiencing living cultures, meeting people, and understanding the soul of a land.
              </p>
              <p className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                We take you beyond the familiar — to the ancient trade routes, timeless civilizations, enduring
                traditions, and stories that shaped this land.
              </p>
              <p className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Not simply because we are proud of our heritage, but because we believe it deserves to be
                experienced, understood, and shared with the world.
              </p>
            </div>

            {/* Highlighted closing line with glow & shimmer */}
            <div className={`mt-10 p-6 rounded-2xl bg-gradient-to-r from-gold-500/10 via-gold-400/5 to-transparent border-l-4 border-gold-400 shadow-xl backdrop-blur-sm transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
              <p className="font-display text-xl sm:text-2xl italic text-gold-300 leading-snug">
                "Come as a traveller. Leave as one of us."
              </p>
            </div>

            {/* Signature Block */}
            <div className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-12 h-[1.5px] bg-gradient-to-r from-gold-400 to-transparent" />
              <div>
                <p className="font-display text-lg font-semibold text-cream">Kavinnishesh Ramraj</p>
                <p className="text-gold-400 text-xs tracking-widest uppercase font-semibold">Founder, MYMAYON</p>
              </div>
            </div>

            {/* Atithi Devo Bhava */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-xs text-gold-300 tracking-[0.25em] uppercase font-semibold italic">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
              Atithi Devo Bhava
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

