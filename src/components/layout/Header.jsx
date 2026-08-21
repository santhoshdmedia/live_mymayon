import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';
import Button from '../ui/Button';

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
  { to: '/blog',              label: 'Blog' },
  { to: '/partner',           label: 'Partner With Us' },
  { to: '/contact',           label: 'Contact' },
];

const DropMenu = ({ links, onClose }) => (
  <div className="absolute top-full left-0 mt-2 w-56 bg-navy-800 border border-gold-400/20 rounded-xl shadow-2xl py-2 z-50">
    {links.map((l) => (
      <NavLink key={l.to} to={l.to} onClick={onClose}
        className="block px-4 py-2.5 text-sm text-navy-100 hover:text-gold-300 hover:bg-navy-700/60 transition">
        {l.label}
      </NavLink>
    ))}
  </div>
);

export default function Header() {
  const [mob,  setMob]  = useState(false);
  const [dest, setDest] = useState(false);
  const [mDest, setMDest] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-800/95 backdrop-blur border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMob(false)}>
          <img src={logo} alt="My Mayon" className="w-10 h-10 rounded-full ring-1 ring-gold-400/50 object-cover" />
          <span className="font-display font-bold text-lg text-cream leading-none">
            My Mayon
            <span className="block font-accent italic text-xs text-gold-300 font-normal tracking-wide">Curated Memories</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {NAV.map((link) =>
            link.children ? (
              <div key="dest" className="relative" onMouseEnter={() => setDest(true)} onMouseLeave={() => setDest(false)}>
                <button className="flex items-center gap-1 text-sm font-medium text-navy-100 hover:text-gold-300 transition">
                  {link.label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dest ? 'rotate-180' : ''}`} />
                </button>
                {dest && <DropMenu links={link.children} onClose={() => setDest(false)} />}
              </div>
            ) : (
              <NavLink key={link.to} to={link.to}
                className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-gold-300' : 'text-navy-100 hover:text-gold-300'}`}>
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <Link to="/plan-my-trip" className="hidden lg:block flex-shrink-0">
          <Button size="sm">Plan My Trip</Button>
        </Link>

        <button className="lg:hidden text-cream" onClick={() => setMob((o) => !o)} aria-label="Toggle menu">
          {mob ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mob && (
        <div className="lg:hidden bg-navy-800 border-t border-gold-400/20 px-4 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          {NAV.map((link) =>
            link.children ? (
              <div key="dest-m">
                <button onClick={() => setMDest((o) => !o)}
                  className="w-full flex items-center justify-between py-2.5 text-navy-100 font-medium text-sm">
                  {link.label} <ChevronDown className={`w-4 h-4 transition-transform ${mDest ? 'rotate-180' : ''}`} />
                </button>
                {mDest && (
                  <div className="pl-4 flex flex-col gap-1 border-l border-gold-400/20 ml-1 mb-1">
                    {link.children.map((l) => (
                      <NavLink key={l.to} to={l.to} onClick={() => setMob(false)}
                        className="py-2 text-sm text-navy-200 hover:text-gold-300">{l.label}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} onClick={() => setMob(false)}
                className={({ isActive }) => `py-2.5 text-sm font-medium ${isActive ? 'text-gold-300' : 'text-navy-100 hover:text-gold-300'}`}>
                {link.label}
              </NavLink>
            )
          )}
          <div className="pt-2 border-t border-gold-400/20 mt-2">
            <Link to="/plan-my-trip" onClick={() => setMob(false)}>
              <Button size="sm" className="w-full">Plan My Trip</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
