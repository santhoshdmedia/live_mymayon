import { MdTempleHindu } from 'react-icons/md';
import { Compass, Waves, Utensils, HeartHandshake, Globe } from 'lucide-react';

const FEATURES = [
  { icon: MdTempleHindu, label: 'Spiritual Circuits' },
  { icon: Compass,        label: 'Heritage Trails' },
  { icon: Waves,          label: 'Coastal Escapes' },
  { icon: Utensils,       label: 'Food & Culture' },
  { icon: HeartHandshake, label: 'Wellness Tours' },
  { icon: Globe,          label: 'International' },
];

export default function FeaturesStrip() {
  return (
    <section className="py-10 bg-white border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center group-hover:bg-gold-100 group-hover:border-gold-400 transition">
                <Icon className="w-5 h-5 text-gold-600" />
              </div>
              <span className="text-xs font-semibold text-navy-600 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
