import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ShieldCheck, Sparkles, ArrowRight, Car, Hotel, Compass, Info } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const TIERS = [
  {
    id: 'heritage-standard',
    name: 'Heritage Standard',
    tag: 'Classic Explorer',
    duration: '7 Days / 6 Nights',
    circuitType: 'Regional Loop',
    price: '₹24,500 – ₹32,000',
    priceUnit: 'per person',
    transport: 'AC Sedan / TTDC Coach',
    stay: '3★ Heritage Hotels / TTDC Hotels',
    inclusions: [
      'Daily Breakfast included',
      'Confirmed Temple Darshan Passes',
      'Government-Licensed English Guide',
      'Dedicated Regional Circuit Transport',
      '24/7 My Mayon Concierge Assistance',
    ],
    popular: false,
    badgeBg: 'bg-navy-100 text-navy-800',
    ctaVariant: 'secondary',
  },
  {
    id: 'grand-experience',
    name: 'Grand Experience',
    tag: 'Most Popular',
    duration: '14 Days / 13 Nights',
    circuitType: 'Multi-Circuit Grand Tour',
    price: '₹68,000 – ₹85,000',
    priceUnit: 'per person',
    transport: 'Toyota Innova Crysta (Dedicated Chauffeur)',
    stay: '4★ Handpicked Hotels & Eco-Resorts',
    inclusions: [
      'Half-Board (Breakfast & Authentic Dinner)',
      'VIP Temple Entry & Fast-Track Darshan',
      'Curated Local Food & Artisan Trails',
      'Private Inter-District Chauffeur Transport',
      'Expert Cultural Historian / Storyteller',
      'Bottled water & regional refreshments',
    ],
    popular: true,
    badgeBg: 'bg-gold-500 text-navy-950',
    ctaVariant: 'primary',
  },
  {
    id: 'royal-odyssey',
    name: 'Royal Odyssey',
    tag: 'Pinnacle Statewide Luxury',
    duration: '21 Days / 20 Nights',
    circuitType: 'All 38 Districts Complete Loop',
    price: '₹1,45,000 – ₹1,90,000',
    priceUnit: 'per person',
    transport: 'Private Chauffeur / Luxury SUV',
    stay: '5★ Luxury & Heritage Palaces',
    inclusions: [
      'Full-Board (All Gourmet Regional Meals)',
      'Exclusive Culinary Masterclasses with Master Chefs',
      'Private Boat Transfers & Heritage Safaris',
      'Unrestricted Priority VIP Darshan at all major Shrines',
      'Private Curated Athangudi & Kanchipuram Weaving Access',
      '24/7 White-Glove On-Ground Concierge Team',
    ],
    popular: false,
    badgeBg: 'bg-purple-900 text-gold-300',
    ctaVariant: 'luxury',
  },
];

const COMPARISON_ROWS = [
  { feature: 'Duration', standard: '7 Days / 6 Nights', grand: '14 Days / 13 Nights', royal: '21 Days / 20 Nights (All 38 Districts)' },
  { feature: 'Transportation', standard: 'AC Sedan / TTDC Coach', grand: 'Toyota Innova Crysta', royal: 'Private Chauffeur / Luxury SUV' },
  { feature: 'Accommodation', standard: '3★ Heritage Hotels / TTDC', grand: '4★ Hotels & Eco-Resorts', royal: '5★ Luxury & Heritage Palaces' },
  { feature: 'Temple Logistics', standard: 'Temple Darshan Passes', grand: 'VIP Temple Entry & Fast-Track', royal: 'Priority VIP Darshan at All Shrines' },
  { feature: 'Meal Plan', standard: 'Breakfast Only', grand: 'Half-Board + Food Trails', royal: 'Full-Board + Culinary Masterclasses' },
  { feature: 'Special Inclusions', standard: 'Certified English Guide', grand: 'Local Food & Craft Trails', royal: 'Private Boat Transfers & Atelier Visits' },
  { feature: 'Indicative Price (INR)', standard: '₹24,500 – ₹32,000', grand: '₹68,000 – ₹85,000', royal: '₹1,45,000 – ₹1,90,000' },
];

