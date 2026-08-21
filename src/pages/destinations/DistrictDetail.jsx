import { useParams, Link } from 'react-router-dom';
import { MapPin, CalendarDays, Landmark, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { fetchDistrict, fetchPackages } from '../../api';
import { Spinner, ErrorBlock } from '../../components/ui/States';
import { FramedMedia, Divider } from '../../components/ui/Ornament';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function DistrictDetail() {
  const { slug } = useParams();
  const { data: dRes, loading: dLoad, error: dErr } = useFetch(() => fetchDistrict(slug), [slug]);
  const { data: pRes } = useFetch(() => fetchPackages(), []);

  const d  = dRes?.data;
  const pkgs = (pRes?.data || []).filter((p) => p.locationLabel?.toLowerCase() === d?.name?.toLowerCase()).slice(0, 4);

  if (dLoad) return <Spinner className="min-h-[60vh]" />;
  if (dErr || !d) return <ErrorBlock message={dErr || 'District not found'} />;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 bg-navy-800 overflow-hidden">
        {d.heroImage
          ? <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover opacity-70" />
          : <div className="w-full h-full bg-navy-radial flex items-center justify-center">
              <span className="font-display text-9xl text-white/10 font-bold">{d.name[0]}</span>
            </div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/destinations/district-explorer" className="inline-flex items-center gap-1.5 text-sm text-gold-300 hover:text-gold-200 mb-3 transition">
              <ArrowLeft className="w-4 h-4" /> All Districts
            </Link>
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white">{d.name}</h1>
                {d.tamilName && <p className="font-accent italic text-gold-300 text-xl mt-1">{d.tamilName}</p>}
              </div>
              <span className="bg-gold-500 text-navy-900 font-bold px-3 py-1.5 rounded-full text-sm">{d.region} Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge>About {d.name}</Badge>
              <Divider className="my-3" />
              <p className="text-navy-600 leading-relaxed text-base">{d.overview}</p>
            </div>

            {d.highlights?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-navy-800 mb-4">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {d.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 bg-gold-50 border border-gold-100 rounded-xl p-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-700 text-sm font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {d.circuits?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-navy-800 mb-3">Sacred Circuits</h3>
                <div className="flex flex-wrap gap-2">
                  {d.circuits.map((c) => (
                    <span key={c} className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-xs font-semibold">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {pkgs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-navy-800 mb-4">Packages in {d.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkgs.map((p) => (
                    <Link key={p._id} to={`/packages/${p.slug}`}>
                      <Card hover className="h-full">
                        <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">{p.category}</span>
                        <h4 className="font-bold text-navy-800 mt-2 mb-1 text-sm leading-snug">{p.title}</h4>
                        <p className="text-xs text-navy-500">{p.durationDays} day{p.durationDays > 1 ? 's' : ''} · from ₹{p.priceFrom?.toLocaleString('en-IN')}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card hover={false} className="space-y-4">
              <h3 className="font-bold text-navy-800">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                  <div><span className="text-navy-400 block text-xs">Presiding Deity</span><span className="font-semibold text-navy-700">{d.presidingDeity}</span></div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                  <div><span className="text-navy-400 block text-xs">Temples</span><span className="font-semibold text-navy-700">{d.templeCount} documented</span></div>
                </div>
                {d.idealSeason && (
                  <div className="flex items-start gap-2.5">
                    <CalendarDays className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                    <div><span className="text-navy-400 block text-xs">Best Season</span><span className="font-semibold text-navy-700">{d.idealSeason}</span></div>
                  </div>
                )}
                {d.faithCategories?.length > 0 && (
                  <div>
                    <span className="text-navy-400 block text-xs mb-1">Faith Categories</span>
                    <div className="flex flex-wrap gap-1.5">
                      {d.faithCategories.map((f) => (
                        <span key={f} className="px-2 py-0.5 bg-navy-50 border border-navy-100 rounded-full text-xs text-navy-600">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="bg-gold-500 rounded-2xl p-6 text-navy-900">
              <h4 className="font-bold text-lg mb-2">Plan a trip to {d.name}</h4>
              <p className="text-sm mb-4 text-navy-800">Get a personalised itinerary within 24 hours — free of charge.</p>
              <Link to={`/plan-my-trip?destination=${d.name}`}>
                <Button variant="secondary" size="sm" className="w-full !border-navy-900 !text-navy-900 hover:!bg-navy-900 hover:!text-cream">
                  Start Planning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
