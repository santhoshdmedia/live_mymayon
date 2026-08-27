import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useScrollReveal from '../hooks/useScrollReveal';

const EXP = [
  { emoji:'🏛️', tag:'Heritage',   title:'Big Temple Trail',         location:'Thanjavur',      desc:'Walk inside Chola architecture — 1,000-year-old granite carved by hand.',        days:'2 days', price:'₹6,499' },
  { emoji:'🌊', tag:'Coastal',    title:'Sunrise at Kanyakumari',   location:'Kanyakumari',    desc:'Watch the sun rise over three seas from the southernmost tip of India.',          days:'1 day',  price:'₹2,999' },
  { emoji:'🍛', tag:'Food',       title:'Chettinad Kitchen Trail',  location:'Karaikudi',      desc:'Cook and taste the legendary Chettinad cuisine with a local family.',            days:'2 days', price:'₹5,499' },
  { emoji:'🏔️', tag:'Nature',    title:'Nilgiri Morning Trek',     location:'Ooty',           desc:'Mist-covered meadows, shola forests and a sunrise that never gets old.',         days:'1 day',  price:'₹2,199' },
  { emoji:'🎭', tag:'Culture',    title:'Bharatanatyam Evening',    location:'Chennai',        desc:'A live Bharatanatyam performance followed by a backstage meeting with artists.',  days:'Half day', price:'₹1,499' },
  { emoji:'🛶', tag:'Coastal',    title:'Pichavaram Mangrove Row',  location:'Cuddalore',     desc:'Row a wooden boat through one of India\'s largest mangrove forests at dawn.',     days:'Half day', price:'₹1,299' },
  { emoji:'🕌', tag:'Heritage',   title:'French Quarter Walk',      location:'Pondicherry',    desc:'A guided walk through the colonial Rue de la Marine and its hidden courtyards.',  days:'Half day', price:'₹999'  },
  { emoji:'🌿', tag:'Wellness',   title:'Siddha Wellness Retreat',  location:'Palani',         desc:'Two nights at a traditional Siddha healing centre near the Murugan hill.',       days:'3 days', price:'₹9,999' },
];

const TAGS = ['All','Heritage','Coastal','Food','Nature','Culture','Wellness'];

import { useState } from 'react';
export default function Experiences() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? EXP : EXP.filter(e => e.tag === active);
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2 animate-fade-in-down" style={{ animationDelay: '100ms' }}>Experiences</p>
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Moments That Stay Forever</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            Beyond sightseeing — immersive half-days and multi-day experiences designed around what makes Tamil Nadu unique.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-lg border-b border-navy-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {TAGS.map(t => (
            <button key={t} onClick={() => setActive(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                active === t ? 'bg-gold-500 text-navy-900 border-gold-500 shadow-lg shadow-gold-500/20' : 'border-navy-200 text-navy-600 hover:border-gold-400 hover:text-gold-600'
              }`}>{t}</button>
          ))}
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((e, i) => (
              <div
                key={e.title}
                className="scroll-reveal reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Card hover className="flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center text-2xl mb-4">{e.emoji}</div>
                  <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full self-start mb-2">{e.tag}</span>
                  <h3 className="font-bold text-navy-800 mb-1 leading-snug">{e.title}</h3>
                  <p className="text-xs text-navy-500 mb-1">{e.location} · {e.days}</p>
                  <p className="text-sm text-navy-500 leading-relaxed flex-1">{e.desc}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy-100">
                    <span className="font-bold text-navy-800">{e.price}</span>
                    <Link to={`/plan-my-trip?experience=${encodeURIComponent(e.title)}`}
                      className="text-gold-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Book <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-reveal reveal-up">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">Can't find what you're looking for?</h2>
            <p className="text-navy-500 mb-8">We craft bespoke experiences on request — just tell us what you have in mind.</p>
            <Link to="/plan-my-trip"><Button size="lg">Request a Custom Experience <ArrowRight className="w-5 h-5" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
