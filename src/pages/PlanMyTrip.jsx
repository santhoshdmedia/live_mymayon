import { useSearchParams } from 'react-router-dom';
import { TriangleWatermark } from '../components/ui/Ornament';
import EnquiryForm from '../components/EnquiryForm';
import { Clock, Phone, Shield, Users } from 'lucide-react';

const WHY = [
  { icon: Clock,   text: 'Free itinerary within 24 hours' },
  { icon: Shield,  text: 'No advance payment required' },
  { icon: Users,   text: 'Local guides, verified stays' },
  { icon: Phone,   text: '24/7 support throughout your trip' },
];

export default function PlanMyTrip() {
  const [params] = useSearchParams();
  const dest     = params.get('destination') || '';
  const pkg      = params.get('package') || '';
  const pkgTitle = params.get('packageTitle') || '';

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Plan My Trip</p>
          <h1 className="text-5xl font-bold mb-4">Tell Us Where Your Heart Wants to Go</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg leading-relaxed">
            Share your travel details and we'll put together a personalised itinerary — free, within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg shadow-navy-900/8 p-8 border border-navy-100">
              <EnquiryForm destinationName={dest} packageSlug={pkg} packageTitle={pkgTitle} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-800 rounded-2xl p-6 text-cream">
                <h3 className="font-bold text-lg mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  {['We review your request within 2 hours.','Our travel desk calls or WhatsApps you.','You receive a personalised itinerary — free of charge.','Confirm, customise and book at your own pace.'].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                      <span className="text-navy-100 text-sm">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6 space-y-3">
                <h4 className="font-bold text-navy-800 mb-2">Our Promise</h4>
                {WHY.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-navy-600">
                    <Icon className="w-4 h-4 text-gold-500 flex-shrink-0" /> {text}
                  </div>
                ))}
              </div>

              <div className="bg-white border border-navy-100 rounded-2xl p-6 text-center">
                <p className="text-navy-500 text-sm mb-2">Prefer to call us?</p>
                <a href="tel:+919876543210" className="text-2xl font-bold text-navy-800 hover:text-gold-600 transition">+91 98765 43210</a>
                <p className="text-xs text-navy-400 mt-1">Mon–Sat, 9 AM – 7 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
