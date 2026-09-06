import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Sprout,
  Palette,
  Compass,
  Footprints,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  Mountain,
  Trees,
  Cpu,
  Target,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaWhatsapp } from 'react-icons/fa';

// The 6 Core Tourism Categories from PDF Pages 2-7
const TOURISM_CATEGORIES = [
  {
    id: 'architectural',
    number: '01',
    category: 'ARCHITECTURAL TOURISM',
    title: 'Where History Meets Engineering Excellence',
    icon: Landmark,
    accent: '#d48806',
    badgeClass: 'bg-amber-500/15 text-amber-700 border-amber-400/40',
    narrative:
      "Explore breathtaking architectural masterpieces that showcase centuries of artistic brilliance, engineering innovation, and cultural heritage. From magnificent temples and royal palaces to colonial buildings and majestic forts, every structure tells a unique story. MyMayon's architectural tours offer privileged access to monuments that have shaped civilizations, with expert guides who bring each carved pillar, soaring dome, and ancient inscription to life.",
    subsections: [
      {
        heading: 'Tamil Nadu Temples',
        items: [
          'Brihadeeswarar Temple, Thanjavur',
          'Madurai Meenakshi Amman Temple',
          'Chettinad Mansions, Karaikudi',
          'Airavateswara Temple, Darasuram',
          'Gangaikonda Cholapuram Temple',
          'Kailasanatha Temple, Kanchipuram',
          'Kapaleeshwarar Temple, Chennai',
          'Ranganathaswamy Temple, Srirangam',
        ],
      },
      {
        heading: 'Royal Palaces & Forts',
        items: ['Mysore Palace', 'Hampi Monuments Complex'],
      },
      {
        heading: 'Mughal & Colonial Wonders',
        items: ['Taj Mahal, Agra', 'Qutub Minar, Delhi'],
      },
      {
        heading: 'Tamil Nadu Historic Forts',
        items: ['Dindigul Fort', 'Gingee Fort', 'Vellore Moated Fort', 'Tiruppur Fort', 'Thanjavur Fort'],
      },
    ],
  },
  {
    id: 'agricultural',
    number: '02',
    category: 'AGRICULTURAL TOURISM',
    title: 'Experience the Heart of Rural India',
    icon: Sprout,
    accent: '#389e0d',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 border-emerald-400/40',
    narrative:
      "Reconnect with nature by visiting farms, plantations, organic villages, and traditional agricultural communities. Participate in farming activities, taste fresh local produce, and learn about sustainable agricultural practices that have sustained communities for generations. MyMayon's agricultural tours offer a rare glimpse into the rhythms of rural life — from the misty tea gardens of the Nilgiris to the spice-laden air of Coorg's coffee estates.",
    subsections: [
      {
        heading: 'Tea & Spice Trails',
        items: [
          'Nilgiris Tea Estates',
          'Ooty Tea Gardens',
          'Munnar Tea Plantations',
          'Yercaud Spice Farms',
          'Valparai Tea Gardens',
        ],
      },
      {
        heading: 'Coconut & Organic Farms',
        items: ['Pollachi Coconut Farms', 'Kodaikanal Organic Farms', 'Tiruppur Coconut Groves'],
      },
      {
        heading: 'Coffee Country',
        items: ['Coorg Coffee Estates — walk among aromatic coffee vines and witness harvest', 'Dindigul Coffee Estates'],
      },
      {
        heading: 'Chettinad Region Agriculture',
        items: ['Chettinad farming practices', 'Local organic produce', 'Traditional village cultivation'],
      },
    ],
  },
  {
    id: 'art',
    number: '03',
    category: 'ART TOURISM',
    title: "Celebrate India's Living Heritage",
    icon: Palette,
    accent: '#eb2f96',
    badgeClass: 'bg-rose-500/15 text-rose-700 border-rose-400/40',
    narrative:
      "Experience India's vibrant artistic traditions through handicrafts, folk music, dance, sculpture, paintings, weaving, pottery, and artisan workshops. Meet local craftsmen and witness centuries-old traditions come alive. MyMayon's art tours offer intimate encounters with master artisans who keep ancient techniques alive, from bronze casting in Swamimalai to silk weaving in Kanchipuram.",
    subsections: [
      {
        heading: 'Stone & Bronze Craft',
        items: [
          'Mamallapuram Stone Sculpture Village',
          'Swamimalai Bronze Craft Centre',
          'Thanjavur Chola Art — watch master sculptors & bronze casters at work',
        ],
      },
      {
        heading: 'Textiles & Weaving',
        items: [
          'Kanchipuram Silk Weaving on traditional wooden handlooms',
          'Tiruppur textile weaving & modern export fabric centers',
        ],
      },
      {
        heading: 'Folk Arts & Heritage Villages',
        items: ['Channapatna Toy Town', 'Raghurajpur Heritage Village, Odisha', 'Kala Ghoda, Mumbai', 'Tanjore Gold-Leaf Painting Studios'],
      },
      {
        heading: 'Pottery & Ceramics',
        items: ['Kumbakonam traditional pottery', 'Pondicherry artisan ceramics shaped by hand & fire'],
      },
    ],
  },
  {
    id: 'archaeological',
    number: '04',
    category: 'ARCHAEOLOGICAL TOURISM',
    title: 'Walk Through Ancient Civilizations',
    icon: Compass,
    accent: '#08979c',
    badgeClass: 'bg-teal-500/15 text-teal-700 border-teal-400/40',
    narrative:
      "Discover archaeological treasures that reveal India's glorious past. Explore ancient ruins, rock-cut caves, inscriptions, excavation sites, and UNESCO World Heritage monuments that have stood the test of time. MyMayon's archaeological tours are led by scholars and historians who illuminate the significance of each site, connecting ancient civilizations to the present day.",
    specialNote:
      'MyMayon partners with archaeologists and heritage scholars to provide context that goes far beyond the guidebook. Visitors gain privileged access to ongoing excavations, museum collections, and expert-led discussions.',
    subsections: [
      {
        heading: 'Southern India Archaeological Sites',
        items: [
          'Keezhadi Sangam Era Archaeological Site',
          'Adichanallur Iron Age Urn Burial Site',
          'Mamallapuram Rock-Cut Monuments',
          'Arikamedu (Ancient Indo-Roman Trade Port)',
          'Uraiyur (Ancient Chola Capital)',
          'Korkai (Pandya Maritime Port)',
          'Poompuhar (Sangam Age Port)',
          'Tirunelveli & Thamirabarani archaeology',
          'Tanjore Bronze Museum & Saraswathi Mahal',
          'Madurai archaeological excavation sites',
          'Kumbakonam temple complexes & inscriptions',
          'Chidambaram temple archaeological findings',
          'Srirangam temple architectural ruins',
        ],
      },
      {
        heading: 'UNESCO World Heritage Sites',
        items: ['Ajanta Rock Caves', 'Ellora Monolithic Caves', 'Hampi Vijayanagara Capital', 'Sanchi Buddhist Stupa'],
      },
    ],
  },
  {
    id: 'spiritual',
    number: '05',
    category: 'SPIRITUAL TOURISM',
    title: 'A Journey of Faith and Inner Peace',
    icon: HeartHandshake,
    accent: '#722ed1',
    badgeClass: 'bg-purple-500/15 text-purple-700 border-purple-400/40',
    narrative:
      "Visit sacred temples, churches, mosques, monasteries, and pilgrimage centers that inspire spiritual growth and cultural understanding. Experience devotion, meditation, and timeless traditions. MyMayon's spiritual tours are designed with reverence and sensitivity, offering travelers a respectful window into India's diverse religious landscape — from the ancient shores of Rameswaram to the holy ghats of Varanasi.",
    subsections: [
      {
        heading: 'Tamil Nadu Sacred Circuit',
        items: [
          'Rameswaram Ramanathaswamy Temple & Agni Theertham',
          'Chidambaram Nataraja Temple (Akasha Stalam)',
          'Srirangam Ranganathaswamy Temple (156 acres)',
          'Palani Dhandayuthapani Murugan Temple',
          'Velankanni Our Lady of Good Health Basilica',
        ],
      },
      {
        heading: 'Pan-India Pilgrimage Destinations',
        items: [
          'Tirupati Balaji Temple (Seven Hills)',
          'Varanasi Kashi Vishwanath & Ganga Aarti',
          'Bodh Gaya Mahabodhi Temple (Seat of Enlightenment)',
        ],
      },
      {
        heading: 'Interfaith Understanding & Respect',
        items: [
          'Welcoming travelers of all cultural backgrounds',
          'Respectful access to sacred spaces across Hindu, Christian, Buddhist, and Islamic traditions',
          'Insightful cultural explanations by licensed heritage custodians',
        ],
      },
    ],
  },
  {
    id: 'trekking',
    number: '06',
    category: 'TREKKING TOURISM',
    title: 'Discover Nature One Trail at a Time',
    icon: Mountain,
    accent: '#1890ff',
    badgeClass: 'bg-blue-500/15 text-blue-700 border-blue-400/40',
    narrative:
      "Escape into breathtaking mountains, forests, waterfalls, and valleys through professionally guided trekking adventures. Whether you're a beginner seeking gentle hill walks or an experienced trekker craving challenging terrain, MyMayon offers unforgettable outdoor experiences. Our treks are led by certified local guides who know every trail, viewpoint, and hidden waterfall.",
    subsections: [
      {
        heading: 'Ooty & Nilgiris',
        items: ['Nilgiri Hills rolling grasslands', 'Tea-scented ridge walks', 'Avalanche Lake valley trails'],
      },
      {
        heading: 'Kodaikanal Hill Station',
        items: ['The Princess of Hill Stations', 'Serene pine forest trails', 'Dolphin’s Nose & Pillar Rocks'],
      },
      {
        heading: 'Yelagiri & Kolli Hills',
        items: ['Accessible family hill treks', 'Panoramic valley views', '70 hairpin bends of Kolli Hills'],
      },
      {
        heading: 'Meghamalai & Valparai',
        items: ['Pristine Western Ghats cloud forests', 'Endemic biodiversity hotspots', 'Shola rainforest canopy walks'],
      },
      {
        heading: 'Shola Forests & Mukurthi Peak',
        items: ['Mukurthi National Park wilderness', 'High-altitude montane grasslands', 'Nilgiri tahr habitat'],
      },
      {
        heading: 'Sirumalai & Dindigul Peaks',
        items: ['Sirumalai mountain climbs', 'Dindigul Fort scenic ridge trails', 'Sweeping panoramic views of the plains'],
      },
    ],
  },
];

