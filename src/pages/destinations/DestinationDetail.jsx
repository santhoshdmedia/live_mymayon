import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const DEST_MAP = {
  'tamil-nadu':    { title: 'Tamil Nadu', redirect: '/destinations/tamil-nadu' },
  'india':         { title: 'India',      redirect: '/destinations/india' },
  'international': { title: 'International', redirect: '/destinations/international' },
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const dest = DEST_MAP[slug];

  if (dest?.redirect) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-3xl font-bold text-navy-800">{dest.title}</h1>
        <p className="text-navy-500 text-center max-w-md">Redirecting you to the full {dest.title} destination guide.</p>
        <Link to={dest.redirect}><Button size="lg">Go to {dest.title} <ArrowRight className="w-5 h-5" /></Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-navy-800 capitalize">{slug?.replace(/-/g, ' ')}</h1>
      <p className="text-navy-500 max-w-md">This destination page is coming soon. Explore our districts in the meantime.</p>
      <Link to="/destinations/district-explorer"><Button>Explore 38 Districts <ArrowRight className="w-5 h-5" /></Button></Link>
    </div>
  );
}
