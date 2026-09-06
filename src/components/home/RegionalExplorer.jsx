import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Compass, Landmark, Waves, Mountain, Building } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const REGIONS = [
  {
    id: 'northern',
    num: '01',
    name: 'Northern Hubs',
    tagline: 'Colonial heritage meets Dravidian grandeur',
    districtCount: 8,
    icon: Building,
    accent: '#d48806',
    cardBg: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-400/30',
    overview:
      "The northern arc of Tamil Nadu pulses with a cosmopolitan energy anchored in millennia of spiritual and artistic tradition. Chennai, the state's magnificent capital, sets the tone — a city where the Bengal of the Bay glitters alongside British-era Indo-Saracenic architecture, world-class Carnatic music, and the finest Chettinad restaurants. Radiating outward, Kanchipuram's legendary silk looms and 1,000-year-old temple tanks draw pilgrims and connoisseurs alike.",
    highlights: [
      { name: 'Chennai', tag: 'Capital city', desc: 'Marina Beach, Fort St. George, San Thomé Basilica, Margazhi Carnatic season' },
      { name: 'Kanchipuram', tag: 'City of 1,000 Temples', desc: 'UNESCO silk handloom heritage, Ekambareswarar, Varadharaja Perumal' },
      { name: 'Tiruvannamalai', tag: 'Fire Element Stalam', desc: 'Arunachaleswarar Temple, sacred Girivalam full moon walk, Ramana Ashram' },
      { name: 'Vellore', tag: 'Fortress of Gold', desc: '16th-century moated granite fort, Jalakandeswarar, Sripuram Golden Temple' },
    ],
    districts: ['Chennai', 'Chengalpattu', 'Kanchipuram', 'Thiruvallur', 'Ranipet', 'Vellore', 'Tirupathur', 'Tiruvannamalai'],
  },
  {
    id: 'delta',
    num: '02',
    name: 'Delta & Central',
    tagline: 'Chola heartland & fertile river plains',
    districtCount: 12,
    icon: Landmark,
    accent: '#08979c',
    cardBg: 'from-teal-500/10 via-teal-500/5 to-transparent border-teal-400/30',
    overview:
      "The Kaveri River delta is Tamil Nadu's cultural heartland — the cradle of the great Chola empire and birthplace of Carnatic classical music, Bharatanatyam dance, and the finest Dravidian temple architecture on earth. Thanjavur's Brihadisvara Temple, a UNESCO World Heritage monument, stands as perhaps the most awe-inspiring feat of medieval engineering in all of Asia. Tiruchirappalli's Rock Fort rises dramatically above the plains, while Chidambaram's Nataraja Temple enshrines the cosmic dance of Shiva himself.",
    highlights: [
      { name: 'Thanjavur', tag: 'Imperial Chola Capital', desc: 'UNESCO Brihadisvara Temple, Maratha Palace, Tanjore paintings, bronze ateliers' },
      { name: 'Tiruchirappalli', tag: 'Sacred Island City', desc: 'Rock Fort monolith, Srirangam 156-acre temple with 21 gopurams, Kaveri cruises' },
      { name: 'Nagapattinam', tag: 'Chola Maritime Port', desc: 'Velankanni Basilica, Nagore Dargah, coastal temple trails, ancient Chola harbor' },
      { name: 'Mayiladuthurai', tag: 'Delta Arts Cradle', desc: 'Mayuram Shiva Temple, Kaveri delta sacred shrines, classical arts tradition' },
    ],
    districts: [
      'Cuddalore', 'Villupuram', 'Kallakurichi', 'Ariyalur', 'Perambalur', 'Mayiladuthurai',
      'Nagapattinam', 'Thanjavur', 'Tiruvarur', 'Tiruchirappalli', 'Pudukkottai', 'Karur'
    ],
  },
  {
    id: 'western',
    num: '03',
    name: 'Western Highlands',
    tagline: 'Misty peaks, tea estates & textile traditions',
    districtCount: 8,
    icon: Mountain,
    accent: '#389e0d',
    cardBg: 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-400/30',
    overview:
      "Where the Deccan plateau meets the Western Ghats, Tamil Nadu's western arc rises into a world of misty highlands, cascading waterfalls, and emerald tea gardens. The Nilgiri Mountain Railway — a UNESCO World Heritage railway — winds through Coonoor and Ooty, offering one of the world's most scenic rail journeys. Coimbatore, the 'Manchester of South India,' blends industrial dynamism with proximity to the magnificent Anamalai Tiger Reserve. Krishnagiri's mango orchards and Erode's turmeric fields paint the landscape in unexpected, vivid hues.",
    highlights: [
      { name: 'Nilgiris', tag: 'Emerald Crown', desc: 'UNESCO Mountain Railway, Ooty Botanical Gardens, Pykara Lake, Kotagiri tea estates' },
      { name: 'Coimbatore', tag: 'Manchester of South', desc: '34-meter Adiyogi Shiva face, Anamalai Tiger Reserve gateway, Marudamalai Temple' },
      { name: 'Erode & Tiruppur', tag: 'Ghats & Weaves', desc: 'Bhavani Sangamam, turmeric trading capital, world garment export hub, Cauvery river' },
      { name: 'Salem & Krishnagiri', tag: 'Mango & Silk Valley', desc: 'Yercaud hill retreat, Krishnagiri dam orchards, historical hill forts' },
    ],
    districts: ['Salem', 'Namakkal', 'Dharmapuri', 'Krishnagiri', 'Erode', 'Tiruppur', 'Coimbatore', 'Nilgiris'],
  },
  {
    id: 'southern',
    num: '04',
    name: 'Southern Heritage',
    tagline: 'Pilgrim coast & timeless temple culture',
    districtCount: 10,
    icon: Waves,
    accent: '#722ed1',
    cardBg: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-400/30',
    overview:
      "The southern districts of Tamil Nadu are where India dramatically tapers to its final, triumphant point — where three seas converge and civilizations have met for over two millennia. Madurai, the 'City That Never Sleeps,' anchors this region with the magnificent Meenakshi Amman Temple complex. Kanyakumari offers the rare spectacle of watching both sunrise and sunset over open water. The haunted ruins of Dhanushkodi, the sacred Ramanathaswamy Temple corridor in Rameswaram, and the pearl-fishing legacy of Thoothukudi complete a region of staggering cultural density.",
    highlights: [
      { name: 'Madurai', tag: 'Cultural Soul', desc: 'Meenakshi Amman Temple with 33,000 sculptures, Thirumalai Nayak Palace, Jigarthanda' },
      { name: 'Kanyakumari', tag: 'Triveni Sangam', desc: 'Tricolour ocean convergence, Vivekananda Rock Memorial, 133-ft Thiruvalluvar Statue' },
      { name: 'Ramanathapuram', tag: 'Rameswaram Gateway', desc: 'Ramanathaswamy 1,220m corridor, Dhanushkodi Ghost Town, Adam’s Bridge / Ram Setu' },
      { name: 'Tirunelveli & Tenkasi', tag: 'Courtallam Falls', desc: 'Nellaiappar Temple, Thamirabarani holy river, Tirunelveli Halwa, Papanasam waterfalls' },
    ],
    districts: [
      'Dindigul', 'Theni', 'Madurai', 'Sivaganga', 'Ramanathapuram', 'Virudhunagar',
      'Tenkasi', 'Tirunelveli', 'Thoothukudi', 'Kanyakumari'
    ],
  },
];