// Featured Destinations Snapshot Matrix (PDF Page 8)
const DESTINATION_MATRIX = [
  { category: 'Architectural', num: '01', places: ['Taj Mahal', 'Mysore Palace', 'Hampi', 'Qutub Minar'] },
  { category: 'Agricultural', num: '02', places: ['Munnar', 'Coorg', 'Nilgiris', 'Ooty'] },
  { category: 'Art', num: '03', places: ['Mamallapuram', 'Kanchipuram', 'Raghurajpur', 'Tanjore'] },
  { category: 'Archaeological', num: '04', places: ['Ajanta', 'Ellora', 'Sanchi', 'Keezhadi'] },
  { category: 'Spiritual', num: '05', places: ['Varanasi', 'Rameswaram', 'Tirupati', 'Bodh Gaya'] },
  { category: 'Trekking', num: '06', places: ['Western Ghats', 'Ooty', 'Kodaikanal', 'Meghamalai'] },
];

// 8 Core Pillars (PDF Page 9: Why Choose MyMayon?)
const WHY_CHOOSE = [
  {
    icon: Award,
    title: 'Expertly Curated Experiences',
    desc: "Every tour is designed by specialists with deep knowledge of India's heritage and culture.",
  },
  {
    icon: Users,
    title: 'Professional Local Guides',
    desc: 'Certified, knowledgeable guides who bring every destination to life with stories and insight.',
  },
  {
    icon: HeartHandshake,
    title: 'Authentic Cultural Encounters',
    desc: 'Meaningful interactions with local communities, master artisans, and living traditions.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Comfortable Travel',
    desc: 'Your well-being is our priority — from chauffeured transportation to verified accommodations and beyond.',
  },
  {
    icon: Calendar,
    title: 'Personalized Itineraries',
    desc: 'Tours meticulously tailored to your interests, pace, and individual travel style.',
  },
  {
    icon: Trees,
    title: 'Sustainable Tourism Practices',
    desc: 'We are committed to responsible travel that respects local communities, heritage, and environments.',
  },
  {
    icon: Landmark,
    title: 'Educational & Heritage-Based Tours',
    desc: 'Every journey is designed to inspire and educate, deepening your understanding of India.',
  },
  {
    icon: Sparkles,
    title: 'Memorable Experiences for Every Traveler',
    desc: 'Whether you travel solo, as a couple, or with family, we create moments that last a lifetime.',
  },
];

