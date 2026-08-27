import { Link } from 'react-router-dom';
import { ChevronRight, Phone } from 'lucide-react';
import { TriangleWatermark } from '../ui/Ornament';
import StatCard from '../ui/StatCard';
import Button from '../ui/Button';
import useScrollReveal from '../../hooks/useScrollReveal';

const STATS = [
  { number: '38',   label: 'Districts Covered' },
  { number: '500+', label: 'Temple Circuits' },
  { number: '12k+', label: 'Happy Travellers' },
  { number: '24h',  label: 'Itinerary Turnaround' },
];

export default function CTA() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-16 lg:py-24 bg-navy-radial text-cream overflow-hidden" ref={ref}>
      <TriangleWatermark className="absolute -bottom-24 -left-24 w-[420px] h-[420px] opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="scroll-reveal reveal-scale"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <StatCard number={s.number} label={s.label} />
              </div>
            ))}
          </div>
          <div className="scroll-reveal reveal-right" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Tell Us Where Your Heart Wants to Go
            </h2>
            <p className="text-lg text-navy-100 mb-8 leading-relaxed">
              Share your dates, interests and budget. Our travel desk replies within
              24 hours with a personalised itinerary — at no cost, no obligation.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="tel:+919597100664">
                <Button variant="ghost" size="lg">
                  <Phone className="w-5 h-5" /> Call Us
                </Button>
              </a>
              <Link to="/plan-my-trip">
                <Button size="lg">
                  Start Planning <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
