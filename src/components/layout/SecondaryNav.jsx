import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchAnnouncements, fetchHeroSlides, fetchPackages } from '../../api';

const DEFAULT_ANNOUNCEMENTS = [
  { text: 'Special Arupadai Veedu 6 Abodes Murugan Temple Circuit — Booking Open', link: '/packages' },
  { text: 'Discover all 38 Districts of Tamil Nadu with Curated Itineraries', link: '/destinations/district-explorer' },
  { text: '24/7 Travel Desk & Darshan Support: +91 95971 00664', link: '/contact' },
  { text: 'Navagraha 9 Temple Kaveri Delta 2-Day Package — Verified Stays & Guides', link: '/packages' },
  { text: 'Explore our New Photo Gallery — Real Journeys & Sacred Moments', link: '/gallery' },
  { text: 'Customized Family & Spiritual Tours — Itinerary in 24 Hours with 0 Advance', link: '/plan-my-trip' },
];

export default function SecondaryNav() {
  const [items, setItems] = useState(DEFAULT_ANNOUNCEMENTS);

  useEffect(() => {
    let active = true;
    Promise.allSettled([fetchAnnouncements(), fetchHeroSlides(), fetchPackages()])
      .then(([annRes, slidesRes, pkgsRes]) => {
        if (!active) return;
        const dynamicItems = [];

        // 1. Direct admin announcements
        if (annRes.status === 'fulfilled') {
          const annList = Array.isArray(annRes.value?.data) ? annRes.value.data : (Array.isArray(annRes.value) ? annRes.value : []);
          annList.forEach((a) => {
            if (a.text) dynamicItems.push({ text: a.text, link: a.link || '/packages', badge: a.badge || 'Highlights' });
          });
        }

        // 2. Hero slides
        if (slidesRes.status === 'fulfilled' && Array.isArray(slidesRes.value?.data)) {
          slidesRes.value.data.forEach((s) => {
            if (s.title) dynamicItems.push({ text: s.title + (s.subtitle ? ` — ${s.subtitle}` : ''), link: s.ctaLink || '/packages' });
          });
        }

        // 3. Featured packages
        if (pkgsRes.status === 'fulfilled') {
          const pkgs = Array.isArray(pkgsRes.value?.data) ? pkgsRes.value.data : (Array.isArray(pkgsRes.value) ? pkgsRes.value : []);
          pkgs.slice(0, 4).forEach((p) => {
            if (p.title) dynamicItems.push({ text: `🌟 Popular Package: ${p.title} (${p.durationDays || 'Multi'}-Day Tour) — From ₹${p.priceFrom?.toLocaleString('en-IN') || 'Best Price'}`, link: `/packages/${p.slug}` });
          });
        }

        if (dynamicItems.length > 0) {
          setItems(dynamicItems);
        }
      })
      .catch(() => {});

    return () => { active = false; };
  }, []);

  // Duplicate stream items to create a seamless, non-breaking loop
  const stream = [...items, ...items];

  return (
    <div
      className="border-b border-[#a67a1c]/40 text-xs py-1.5 px-3 sm:px-6 relative z-50 select-none overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #b88a22 0%, #d4a737 35%, #e2b747 50%, #d4a737 65%, #b88a22 100%)',
        color: '#0a1a30'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Badge: Dark navy pill on gold banner */}
        <div className="flex items-center gap-1.5 flex-shrink-0 bg-navy-900 text-gold-300 px-2.5 py-0.5 rounded-full font-bold tracking-wide shadow-sm border border-gold-400/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
          </span>
          <Sparkles className="w-3 h-3 text-gold-300" />
          <span className="hidden sm:inline text-gold-200">{items[0]?.badge || 'Highlights'}</span>
        </div>

        {/* Dynamic Scrolling Marquee Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #b88a22, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #b88a22, transparent)' }}
          />

          <div className="animate-marquee py-0.5 whitespace-nowrap">
            {stream.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="inline-flex items-center gap-2 mx-6 text-navy-950 hover:text-black transition-colors font-bold hover:underline group cursor-pointer"
              >
                <span className="text-navy-950 font-bold tracking-tight">{item.text}</span>
                <span className="text-navy-900 font-extrabold opacity-60">✦</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Quick Contact on Desktop */}
        <div className="hidden md:flex items-center gap-3.5 flex-shrink-0 text-xs">
          <a
            href="tel:+919597100664"
            className="flex items-center gap-1 text-navy-950 hover:text-black transition-colors font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-navy-900" />
            <span>+91 95971 00664</span>
          </a>
          <a
            href="https://wa.me/919597100664"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white/90 text-[#075E54] hover:bg-white px-2 py-0.5 rounded-full font-bold shadow-xs transition-all"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
          <Link
            to="/gallery"
            className="flex items-center gap-1 text-navy-950 hover:text-black transition-colors font-extrabold underline"
          >
            <span>Photo Gallery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
