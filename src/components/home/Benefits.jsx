import { Star, Users, MapPin, Phone } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const BENEFITS = [
  { icon: Star,    title: 'Local Expertise',     desc: '38 districts mapped by people who grew up on this soil.' },
  { icon: Users,   title: 'Expert Local Guides', desc: 'Verified guides who know every temple, trail and taste.' },
  { icon: MapPin,  title: 'Curated Itineraries', desc: 'Handpicked destinations — no cookie-cutter templates.' },
  { icon: Phone,   title: '24/7 Travel Support', desc: 'From enquiry to darshan, we stay with you every step.' },
];

export default function Benefits() {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Why Travel With Us"
          title="Premium Doesn't Mean Impersonal"
          description="We combine the warmth of local knowledge with the reliability of organised travel."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <Card key={title} hover>
              <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">{title}</h3>
              <p className="text-navy-500 text-sm leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
