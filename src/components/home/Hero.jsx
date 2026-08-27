import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Clock, Shield, Users, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { TriangleWatermark } from '../ui/Ornament';
import CountdownTimer from '../ui/CountdownTimer';
import { fetchHeroSlides } from '../../api';
import logo from '../../assets/logo.png';

const DESTINATIONS = ['Chennai','Madurai','Thanjavur','Kanyakumari','Rameswaram','Ooty','Kodaikanal','Tiruppur','Coimbatore','Trichy'];
const TRAVEL_TYPES = ['Spiritual','Heritage','Nature','Adventure','Family','Honeymoon','Wellness','Food & Culture'];
const DURATIONS    = ['Day Trip (1 day)','Weekend (2–3 days)','Short Break (4–5 days)','1 Week','2 Weeks+','Flexible'];

const TRUST = [
  { icon: Shield, text: 'No advance payment' },
  { icon: Clock,  text: 'Itinerary in 24 hrs' },
  { icon: Users,  text: 'Local guides, verified stays' },
];

// Static fallback used until slides load, and if the admin hasn't configured any yet.
const DEFAULT_SLIDE = {
  eyebrow: 'Explore The World',
  title: 'Start Planning Your Dream Trip Today!',
  highlight: 'Dream Trip',
  subtitle: "Discover Tamil Nadu's 38 districts through spiritual circuits, heritage trails and coastal escapes — planned around you, not a template.",
  ctaText: '', ctaLink: '', image: null, countdownTarget: null, countdownLabel: '',
};

const AUTOPLAY_MS = 6000;

// Renders `title` with the `highlight` substring (if present) colored gold.
function TitleWithHighlight({ title, highlight }) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }
  const idx = title.indexOf(highlight);
  const before = title.slice(0, idx);
  const after = title.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="text-gold-500 bg-gradient-to-r from-gold-500 to-gold-400 bg-clip-text text-transparent">{highlight}</span>
      {after}
    </>
  );
}

