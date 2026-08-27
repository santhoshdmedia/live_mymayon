import { Link } from 'react-router-dom';
import { Heart, Star, Users, MapPin } from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useScrollReveal from '../hooks/useScrollReveal';

const VALS = [
  { icon: Heart,   title: 'Rooted in Tamil Nadu',     desc: 'Every guide, every recommendation comes from people who grew up here.' },
  { icon: Star,    title: 'Curated, Not Generic',      desc: 'We handpick each hotel, guide and route — no cookie-cutter itineraries.' },
  { icon: Users,   title: 'Traveller First',           desc: 'Transparent pricing, no hidden charges, 24/7 support on every trip.' },
  { icon: MapPin,  title: 'Local Impact',              desc: 'We work exclusively with local partners to support community tourism.' },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2 animate-fade-in-down" style={{ animationDelay: '100ms' }}>About Us</p>
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>We Are My Mayon</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            Born in Chennai, obsessed with Tamil Nadu — we've been helping travellers discover the depth of this land since 2019.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="scroll-reveal reveal-left">
              <SectionTitle eyebrow="Our Story" title="Why My Mayon?" />
              <p className="text-navy-600 leading-relaxed mb-4">
                Tamil Nadu has over 33,000 temples, six UNESCO World Heritage Sites, and centuries of living tradition. Yet most travel platforms treat it as an afterthought — a list of five places between Madurai and Chennai.
              </p>
              <p className="text-navy-600 leading-relaxed mb-4">
                My Mayon was founded to change that. We believe every one of the 38 districts deserves its own chapter — its own temples, its own cuisine, its own stories. Our mission is to help every traveller find theirs.
              </p>
              <p className="text-navy-600 leading-relaxed">
                We're a small, passionate team of locals, travellers and culture enthusiasts. Every package we build is tested on the road before it's offered to you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '2019', label: 'Founded' },
                { number: '38',   label: 'Districts Covered' },
                { number: '12k+', label: 'Happy Travellers' },
                { number: '500+', label: 'Temple Circuits Planned' },
              ].map(({ number, label }, i) => (
                <div
                  key={label}
                  className="scroll-reveal reveal-scale bg-navy-800 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-gold-500/10 hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  <p className="text-3xl font-bold text-gold-400 mb-1">{number}</p>
                  <p className="text-navy-200 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-reveal reveal-up">
            <SectionTitle eyebrow="Our Values" title="What We Stand For" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {VALS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="scroll-reveal reveal-up"
                style={{ animationDelay: `${200 + i * 120}ms` }}
              >
                <Card hover className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="font-bold text-navy-800 mb-2">{title}</h3>
                  <p className="text-navy-500 text-sm">{desc}</p>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 scroll-reveal reveal-up" style={{ animationDelay: '600ms' }}>
            <Link to="/plan-my-trip"><Button size="lg">Plan Your Trip With Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
