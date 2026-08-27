import { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaPlus } from 'react-icons/fa';

const PHONE = '919597100664';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mymayon_travel/',
    icon: FaInstagram,
    bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
    hoverBg: 'hover:shadow-pink-400/40',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mymayon',
    icon: FaFacebookF,
    bg: 'bg-[#1877F2]',
    hoverBg: 'hover:shadow-blue-500/40',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@mymayon',
    icon: FaYoutube,
    bg: 'bg-[#FF0000]',
    hoverBg: 'hover:shadow-red-500/40',
  },
];

export default function FloatingSocial() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed right-4 bottom-6 z-[60] flex flex-col items-center gap-3">
      {/* Social icons — visible on desktop, toggle on mobile */}
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-500 ${
          expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto'
        }`}
      >
        {SOCIALS.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`social-icon-wrap relative animate-slide-in-right w-11 h-11 rounded-full ${s.bg} text-white flex items-center justify-center shadow-lg ${s.hoverBg} hover:shadow-xl hover:scale-110 transition-all duration-300`}
            style={{ animationDelay: `${(SOCIALS.length - i) * 100 + 400}ms` }}
          >
            <span className="social-tooltip">{s.label}</span>
            <s.icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Mobile expand toggle — visible only on small screens */}
      <button
        onClick={() => setExpanded((o) => !o)}
        aria-label="Toggle social links"
        className={`lg:hidden w-10 h-10 rounded-full bg-navy-800 text-cream flex items-center justify-center shadow-lg transition-transform duration-300 ${
          expanded ? 'rotate-45' : ''
        }`}
      >
        <FaPlus className="w-4 h-4" />
      </button>

      {/* WhatsApp — always visible, primary CTA */}
      <a
        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hi My Mayon! I'd like to plan a trip.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="animate-slide-in-right animate-pulse-glow w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        style={{ animationDelay: '200ms' }}
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}