export default function Hero() {
  const [form, setForm] = useState({ destination: '', travelType: '', duration: '', date: '' });
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchHeroSlides()
      .then((r) => {
        if (cancelled) return;
        const data = r?.data || [];
        setSlides(data.length > 0 ? data : [DEFAULT_SLIDE]);
      })
      .catch(() => { /* keep default slide on failure */ });
    return () => { cancelled = true; };
  }, []);

  const hasMultiple = slides.length > 1;

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hasMultiple, isPaused, slides.length]);

  // Clamp index if the slide list shrinks (e.g. after a fetch)
  useEffect(() => { if (index >= slides.length) setIndex(0); }, [slides.length, index]);

  const slide = slides[index] || DEFAULT_SLIDE;

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; setIsPaused(true); };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      className="relative bg-cream overflow-hidden min-h-[85vh] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* World-map dot watermark */}
      <div className="absolute inset-0 pointer-events-none select-none"
        style={{ backgroundImage: 'radial-gradient(#c9a24d22 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <TriangleWatermark className="absolute -top-10 -right-24 w-[480px] h-[480px] opacity-[0.055]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left content (slides) ── */}
          <div className="relative min-h-[420px] sm:min-h-[380px]">
            {slides.map((s, i) => (
              <div
                key={s._id || i}
                className={`transition-all duration-700 ease-out ${
                  i === index ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
                }`}
                aria-hidden={i !== index}
              >
                <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <Badge>{s.eyebrow || 'Explore The World'}</Badge>
                </div>

                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mt-4 mb-5 leading-[1.08] transition-all duration-700 delay-150 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <TitleWithHighlight title={s.title} highlight={s.highlight} />
                </h1>

                {s.subtitle && (
                  <p className={`text-lg text-navy-500 mb-6 leading-relaxed max-w-lg transition-all duration-700 delay-300 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {s.subtitle}
                  </p>
                )}

                {s.countdownTarget && (
                  <div className={`mb-6 transition-all duration-700 delay-400 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <CountdownTimer target={s.countdownTarget} label={s.countdownLabel} theme="light" />
                  </div>
                )}

                {s.ctaText && s.ctaLink && (
                  <Link
                    to={s.ctaLink}
                    className={`inline-flex items-center gap-2 text-navy-800 font-semibold mb-6 hover:text-gold-600 transition-all group duration-700 delay-400 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {s.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            ))}

            {/* Search form card — persistent utility, not part of the slide rotation */}
            <div className={`bg-white rounded-2xl shadow-xl shadow-navy-900/10 p-6 space-y-4 border border-navy-100 relative z-10 mt-2 transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select name="destination" placeholder="Destination" value={form.destination}
                  options={DESTINATIONS} onChange={onChange} />
                <Input name="date" type="date" icon={Calendar} placeholder="Travel Date"
                  value={form.date} onChange={onChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select name="travelType" placeholder="Travel Type" value={form.travelType}
                  options={TRAVEL_TYPES} onChange={onChange} />
                <Select name="duration" placeholder="Tour Duration" value={form.duration}
                  options={DURATIONS} onChange={onChange} />
              </div>
              <Link
                to={`/packages?destination=${encodeURIComponent(form.destination)}&type=${encodeURIComponent(form.travelType)}&duration=${encodeURIComponent(form.duration)}`}
              >
                <Button className="w-full" size="lg">
                  <Search className="w-5 h-5" /> Search Now
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className={`flex flex-wrap gap-5 mt-6 relative z-10 transition-all duration-700 delay-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              {TRUST.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-navy-500 font-medium">
                  <Icon className="w-4 h-4 text-gold-500" /> {text}
                </span>
              ))}
            </div>

            {/* Slide navigation — only shown when there's more than one slide */}
            {hasMultiple && (
              <div className={`flex items-center gap-4 mt-6 relative z-10 transition-all duration-700 delay-800 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === index}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === index ? 'w-6 bg-gold-500' : 'w-1.5 bg-navy-200 hover:bg-navy-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <button type="button" onClick={prev} aria-label="Previous slide"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-navy-200 text-navy-500 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50 transition-all cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={next} aria-label="Next slide"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-navy-200 text-navy-500 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50 transition-all cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: hero visual with floating icon badges ── */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
          }`}>
            {/* Gold circle backdrop */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gold-400 relative flex items-center justify-center shadow-2xl shadow-gold-500/30 overflow-hidden animate-breathe">
              {slides.map((s, i) => (
                <img
                  key={s._id || i}
                  src={s.image?.url || logo}
                  alt=""
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  } ${s.image?.url ? 'object-cover' : 'object-contain w-4/5 h-4/5 m-auto drop-shadow-2xl'}`}
                />
              ))}
            </div>

            {/* Floating icon bubbles — teal mountain (top-right) */}
            <div className="absolute -top-2 right-4 sm:right-0 w-14 h-14 bg-[#0B9B8A] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-float">
              <MapPin className="w-6 h-6 text-white" />
            </div>

            {/* Gold plane (top-left) */}
            <div className="absolute top-10 -left-2 sm:-left-6 w-10 h-10 rounded-full border-2 border-gold-500 flex items-center justify-center text-gold-500 bg-white shadow animate-float" style={{ animationDelay: '0.8s' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>

            {/* Teal signpost (mid-right) */}
            <div className="absolute top-1/2 -right-2 sm:-right-6 -translate-y-1/2 w-12 h-12 bg-[#0B9B8A] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-float" style={{ animationDelay: '1.6s' }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5h10l3 4-3 4H4V5zm0-2v18h2v-7h10l4-5-4-5H6V3H4z" />
              </svg>
            </div>

            {/* Gold beach umbrella (bottom-center) */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-float" style={{ animationDelay: '2.4s' }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.05V2a1 1 0 00-2 0v.05A10.01 10.01 0 003.05 11H2a1 1 0 000 2h1.05A10.01 10.01 0 0011 20.95V23a1 1 0 002 0v-2.05A10.01 10.01 0 0020.95 13H23a1 1 0 000-2h-2.05A10.01 10.01 0 0013 2.05zM12 19a7 7 0 110-14 7 7 0 010 14z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
