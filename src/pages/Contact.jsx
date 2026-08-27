import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import Button from '../components/ui/Button';
import { submitEnquiry } from '../api';
import useScrollReveal from '../hooks/useScrollReveal';

const CONTACT_INFO = [
  { icon: Phone,   label: 'Phone / WhatsApp',  value: '+91 95971 00664',      href: 'tel:+919597100664' },
  { icon: Mail,    label: 'Email',              value: 'hello@mymayon.com',    href: 'mailto:hello@mymayon.com' },
  { icon: MapPin,  label: 'Office',             value: 'Chennai, Tamil Nadu, India', href: null },
  { icon: Clock,   label: 'Hours',              value: 'Mon–Sat, 9 AM – 7 PM IST', href: null },
];

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [err, setErr]     = useState('');
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const ref = useScrollReveal();

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone) { setErr('Name and phone are required.'); return; }
    setStatus('loading'); setErr('');
    try {
      await submitEnquiry({ ...form, travelType: 'General Enquiry' });
      setStatus('success');
    } catch (ex) {
      setErr(ex.message || 'Submission failed. Please try again.');
      setStatus('error');
    }
  };

  const inputCls = 'w-full px-3.5 py-2.5 border border-navy-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition placeholder:text-navy-300';
  const labelCls = 'block text-xs font-semibold text-navy-600 uppercase tracking-wide mb-1';

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2 animate-fade-in-down" style={{ animationDelay: '100ms' }}>Get In Touch</p>
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>We'd Love to Hear From You</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            Planning a trip, have a question, or just want to say hello — we're here.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact details */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-navy-800 mb-6 scroll-reveal reveal-left">Contact Details</h2>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                <div
                  key={label}
                  className="scroll-reveal reveal-left flex items-start gap-4 bg-white border border-navy-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-0.5">{label}</p>
                    {href
                      ? <a href={href} className="font-semibold text-navy-800 hover:text-gold-600 transition text-sm">{value}</a>
                      : <p className="font-semibold text-navy-800 text-sm">{value}</p>
                    }
                  </div>
                </div>
              ))}

              {/* Quick links */}
              <div className="scroll-reveal reveal-left bg-navy-800 rounded-2xl p-6 text-cream mt-6" style={{ animationDelay: '600ms' }}>
                <h3 className="font-bold text-base mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Plan a trip', href: '/plan-my-trip' },
                    { label: 'Browse packages', href: '/packages' },
                    { label: 'Partner with us', href: '/partner' },
                  ].map(l => (
                    <a key={l.label} href={l.href}
                      className="block text-sm text-navy-200 hover:text-gold-300 transition py-1 border-b border-navy-700 last:border-0">
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 scroll-reveal reveal-right bg-white rounded-3xl border border-navy-100 shadow-lg p-8" style={{ animationDelay: '300ms' }}>
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center animate-scale-up">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h3 className="text-2xl font-bold text-navy-800">Message received!</h3>
                  <p className="text-navy-500 max-w-sm">We'll get back to you within 24 hours. If it's urgent, please call us directly.</p>
                  <button onClick={() => setStatus('idle')} className="text-gold-600 text-sm font-semibold hover:underline mt-2">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-navy-800 mb-6">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone / WhatsApp *</label>
                      <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 95971 00664" required className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Email</label>
                      <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Message *</label>
                      <textarea name="message" value={form.message} onChange={onChange} rows={5}
                        placeholder="How can we help you? Ask about a package, district, circuit or anything else…"
                        required className={`${inputCls} resize-none`} />
                    </div>
                  </div>
                  {err && <p className="text-red-600 text-sm font-medium">{err}</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending…' : <><Send className="w-5 h-5" /> Send Message</>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
