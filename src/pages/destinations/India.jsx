import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';
import { TriangleWatermark } from '../../components/ui/Ornament';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const REGIONS = [
  { name: 'North India',  desc: 'Golden Triangle, Varanasi, Himalayas', color: '#1e2a46', packages: 12 },
  { name: 'South India',  desc: 'Kerala backwaters, Karnataka temples', color: '#1a4a3c', packages: 18 },
  { name: 'West India',   desc: 'Rajasthan forts, Goa beaches, Gujarat', color: '#74522a', packages: 10 },
  { name: 'East India',   desc: 'Kolkata heritage, Odisha temples, Darjeeling', color: '#883c53', packages: 8 },
  { name: 'North-East',   desc: 'Sikkim, Meghalaya, Arunachal Pradesh', color: '#2c5a4a', packages: 6 },
  { name: 'Islands',      desc: 'Andaman, Lakshadweep beach escapes', color: '#0a5c7a', packages: 4 },
];

const HIGHLIGHTS = [
  { title: 'Golden Triangle', location: 'Delhi · Agra · Jaipur', days: '6 days', price: '₹18,999' },
  { title: 'Kerala Backwaters & Beaches', location: 'Munnar · Alleppey · Kovalam', days: '7 days', price: '₹22,499' },
  { title: 'Varanasi Spiritual Journey', location: 'Varanasi · Prayagraj · Ayodhya', days: '5 days', price: '₹14,999' },
  { title: 'Rajasthan Heritage Circuit', location: 'Jaipur · Jodhpur · Udaipur', days: '8 days', price: '₹26,999' },
];

export default function India() {
  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Destinations · India</p>
          <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight">Incredible India, Curated for Every Traveller</h1>
          <p className="text-navy-100 max-w-xl text-lg leading-relaxed mb-8">
            From Himalayan monasteries to coastal temples — we craft India trips that go beyond the brochure.
          </p>
          <Link to="/packages?region=india"><Button size="lg">View India Packages <ArrowRight className="w-5 h-5" /></Button></Link>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Explore by Region" title="Every Corner of India Awaits" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {REGIONS.map((r) => (
              <Link key={r.name} to={`/packages?region=${r.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex">
                  <div className="w-3 flex-shrink-0 rounded-l-2xl" style={{ background: r.color }} />
                  <div className="p-5 flex-1">
                    <h3 className="font-bold text-navy-800 text-lg mb-1">{r.name}</h3>
                    <p className="text-navy-500 text-sm mb-3">{r.desc}</p>
                    <span className="text-xs font-bold text-gold-600">{r.packages} packages available →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Most Loved Trips" title="Popular India Packages" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} hover>
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">{h.days}</span>
                <h4 className="font-bold text-navy-800 mt-3 mb-1 leading-snug">{h.title}</h4>
                <p className="text-xs text-navy-500 mb-3">{h.location}</p>
                <p className="font-bold text-navy-800">From {h.price} <span className="text-xs font-normal text-navy-400">/ person</span></p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
