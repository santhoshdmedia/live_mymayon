import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';
import { TriangleWatermark } from '../../components/ui/Ornament';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const COUNTRIES = [
  { name: 'Thailand',    emoji: '🇹🇭', highlight: 'Temples & beaches', from: '₹38,999' },
  { name: 'Singapore',   emoji: '🇸🇬', highlight: 'City & culture',    from: '₹42,999' },
  { name: 'Sri Lanka',   emoji: '🇱🇰', highlight: 'Heritage & safari', from: '₹29,999' },
  { name: 'Malaysia',    emoji: '🇲🇾', highlight: 'Rainforests & food',from: '₹35,999' },
  { name: 'Bali',        emoji: '🇮🇩', highlight: 'Hindu temples & rice terraces', from: '₹41,999' },
  { name: 'Nepal',       emoji: '🇳🇵', highlight: 'Himalayan treks',   from: '₹24,999' },
  { name: 'UAE/Dubai',   emoji: '🇦🇪', highlight: 'Desert & luxury',   from: '₹44,999' },
  { name: 'Vietnam',     emoji: '🇻🇳', highlight: 'Culture & cuisine', from: '₹39,999' },
];

export default function International() {
  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Destinations · International</p>
          <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight">Beyond Borders, Same Trusted Service</h1>
          <p className="text-navy-100 max-w-xl text-lg leading-relaxed mb-8">
            Take My Mayon's personal touch to Asia, the Middle East and beyond — visa assistance, airport transfers and 24/7 support included.
          </p>
          <Link to="/plan-my-trip?type=international"><Button size="lg">Plan an International Trip <ArrowRight className="w-5 h-5" /></Button></Link>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Popular Destinations" title="Where Would You Like to Go?" centered />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
            {COUNTRIES.map((c) => (
              <Card key={c.name} hover className="text-center">
                <span className="text-4xl mb-3 block">{c.emoji}</span>
                <h3 className="font-bold text-navy-800 text-base mb-1">{c.name}</h3>
                <p className="text-xs text-navy-500 mb-2">{c.highlight}</p>
                <p className="text-xs font-bold text-gold-600">From {c.from}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/plan-my-trip?type=international"><Button variant="secondary" size="lg">Request a Custom International Trip <ArrowRight className="w-5 h-5" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
