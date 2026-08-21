import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { useFetch } from '../../hooks/useFetch';
import { fetchDistricts } from '../../api';
import { Spinner, ErrorBlock } from '../ui/States';

function DistCard({ d, index }) {
  const colors = ['#1e2a46','#2c3a5c','#74522a','#883c53','#93692f'];
  const bg = colors[index % colors.length];
  return (
    <Link to={`/districts/${d.slug}`}
      className="group rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-2xl hover:shadow-gold-900/10 hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col">
      <div className="h-44 relative overflow-hidden" style={{ background: bg }}>
        {d.heroImage
          ? <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={176} />
          : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-5xl text-white/20 font-bold">{d.name[0]}</span>
            </div>
          )
        }
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
        <span className="absolute top-3 right-3 bg-gold-500 text-navy-900 text-xs font-bold px-2 py-1 rounded-full">
          {d.region}
        </span>
        <span className="absolute bottom-3 left-3 text-white/80 text-xs flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {d.templeCount} temples
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-bold text-navy-800 text-base">{d.name}</h4>
          {d.tamilName && <span className="text-gold-500 text-sm font-accent italic">{d.tamilName}</span>}
        </div>
        <p className="text-navy-500 text-xs leading-relaxed flex-1 line-clamp-2">{d.presidingDeity}</p>
        {d.idealSeason && (
          <p className="text-xs text-navy-400 mt-2">Best: {d.idealSeason}</p>
        )}
      </div>
    </Link>
  );
}

export default function Destinations() {
  const { data, loading, error, refetch } = useFetch(() => fetchDistricts({ featured: 'true' }));

  return (
    <section id="destinations" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="38 District Explorer"
          title="Every District, One Temple Story"
          description="From Kanchipuram's thousand pillars to Rameswaram's shoreline shrine — browse Tamil Nadu district by district."
        />

        {loading && <Spinner />}
        {error && <ErrorBlock message={error} onRetry={refetch} />}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {data.data.map((d, i) => <DistCard key={d._id} d={d} index={i} />)}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/destinations/district-explorer">
            <Button variant="secondary" size="lg" className="mx-auto">
              Explore All 38 Districts <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
