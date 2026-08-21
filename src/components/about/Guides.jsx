import SectionTitle from '../ui/SectionTitle';
import Avatar from '../ui/Avatar';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const guides = [
  { name: 'Arjun Menon', role: 'Trekking Lead' },
  { name: 'Priya Nair', role: 'Cultural Guide' },
  { name: 'Daniel Cruz', role: 'Marine Expeditions' },
  { name: 'Meera Kapoor', role: 'Client Experience' },
];

const Guides = () => {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Travellers"
          title="Meet Our Excellent Guides"
          description="Local experts who've walked the trail before you, so nothing about your trip is a guess."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {guides.map((g) => (
            <div
              key={g.name}
              className="bg-white rounded-2xl border border-navy-100 p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Avatar name={g.name} size={88} className="mx-auto mb-4" />
              <h4 className="font-bold text-navy-800">{g.name}</h4>
              <p className="text-xs text-gold-600 font-semibold uppercase tracking-wide mt-1 mb-4">{g.role}</p>
              <div className="flex justify-center gap-3 text-navy-300">
                <Instagram className="w-4 h-4 hover:text-gold-500 transition-colors cursor-pointer" />
                <Twitter className="w-4 h-4 hover:text-gold-500 transition-colors cursor-pointer" />
                <Linkedin className="w-4 h-4 hover:text-gold-500 transition-colors cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guides;
