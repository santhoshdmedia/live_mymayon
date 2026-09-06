import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Clock, Utensils, Landmark, ArrowRight, ShieldCheck, Camera, Coffee, Compass } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const CIRCUITS = [
  {
    id: 'circuit-a',
    code: 'CIRCUIT A',
    title: 'Madurai: The Cultural Soul of Tamil Nadu',
    region: 'Southern Arc',
    summary:
      'Madurai is one of the oldest continuously inhabited cities on earth — a living, breathing testament to 2,500 years of Tamil civilization. The city revolves around the cosmic axis of the Meenakshi Amman Temple, whose evening aarti draws thousands of devotees in a spectacle of fire, fragrance, and devotion unlike anything else in Asia.',
    highlights: [
      { name: 'Meenakshi Amman Temple', desc: '14 towering gopurams encrusted with 33,000 sculpted deities' },
      { name: 'Thirumalai Nayak Palace', desc: '17th-century Indo-Saracenic baroque grandeur and throne hall' },
      { name: 'Puthu Mandapam Silk Market', desc: 'Historic temple market for Kanchipuram sarees and temple jewelry' },
      { name: 'Gandhi Memorial Museum', desc: 'National freedom narrative housed in historic Rani Mangammal Palace' },
    ],
    culinary: [
      'Jigarthanda — iconic chilled milk-almond and basundi beverage',
      'Karpathu Kari — slow-cooked mutton delicacy at legendary Amma Mess',
      'South Indian filter coffee & piping hot idiyappam at Murugan Idli Shop',
    ],
    timeline: [
      { time: '05:00 AM', event: 'Pre-dawn temple opening — witness early morning abhishekam ceremony' },
      { time: '09:00 AM', event: 'Thirumalai Nayak Palace — guided tour of 17th-century throne hall' },
      { time: '12:30 PM', event: 'Banana-leaf Brahmin meal at a traditional Madurai mess restaurant' },
      { time: '04:00 PM', event: 'Puthu Mandapam silk market — sarees, temple jewelry & sandalwood' },
      { time: '08:00 PM', event: 'Evening aarti at Meenakshi Temple — the most spectacular ritual in Tamil Nadu' },
    ],
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
  },
  {
    id: 'circuit-b',
    code: 'CIRCUIT B',
    title: "The Nilgiris: Tamil Nadu's Emerald Crown",
    region: 'Western Highlands',
    summary:
      'At elevations exceeding 2,600 meters, the Nilgiris deliver a sensory counterpoint to the scorching plains below — cool, fog-drenched mornings, the intoxicating perfume of eucalyptus forests, and a genteel hill-station culture that carries the romantic patina of the colonial era alongside fiercely preserved Toda tribal traditions.',
    highlights: [
      { name: 'Nilgiri Mountain Railway', desc: 'UNESCO World Heritage rack-and-pinion steam train from Mettupalayam' },
      { name: 'Ooty Government Botanical Gardens', desc: '22 hectares of terraced grounds and curated Himalayan flora' },
      { name: 'Pykara Lake & Waterfalls', desc: 'Pristine highland reservoir fringed by shola forests and boathouse' },
      { name: 'Kotagiri Tea Estates', desc: 'Boutique single-estate Orthodox tea tasting experiences in the mist' },
      { name: 'Mudumalai Tiger Reserve', desc: 'Jungle safari at the Western Ghats tri-junction with elephants & gaur' },
    ],
    culinary: [
      'Fresh Nilgiri Orthodox Single-Estate Tea — direct from factory floor',
      'Homemade Belgian-style Ooty hand-crafted Chocolates',
      'Badaga Traditional Feast — finger millet porridge, wild forest honey & stew',
      'Ooty Varkey biscuits with clotted cream at heritage bakeries',
    ],
    timeline: [
      { time: '06:30 AM', event: 'Misty sunrise drive through Kotagiri tea gardens & shola evergreen forests' },
      { time: '09:30 AM', event: 'Board Nilgiri Mountain Railway heritage steam coach across 208 curves & tunnels' },
      { time: '01:00 PM', event: 'Highland colonial afternoon lunch with Ooty buttered toast and freshly brewed tea' },
      { time: '03:30 PM', event: 'Pykara lake speed-boat safari & Toda tribal embroidery workshop' },
      { time: '06:00 PM', event: 'Artisanal chocolate tasting and fireside evening retreat' },
    ],
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
  },
  {
    id: 'circuit-c',
    code: 'CIRCUIT C',
    title: 'Thanjavur: The Throne of the Chola Empire',
    region: 'Delta Heartland',
    summary:
      'Thanjavur is where Tamil civilization reached its most sublime architectural and artistic expression. Under the great Chola emperors — Rajaraja I and Rajendra I — this delta city became the undisputed capital of an empire that stretched from the Maldives to Southeast Asia. The Brihadisvara Temple, built in 1010 CE without a single stone mortar joint, remains one of humanity’s most astonishing feats.',
    highlights: [
      { name: 'Brihadisvara Temple (UNESCO)', desc: 'The Great Living Chola Temple with monolithic cupola weighing 80 tonnes' },
      { name: 'Thanjavur Royal Palace', desc: 'Maratha-era palace housing Saraswathi Mahal Library with 49,000 palm-leaf manuscripts' },
      { name: 'Swamimalai Bronze Workshops', desc: 'Master sculptors practicing 1,000-year lost-wax Panchaloha casting' },
      { name: 'Tanjore Painting Studios', desc: 'Creation of gold-leaf encrusted devotional paintings — living Chola art' },
      { name: 'Rock Fort & Srirangam', desc: 'Trichy 83-m granite monolith & 156-acre island temple complex with 21 gopurams' },
    ],
    culinary: [
      'Authentic Thanjavur Degree Coffee brewed with freshly ground chicory beans',
      'Traditional Chidambaram banana-leaf meal with Poricha Kuzhambu',
      'Crisp Thalaiyatti Bommai craft centers and Brahmin-run ghee pongal',
      'Kaveri delta fresh river prawn biryani',
    ],
    timeline: [
      { time: '06:00 AM', event: 'Morning light meditation at Brihadisvara vimana as temple bells ring' },
      { time: '09:30 AM', event: 'Saraswathi Mahal Library inspection of centuries-old illustrated palm manuscripts' },
      { time: '12:30 PM', event: 'Authentic delta thali served on fresh plantain leaf with Thanjavur degree coffee' },
      { time: '03:30 PM', event: 'Swamimalai visit to watch master artisans pour molten bronze into lost-wax molds' },
      { time: '06:30 PM', event: 'Sunset view over the Kaveri river plains and classical Bharatanatyam recital' },
    ],
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
  },
  {
    id: 'circuit-d',
    code: 'CIRCUIT D',
    title: "Ramanathapuram & Kanyakumari: Land's End and Beyond",
    region: 'Coastal Frontier',
    summary:
      'The southern districts of Tamil Nadu are where India dramatically tapers to its final, triumphant point — where three seas converge and civilizations have met for over two millennia. Kanyakumari offers the rare spectacle of watching both sunrise and sunset over open water, while the haunted ruins of Dhanushkodi and Rameswaram’s 1,220-meter temple corridor complete a region of staggering drama.',
    highlights: [
      { name: 'Ramanathaswamy Temple', desc: 'World’s longest temple corridor spanning 1,220 metres with 1,212 granite pillars' },
      { name: 'Dhanushkodi Ghost Town', desc: 'Haunting windswept ruins of India’s tip, abandoned since the 1964 cyclone' },
      { name: 'Adam’s Bridge (Ram Setu)', desc: 'Legendary chain of submerged limestone shoals connecting to Sri Lanka' },
      { name: 'Vivekananda Rock Memorial', desc: 'The meditation seat of Swami Vivekananda set on a dramatic sea rock' },
      { name: '133-foot Thiruvalluvar Statue', desc: 'Monumental stone statue representing the 133 chapters of Thirukkural' },
    ],
    culinary: [
      'Fresh coastal seafood fry — spicy marinated tiger prawns and seer fish',
      'Nanjil Nattu Curry — coconut-rich southern coastal stew with raw banana',
      'Traditional Palm jaggery sweets and organic Karuppu Kavuni black rice pudding',
      'Sweet Tirunelveli wheat halwa served warm on dried leaf',
    ],
    timeline: [
      { time: '05:30 AM', event: 'Witness the iconic Triveni Sangam sunrise over the confluence of three oceans' },
      { time: '08:30 AM', event: 'Ferry ride to Vivekananda Rock Memorial & 133-foot Thiruvalluvar stone monument' },
      { time: '12:00 PM', event: 'Coastal coastal lunch feast with Nanjil Nattu curries and fresh fish' },
      { time: '03:00 PM', event: 'Off-road vehicle expedition to the ghost town ruins of Dhanushkodi and Ram Setu point' },
      { time: '06:30 PM', event: 'Evening walk along the 1,220m pillared corridor of Ramanathaswamy Temple' },
    ],
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
  },
];