export default function RegionalExplorer() {
  const ref = useScrollReveal();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = REGIONS[selectedIdx];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-navy-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
            ✦ Regional Overview
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
            Four Regions. Infinite Stories.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy-500 leading-relaxed">
            Tamil Nadu's 38 districts are organized into four grand geographic and cultural regions — each commanding its own architectural grammar, culinary vocabulary, and spiritual identity.
          </p>
        </div>

        {/* 4 Region Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 scroll-reveal reveal-up">
          {REGIONS.map((r, idx) => {
            const Icon = r.icon;
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-navy-900 border-gold-400 text-white shadow-xl shadow-navy-950/20 scale-[1.02]'
                    : 'bg-cream/60 border-navy-100 hover:border-gold-400/50 hover:bg-white text-navy-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-gold-300' : 'text-navy-400'}`}>
                    REGION {r.num}
                  </span>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-gold-400' : 'text-gold-600'}`} />
                </div>
                <div>
                  <h3 className={`font-bold font-display text-base sm:text-lg ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                    {r.name}
                  </h3>
                  <span className={`inline-block text-xs font-medium mt-1 ${isSelected ? 'text-gold-200' : 'text-navy-500'}`}>
                    {r.districtCount} Districts
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Region Detailed Panel */}
        <div className="mt-8 bg-gradient-to-br from-[#0a1a30] via-[#0d223f] to-[#0a1a30] rounded-3xl p-6 sm:p-10 border border-gold-400/30 text-white shadow-2xl relative overflow-hidden scroll-reveal reveal-up">
          {/* Subtle watermark background glow */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono font-bold border border-gold-400/40">
                  REGION {current.num}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  {current.districtCount} Districts Included
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {current.name}
              </h3>
              <p className="text-sm font-accent italic text-gold-300 font-medium">
                {current.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed pt-2">
                {current.overview}
              </p>

              {/* Districts Tag Cloud */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold text-gold-200 uppercase tracking-wider mb-2.5">
                  Districts in this Region:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {current.districts.map((dist) => (
                    <Link
                      key={dist}
                      to={`/destinations/district-explorer`}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-navy-950 border border-white/15 text-[11px] font-medium text-slate-200 transition-colors"
                    >
                      {dist}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/destinations/district-explorer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold-300 hover:text-gold-200 group transition-colors"
                >
                  <span>Explore in 38 District Directory</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Key Destination Highlight Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.highlights.map((h, i) => (
                <div
                  key={h.name}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-white text-base font-display">
                        {h.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30">
                        {h.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {h.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gold-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-400" /> Must-Visit
                    </span>
                    <span className="font-medium text-white/70">Expedition Stop</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
