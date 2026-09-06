import { useState } from 'react';
import { TreePine, Utensils, Shield, Fish, Compass, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const WILDLIFE_RESERVES = [
  {
    name: 'Anamalai Tiger Reserve',
    location: 'Pollachi, Coimbatore',
    size: '1,479 sq km sanctuary',
    desc: 'Biodiversity crown hosting Bengal tigers, leopards, and the largest wild Asian elephant population in Asia.',
    badge: 'Elephant Stronghold',
    accent: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    name: 'Mudumalai National Park',
    location: 'Nilgiris Highlands',
    size: 'UNESCO Biosphere Reserve',
    desc: 'Renowned for frequent wild elephant sightings, massive Gaur herds, sloth bears, and secluded jungle eco-lodges.',
    badge: 'Nilgiri Biosphere',
    accent: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  {
    name: 'Kalakad-Mundanthurai Tiger Reserve',
    location: 'Tenkasi & Tirunelveli',
    size: 'Southern Western Ghats',
    desc: 'Celebrated as the "Biodiversity Museum" of South Asia with 150+ endemic botanical species and Shola cloud forests.',
    badge: 'Living Museum',
    accent: 'bg-green-50 text-green-800 border-green-200',
  },
  {
    name: 'Gulf of Mannar Marine Park',
    location: 'Thoothukudi & Ramanathapuram',
    size: 'India’s 1st Marine Biosphere',
    desc: '21 pristine coral islands protecting endangered dugongs (sea cows), olive ridley turtles, and living coral reefs.',
    badge: 'Marine Frontier',
    accent: 'bg-blue-50 text-blue-800 border-blue-200',
  },
];

const CULINARY_REGIONS = [
  {
    region: 'North Tamil Nadu',
    highlight: 'Chennai to Kanchipuram',
    dishes: [
      { name: 'Chennai Kothu Parotta', note: 'Shredded flaky flatbread tossed on roaring iron tawa with spiced salna' },
      { name: 'Kanchipuram Idli', note: 'Traditional temple-steamed rice cake infused with coarse black pepper, cumin & ginger' },
      { name: 'Chettinad Pepper Crab', note: 'Fresh coastal crab simmered in freshly crushed tellicherry pepper and kalpasi' },
    ],
    accent: 'from-amber-500/10 to-amber-500/5 border-amber-300',
  },
  {
    region: 'Delta & Central',
    highlight: 'Thanjavur & Kaveri Basin',
    dishes: [
      { name: 'Thanjavur Degree Coffee', note: 'Pure drip-decoction cow milk brew served in brass dabara and tumbler' },
      { name: 'Chidambaram Poricha Kuzhambu', note: 'Heirloom roasted lentil and country vegetable stew seasoned with pure ghee' },
      { name: 'Kaveri Delta Prawn Biryani', note: 'Short-grain seeraga samba rice infused with fresh freshwater prawns' },
    ],
    accent: 'from-teal-500/10 to-teal-500/5 border-teal-300',
  },
  {
    region: 'Western Highlands',
    highlight: 'Nilgiris & Kongu Nadu',
    dishes: [
      { name: 'Nilgiri Orthodox Tea', note: 'Boutique single-estate orthodox black tea plucked above 2,000 metres' },
      { name: 'Badaga Millet Porridge', note: 'Ancient tribal finger-millet gruel served with wild forest honey and country greens' },
      { name: 'Ooty Belgian-Style Chocolates', note: 'Handcrafted artisan truffles made in colonial heritage kitchens' },
    ],
    accent: 'from-emerald-500/10 to-emerald-500/5 border-emerald-300',
  },
  {
    region: 'Deep South',
    highlight: 'Madurai to Kanyakumari',
    dishes: [
      { name: 'Madurai Jigarthanda', note: 'Legendary chilled royal elixir of almond gum, reduced milk, nannari & basundi' },
      { name: 'Tirunelveli Wheat Halwa', note: 'Decadent slow-stirred fermented wheat milk pudding glistening in golden ghee' },
      { name: 'Nanjil Palm Jaggery Sweets', note: 'Kanyakumari black rice Karuppu Kavuni pudding sweetened with palm sugar' },
    ],
    accent: 'from-purple-500/10 to-purple-500/5 border-purple-300',
  },
];

export default function WildAndCulinary() {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState('wild');

  return (
    <section className="py-20 lg:py-28 bg-cream/40 border-b border-navy-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-8 scroll-reveal reveal-up">
          <div className="inline-flex p-1.5 rounded-full bg-navy-950 border border-gold-400/40 shadow-xl">
            <button
              type="button"
              onClick={() => setActiveTab('wild')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'wild'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <TreePine className="w-4 h-4" />
              <span>Wild Tamil Nadu (Eco & Adventure)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('culinary')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'culinary'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>38-District Feast (Culinary Journey)</span>
            </button>
          </div>
        </div>

        {/* View 1: Wild Tamil Nadu */}
        {activeTab === 'wild' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                ✦ 5 Tiger Reserves · 2 UNESCO Biospheres
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 mt-2">
                Wild Tamil Nadu: Reserves, Rivers & Ridgelines
              </h2>
              <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
                Tamil Nadu's ecological heritage is as staggering as its cultural one. The Western Ghats — listed among the world's eight "hottest biodiversity hotspots" by Conservation International — form the mountainous spine harboring the lion-tailed macaque, Nilgiri tahr, gaur, and sloth bear.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WILDLIFE_RESERVES.map((res) => (
                <div
                  key={res.name}
                  className="bg-white rounded-3xl p-6 border border-navy-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${res.accent}`}>
                        {res.badge}
                      </span>
                      <TreePine className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-lg font-display">{res.name}</h3>
                    <span className="text-xs font-semibold text-gold-600 block mt-1">{res.location}</span>
                    <span className="text-[11px] text-navy-400 block mt-0.5">{res.size}</span>
                    <p className="text-xs text-navy-600 leading-relaxed mt-3">{res.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-navy-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Guided Jeep Safari</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Culinary Journey */}
        {activeTab === 'culinary' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                ✦ Four Regional Flavor Quadrants
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 mt-2">
                A Feast Across 38 Districts
              </h2>
              <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
                Tamil Nadu's culinary geography is as diverse and layered as its temple architecture — from the rice-and-lentil abundance of the Kaveri delta to the spice-volcanic Chettinad preparations and coconut-rich southern coastal curries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CULINARY_REGIONS.map((c) => (
                <div
                  key={c.region}
                  className={`bg-white rounded-3xl p-6 border shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${c.accent}`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-gold-700 uppercase tracking-widest block mb-1">
                      {c.highlight}
                    </span>
                    <h3 className="font-bold text-navy-900 text-lg font-display mb-4">{c.region}</h3>
                    <div className="space-y-3.5">
                      {c.dishes.map((dish) => (
                        <div key={dish.name} className="border-b border-navy-100/50 pb-2.5 last:border-none">
                          <span className="font-bold text-xs text-navy-900 block flex items-center gap-1.5">
                            <span className="text-gold-500">✦</span> {dish.name}
                          </span>
                          <span className="text-[11px] text-navy-500 leading-snug block mt-0.5">{dish.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-100 flex items-center justify-between text-xs font-bold text-gold-600">
                    <span>Curated Food Trail</span>
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
