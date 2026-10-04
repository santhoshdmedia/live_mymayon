import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { useFetch } from '../../hooks/useFetch';
import { fetchDistricts } from '../../api';
import { Spinner, ErrorBlock } from '../ui/States';
import useScrollReveal from '../../hooks/useScrollReveal';

import PackageCoverCard from '../ui/PackageCoverCard';

function DistCard({ d }) {
  return (
    <PackageCoverCard
      item={d}
      to={`/districts/${d.slug}`}
      title={d.name}
      tags={`${d.region} | ${d.templeCount || 0} Temples | ${d.idealSeason || 'Year-round'}`}
    />
  );
}

export default function Destinations() {
  const { data, loading, error, refetch } = useFetch(() => fetchDistricts({ featured: 'true' }));
  const ref = useScrollReveal();

  const districtList = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);

  return (
    <section id="destinations" className="py-16 lg:py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal reveal-up">
          <SectionTitle
            eyebrow="38 District Explorer"
            title="Every District, One Temple Story"
            description="From Kanchipuram's thousand pillars to Rameswaram's shoreline shrine — browse Tamil Nadu district by district."
          />
        </div>

        {loading && <Spinner />}
        {error && <ErrorBlock message={error} onRetry={refetch} />}
        {!loading && districtList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {districtList.map((d, i) => (
              <div
                key={d._id || i}
                className="scroll-reveal reveal-up"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <DistCard d={d} index={i} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 scroll-reveal reveal-up" style={{ animationDelay: '600ms' }}>
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
