import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sun, CloudRain, ShieldAlert, Phone, Plane, CreditCard, Award, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import useScrollReveal from '../../hooks/useScrollReveal';
import BrochureGuideModal from './BrochureGuideModal';

const SEASONS = [
  {
    period: 'October to February',
    badge: 'Peak Season',
    weather: 'Pleasant 22–30°C across most districts',
    highlights: [
      'All 38 districts comfortably accessible with clear skies',
      'Karthigai Deepam in Tiruvannamalai (500k oil lamps on holy hill, Nov)',
      'Pongal harvest festival & traditional Jallikattu spectacles (Jan)',
      'Ideal for all temple circuits, heritage walking tours & wildlife safaris',
    ],
    accent: 'border-gold-400 bg-gold-50/20 text-gold-700',
    icon: Sun,
  },
  {
    period: 'March to May',
    badge: 'Shoulder Season',
    weather: 'Summer heat on plains; Cool paradise in Highlands',
    highlights: [
      'Best time for Nilgiris, Ooty, Kodaikanal, Yercaud & Valparai hill retreats',
      'Chithirai Festival in Madurai attracting over 1 million devotees (Apr-May)',
      'Pleasant tea estate walks and misty botanical blooms in Western Ghats',
      'Morning and late-evening darshans recommended for coastal shrines',
    ],
    accent: 'border-amber-400 bg-amber-50/20 text-amber-700',
    icon: Calendar,
  },
  {
    period: 'June to September',
    badge: 'Monsoon Season',
    weather: 'Southwest & Northeast Monsoon rains; Lush green plains',
    highlights: [
      'Spectacular cascading waterfalls at Courtallam, Hogenakkal & Pykara',
      'Vivid emerald landscape photography opportunities across Kaveri delta',
      'Reduced off-peak tariffs at 5★ heritage palace hotels & luxury resorts',
      'Spiritual retreat stays & traditional Ayurvedic rejuvenation therapies',
    ],
    accent: 'border-blue-400 bg-blue-50/20 text-blue-700',
    icon: CloudRain,
  },
];