const SPOTLIGHTS = [
  {
    title: 'Chennai: Gateway to the Coromandel',
    tag: 'Metropolitan Epicenter',
    desc: 'Marina Beach at 13km, Fort St. George (1644), San Thomé Basilica (built over Apostle St. Thomas’ tomb), and December’s Margazhi Carnatic season held across 2,000+ venues.',
  },
  {
    title: 'Kanchipuram & Mahabalipuram',
    tag: 'Pallava Grandeur',
    desc: 'City of 1,000 temples with GI-certified handloom silk weaving, paired with Mahabalipuram’s UNESCO Shore Temple and the world’s largest bas-relief, Arjuna’s Penance.',
  },
  {
    title: 'Tiruvannamalai & Vellore',
    tag: 'Sacred Fire & Fortress Gold',
    desc: 'Mount Arunachala fire element shrine with monthly 14km Girivalam moonlight pilgrimage, paired with Vellore’s 16th-century moated fort and Sripuram’s 1,500kg gold temple.',
  },
  {
    title: 'Chettinad & Sivaganga',
    tag: 'The Palatial Heartland',
    desc: 'Over 10,000 palatial mansions built by Nattukottai Chettiars using Burmese teak, Italian marble & Athangudi tiles, alongside India’s most celebrated spice-rich cuisine.',
  },
];

