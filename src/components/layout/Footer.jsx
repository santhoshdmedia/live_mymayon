import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/logo.png';
import { Divider } from '../ui/Ornament';

const COL = [
  {
    heading: 'Destinations',
    links: [
      { to: '/destinations/tamil-nadu',        label: 'Tamil Nadu' },
      { to: '/destinations/india',             label: 'India' },
      { to: '/destinations/international',     label: 'International' },
      { to: '/destinations/district-explorer', label: '38 District Explorer' },
    ],
  },
  {
    heading: 'Travel',
    links: [
      { to: '/spiritual-tourism', label: 'Spiritual Tourism' },
      { to: '/packages',          label: 'Tour Packages' },
      { to: '/experiences',       label: 'Experiences' },
      { to: '/blog',              label: 'Blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about',   label: 'About Us' },
      { to: '/partner', label: 'Partner With Us' },
      { to: '/contact', label: 'Contact' },
      { to: '/plan-my-trip', label: 'Plan My Trip' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200 border-t border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="My Mayon" className="w-10 h-10 rounded-full ring-1 ring-gold-400/50 object-cover" />
              <span className="font-display font-bold text-cream text-lg">My Mayon</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Memorable journeys, curated memories — your trusted partner for spiritual circuits and cultural escapes across Tamil Nadu.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+919597100664" className="flex items-center gap-2 hover:text-gold-300 transition">
                <Phone className="w-4 h-4 text-gold-400" /> +91 98765 43210
              </a>
              <a href="mailto:hello@mymayon.com" className="flex items-center gap-2 hover:text-gold-300 transition">
                <Mail className="w-4 h-4 text-gold-400" /> hello@mymayon.com
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                Chennai, Tamil Nadu, India
              </span>
            </div>
          </div>

          {/* Link columns */}
          {COL.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display font-bold text-gold-300 mb-4">{col.heading}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-gold-300 transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="mx-auto mb-8" tone="light" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-navy-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} My Mayon Travel Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: '#', icon: Facebook, label: 'Facebook' },
              { href: '#', icon: Instagram, label: 'Instagram' },
              { href: '#', icon: Youtube,   label: 'YouTube' },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-8 h-8 rounded-full border border-gold-400/30 flex items-center justify-center text-navy-300 hover:text-gold-300 hover:border-gold-400 transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
