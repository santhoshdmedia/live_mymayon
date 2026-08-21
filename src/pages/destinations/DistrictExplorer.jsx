import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';
import { TriangleWatermark } from '../../components/ui/Ornament';
import { useFetch } from '../../hooks/useFetch';
import { fetchDistricts } from '../../api';
import { Spinner, ErrorBlock, EmptyBlock } from '../../components/ui/States';

const REGIONS = ['All', 'Northern', 'Western', 'Central', 'Southern', 'Delta'];
const COLORS  = ['#1e2a46','#2c3a5c','#74522a','#883c53','#93692f','#1a4a3c'];

export default function DistrictExplorer() {
  const [region, setRegion]   = useState('All');
  const [search, setSearch]   = useState('');
  const { data, loading, error, refetch } = useFetch(() => fetchDistricts());

  const districts = (data?.data || []).filter((d) => {
    const matchR = region === 'All' || d.region === region;
    const matchS = !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
                   d.presidingDeity.toLowerCase().includes(search.toLowerCase());
    return matchR && matchS;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">38 District Explorer</p>
          <h1 className="text-5xl font-bold mb-4">Discover Tamil Nadu, District by District</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg">
            Each district is a universe of temples, traditions and tales. Browse all 38, filter by region, and find your next pilgrimage.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-navy-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search districts or deity…"
              className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-full text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-navy-400" />
            {REGIONS.map((r) => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  region === r
                    ? 'bg-gold-500 text-navy-900 border-gold-500'
                    : 'border-navy-200 text-navy-600 hover:border-gold-400 hover:text-gold-600'
                }`}>{r}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Spinner />}
          {error   && <ErrorBlock message={error} onRetry={refetch} />}
          {!loading && !error && districts.length === 0 && <EmptyBlock message="No districts match your filters." />}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {districts.map((d, i) => (
              <Link key={d._id} to={`/districts/${d.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-40 relative" style={{ background: COLORS[i % COLORS.length] }}>
                  {d.heroImage
                    ? <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    : <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-5xl text-white/15 font-bold">{d.name[0]}</span>
                      </div>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute top-3 right-3 bg-gold-500 text-navy-900 text-xs font-bold px-2 py-1 rounded-full">{d.region}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-navy-800">{d.name}</h3>
                    {d.tamilName && <span className="text-gold-500 text-sm font-accent italic">{d.tamilName}</span>}
                  </div>
                  <p className="text-xs text-navy-500 mb-2 flex-1">{d.presidingDeity}</p>
                  <div className="flex items-center justify-between text-xs text-navy-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.templeCount} temples</span>
                    {d.idealSeason && <span>{d.idealSeason}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!loading && !error && (
            <p className="text-center text-sm text-navy-400 mt-8">{districts.length} districts shown</p>
          )}
        </div>
      </section>
    </div>
  );
}
