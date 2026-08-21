import { Flag, MapPin, HeartHandshake, ShieldCheck } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const features = [
  {
    icon: Flag,
    title: 'Tell Us Your Story',
    desc: 'Share what kind of trip you\'re dreaming of, and we\'ll shape the whole plan around it.',
    meta: '340+ Trips Planned',
  },
  {
    icon: MapPin,
    title: 'Pick Your Places',
    desc: 'From hidden villages to famous coastlines, tell us where you want to go — or let us suggest.',
    meta: '60+ Destinations',
  },
  {
    icon: HeartHandshake,
    title: 'Share Your Style',
    desc: 'Slow and quiet, or packed and adventurous — we tailor pace and comfort to how you travel.',
    meta: '98% Return Rate',
  },
  {
    icon: ShieldCheck,
    title: 'Travel, Fully Supported',
    desc: 'A dedicated guide and round-the-clock support, so help is always one call away.',
    meta: '24/7 Support',
  },
];

const AboutFeatures = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="How We Plan Together"
          title="Find Your Travel Perfection"
          description="A simple four-step rhythm that turns a rough idea into a fully-guided journey."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((f) => (
            <Card key={f.title} hover className="text-left">
              <div className="w-14 h-14 rounded-xl bg-navy-800 flex items-center justify-center mb-5 ring-1 ring-gold-400/30">
                <f.icon className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">{f.title}</h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-4">{f.desc}</p>
              <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">{f.meta}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
