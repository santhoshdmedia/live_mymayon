import { useState } from 'react';
import { X, Printer, Shield, CheckCircle, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function BrochureGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gold-400/30 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scale-up text-navy-800">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0a1a30] via-[#12294F] to-[#0a1a30] text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/40 tracking-wider uppercase">
              ✦ Official Expedition Dossier
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-2">
              My Mayon Tamil Nadu: The Grand 38-District Expedition
            </h2>
            <p className="text-xs sm:text-sm text-gold-200/90 font-medium max-w-xl">
              Comprehensive Cultural, Spiritual, Eco-Adventure & Culinary Itinerary across the Land of Temples.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors flex items-center justify-center text-white flex-shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-navy-100 bg-cream/70 px-6 overflow-x-auto scrollbar-hide gap-4 text-xs sm:text-sm font-semibold">
          {[
            { id: 'overview', label: 'Expedition Overview' },
            { id: 'circuits', label: '4 Travel Circuits' },
            { id: 'tiers', label: 'Package Tiers & Pricing' },
            { id: 'logistics', label: 'Logistics & Helplines' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-gold-500 text-gold-600 font-bold'
                  : 'border-transparent text-navy-600 hover:text-gold-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm flex-1 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gold-50/70 border border-gold-200/80 rounded-2xl p-5">
                <h4 className="font-display font-bold text-navy-900 text-base mb-2">The Ultimate Tamil Nadu Experience</h4>
                <p className="text-navy-700 text-xs sm:text-sm leading-relaxed">
                  Tamil Nadu is not merely a destination — it is a civilizational journey. Home to 38 distinct districts, each pulsing with its own rhythm of heritage, landscape, cuisine, and spiritual energy, this southernmost jewel of the Indian subcontinent commands an odyssey unto itself.
                </p>
              </div>

              {/* 4 Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-navy-50 rounded-xl p-4 border border-navy-100 text-center">
                  <div className="font-bold text-2xl text-navy-900 font-display">38</div>
                  <div className="text-xs font-semibold text-navy-600 mt-0.5">Districts</div>
                  <div className="text-[11px] text-navy-400">4 distinct regions</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
                  <div className="font-bold text-2xl text-emerald-800 font-display">9</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-0.5">UNESCO Sites</div>
                  <div className="text-[11px] text-emerald-600">Living monuments & rail</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-center">
                  <div className="font-bold text-2xl text-purple-900 font-display">4</div>
                  <div className="text-xs font-semibold text-purple-700 mt-0.5">Grand Circuits</div>
                  <div className="text-[11px] text-purple-600">North, Delta, West, South</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
                  <div className="font-bold text-2xl text-amber-900 font-display">21</div>
                  <div className="text-xs font-semibold text-amber-700 mt-0.5">Days Max</div>
                  <div className="text-[11px] text-amber-600">Complete Royal Odyssey</div>
                </div>
              </div>

              {/* Four Regions Summary */}
              <div>
                <h4 className="font-display font-bold text-navy-900 text-base mb-3">Four Geographic & Cultural Regions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-navy-100 bg-white">
                    <span className="font-bold text-navy-900 block text-sm">🏛 1. Northern Hubs (8 Districts)</span>
                    <p className="text-navy-500 mt-1">Chennai, Chengalpattu, Kanchipuram, Thiruvallur, Ranipet, Vellore, Tirupathur, Tiruvannamalai.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-navy-100 bg-white">
                    <span className="font-bold text-navy-900 block text-sm">🌾 2. Delta & Central (12 Districts)</span>
                    <p className="text-navy-500 mt-1">Thanjavur, Trichy, Nagapattinam, Mayiladuthurai, Tiruvarur, Pudukkottai, Cuddalore, and 5 more.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-navy-100 bg-white">
                    <span className="font-bold text-navy-900 block text-sm">🏔 3. Western Highlands (8 Districts)</span>
                    <p className="text-navy-500 mt-1">Coimbatore, Nilgiris, Erode, Tiruppur, Salem, Namakkal, Dharmapuri, Krishnagiri.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-navy-100 bg-white">
                    <span className="font-bold text-navy-900 block text-sm">🕌 4. Southern Heritage (10 Districts)</span>
                    <p className="text-navy-500 mt-1">Madurai, Kanyakumari, Ramanathapuram, Tirunelveli, Thoothukudi, Tenkasi, Dindigul, and 3 more.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'circuits' && (
            <div className="space-y-4">
              <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-navy-900 text-sm sm:text-base">Circuit A — Madurai: Cultural Soul of Tamil Nadu</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold">Deep South</span>
                </div>
                <p className="text-xs text-navy-500 mb-3">Meenakshi Amman Temple (14 gopurams, 33,000 sculptures), Thirumalai Nayak Palace, Puthu Mandapam Silk Market.</p>
                <div className="bg-navy-50 rounded-xl p-2.5 text-xs text-navy-700">
                  <span className="font-semibold text-navy-900">Culinary Trail:</span> Jigarthanda, Karpathu Kari at Amma Mess, Filter coffee & hot idiyappam at Murugan Idli Shop.
                </div>
              </div>

              <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-navy-900 text-sm sm:text-base">Circuit B — Nilgiris: Tamil Nadu's Emerald Crown</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold">Western Highlands</span>
                </div>
                <p className="text-xs text-navy-500 mb-3">Nilgiri Mountain Railway (UNESCO), Ooty Botanical Gardens, Pykara Lake, Kotagiri Tea Estates, Mudumalai Tiger Reserve.</p>
                <div className="bg-emerald-50 rounded-xl p-2.5 text-xs text-emerald-800">
                  <span className="font-semibold text-emerald-900">Culinary Trail:</span> Fresh Nilgiri Orthodox single-estate tea, Belgian chocolates, Badaga feast, Varkey biscuits.
                </div>
              </div>

              <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-navy-900 text-sm sm:text-base">Circuit C — Thanjavur: Throne of the Chola Empire</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold">Delta Heartland</span>
                </div>
                <p className="text-xs text-navy-500 mb-3">Brihadisvara Temple (UNESCO 80-tonne monolith cupola), Maratha Palace & Saraswathi Mahal, Swamimalai lost-wax bronze casting.</p>
                <div className="bg-purple-50 rounded-xl p-2.5 text-xs text-purple-800">
                  <span className="font-semibold text-purple-900">Culinary Trail:</span> Thanjavur Degree Coffee, Authentic Chidambaram Meals, Thalaiyatti Bommai craft, Ghee Pongal.
                </div>
              </div>

              <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-navy-900 text-sm sm:text-base">Circuit D — Ramanathapuram & Kanyakumari: Land's End</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 text-xs font-bold">Coastal Frontier</span>
                </div>
                <p className="text-xs text-navy-500 mb-3">Ramanathaswamy Temple 1,220m corridor, Dhanushkodi ruins, Adam's Bridge (Ram Setu), Vivekananda Rock & Thiruvalluvar Statue.</p>
                <div className="bg-blue-50 rounded-xl p-2.5 text-xs text-blue-800">
                  <span className="font-semibold text-blue-900">Culinary Trail:</span> Coastal seer fish fry, Nanjil Nattu coconut curry, Palm jaggery sweets & karuppu kavuni rice.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-navy-100 rounded-2xl p-4 bg-white flex flex-col">
                  <div className="text-xs font-bold text-navy-500 uppercase tracking-wide">7 Days / 6 Nights</div>
                  <h4 className="font-bold text-navy-900 text-lg mt-0.5">Heritage Standard</h4>
                  <p className="text-xs text-gold-600 font-bold mt-1">₹24,500 – ₹32,000 / person</p>
                  <ul className="text-xs text-navy-600 space-y-1.5 mt-3 flex-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> AC Sedan / TTDC Coach</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> 3★ Heritage / TTDC Stays</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> Temple Darshan Passes</li>
                  </ul>
                </div>

                <div className="border-2 border-gold-400 rounded-2xl p-4 bg-gold-50/30 flex flex-col relative">
                  <span className="absolute -top-2.5 right-4 bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</span>
                  <div className="text-xs font-bold text-navy-500 uppercase tracking-wide">14 Days / 13 Nights</div>
                  <h4 className="font-bold text-navy-900 text-lg mt-0.5">Grand Experience</h4>
                  <p className="text-xs text-gold-600 font-bold mt-1">₹68,000 – ₹85,000 / person</p>
                  <ul className="text-xs text-navy-600 space-y-1.5 mt-3 flex-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> Toyota Innova Crysta</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> 4★ Hotels & Eco-Resorts</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> VIP Temple Entry & Food Trails</li>
                  </ul>
                </div>

                <div className="border border-navy-100 rounded-2xl p-4 bg-navy-900 text-white flex flex-col">
                  <div className="text-xs font-bold text-gold-300 uppercase tracking-wide">21 Days / 20 Nights</div>
                  <h4 className="font-bold text-white text-lg mt-0.5">Royal Odyssey</h4>
                  <p className="text-xs text-gold-400 font-bold mt-1">₹1,45,000 – ₹1,90,000 / person</p>
                  <ul className="text-xs text-slate-300 space-y-1.5 mt-3 flex-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-gold-400" /> Private Chauffeur / Luxury SUV</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-gold-400" /> 5★ Heritage Palaces & Resorts</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-gold-400" /> Masterclasses & Private Boat</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-navy-400 italic">
                * Rates are calculated per person on double occupancy basis. Includes 24/7 My Mayon concierge and licensed guides. Dynamic fuel surcharge applies during peak season (+12%).
              </p>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                  <h4 className="font-bold text-navy-900 text-sm mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" /> 24/7 Emergency Helplines
                  </h4>
                  <ul className="space-y-1.5 text-xs text-navy-600">
                    <li><strong className="text-navy-800">1033:</strong> 24/7 Tamil Nadu Tourist Police</li>
                    <li><strong className="text-navy-800">108:</strong> State Medical Ambulance Service</li>
                    <li><strong className="text-navy-800">112:</strong> National All-Emergency Helpline</li>
                    <li><strong className="text-navy-800">+91 95971 00664:</strong> My Mayon 24/7 Concierge</li>
                  </ul>
                </div>

                <div className="border border-navy-100 rounded-2xl p-4 bg-white">
                  <h4 className="font-bold text-navy-900 text-sm mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-500" /> Primary Airport Gateways
                  </h4>
                  <ul className="space-y-1.5 text-xs text-navy-600">
                    <li><strong className="text-navy-800">Chennai (MAA):</strong> International & Northern entry</li>
                    <li><strong className="text-navy-800">Madurai (IXM):</strong> Southern circuit gateway</li>
                    <li><strong className="text-navy-800">Trichy (TRZ):</strong> Central Kaveri delta hub</li>
                    <li><strong className="text-navy-800">Coimbatore (CJB):</strong> Western Highlands & Nilgiris</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gold-50/60 border border-gold-200 rounded-xl p-4 text-xs text-navy-700">
                <span className="font-bold text-navy-900 block mb-1">Official Institutional Partner:</span>
                Tamil Nadu Tourism Development Corporation (TTDC) is the official state tourism body and My Mayon's institutional partner for temple entry permits, hotel bookings, and government-licensed guides across all 38 districts.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-cream border-t border-navy-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-navy-600">
            <span className="font-semibold text-navy-900">Official Desk:</span>
            <a href="tel:+919597100664" className="hover:text-gold-600 font-bold">+91 95971 00664</a>
            <span>•</span>
            <a href="mailto:hello@mymayon.com" className="hover:text-gold-600 font-bold">hello@mymayon.com</a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-navy-200 text-navy-800 text-xs font-bold hover:bg-gold-50 hover:border-gold-400 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-gold-600" /> Print / Save Dossier
            </button>
            <a
              href="https://wa.me/919597100664?text=Hello%20My%20Mayon,%20I%20would%20like%20the%20full%2038-District%20Expedition%20itinerary%20PDF."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-navy-900" /> Request via WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
