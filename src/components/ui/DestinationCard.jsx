import { Star, Compass } from 'lucide-react';
import Card from './Card';

const DestinationCard = ({ title, category, rating, price }) => {
  return (
    <Card hover className="overflow-hidden group">
      <div className="relative h-48 bg-navy-800 rounded-xl overflow-hidden mb-4">
        <div className="w-full h-full bg-navy-radial flex items-center justify-center">
          <Compass className="w-12 h-12 text-gold-400/40 group-hover:rotate-45 transition-transform duration-500" />
        </div>
        <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-bold">
          ${price}
        </div>
      </div>
      <h4 className="text-lg font-bold text-navy-800 mb-1">{title}</h4>
      <p className="text-sm text-navy-500 mb-3">{category}</p>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-gold-400 text-gold-400' : 'text-navy-100'}`} />
        ))}
        <span className="text-sm text-navy-500 ml-2">({rating}.0)</span>
      </div>
    </Card>
  );
};

export default DestinationCard;
