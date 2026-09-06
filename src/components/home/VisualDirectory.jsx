import { Link } from 'react-router-dom';
import { Camera, Sparkles, ArrowRight, Landmark, TreePine, Utensils, Waves, Music, Scissors } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const VISUAL_NARRATIVES = [
  {
    category: 'Temple Architecture',
    caption: "Srirangam's celestial stone pillars — the world's largest functioning Hindu temple complex",
    tag: 'Sacred Engineering',
    icon: Landmark,
    gradient: 'from-[#1e2a46] via-[#2c3a5c] to-[#0a1a30]',
    accentColor: '#d4a737',
  },
  {
    category: 'Nature & Wildlife',
    caption: 'Elephant families at Anamalai Tiger Reserve — the biodiversity crown of the Western Ghats',
    tag: 'Rainforest Spine',
    icon: TreePine,
    gradient: 'from-[#1a382c] via-[#234d3d] to-[#0d221a]',
    accentColor: '#52c41a',
  },
  {
    category: 'Culinary Trail',
    caption: "The sacred banana leaf feast — a full-circle experience of Tamil Nadu's ancient food culture",
    tag: 'Epicurean Roots',
    icon: Utensils,
    gradient: 'from-[#4a2a16] via-[#633a20] to-[#26140a]',
    accentColor: '#fa8c16',
  },
  {
    category: 'Coastal Heritage',
    caption: "Mahabalipuram's Shore Temple — a Pallava masterpiece standing sentinel over the Bay of Bengal",
    tag: 'Pallava Stone Craft',
    icon: Waves,
    gradient: 'from-[#12314a] via-[#1a4466] to-[#091b29]',
    accentColor: '#13c2c2',
  },
  {
    category: 'Festival & Culture',
    caption: 'Bharatanatyam at Chettinad — where classical dance meets the grandeur of palatial heritage',
    tag: 'Living Natya',
    icon: Music,
    gradient: 'from-[#471830] via-[#5e2141] to-[#240c19]',
    accentColor: '#eb2f96',
  },
  {
    category: 'Artisan Crafts',
    caption: 'Kanchipuram silk weaving — an intergenerational craft of extraordinary finesse and devotion',
    tag: 'Pure Zari Weaves',
    icon: Scissors,
    gradient: 'from-[#3a204d] via-[#4d2c66] to-[#1f1029]',
    accentColor: '#722ed1',
  },
];

export default function VisualDirectory() {
  const ref = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-navy-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
            ✦ Visual Directory
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
            Tamil Nadu Through the Lens
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy-500 leading-relaxed">
            Six defining visual narratives that capture the soul of the 38-district expedition — from the stone filigree of ancient temples to the living colour of classical dance. Each photograph tells a story that no itinerary can fully contain.
          </p>
        </div>

        {/* 6 Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 scroll-reveal reveal-up">
          {VISUAL_NARRATIVES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className="group rounded-3xl overflow-hidden border border-navy-100/80 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative Visual Card Top */}
                <div className={`h-48 relative bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                  {/* Subtle decorative circles */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-700" />
                  
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20">
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gold-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="z-10">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold block mb-1">
                      Narrative 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-gold-200 transition-colors">
                      {item.category}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Caption */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-navy-600 leading-relaxed font-medium">
                    {item.caption}
                  </p>

                  <div className="mt-6 pt-4 border-t border-navy-100 flex items-center justify-between text-xs font-bold text-gold-600 group-hover:text-gold-700">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" /> View Curated Shoot
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Gallery */}
        <div className="text-center mt-12 scroll-reveal reveal-up">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy-900 text-gold-300 hover:bg-navy-800 hover:text-gold-200 text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300"
          >
            <span>Explore Full Photographic Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
