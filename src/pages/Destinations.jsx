import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';

const REGIONS = [
  { to: '/destinations/tamil-nadu',        emoji: '🛕', title: 'Tamil Nadu',        desc: '38 districts, 33,000 temples, six UNESCO sites — the heart of our work.', color: 'from-[#8A1F3B] to-[#C6992F]' },
  { to: '/destinations/india',             emoji: '🇮🇳', title: 'India',            desc: 'Golden Triangle to Kerala backwaters — curated trips across the subcontinent.', color: 'from-[#12294F] to-[#2C5AA0]' },
  { to: '/destinations/international',     emoji: '✈️', title: 'International',     desc: 'Thailand, Sri Lanka, Bali, Dubai and beyond — with the same personal service.', color: 'from-[#0a5c7a] to-[#1a4a3c]' },
  { to: '/destinations/district-explorer', emoji: '🗺️', title: '38 District Explorer', desc: 'Browse every Tamil Nadu district — filter by region, faith, season.', color: 'from-[#74522a] to-[#93692f]' },
];

export default function Destinations() {
  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Destinations</p>
          <h1 className="text-5xl font-bold mb-4">Where Would You Like to Go?</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg leading-relaxed">
            From a single temple town to a month across India — we plan every journey with the same personal attention.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Browse By Region" title="Choose Your Starting Point" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
            {REGIONS.map(r => (
              <Link key={r.to} to={r.to}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`bg-gradient-to-br ${r.color} p-8 h-full min-h-[200px] flex flex-col`}>
                  <span className="text-5xl mb-4">{r.emoji}</span>
                  <h2 className="text-2xl font-bold text-white mb-2">{r.title}</h2>
                  <p className="text-white/80 text-sm leading-relaxed flex-1">{r.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-gold-300 text-sm font-semibold mt-4 group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