export default function TravelSmart() {
  const ref = useScrollReveal();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 lg:py-28 bg-white border-b border-navy-100" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Part 1: Seasonal Calendar */}
          <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
              ✦ Travel Essentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
              Seasonal Calendar & Best Time to Visit
            </h2>
            <p className="mt-4 text-sm sm:text-base text-navy-500 leading-relaxed">
              Every season unveils a unique chapter of Tamil Nadu. Choose the ideal travel window tailored to your preferred circuit and celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 scroll-reveal reveal-up">
            {SEASONS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.period}
                  className={`rounded-3xl p-6 sm:p-7 border bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${s.accent}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-navy-900 text-gold-300 uppercase tracking-wider">
                        {s.badge}
                      </span>
                      <Icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-xl font-display mt-2">{s.period}</h3>
                    <p className="text-xs font-semibold text-navy-600 mt-1 italic">{s.weather}</p>
                    <ul className="mt-4 space-y-2 text-xs text-navy-600">
                      {s.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gold-500 font-bold mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Part 2: Travel Smart Logistics, Safety & TTDC Contacts (Page 25) */}
          <div className="mt-20 bg-cream/70 rounded-3xl p-6 sm:p-10 border border-navy-100 scroll-reveal reveal-up">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-navy-500 tracking-widest uppercase block mb-1">
                ✦ Safety, Infrastructure & Official Integration
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                Travel Smart: Safety, Logistics & Official Contacts
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-navy-600 leading-relaxed">
                Every expedition is backed by pre-coordinated logistics, round-the-clock support, and direct integration with Tamil Nadu's official tourism and emergency infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              
              {/* Emergency Contacts */}
              <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-3">
                  <ShieldAlert className="w-4 h-4 text-red-500" /> Emergency Helplines
                </div>
                <ul className="space-y-2 text-navy-600">
                  <li><strong className="text-navy-900">1033:</strong> 24/7 TN Tourist Police</li>
                  <li><strong className="text-navy-900">108:</strong> State Ambulance Service</li>
                  <li><strong className="text-navy-900">112:</strong> National Emergency Number</li>
                  <li><strong className="text-navy-900">+91 95971 00664:</strong> My Mayon 24/7 Desk</li>
                </ul>
              </div>

              {/* Transport Gateways */}
              <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-3">
                  <Plane className="w-4 h-4 text-blue-500" /> Primary Airport Hubs
                </div>
                <ul className="space-y-2 text-navy-600">
                  <li><strong className="text-navy-900">Chennai (MAA):</strong> Northern Gateway</li>
                  <li><strong className="text-navy-900">Madurai (IXM):</strong> Southern Circuit</li>
                  <li><strong className="text-navy-900">Trichy (TRZ):</strong> Kaveri Delta Hub</li>
                  <li><strong className="text-navy-900">Coimbatore (CJB):</strong> Western Highlands</li>
                </ul>
              </div>

              {/* TTDC Institutional Partner */}
              <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-3">
                  <Award className="w-4 h-4 text-gold-600" /> TTDC Official Partner
                </div>
                <p className="text-navy-600 leading-relaxed">
                  Tamil Nadu Tourism Development Corporation (TTDC) is our primary partner for temple entry permits, hotel bookings, and licensed guide accreditation across all 38 districts.
                </p>
              </div>

              {/* Visa & Currency */}
              <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-3">
                  <CreditCard className="w-4 h-4 text-emerald-600" /> Visa & Payments
                </div>
                <p className="text-navy-600 leading-relaxed mb-2">
                  <strong>e-Visa:</strong> Available for citizens of 166 countries via official Indian portal.
                </p>
                <p className="text-navy-600 leading-relaxed">
                  <strong>Payments:</strong> Major cards & UPI accepted at 4-5★ properties. Cash recommended for temple offerings and rural markets.
                </p>
              </div>

            </div>
          </div>

          {/* Part 3: Begin Your 38-District Odyssey (Page 26 Closing Section) */}
          <div className="mt-16 bg-gradient-to-r from-[#0a1a30] via-[#12294F] to-[#0a1a30] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden scroll-reveal reveal-up">
            <div className="max-w-3xl relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/40 uppercase tracking-widest">
                ✦ Your Expedition Awaits
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                Begin Your 38-District Odyssey with My Mayon
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Tamil Nadu does not simply ask to be visited. It asks to be experienced — slowly, reverently, and with all five senses fully engaged. From the first blast of jasmine-scented air at Chennai's Kapaleeshwarar Temple to the final, breathtaking convergence of three seas at Kanyakumari, every one of the 38 districts holds a story that deserves to be heard.
              </p>

              {/* 3 Contact Pillar Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <a
                  href="tel:+919597100664"
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-bold text-gold-300 text-sm block mb-1">Call Us</span>
                    <span className="text-slate-300 block">Speak with a My Mayon destination specialist today</span>
                  </div>
                  <div className="mt-3 font-bold text-white flex items-center gap-1 group-hover:text-gold-300">
                    <Phone className="w-3.5 h-3.5 text-gold-400" /> +91 95971 00664
                  </div>
                </a>

                <a
                  href="mailto:hello@mymayon.com"
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-bold text-gold-300 text-sm block mb-1">Write to Us</span>
                    <span className="text-slate-300 block">Receive a bespoke 38-district itinerary proposal within 48 hours</span>
                  </div>
                  <div className="mt-3 font-bold text-white flex items-center gap-1 group-hover:text-gold-300">
                    <span>hello@mymayon.com</span>
                  </div>
                </a>

                <a
                  href="https://www.ttdconline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-bold text-gold-300 text-sm block mb-1">TTDC Official Portal</span>
                    <span className="text-slate-300 block">Book TTDC-certified hotels, coaches, and licensed temple guides</span>
                  </div>
                  <div className="mt-3 font-bold text-white flex items-center gap-1 group-hover:text-gold-300">
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3 h-3 text-gold-400" />
                  </div>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link to="/plan-my-trip">
                  <button className="px-7 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    Book Your Expedition
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-full font-bold text-sm bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-gold-300" />
                  <span>Download Full Itinerary PDF Guide</span>
                </button>

                <a
                  href="https://wa.me/919597100664?text=Hi%20My%20Mayon,%20I%20am%20interested%20in%20the%20Grand%2038-District%20Expedition."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full font-bold text-sm bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Brochure / Guide Modal */}
      <BrochureGuideModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