export default function CircuitSpotlight() {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState('circuit-a');
  const circuit = CIRCUITS.find((c) => c.id === activeTab) || CIRCUITS[0];

  return (
    <section className="py-20 lg:py-28 bg-[#071426] text-white border-b border-gold-400/20 relative overflow-hidden" ref={ref}>
      {/* Background glow and patterns */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/30 uppercase tracking-widest mb-3">
            ✦ Expedition Deep Dives
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
            Curated Expedition Circuits
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Four master-crafted journeys traversing Tamil Nadu’s most celebrated cultural axis points, accompanied by 24-hour timelines and sensory culinary trails.
          </p>
        </div>

        {/* Circuit Selector Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-10 scroll-reveal reveal-up">
          {CIRCUITS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(c.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === c.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-gold scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              <span className="opacity-75 mr-1.5 font-mono">{c.code}:</span>
              {c.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Active Circuit Showcase Container */}
        <div className="mt-12 bg-white/5 border border-gold-400/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl scroll-reveal reveal-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${circuit.badgeColor}`}>
                  {circuit.code}
                </span>
                <span className="text-xs text-gold-300 font-semibold uppercase tracking-wider">
                  {circuit.region}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">
                {circuit.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {circuit.summary}
              </p>

              {/* Signature Highlights */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-gold-400" /> Signature Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {circuit.highlights.map((item) => (
                    <div key={item.name} className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <span className="font-bold text-white text-xs block mb-1">{item.name}</span>
                      <span className="text-[11px] text-slate-300 leading-snug block">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culinary Trail Box */}
              <div className="bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent border border-gold-400/30 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-gold-400" /> Culinary Trail & Iconic Tastes
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {circuit.culinary.map((dish, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-gold-400">✦</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Curated 24-Hour Timeline / Itinerary Progression */}
            <div className="lg:col-span-5 bg-black/25 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                  <h4 className="font-bold text-white text-sm font-display flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-400" /> 24-Hour Expedition Timeline
                  </h4>
                  <span className="text-[11px] text-gold-300 font-mono">Day Schedule</span>
                </div>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-gold-400 before:via-gold-500/50 before:to-transparent">
                  {circuit.timeline.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gold-500 ring-4 ring-[#071426] flex items-center justify-center text-[9px] font-bold text-navy-950">
                        {idx + 1}
                      </div>
                      <div className="text-xs font-mono font-bold text-gold-300">{step.time}</div>
                      <div className="text-xs text-slate-200 leading-snug mt-0.5">{step.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link to="/plan-my-trip">
                  <button className="w-full py-3 rounded-xl bg-gold-400 text-navy-950 font-bold text-xs hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md">
                    <span>Customize This Circuit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Supplementary District Spotlights (Chettinad, Chennai, Tiruvannamalai, Kanchipuram) */}
        <div className="mt-16 scroll-reveal reveal-up">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Featured District Spotlights
              </h3>
              <p className="text-xs text-slate-400">Architectural and historical gems highlighted from the 38-district dossier</p>
            </div>
            <Link to="/destinations/district-explorer" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gold-300 font-bold hover:text-gold-200">
              <span>View All 38 Districts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPOTLIGHTS.map((sp) => (
              <div
                key={sp.title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 uppercase tracking-wider">
                    {sp.tag}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2.5 font-display">{sp.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{sp.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gold-300 font-semibold">
                  <span>Explore Heritage</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