export default function About() {
  const ref = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('architectural');
  const cat = TOURISM_CATEGORIES.find((c) => c.id === activeCategory) || TOURISM_CATEGORIES[0];

  return (
    <div ref={ref} className="bg-cream text-navy-900 overflow-hidden">
      
      {/* 1. HERO SECTION (PDF Page 1) */}
      <section className="relative bg-navy-radial text-cream py-24 lg:py-32 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[450px] opacity-[0.08] rotate-12" />
        <TriangleWatermark className="absolute -bottom-20 -left-20 w-[350px] opacity-[0.05] -rotate-12" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <Badge className="mb-4">✦ Discover Travel Beyond Destinations</Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-cream animate-fade-in-up font-display">
            MyMayon Tourism Experiences
          </h1>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-accent italic text-gold-300 text-xl sm:text-2xl leading-relaxed">
              "At MyMayon, we don't just take you to places — we create meaningful experiences."
            </p>
            <p className="text-navy-100 text-base sm:text-lg leading-relaxed pt-2">
              Every journey is designed to showcase India's rich heritage, culture, traditions, architecture, nature, and spirituality. Explore our carefully curated tourism categories and discover travel that inspires, educates, and creates lifelong memories.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/packages">
              <Button size="lg" className="flex items-center gap-2">
                Explore Our Tours <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/plan-my-trip">
              <Button variant="secondary" size="lg">
                Plan Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE SIX CURATED TOURISM CATEGORIES (PDF Pages 2–7) */}
      <section className="py-20 lg:py-28 bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
              ✦ Curated Tourism Spectrum
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
              Six Paths to Experience India's Soul
            </h2>
            <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
              Our curated portfolio spans six distinct pillars of exploration, meticulously structured to immerse you in living history, rural landscapes, master crafts, ancient excavations, sacred pilgrimages, and mountain trails.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-12 scroll-reveal reveal-up">
            {TOURISM_CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isSelected = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-navy-900 text-white border-gold-400 shadow-xl scale-[1.02]'
                      : 'bg-cream/60 hover:bg-white text-navy-800 border-navy-100 hover:border-gold-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-gold-300' : 'text-navy-400'}`}>
                      {c.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : 'text-gold-600'}`} />
                  </div>
                  <span className={`text-xs font-bold font-display leading-tight ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                    {c.category.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Display Showcase */}
          <div className="mt-8 bg-gradient-to-br from-[#0a1a30] via-[#0d223f] to-[#0a1a30] rounded-3xl p-6 sm:p-10 border border-gold-400/30 text-white shadow-2xl relative overflow-hidden scroll-reveal reveal-up">
            <div className="relative z-10 space-y-6">
              
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-400/30">
                    CATEGORY {cat.number}
                  </span>
                  <span className="text-xs text-gold-200 font-bold uppercase tracking-wider">
                    {cat.category}
                  </span>
                </div>
                <Link to="/packages">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-gold-200 transition-colors">
                    Explore Relevant Tours <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>

              {/* Title & Narrative */}
              <div className="max-w-4xl space-y-3">
                <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {cat.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                  {cat.narrative}
                </p>
                {cat.specialNote && (
                  <div className="bg-gold-500/15 border border-gold-400/30 rounded-2xl p-4 text-xs text-gold-200 leading-relaxed font-medium">
                    ✦ {cat.specialNote}
                  </div>
                )}
              </div>

              {/* Subsections Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {cat.subsections.map((sub, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gold-300 text-sm font-display mb-3 pb-2 border-b border-white/10">
                        {sub.heading}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-200">
                        {sub.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gold-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS SNAPSHOT (PDF Page 8) */}
      <section className="py-20 lg:py-24 bg-cream relative border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-navy-900 text-gold-300 uppercase tracking-widest mb-3">
              ✦ Portfolio Snapshot
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
              Featured Destinations at a Glance
            </h2>
            <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
              From the sun-drenched temples of Tamil Nadu to the misty peaks of the Western Ghats, MyMayon's curated portfolio spans India's most extraordinary landscapes and cultural landmarks.
            </p>
          </div>

          {/* 6 Category Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 scroll-reveal reveal-up">
            {DESTINATION_MATRIX.map((item) => (
              <div
                key={item.category}
                className="bg-white rounded-3xl p-6 border border-navy-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
                      {item.num}
                    </span>
                    <span className="text-xs font-semibold text-navy-400">Featured Sites</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-navy-900 mb-3">
                    {item.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.places.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-xl bg-navy-50 border border-navy-100 text-xs font-semibold text-navy-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-3 border-t border-navy-100 flex items-center justify-between text-xs font-bold text-gold-600">
                  <span>View Curated Circuits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-2xl p-5 border border-gold-300/60 max-w-4xl mx-auto text-center text-xs sm:text-sm text-navy-600 italic leading-relaxed scroll-reveal reveal-up">
            "Each destination is carefully selected for its cultural significance, natural beauty, and the quality of experience it offers. MyMayon's local expertise ensures that every visit goes beyond the surface, revealing the stories, traditions, and people that make each place truly extraordinary."
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE MYMAYON (PDF Page 9) */}
      <section className="py-20 lg:py-28 bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
              ✦ The MyMayon Difference
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
              Why Choose MyMayon?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
              MyMayon is more than a travel company — we are curators of extraordinary experiences. Our deep local knowledge, professional guides, and commitment to sustainable tourism set us apart. Every itinerary is crafted with care, ensuring that your journey is as enriching as it is comfortable.
            </p>
          </div>

          {/* 8 Core Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 scroll-reveal reveal-up">
            {WHY_CHOOSE.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className="bg-cream/40 rounded-3xl p-6 border border-navy-100 hover:border-gold-400/60 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-4 text-gold-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base font-display mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">{desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy-100/60 flex items-center justify-between text-[11px] text-navy-400">
                  <span>Pillar 0{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. BRAND STORY, VISION & MISSION */}
      <section className="py-20 lg:py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story narrative */}
            <div className="lg:col-span-7 space-y-6 scroll-reveal reveal-left">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Our Origin Story</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 leading-tight">
                "What if travelling through Tamil Nadu and India could feel less like following an itinerary and more like becoming part of the place?"
              </h2>
              <p className="text-navy-700 text-sm sm:text-base leading-relaxed">
                MYMAYON was born from a passion for India's living heritage and a vision to present travel through a more meaningful, respectful lens. With its remarkable combination of history, spirituality, architecture, cuisine, traditions, landscapes, and communities, India offers experiences far beyond conventional sightseeing.
              </p>
              <p className="text-navy-600 text-xs sm:text-sm leading-relaxed">
                We bridge the gap between travellers and the local communities, temple custodians, master weavers, and regional storytellers who make each destination truly unforgettable.
              </p>
            </div>

            {/* Vision card */}
            <div className="lg:col-span-5 scroll-reveal reveal-right">
              <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gold-400/30 relative overflow-hidden">
                <TriangleWatermark className="absolute -top-10 -right-10 w-48 opacity-10" />
                <div className="inline-flex items-center gap-2 text-gold-400 font-bold tracking-widest text-xs uppercase mb-3">
                  <Target className="w-4 h-4" /> Our Vision
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-4">
                  Transforming the way people discover, experience, and connect with heritage.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  We envision a future where every journey contributes to local communities, celebrates cultural identity, supports responsible tourism, and creates lifelong memories for travellers.
                </p>
                <div className="pt-4 border-t border-white/10 text-xs font-accent italic text-gold-300">
                  "Making destinations not just places to visit, but stories to live, understand, and remember."
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. BEGIN YOUR JOURNEY WITH MYMAYON (PDF Page 10) */}
      <section className="py-20 lg:py-28 bg-[#0a1a30] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-12 scroll-reveal reveal-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/30 uppercase tracking-widest mb-3">
              ✦ Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
              Begin Your Journey with MyMayon
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              India is a land of infinite wonder — and MyMayon is your trusted guide to its most extraordinary experiences. Whether you are drawn to ancient temples, misty mountain trails, vibrant artisan workshops, or sacred pilgrimage sites, we craft journeys that resonate long after you return home.
            </p>
          </div>

          {/* 3 Action Pillars (PDF Page 10) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-reveal reveal-up">
            
            <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold font-display text-lg text-white mb-2">Get in Touch</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Share your travel interests and preferred dates. Our specialists will craft a personalized proposal tailored just for you.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <a href="mailto:hello@mymayon.com" className="text-xs font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1.5">
                  <span>hello@mymayon.com</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold font-display text-lg text-white mb-2">Browse Our Tours</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Explore our full portfolio of curated experiences across all six tourism categories, from architectural marvels to spiritual pilgrimages.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link to="/packages" className="text-xs font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1.5">
                  <span>View All Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold font-display text-lg text-white mb-2">Plan with an Expert</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Schedule a consultation with a MyMayon travel specialist to discuss your ideal itinerary, accommodations, and exclusive experiences.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <a href="tel:+919597100664" className="text-xs font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1.5">
                  <span>+91 95971 00664</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 scroll-reveal reveal-up">
            <Link to="/plan-my-trip">
              <button className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                Start Planning Your Tour
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-7 py-3.5 rounded-full font-bold text-sm bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-all duration-300 cursor-pointer">
                Contact Our Specialists
              </button>
            </Link>
            <a
              href="https://wa.me/919597100664?text=Hi%20MyMayon,%20I%20would%20like%20to%20plan%20a%20curated%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full font-bold text-sm bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
