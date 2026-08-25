import { useState } from 'react';
import { Hotel, Bus, Camera, Utensils, MapPin, CheckCircle2, Send } from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { submitEnquiry } from '../api';

const TYPES = [
  { icon: Hotel,    label:'Accommodation',    desc:'Hotels, homestays, resorts and heritage properties.' },
  { icon: Bus,      label:'Transport',         desc:'Cab operators, coach providers, ferry services.' },
  { icon: Camera,   label:'Tour Guides',       desc:'Licensed guides, interpreters and experience hosts.' },
  { icon: Utensils, label:'F&B & Experiences', desc:'Restaurants, cooking class hosts, activity providers.' },
];
const BENEFITS = ['Access to curated, high-intent travellers','Marketing support across our digital channels','Transparent revenue sharing — no hidden deductions','Dedicated partner account manager','Listed on our district and package pages'];

export default function Partner() {
  const [form, setForm] = useState({ name:'', business:'', type:'', phone:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const [err, setErr] = useState('');
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone) { setErr('Name and phone are required.'); return; }
    setStatus('loading'); setErr('');
    try {
      await submitEnquiry({ ...form, travelType: 'Partner Enquiry', message: `Business: ${form.business} | Type: ${form.type} | ${form.message}` });
      setStatus('success');
    } catch (ex) { setErr(ex.message || 'Submission failed.'); setStatus('error'); }
  };

  const inputCls = 'w-full px-3.5 py-2.5 border border-navy-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition placeholder:text-navy-300';
  const labelCls = 'block text-xs font-semibold text-navy-600 uppercase tracking-wide mb-1';

  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Partner With Us</p>
          <h1 className="text-5xl font-bold mb-4">Grow Together with My Mayon</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg leading-relaxed">Join our network of verified local partners and reach travellers who are actively planning their Tamil Nadu journey.</p>
        </div>
      </section>

      {/* Partner types */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Who Can Join" title="We Welcome All Travel Partners" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {TYPES.map(({ icon: Icon, label, desc }) => (
              <Card key={label} hover className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{label}</h3>
                <p className="text-navy-500 text-sm">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-navy-800 mb-6">Why Partner With Us?</h2>
            <ul className="space-y-4 mb-8">
              {BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-600">{b}</span>
                </li>
              ))}
            </ul>
            <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
              <p className="font-bold text-navy-800 mb-1">12,000+ travellers and counting</p>
              <p className="text-navy-500 text-sm">Our partner network already spans 38 districts — join them.</p>
            </div>
          </div>

          <div className="bg-cream rounded-3xl border border-navy-100 p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-green-500" />
                <h3 className="text-xl font-bold text-navy-800">Application received!</h3>
                <p className="text-navy-500 text-sm max-w-xs">Our partnerships team will contact you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-navy-800 mb-4">Partner Application</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Your Name *</label><input name="name" value={form.name} onChange={onChange} placeholder="Full name" required className={inputCls} /></div>
                  <div><label className={labelCls}>Business Name</label><input name="business" value={form.business} onChange={onChange} placeholder="Hotel / Company name" className={inputCls} /></div>
                  <div><label className={labelCls}>Phone *</label><input name="phone" value={form.phone} onChange={onChange} placeholder="+91 95971 00664" required className={inputCls} /></div>
                  <div><label className={labelCls}>Email</label><input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@business.com" className={inputCls} /></div>
                </div>
                <div><label className={labelCls}>Partner Type</label>
                  <select name="type" value={form.type} onChange={onChange} className={inputCls}>
                    <option value="">Select type</option>
                    {TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Message</label><textarea name="message" value={form.message} onChange={onChange} rows={3} placeholder="Tell us about your business, districts you cover, capacity…" className={`${inputCls} resize-none`} /></div>
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <Button type="submit" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : <><Send className="w-4 h-4" /> Submit Application</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
