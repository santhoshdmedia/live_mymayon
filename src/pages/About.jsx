import { Link } from 'react-router-dom';
import {
  Heart,
  Target,
  Compass,
  Sparkles,
  ShieldCheck,
  Landmark,
  Cpu,
  Trees,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';

const MISSION_PILLARS = [
  {
    icon: Users,
    title: 'Connecting Travellers & Communities',
    desc: 'Connecting travellers with trusted local tourism partners and communities across Tamil Nadu.',
  },
  {
    icon: Sparkles,
    title: 'Curating Meaningful Experiences',
    desc: 'Curating authentic experiences that go far beyond conventional sightseeing.',
  },
  {
    icon: Landmark,
    title: 'Promoting Culture & Heritage',
    desc: "Promoting Tamil Nadu's heritage, culture, cuisine, nature, and hidden destinations.",
  },
  {
    icon: Heart,
    title: 'Supporting Local Creators',
    desc: 'Supporting local guides, accommodation providers, transport operators, artisans, and experience creators.',
  },
  {
    icon: Cpu,
    title: 'Simpler Travel Technology',
    desc: 'Using technology to make travel discovery, planning, and coordination seamless and simple.',
  },
  {
    icon: Trees,
    title: 'Responsible & Sustainable Tourism',
    desc: 'Encouraging responsible, eco-friendly, and sustainable tourism practices in every destination.',
  },
  {
    icon: ShieldCheck,
    title: 'Mutual Benefit for All',
    desc: 'Creating journeys that enrich the lives of both travellers and the local communities they visit.',
  },
];

const STATS = [
  { number: '38', label: 'Districts of Tamil Nadu Covered' },
  { number: '100%', label: 'Authentic Local Partner Network' },
  { number: '33k+', label: 'Temples & Cultural Heritage Sites' },
  { number: '24/7', label: 'Dedicated Traveller Assistance' },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="bg-cream text-navy-900 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-navy-radial text-cream py-24 lg:py-32 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[450px] opacity-[0.08] rotate-12" />
        <TriangleWatermark className="absolute -bottom-20 -left-20 w-[350px] opacity-[0.05] -rotate-12" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <Badge className="mb-4">Discover Tamil Nadu. Experience It Differently.</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-cream animate-fade-in-up">
            MYMAYON — About Us
          </h1>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-accent italic text-gold-300 text-xl sm:text-2xl leading-relaxed">
              "Travel should not merely take you to a destination; it should help you experience it."
            </p>
            <p className="text-navy-100 text-base sm:text-lg leading-relaxed pt-2">
              MYMAYON is a Tamil Nadu-focused travel and tourism brand created with a simple belief: travel should connect you with the authentic character of the region.
            </p>
          </div>
        </div>
      </section>

      {/* BRAND OVERVIEW & THE LAND OF EXTRAORDINARY STORIES */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 scroll-reveal reveal-left">
              <SectionTitle
                eyebrow="Our Belief"
                title="A Land of Extraordinary Stories"
              />
              <p className="text-navy-700 text-lg leading-relaxed mb-6 font-accent">
                From ancient temples and historic cities to coastal landscapes, hill stations, traditional villages, vibrant festivals, local cuisine, and living cultural traditions, Tamil Nadu is a land of extraordinary stories.
              </p>
              <p className="text-navy-600 leading-relaxed mb-6">
                MYMAYON brings these stories together through thoughtfully designed travel experiences that connect travellers with the authentic character of the region.
              </p>
              <p className="text-navy-600 leading-relaxed">
                We aim to bridge the gap between travellers and the people, places, and experiences that make Tamil Nadu unique. Through our network of local guides, accommodation providers, transport operators, artisans, and experience creators, we craft journeys that are immersive, meaningful, and unforgettable.
              </p>
            </div>

            <div className="lg:col-span-5 scroll-reveal reveal-right">
              <div className="relative rounded-3xl bg-navy-900 text-cream p-8 sm:p-10 shadow-2xl border border-gold-500/20 overflow-hidden">
                <TriangleWatermark className="absolute -bottom-10 -right-10 w-64 opacity-10" />
                <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-cream mb-4">Why MYMAYON?</h3>
                <ul className="space-y-4 text-navy-100 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>100% Tamil Nadu Focused</strong> — Deep local knowledge and authentic connections.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Immersive Experiences</strong> — Going beyond standard sightseeing itineraries.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Community First</strong> — Empowering local guides, artisans & stays.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Smart Discovery</strong> — Using technology for seamless planning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE STORY BEHIND MYMAYON */}
      <section className="py-16 lg:py-24 bg-cream relative border-t border-b border-navy-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-reveal reveal-up mb-12">
            <SectionTitle
              eyebrow="Our Origin"
              title="The Story Behind MYMAYON"
              centered
            />
          </div>

          {/* Central Highlighted Question */}
          <div className="scroll-reveal reveal-up bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gold-200 text-center mb-12 relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-gold-600" />
            </div>
            <p className="text-navy-500 uppercase tracking-widest text-xs font-bold mb-3">The Idea That Started It All</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-navy-900 italic leading-relaxed max-w-3xl mx-auto">
              "What if travelling through Tamil Nadu could feel less like following an itinerary and more like becoming part of the place?"
            </p>
          </div>

          <div className="space-y-6 text-navy-700 text-lg leading-relaxed scroll-reveal reveal-up">
            <p>
              MYMAYON was born from a passion for Tamil Nadu and a vision to present the state through a more meaningful approach to travel.
            </p>
            <p>
              With its remarkable combination of history, spirituality, architecture, cuisine, traditions, landscapes, and communities, Tamil Nadu offers experiences far beyond conventional tourism. MYMAYON was envisioned to bring these dimensions together under one platform.
            </p>
            <p>
              The journey began with a focus on building a travel ecosystem that connects travellers with local tourism partners while promoting the diversity of Tamil Nadu. From destination discovery and curated itineraries to authentic cultural experiences, MYMAYON bridges the gap between travellers and local communities.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* OUR VISION */}
          <div className="mb-20 scroll-reveal reveal-up">
            <div className="bg-navy-radial text-cream rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              <TriangleWatermark className="absolute -top-20 -right-20 w-96 opacity-10 rotate-45" />
              <div className="max-w-4xl relative z-10">
                <div className="inline-flex items-center gap-2 text-gold-400 font-semibold tracking-widest text-xs uppercase mb-4">
                  <Target className="w-4 h-4" />
                  Our Vision
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-6 leading-tight">
                  Transforming the way people discover, experience, and connect with Tamil Nadu.
                </h2>
                <p className="text-navy-100 text-lg sm:text-xl leading-relaxed mb-8">
                  We envision a future where every journey contributes to local communities, celebrates Tamil Nadu's cultural identity, supports responsible tourism, and creates meaningful memories for travellers.
                </p>
                <div className="pt-6 border-t border-navy-700/60">
                  <p className="font-accent italic text-gold-300 text-xl sm:text-2xl">
                    "Our vision is simple: to make Tamil Nadu not just a destination to visit, but a place to experience, understand, and remember."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* OUR MISSION */}
          <div className="scroll-reveal reveal-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionTitle
                eyebrow="Our Purpose"
                title="Our Mission"
                description="At MYMAYON, our mission is to create authentic, accessible, and responsible travel experiences across Tamil Nadu by:"
                centered
              />
            </div>

            {/* 7 Mission Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {MISSION_PILLARS.map(({ icon: Icon, title, desc }, idx) => (
                <div key={title} className="h-full">
                  <Card hover className="h-full flex flex-col justify-between p-6">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-gold-600" />
                      </div>
                      <h3 className="font-bold text-navy-900 text-lg mb-2">{title}</h3>
                      <p className="text-navy-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-navy-100/60 flex items-center justify-between text-xs text-navy-400">
                      <span>Pillar 0{idx + 1}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    </div>
                  </Card>
                </div>
              ))}

              {/* Concluding Mission Highlight Card */}
              <div className="sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-gold-500/10 via-gold-400/5 to-transparent rounded-2xl p-8 border border-gold-300/50 flex items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Our Mission Promise</p>
                  <p className="font-display text-xl sm:text-2xl font-bold text-navy-900 italic leading-relaxed">
                    "Our mission is to help every traveller discover Tamil Nadu differently — one destination, one story, and one experience at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 bg-navy-900 text-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(({ number, label }) => (
              <div key={label} className="p-4">
                <p className="text-4xl sm:text-5xl font-extrabold text-gold-400 mb-2 font-display">{number}</p>
                <p className="text-navy-200 text-sm sm:text-base font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-cream text-center relative overflow-hidden">
        <TriangleWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] opacity-[0.04]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Badge className="mb-4">Experience Tamil Nadu</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Ready to Discover Tamil Nadu Differently?
          </h2>
          <p className="text-navy-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Let us craft a personalized journey tailored to your interests, speed, and story.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/plan-my-trip">
              <Button size="lg" className="flex items-center gap-2">
                Plan Your Trip <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/destinations/tamil-nadu">
              <Button variant="secondary" size="lg">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

