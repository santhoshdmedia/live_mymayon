import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { TriangleWatermark } from '../components/ui/Ornament';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CIRCUITS = [
  { name: 'Arupadai Veedu',         temples: 6,   desc: 'Six abodes of Lord Murugan — Palani, Swamimalai, Tiruchendur, Thirupparamkunram, Thiruthani, Pazhamudircholai.' },
  { name: 'Navagraha Temples',       temples: 9,   desc: 'Nine Shiva temples near Kumbakonam, each presided by a planet deity. Best done over 2 days.' },
  { name: 'Pancha Bhoota Sthalam',   temples: 5,   desc: 'Five Shiva shrines representing earth, water, fire, air and sky — Chidambaram to Thiruvanaikaval.' },
  { name: 'Divya Desam',             temples: 108, desc: '108 Vishnu temples praised by the Alvars. Most are in Tamil Nadu — a lifetime of pilgrimage.' },
  { name: 'Paadal Petra Sthalams',   temples: 276, desc: 'Shiva temples glorified by the Nayanmars. The greatest circuit in Tamil Nadu for Shaivites.' },
  { name: 'Saptha Vidanga Sthalams', temples: 7,   desc: 'Seven Shiva temples of the Kaveri delta region, each with a unique characteristic of Shiva.' },
];

const FESTIVALS = [
  { name: 'Thaipusam',      location: 'Palani, Tiruchendur', month: 'January–February' },
  { name: 'Panguni Uthiram',location: 'Kumbakonam, Madurai', month: 'March–April' },
  { name: 'Aadi Pooram',    location: 'Madurai Meenakshi',   month: 'July–August' },
  { name: 'Karthigai Deepam',location: 'Thiruvannamalai',   month: 'November–December' },
  { name: 'Chithirai Festival', location: 'Madurai',         month: 'April–May' },
  { name: 'Float Festival',  location: 'Madurai',            month: 'January' },
];

export default function SpiritualTourism() {
  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Spiritual Tourism</p>
          <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight">Where Every Step Is a Prayer</h1>
          <p className="text-navy-100 max-w-xl text-lg leading-relaxed mb-8">
            Tamil Nadu's sacred circuits have guided pilgrims for over two millennia. Let us plan your darshan — from the first gopuram to the final prasadam.
          </p>
          <Link to="/packages?type=spiritual"><Button size="lg">Explore Spiritual Packages <ArrowRight className="w-5 h-5" /></Button></Link>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Sacred Circuits" title="Plan Your Pilgrimage" description="Each circuit is a complete spiritual journey. We handle stays, transport and guide — you focus on the divine." centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {CIRCUITS.map((c) => (
              <Card key={c.name} hover className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold-50 rounded-bl-full opacity-50" />
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">{c.temples} temples</span>
                <h3 className="font-bold text-navy-800 text-lg mt-3 mb-2">{c.name}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{c.desc}</p>
                <Link to={`/packages?circuit=${encodeURIComponent(c.name)}`} className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold mt-4 hover:gap-2 transition-all">
                  See packages <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Festival Calendar" title="Time Your Visit for a Festival" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {FESTIVALS.map((f) => (
              <div key={f.name} className="flex gap-4 bg-cream border border-navy-100 rounded-2xl p-5">
                <div className="w-2 rounded-full bg-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-navy-800 mb-0.5">{f.name}</h4>
                  <p className="text-xs text-navy-500">{f.location}</p>
                  <p className="text-xs text-gold-600 font-semibold mt-1">{f.month}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/plan-my-trip?type=spiritual"><Button size="lg">Plan a Festival Trip <ArrowRight className="w-5 h-5" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
