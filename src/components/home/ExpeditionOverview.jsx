import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, MapPin, Landmark, Calendar, FileText } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import BrochureGuideModal from './BrochureGuideModal';

const STAT_PILLARS = [
  {
    count: '38',
    title: 'Districts',
    desc: 'Spanning 4 distinct geographic regions',
    color: 'from-orange-500/20 to-amber-500/10 border-amber-500/40 text-amber-600',
    badge: 'Statewide Scope',
  },
  {
    count: '9',
    title: 'UNESCO Sites',
    desc: 'World Heritage monuments & railways',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-600',
    badge: 'Living Heritage',
  },
  {
    count: '4',
    title: 'Travel Circuits',
    desc: 'Northern, Delta, Western & Southern',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-600',
    badge: 'Curated Trails',
  },
  {
    count: '21',
    title: 'Days Max',
    desc: 'For the complete Royal Odyssey package',
    color: 'from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-600',
    badge: 'Royal Odyssey',
  },
];

export default function ExpeditionOverview() {
  const ref = useScrollReveal();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-cream via-[#faf6ee] to-white overflow-hidden border-b border-navy-100/60" ref={ref}>
        {/* Subtle patterned gold watermark background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 select-none"
          style={{
            backgroundImage: 'radial-gradient(#c6992f1f 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Header Tag & Main Title */}
          <div className="text-center max-w-4xl mx-auto scroll-reveal reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 text-gold-300 border border-gold-400/40 text-xs font-bold tracking-widest uppercase shadow-md mb-5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>✦ Land of Temples · Presented by My Mayon</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-navy-900 leading-[1.12] tracking-tight">
              My Mayon Tamil Nadu: <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-navy-900 via-gold-600 to-navy-900 bg-clip-text text-transparent">
                The Grand 38-District Expedition
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-xl font-accent italic text-gold-700 max-w-3xl mx-auto">
              A Comprehensive Cultural, Spiritual, Eco-Adventure & Culinary Itinerary across every corner of the Land of Temples
            </p>

            {/* Civilizational Journey Narrative */}
            <div className="mt-8 text-sm sm:text-base text-navy-600 leading-relaxed max-w-3xl mx-auto space-y-3 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gold-400/20 shadow-xl shadow-gold-500/5">
              <p>
                <strong className="text-navy-900 font-semibold">Tamil Nadu is not merely a destination — it is a civilizational journey.</strong> Home to 38 distinct districts, each pulsing with its own rhythm of heritage, landscape, cuisine, and spiritual energy, this southernmost jewel of the Indian subcontinent commands a level of exploration that few destinations on earth can rival.
              </p>
              <p className="text-navy-500 text-xs sm:text-sm">
                From the soaring Dravidian gopurams of Madurai to the misty tea gardens of the Nilgiris, from the Chola bronze workshops of Thanjavur to the sun-kissed shoreline of Kanyakumari — Tamil Nadu is an odyssey unto itself. My Mayon curates this grand expedition with the precision of a connoisseur and the soul of a storyteller.
              </p>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link to="/plan-my-trip">
                  <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span>Plan Your Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-navy-900 text-white hover:bg-navy-800 border border-gold-400/30 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>Download Expedition Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Key Stat Pillars (Page 2 of PDF) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {STAT_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="scroll-reveal reveal-up group relative rounded-3xl p-6 bg-white border border-navy-100 hover:border-gold-400/50 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 uppercase tracking-wider border border-navy-100 group-hover:bg-gold-500/15 group-hover:text-gold-700 transition-colors">
                    {pillar.badge}
                  </span>
                  <Compass className="w-4 h-4 text-gold-500 group-hover:rotate-45 transition-transform duration-500" />
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold font-display text-navy-950 tracking-tight">
                      {pillar.count}
                    </span>
                    <span className="text-lg font-bold text-navy-800 font-display">
                      {pillar.title}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-navy-500 leading-snug">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-100/60 flex items-center justify-between text-xs text-gold-600 font-semibold group-hover:text-gold-700">
                  <span>Explore Circuit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Expedition Dossier Modal */}
      <BrochureGuideModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
