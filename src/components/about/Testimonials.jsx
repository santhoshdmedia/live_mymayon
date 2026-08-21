import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Avatar from '../ui/Avatar';
import { TriangleWatermark } from '../ui/Ornament';

const reviews = [
  {
    name: 'Janet Rosario',
    trip: 'Bali Paradise Package',
    quote:
      "Every detail was handled before I even thought to ask. Our guide knew the coastline like a friend showing us their own backyard.",
  },
  {
    name: 'Marcus Webb',
    trip: 'Mountain Adventure Trek',
    quote:
      'The pace matched exactly what we asked for — challenging where we wanted it, relaxed where we needed it. Best-organised trip we\'ve taken.',
  },
  {
    name: 'Aiko Tanaka',
    trip: 'City Explorer, Kyoto',
    quote:
      'They folded in a tea ceremony we never would have found on our own. It became the highlight of the whole week.',
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const active = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section className="relative py-16 lg:py-24 bg-navy-radial text-cream overflow-hidden">
      <TriangleWatermark className="absolute -bottom-32 -right-24 w-[480px] h-[480px] opacity-10" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          eyebrow="Our Testimonials"
          title="Good Reviews By Clients"
          tone="onDark"
          description="A few words from travellers who let us plan their trip."
        />

        <div className="mt-14 bg-white/5 border border-gold-400/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <Quote className="w-10 h-10 text-gold-400 mb-6" />
          <p className="text-lg md:text-xl leading-relaxed text-navy-50 mb-8 min-h-[6rem]">
            "{active.quote}"
          </p>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <Avatar name={active.name} size={56} />
              <div>
                <p className="font-bold text-cream">{active.name}</p>
                <p className="text-sm text-gold-300">{active.trip}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="w-11 h-11 rounded-full border border-gold-400/40 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="w-11 h-11 rounded-full border border-gold-400/40 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
