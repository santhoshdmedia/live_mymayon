import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import SecondaryNav from './SecondaryNav';

const DEST_LINKS = [
  { to: '/destinations/tamil-nadu',        label: 'Tamil Nadu' },
  { to: '/destinations/india',             label: 'India' },
  { to: '/destinations/international',     label: 'International' },
  { to: '/destinations/district-explorer', label: '38 District Explorer' },
];

const NAV = [
  { label: 'Destinations', children: DEST_LINKS },
  { to: '/spiritual-tourism', label: 'Spiritual Tourism' },
  { to: '/packages',          label: 'Tour Packages' },
  { to: '/experiences',       label: 'Experiences' },
  { to: '/gallery',           label: 'Gallery' },
  { to: '/blog',              label: 'Blog' },
  { to: '/partner',           label: 'Partner With Us' },
  { to: '/contact',           label: 'Contact' },
];

const DropMenu = ({ links, onClose, onMouseEnter, onMouseLeave }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-64"
  >
    {/* Invisible hover bridge ensuring mouse doesn't lose hover across gaps */}
    <div className="absolute -top-3 left-0 right-0 h-5 bg-transparent" />
    <div className="animate-dropdown-in bg-[#0a1a30] border border-gold-400/30 rounded-2xl shadow-2xl shadow-navy-950/80 py-2.5 overflow-hidden">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          onClick={onClose}
          className={({ isActive }) =>
            `block px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-gold-300 bg-gold-500/20 font-semibold border-l-2 border-gold-400 pl-6'
                : 'text-white/90 hover:text-gold-300 hover:bg-white/5 hover:pl-6'
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  </div>
);

export default function Header() {
  const [mob, setMob]           = useState(false);
  const [dest, setDest]         = useState(false);
  const [mDest, setMDest]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimeoutRef         = useRef(null);
  const location                = useLocation();

  const handleMouseEnterDest = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setDest(true);
  };

  const handleMouseLeaveDest = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setDest(false);
    }, 150);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMob(false);
    setMDest(false);
    setDest(false);
  }, [location.pathname]);

  // Lock body scrolling when full-screen mobile menu is open
  useEffect(() => {
    if (mob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mob]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  // Scroll listener for compact bar transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Secondary Marquee Navigation Bar */}
      <SecondaryNav />

      {/* Main Luxury Navigation Bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-out bg-[#0a1a30] border-b border-gold-400/20 shadow-xl shadow-navy-950/20 ${
          scrolled ? 'py-2.5 shadow-2xl shadow-navy-950/40 bg-[#060f1e]' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            onClick={() => setMob(false)}
          >
            <div className="relative">
              <img
                src={logo}
                alt="My Mayon"
                className="w-10 h-10 rounded-full ring-2 ring-gold-400/60 group-hover:ring-gold-400 object-cover transition-all duration-300 group-hover:scale-105 shadow-md shadow-gold-500/20"
              />
              <div className="absolute inset-0 rounded-full bg-gold-400/0 group-hover:bg-gold-400/10 transition-colors duration-300" />
            </div>
            <span className="font-display font-bold text-lg text-white leading-none tracking-tight">
              My Mayon
              <span className="block font-accent italic text-xs text-gold-300 font-normal tracking-wider mt-0.5">
                Curated Memories
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV.map((link) =>
              link.children ? (
                <div
                  key="dest"
                  className="relative px-3 py-2"
                  onMouseEnter={handleMouseEnterDest}
                  onMouseLeave={handleMouseLeaveDest}
                >
                  <button
                    type="button"
                    onClick={() => setDest((d) => !d)}
                    className="nav-link-underline flex items-center gap-1.5 text-sm font-medium text-white hover:text-gold-300 transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gold-400 transition-transform duration-300 ${dest ? 'rotate-180 text-gold-300' : ''}`} />
                  </button>
                  {dest && (
                    <DropMenu
                      links={link.children}
                      onClose={() => setDest(false)}
                      onMouseEnter={handleMouseEnterDest}
                      onMouseLeave={handleMouseLeaveDest}
                    />
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link-underline px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-gold-300 font-semibold active'
                        : 'text-white hover:text-gold-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link to="/plan-my-trip">
              <button className="relative overflow-hidden px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl hover:shadow-gold-500/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 cursor-pointer">
                <span className="relative z-10 font-bold tracking-wide">Plan My Trip</span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                  style={{ backgroundSize: '200% 100%' }}
                />
              </button>
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            className="lg:hidden p-2 rounded-xl text-white hover:text-gold-300 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setMob(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      {mob && (
        <div className="fixed inset-0 z-[100] bg-[#071426] text-cream flex flex-col justify-between p-6 sm:p-8 animate-fade-in overflow-y-auto">
          {/* Top Bar inside overlay */}
          <div className="flex items-center justify-between border-b border-gold-400/20 pb-4">
            <Link to="/" onClick={() => setMob(false)} className="flex items-center gap-3">
              <img
                src={logo}
                alt="My Mayon"
                className="w-10 h-10 rounded-full ring-2 ring-gold-400/60 object-cover"
              />
              <span className="font-display font-bold text-xl text-white">
                My Mayon
                <span className="block font-accent italic text-xs text-gold-300 font-normal">
                  Curated Memories
                </span>
              </span>
            </Link>
            <button
              onClick={() => setMob(false)}
              aria-label="Close menu"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 border border-gold-400/30 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Nav Links in large aesthetic typography */}
          <div className="py-8 flex flex-col gap-4 max-w-md w-full mx-auto">
            {NAV.map((link, idx) =>
              link.children ? (
                <div
                  key="dest-mob"
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <button
                    onClick={() => setMDest((o) => !o)}
                    className="w-full flex items-center justify-between py-2 text-2xl font-display font-bold text-white hover:text-gold-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-6 h-6 text-gold-400 transition-transform duration-300 ${mDest ? 'rotate-180' : ''}`} />
                  </button>
                  {mDest && (
                    <div className="pl-4 mt-3 flex flex-col gap-2.5 border-l-2 border-gold-400/50 ml-2 animate-slide-down">
                      {link.children.map((l) => (
                        <NavLink
                          key={l.to}
                          to={l.to}
                          onClick={() => setMob(false)}
                          className={({ isActive }) =>
                            `py-2 px-3 text-base rounded-xl font-medium transition-all ${
                              isActive
                                ? 'text-gold-300 bg-gold-500/20 font-bold border border-gold-400/30'
                                : 'text-slate-200 hover:text-gold-300 hover:bg-white/5'
                            }`
                          }
                        >
                          {l.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMob(false)}
                  className={({ isActive }) =>
                    `animate-fade-in-up flex items-center justify-between py-2 text-2xl font-display font-bold transition-all ${
                      isActive
                        ? 'text-gold-400 translate-x-2'
                        : 'text-white hover:text-gold-300 hover:translate-x-2'
                    }`
                  }
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-gold-400" />
                </NavLink>
              )
            )}
          </div>

          {/* Bottom Section: Plan CTA + Contact + Socials */}
          <div className="pt-6 border-t border-gold-400/20 max-w-md w-full mx-auto space-y-6">
            <Link to="/plan-my-trip" onClick={() => setMob(false)}>
              <button className="w-full relative overflow-hidden py-3.5 px-6 rounded-full text-base font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="relative z-10 font-bold tracking-wide">Plan My Trip</span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                  style={{ backgroundSize: '200% 100%' }}
                />
              </button>
            </Link>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gold-200">
              <a href="tel:+919597100664" className="flex items-center gap-2 hover:text-gold-300 transition-colors font-medium">
                <Phone className="w-4 h-4 text-gold-400" /> +91 95971 00664
              </a>
              <a href="mailto:hello@mymayon.com" className="flex items-center gap-2 hover:text-gold-300 transition-colors font-medium">
                <Mail className="w-4 h-4 text-gold-400" /> hello@mymayon.com
              </a>
            </div>

            {/* Social Media Row */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/919597100664"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/mymayon_travel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/mymayon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@mymayon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
