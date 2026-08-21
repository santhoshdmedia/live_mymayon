import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock, MapPin, Users, Star, CheckCircle2, XCircle, ArrowLeft, Phone,
  Landmark, ChevronDown, Sparkles, ShieldCheck,
} from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { fetchPackage } from '../api';
import { Spinner, ErrorBlock } from '../components/ui/States';
import { Divider } from '../components/ui/Ornament';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EnquiryForm from '../components/EnquiryForm';
import GallerySlideshow from '../components/ui/GallerySlideshow';

// Map currency codes to both a display symbol and the locale that formats
// their thousands/decimal separators correctly. Using a single hardcoded
// 'en-IN' locale for every currency (the original bug) produced wrong
// grouping for USD/EUR/GBP amounts, e.g. "$1,23,456" instead of "$123,456".
const CURRENCY_CONFIG = {
  INR: { symbol: '₹', locale: 'en-IN' },
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

function formatPrice(amount, currency = 'INR') {
  if (amount == null) return '—';
  const config = CURRENCY_CONFIG[currency] || { symbol: `${currency} `, locale: 'en-US' };
  return `${config.symbol}${amount.toLocaleString(config.locale)}`;
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl border transition-colors ${isOpen ? 'border-gold-300 bg-gold-50/50' : 'border-navy-100 bg-white'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
      >
        <h4 className="font-bold text-navy-800">{faq.question}</h4>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-navy-500 text-sm leading-relaxed px-5 pb-4">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function PackageDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(() => fetchPackage(slug), [slug]);
  const p = data?.data;
  const [openFaq, setOpenFaq] = useState(0);

  if (loading) return <Spinner className="min-h-[60vh]" />;
  if (error || !p) return <ErrorBlock message={error || 'Package not found'} />;

  const nights = Math.max(p.durationDays - 1, 0);
  // Prefer real contact info from the API response; fall back to a constant
  // only if the backend hasn't supplied one, instead of always hardcoding it.
  const contactPhone = p.contactPhone || '+91 98765 43210';
  const contactPhoneHref = `tel:${contactPhone.replace(/[^\d+]/g, '')}`;
  const groupSizeLabel = p.groupSize ? `Group size: ${p.groupSize}` : 'Group size: 2–15 people';

  // Gallery shows the rest of the shoot — exclude the hero image itself so
  // the same photo isn't shown twice back to back.
  const galleryImages = (p.images || []).filter((img) => {
    const url = typeof img === 'string' ? img : img?.url;
    return url && url !== p.heroImage;
  });

  return (
    <div className="bg-cream">
      {/* ── Hero — always the single hero_image, never part of the slideshow ── */}
      <section className="relative h-[26rem] sm:h-[32rem] bg-navy-800 overflow-hidden">
        {p.heroImage
          ? (
            <img
              src={p.heroImage}
              alt={p.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          )
          : <div className="w-full h-full bg-navy-radial" aria-hidden="true" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/40 via-transparent to-transparent" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
            <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 hover:text-gold-200 mb-5 transition group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" /> All Packages
            </Link>

            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" /> {p.category}
              </span>
              {p.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">{p.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold-400" />{p.locationLabel}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gold-400" />{p.durationDays} day{p.durationDays > 1 ? 's' : ''} / {nights} night{nights !== 1 ? 's' : ''}</span>
              {p.rating != null && (
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-gold-400 text-gold-400" />{p.rating} rating</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating price/booking bar — modern touch, overlaps hero/content seam */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-8 sm:-mt-10 z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-navy-100 px-5 sm:px-7 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center sm:justify-start">
              <div>
                <span className="text-xs text-navy-400 uppercase tracking-wide">Starting from</span>
                <p className="text-3xl font-bold text-navy-800 leading-tight">{formatPrice(p.priceFrom, p.currency)}<span className="text-sm font-medium text-navy-400"> /person</span></p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-navy-100" />
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Users className="w-4 h-4 text-gold-500" /> {groupSizeLabel}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href={contactPhoneHref} className="flex-1 sm:flex-none">
                <Button variant="secondary" className="w-full">
                  <Phone className="w-4 h-4" /> Call
                </Button>
              </a>
              <Link to={`/plan-my-trip?package=${p.slug}`} className="flex-1 sm:flex-none">
                <Button className="w-full">Book This Package</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <Badge>Overview</Badge>
              <Divider className="my-3" />
              <p className="text-navy-600 leading-relaxed text-lg">{p.tagline}</p>
            </div>

            {p.district?.overview && (
              <div className="relative overflow-hidden bg-navy-900 rounded-3xl p-6 sm:p-8">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold-500/10 blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <h3 className="flex items-center gap-2.5 font-bold text-white text-lg mb-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-400/30">
                      <Landmark className="w-[18px] h-[18px] text-gold-400" />
                    </span>
                    About {p.district.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-2xl">{p.district.overview}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white/80">Region: {p.district.region}</span>
                    <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white/80">Deity: {p.district.presidingDeity}</span>
                    <span className="bg-gold-500/15 border border-gold-400/30 rounded-full px-3 py-1.5 text-gold-300 font-medium">{p.district.templeCount} temples</span>
                  </div>
                </div>
              </div>
            )}

            {(p.inclusions?.length > 0 || p.exclusions?.length > 0) && (
              <div>
                <Badge>Package Details</Badge>
                <Divider className="my-3 mb-5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {p.inclusions?.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-navy-800 mb-3">
                        <ShieldCheck className="w-[18px] h-[18px] text-gold-500" /> What's Included
                      </h3>
                      <div className="space-y-2.5">
                        {p.inclusions.map((item, i) => (
                          <div key={`${item}-${i}`} className="flex items-start gap-2.5 bg-gold-50 border border-gold-100 rounded-xl p-3">
                            <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-navy-700 text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {p.exclusions?.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-navy-800 mb-3">
                        <XCircle className="w-[18px] h-[18px] text-navy-300" /> Not Included
                      </h3>
                      <div className="space-y-2.5">
                        {p.exclusions.map((item, i) => (
                          <div key={`${item}-${i}`} className="flex items-start gap-2.5 bg-navy-50 border border-navy-100 rounded-xl p-3">
                            <XCircle className="w-5 h-5 text-navy-300 flex-shrink-0 mt-0.5" />
                            <span className="text-navy-500 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Gallery slideshow — the rest of the package photos, after Inclusions ── */}
            {galleryImages.length > 0 && (
              <div>
                <Badge>Gallery</Badge>
                <Divider className="my-3 mb-5" />
                <GallerySlideshow images={galleryImages} title={p.title} />
              </div>
            )}

            {p.stops?.length > 0 && (
              <div>
                <Badge>Day by Day</Badge>
                <Divider className="my-3 mb-5" />
                <h3 className="text-2xl font-bold text-navy-800 mb-6">Itinerary</h3>
                <div className="relative space-y-6">
                  <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-gold-300 via-navy-100 to-transparent" aria-hidden="true" />
                  {p.stops.map((stop, i) => (
                    <div key={stop.id ?? i} className="relative flex gap-4">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-gold-500 text-navy-900 font-bold flex items-center justify-center flex-shrink-0 text-xs text-center leading-tight shadow-gold">
                        {i + 1}
                      </div>
                      <div className="bg-white border border-navy-100 rounded-2xl p-5 shadow-sm flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-bold text-navy-800">{stop.title}</h4>
                          {stop.label && <Badge className="text-[10px]">{stop.label}</Badge>}
                        </div>
                        {stop.time && <p className="text-xs text-gold-600 font-medium mb-1">{stop.time}</p>}
                        <p className="text-navy-500 text-sm leading-relaxed">{stop.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {p.faqs?.length > 0 && (
              <div>
                <Badge>Good to Know</Badge>
                <Divider className="my-3 mb-5" />
                <h3 className="text-2xl font-bold text-navy-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {p.faqs.map((faq, i) => (
                    <FaqItem
                      key={faq.id ?? i}
                      faq={faq}
                      isOpen={openFaq === i}
                      onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card hover={false} className="sticky top-24 !p-0 overflow-hidden">
              <div className="bg-navy-900 px-6 py-5">
                <span className="text-xs text-gold-300/80 uppercase tracking-wide">Starting from</span>
                <p className="text-4xl font-bold text-white mt-1">{formatPrice(p.priceFrom, p.currency)}</p>
                <span className="text-sm text-white/50">per person</span>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-5">
                  {[
                    { key: 'duration', icon: Clock, text: `${p.durationDays} day${p.durationDays > 1 ? 's' : ''} / ${nights} night${nights !== 1 ? 's' : ''}` },
                    { key: 'location', icon: MapPin, text: p.locationLabel },
                    { key: 'group', icon: Users, text: groupSizeLabel },
                  ].map(({ key, icon: Icon, text }) => (
                    <div key={key} className="flex items-center gap-3 text-sm text-navy-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-50">
                        <Icon className="w-4 h-4 text-gold-500" />
                      </span>
                      {text}
                    </div>
                  ))}
                </div>
                <Link to={`/plan-my-trip?package=${p.slug}`}>
                  <Button className="w-full mb-3">Book This Package</Button>
                </Link>
                <a href={contactPhoneHref}>
                  <Button variant="secondary" className="w-full">
                    <Phone className="w-4 h-4" /> Call to Enquire
                  </Button>
                </a>
              </div>
            </Card>


            <EnquiryForm packageSlug={p.slug} packageTitle={p.title} compact />
          </div>
        </div>
      </div>
    </div>
  );
}