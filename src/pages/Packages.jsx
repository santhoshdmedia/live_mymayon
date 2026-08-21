import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, Star, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { TriangleWatermark } from '../components/ui/Ornament';
import Button from '../components/ui/Button';
import { useFetch } from '../hooks/useFetch';
import { fetchPackages } from '../api';
import { Spinner, ErrorBlock, EmptyBlock } from '../components/ui/States';

const CATEGORIES = ['All','Spiritual','Heritage','Nature','Adventure','Honeymoon','Family','Food & Culture','International'];

export default function Packages() {
  const [params] = useSearchParams();
  const [cat, setCat]     = useState('All');
  const [search, setSearch] = useState(params.get('q') || '');

  const { data, loading, error, refetch } = useFetch(() => fetchPackages());

  const pkgs = (data?.data || []).filter((p) => {
    const matchC = cat === 'All' || p.category === cat;
    const matchS = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
                   p.locationLabel?.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Tour Packages</p>
          <h1 className="text-5xl font-bold mb-4">Journeys Curated for You</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg">
            Transparent pricing, verified stays and local guides — every package is built around your travel style.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-navy-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages…"
              className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-full text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-navy-400" />
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${cat === c ? 'bg-gold-500 text-navy-900 border-gold-500' : 'border-navy-200 text-navy-600 hover:border-gold-400 hover:text-gold-600'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Spinner />}
          {error   && <ErrorBlock message={error} onRetry={refetch} />}
          {!loading && !error && pkgs.length === 0 && <EmptyBlock message="No packages match your filters." />}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((p) => (
              <Link key={p._id} to={`/packages/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-48 relative bg-navy-800 overflow-hidden">
                  {p.heroImage
                    ? <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    : <div className="w-full h-full bg-navy-radial flex items-center justify-center">
                        <span className="text-white/10 font-display font-bold text-5xl">{p.title[0]}</span>
                      </div>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-gold-500 text-navy-900 text-xs font-bold px-2 py-1 rounded-full">{p.category}</span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-navy-800 text-xs font-bold px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-gold-500 text-gold-500" /> {p.rating || '4.8'}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-navy-800 text-base leading-snug mb-1">{p.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-navy-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.locationLabel}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.durationDays} days</span>
                  </div>
                  <p className="text-xs text-navy-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-100">
                    <div>
                      <span className="text-xs text-navy-400">From</span>
                      <p className="font-bold text-navy-800 text-lg leading-none">₹{p.priceFrom?.toLocaleString('en-IN')}</p>
                      <span className="text-xs text-navy-400">per person</span>
                    </div>
                    <span className="flex items-center gap-1 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      View <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!loading && !error && pkgs.length > 0 && (
            <p className="text-center text-sm text-navy-400 mt-8">{pkgs.length} package{pkgs.length !== 1 ? 's' : ''} found</p>
          )}
        </div>
      </section>
    </div>
  );
}
