import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, Star, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { TriangleWatermark } from '../components/ui/Ornament';
import Button from '../components/ui/Button';
import { useFetch } from '../hooks/useFetch';
import { fetchPackages } from '../api';
import { Spinner, ErrorBlock, EmptyBlock } from '../components/ui/States';
import useScrollReveal from '../hooks/useScrollReveal';
import PackageCoverCard from '../components/ui/PackageCoverCard';

const CATEGORIES = ['All','Spiritual','Heritage','Nature','Adventure','Honeymoon','Family','Food & Culture','International'];

export default function Packages() {
  const [params] = useSearchParams();
  const [cat, setCat]     = useState('All');
  const [search, setSearch] = useState(params.get('q') || '');
  const ref = useScrollReveal();

  const { data, loading, error, refetch } = useFetch(() => fetchPackages());

  const pkgs = (data?.data || []).filter((p) => {
    const matchC = cat === 'All' || p.category === cat;
    const matchS = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
                   p.locationLabel?.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  });

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2 animate-fade-in-down" style={{ animationDelay: '100ms' }}>Tour Packages</p>
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Journeys Curated for You</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            Transparent pricing, verified stays and local guides — every package is built around your travel style.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-lg border-b border-navy-100 shadow-sm">
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${cat === c ? 'bg-gold-500 text-navy-900 border-gold-500 shadow-lg shadow-gold-500/20' : 'border-navy-200 text-navy-600 hover:border-gold-400 hover:text-gold-600'}`}>
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
            {pkgs.map((p, i) => (
              <div
                key={p._id}
                className="scroll-reveal reveal-up"
                style={{ animationDelay: `${(i % 6) * 80}ms` }}
              >
                <PackageCoverCard
                  item={p}
                  title={p.title}
                  tags={`${p.locationLabel} | ${p.durationDays} Days | ₹${p.priceFrom?.toLocaleString('en-IN')}`}
                />
              </div>
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