export default function ExpeditionTiers() {
  const ref = useScrollReveal();
  const [showTable, setShowTable] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-cream/50 border-b border-navy-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto scroll-reveal reveal-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 text-gold-700 border border-gold-400/30 uppercase tracking-widest mb-3">
            ✦ Pricing & Packages
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 leading-tight">
            Three Tiers of Tamil Nadu — Choose Your Odyssey
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy-600 leading-relaxed">
            My Mayon's expertly structured package tiers ensure that every category of discerning traveler — from the culturally curious first-timer to the seasoned luxury connoisseur — finds a perfectly calibrated Tamil Nadu experience.
          </p>
          <p className="text-xs text-navy-500 mt-2 italic">
            All prices are calculated per person on double occupancy basis and include curated expert English-speaking guides, temple entry logistics, and 24/7 My Mayon concierge support.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 scroll-reveal reveal-up">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-white via-gold-50/20 to-white border-2 border-gold-400 shadow-2xl shadow-gold-500/15 lg:-translate-y-3'
                  : tier.id === 'royal-odyssey'
                  ? 'bg-[#0a1a30] text-white border border-gold-400/30 shadow-xl'
                  : 'bg-white border border-navy-100 shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 text-xs font-extrabold uppercase px-4 py-1 rounded-full shadow-md tracking-wider">
                  ★ Most Popular Odyssey
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${tier.badgeBg}`}>
                    {tier.tag}
                  </span>
                  <span className={`text-xs font-medium ${tier.id === 'royal-odyssey' ? 'text-slate-400' : 'text-navy-500'}`}>
                    {tier.circuitType}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold font-display ${tier.id === 'royal-odyssey' ? 'text-white' : 'text-navy-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs font-semibold mt-1 ${tier.id === 'royal-odyssey' ? 'text-gold-300' : 'text-gold-600'}`}>
                  {tier.duration}
                </p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-navy-100/50">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl sm:text-4xl font-extrabold font-display ${tier.id === 'royal-odyssey' ? 'text-gold-400' : 'text-navy-950'}`}>
                      {tier.price}
                    </span>
                  </div>
                  <span className={`text-xs ${tier.id === 'royal-odyssey' ? 'text-slate-400' : 'text-navy-400'}`}>
                    {tier.priceUnit} (twin sharing)
                  </span>
                </div>

                {/* Transport & Stay Details */}
                <div className="py-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    <span className={tier.id === 'royal-odyssey' ? 'text-slate-200' : 'text-navy-700'}>
                      <strong>Transport:</strong> {tier.transport}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    <span className={tier.id === 'royal-odyssey' ? 'text-slate-200' : 'text-navy-700'}>
                      <strong>Stay:</strong> {tier.stay}
                    </span>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="mt-4 space-y-2.5">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${tier.id === 'royal-odyssey' ? 'text-gold-300' : 'text-navy-800'}`}>
                    Key Inclusions:
                  </span>
                  {tier.inclusions.map((inc) => (
                    <div key={inc} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.id === 'royal-odyssey' ? 'text-gold-400' : 'text-emerald-600'}`} />
                      <span className={tier.id === 'royal-odyssey' ? 'text-slate-300' : 'text-navy-600'}>
                        {inc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Action */}
              <div className="mt-8 pt-4">
                <Link to={`/plan-my-trip?tier=${encodeURIComponent(tier.name)}`}>
                  <button
                    className={`w-full py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      tier.popular
                        ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold hover:shadow-xl hover:scale-[1.02]'
                        : tier.id === 'royal-odyssey'
                        ? 'bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-md hover:shadow-lg'
                        : 'bg-navy-900 text-white hover:bg-navy-800'
                    }`}
                  >
                    <span>Choose {tier.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Detailed Comparison Table */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-navy-200 bg-white text-navy-800 text-xs font-bold hover:border-gold-400 hover:text-gold-600 transition shadow-sm cursor-pointer"
          >
            <span>{showTable ? 'Hide Specification Table' : 'View Full Tier Specification Table'}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showTable ? '-rotate-90' : 'rotate-90'}`} />
          </button>
        </div>

        {/* Comparison Table */}
        {showTable && (
          <div className="mt-8 overflow-x-auto bg-white rounded-3xl border border-navy-100 shadow-xl p-4 sm:p-6 animate-fade-in">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-navy-100 bg-cream/60">
                  <th className="py-3 px-4 font-bold text-navy-900 uppercase tracking-wider">Package Tier</th>
                  <th className="py-3 px-4 font-bold text-navy-900 uppercase tracking-wider">Heritage Standard</th>
                  <th className="py-3 px-4 font-bold text-gold-700 uppercase tracking-wider bg-gold-50/50">Grand Experience</th>
                  <th className="py-3 px-4 font-bold text-purple-900 uppercase tracking-wider">Royal Odyssey</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-navy-900 bg-navy-50/30">{row.feature}</td>
                    <td className="py-3 px-4 text-navy-600">{row.standard}</td>
                    <td className="py-3 px-4 text-navy-800 font-medium bg-gold-50/20">{row.grand}</td>
                    <td className="py-3 px-4 text-navy-900 font-semibold">{row.royal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fuel & VIP Permits Notice Box (matching PDF Page 8 note) */}
        <div className="mt-8 bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-blue-900">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Peak Season & Custom Simulations Note:</span> Custom price simulations scale dynamic fuel surcharges (+12% peak season) and specialized temple VIP entry permits. Contact My Mayon for bespoke pricing on corporate, group, and MICE bookings.
          </div>
        </div>

      </div>
    </section>
  );
}
