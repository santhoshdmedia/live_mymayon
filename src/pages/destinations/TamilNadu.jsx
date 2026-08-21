import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';
import { TriangleWatermark } from '../../components/ui/Ornament';
import { useFetch } from '../../hooks/useFetch';
import { fetchDistricts } from '../../api';
import { Spinner, ErrorBlock } from '../../components/ui/States';
import Button from '../../components/ui/Button';

const CIRCUITS = [
  { name: 'Arupadai Veedu',        count: '6 temples',   desc: 'Six abodes of Lord Murugan across Tamil Nadu' },
  { name: 'Navagraha Temples',     count: '9 temples',   desc: 'Celestial planet temples near Kumbakonam' },
  { name: 'Pancha Bhoota Sthalam', count: '5 temples',   desc: 'Five elements of nature, five Shiva shrines' },
  { name: 'Divya Desam',           count: '108 shrines', desc: 'Sacred Vishnu temples sung by the Alvars' },
  { name: 'Paadal Petra Sthalams', count: '276 temples', desc: 'Shiva temples glorified by the Nayanmars' },
  { name: 'Saptha Vidanga Sthalams',count: '7 temples',  desc: 'Seven Shiva temples of the Kaveri delta' },
];

export default function TamilNadu() {
  const { data, loading, error, refetch } = useFetch(() => fetchDistricts());

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Destinations · Tamil Nadu</p>
          <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight">The Land of Temples, Traditions & Timeless Landscapes</h1>
          <p className="text-navy-100 max-w-xl text-lg leading-relaxed mb-8">
            Tamil Nadu's 38 districts are home to over 33,000 temples, six UNESCO World Heritage Sites, and centuries of living culture. Every district is a pilgrimage.
          </p>
          <Link to="/destinations/district-explorer"><Button size="lg">Explore All 38 Districts <ArrowRight className="w-5 h-5" /></Button></Link>
        </div>
      </section>

      {/* Sacred Circuits */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Sacred Circuits" title="Tamil Nadu's Legendary Pilgrimage Trails" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {CIRCUITS.map((c) => (
              <div key={c.name} className="bg-white border border-navy-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">{c.count}</span>
                <h3 className="font-bold text-navy-800 text-lg mt-3 mb-1">{c.name}</h3>
                <p className="text-navy-500 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Districts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="38 Districts" title="Every District Has a Story" centered />
          {loading && <Spinner />}
          {error   && <ErrorBlock message={error} onRetry={refetch} />}
          {data && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
              {data.data.map((d) => (
                <Link key={d._id} to={`/districts/${d.slug}`}
                  className="group flex flex-col items-center gap-2 p-4 bg-cream border border-navy-100 rounded-2xl hover:border-gold-400 hover:bg-gold-50 transition text-center">
                  <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-900 transition">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-navy-700 group-hover:text-gold-700 transition">{d.name}</span>
                  {d.tamilName && <span className="text-xs text-navy-400 font-accent italic">{d.tamilName}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
