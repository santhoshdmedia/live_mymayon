import { Compass, Award } from 'lucide-react';
import Badge from '../ui/Badge';
import { Divider, FramedMedia, TriangleWatermark } from '../ui/Ornament';
import logo from '../../assets/logo.png';

const stats = [
  { number: '12+', label: 'Years Experience' },
  { number: '340', label: 'Tour Packages' },
  { number: '8.6k', label: 'Happy Travelers' },
  { number: '24', label: 'Awards Won' },
];

const AboutHero = () => {
  return (
    <section className="relative bg-cream overflow-hidden">
      <TriangleWatermark className="absolute -top-16 -left-28 w-[460px] h-[460px] opacity-[0.06]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge>Get To Know Us</Badge>
            <Divider className="my-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mt-1 mb-6 leading-tight">
              Journeys Curated With Heart,
              <br />
              Memories Made To Last
            </h1>
            <p className="text-navy-500 leading-relaxed mb-4">
              My Mayon began with a simple belief: a trip is only ever as good as the care behind
              it. Every itinerary we build is hand-assembled by travellers who've walked the route
              themselves, so what you get isn't a template — it's a story worth returning to.
            </p>
            <p className="text-navy-500 leading-relaxed mb-8">
              From quiet mountain trails to lantern-lit old towns, we pair local guides with a
              level of planning most travel agencies skip, so the only thing left for you to do is
              show up and be present.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 text-sm font-medium text-navy-700">
                <span className="w-2 h-2 rounded-full bg-gold-500" /> Trusted Guides
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-700">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Flexible Packages
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-700">
                <span className="w-2 h-2 rounded-full bg-navy-600" /> Reliable Tour Support
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-navy-100 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold-600">{s.number}</div>
                  <p className="text-sm text-navy-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <FramedMedia className="w-72 h-72 md:w-96 md:h-96">
              <div className="w-full h-full rounded-full bg-navy-radial ring-4 ring-gold-400/20 shadow-2xl flex items-center justify-center overflow-hidden">
                <img src={logo} alt="My Mayon crest" className="w-2/3 opacity-90" />
              </div>
            </FramedMedia>
            <div className="absolute top-2 right-2 md:top-6 md:right-4 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
              <Compass className="w-8 h-8 text-navy-900" />
            </div>
            <div className="absolute bottom-4 left-0 md:bottom-8 md:left-2 w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-navy-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
