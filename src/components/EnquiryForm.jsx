import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';
import { submitEnquiry } from '../api';

const TRAVEL_TYPES = ['Spiritual','Heritage','Nature','Adventure','Family','Honeymoon','Wellness','Food & Culture','International'];

export default function EnquiryForm({ packageSlug, packageTitle, destinationName, compact = false }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', destination: destinationName || '',
    travelType: '', travelDate: '', groupSize: '', message: '',
    packageSlug: packageSlug || '', packageTitle: packageTitle || '',
  });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]   = useState('');

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone) { setErrMsg('Name and phone are required.'); return; }
    setStatus('loading'); setErrMsg('');
    try {
      await submitEnquiry(form);
      setStatus('success');
    } catch (err) {
      setErrMsg(err.message || 'Submission failed. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-500" />
        <h3 className="text-xl font-bold text-navy-800">We'll be in touch within 24 hrs!</h3>
        <p className="text-navy-500 text-sm max-w-xs">Our travel desk will contact you on WhatsApp or phone to discuss your trip.</p>
        <button onClick={() => setStatus('idle')} className="text-gold-600 text-sm font-semibold hover:underline">Submit another enquiry</button>
      </div>
    );
  }

  const inputCls = 'w-full px-3.5 py-2.5 border border-navy-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition placeholder:text-navy-300';
  const labelCls = 'block text-xs font-semibold text-navy-600 uppercase tracking-wide mb-1';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!compact && <h3 className="text-xl font-bold text-navy-800">Send an Enquiry</h3>}

      {packageTitle && (
        <div className="bg-gold-50 border border-gold-200 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-700">
          📦 Enquiring about: <span className="font-bold">{packageTitle}</span>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label className={labelCls}>Full Name *</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone / WhatsApp *</label>
          <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Travel Date</label>
          <input name="travelDate" type="date" value={form.travelDate} onChange={onChange} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Travel Type</label>
          <select name="travelType" value={form.travelType} onChange={onChange} className={inputCls}>
            <option value="">Select type</option>
            {TRAVEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Group Size</label>
          <select name="groupSize" value={form.groupSize} onChange={onChange} className={inputCls}>
            <option value="">Select size</option>
            {['Solo','Couple','3–5','6–10','10+'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelCls}>Message / Requirements</label>
          <textarea name="message" value={form.message} onChange={onChange} rows={4}
            placeholder="Tell us about your travel interests, budget, special requests…"
            className={`${inputCls} resize-none`} />
        </div>
      )}

      {errMsg && <p className="text-red-600 text-sm font-medium">{errMsg}</p>}

      <Button type="submit" className="w-full" disabled={status === 'loading'} size={compact ? 'sm' : 'md'}>
        {status === 'loading' ? 'Sending…' : <><Send className="w-4 h-4" /> Send Enquiry</>}
      </Button>
    </form>
  );
}
