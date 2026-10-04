import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MdTempleHindu } from 'react-icons/md';
import { GiMountainCave, GiSunset, GiWaveSurfer, GiAncientColumns } from 'react-icons/gi';
import { getCoverImage } from '../../utils/imageResolver';

function getIcon(item = {}) {
  const text = `${item.title || ''} ${item.locationLabel || ''} ${item.name || ''} ${item.category || ''}`.toLowerCase();
  if (text.includes('mountain') || text.includes('kodaikanal') || text.includes('ooty') || text.includes('nilgiri') || text.includes('hills') || text.includes('nature')) {
    return GiMountainCave;
  }
  if (text.includes('beach') || text.includes('sea') || text.includes('rameswaram') || text.includes('coastal') || text.includes('ocean')) {
    return GiWaveSurfer;
  }
  if (text.includes('kanyakumari') || text.includes('sunrise') || text.includes('sunset')) {
    return GiSunset;
  }
  if (text.includes('heritage') || text.includes('chennai') || text.includes('mahabalipuram') || text.includes('chola') || text.includes('palace')) {
    return GiAncientColumns;
  }
  return MdTempleHindu;
}

export default function PackageCoverCard({
  item,
  to,
  title,
  subtitle,
  tags,
  price,
  rating,
  className = '',
}) {
  const linkTo = to || (item?.slug ? (item.category ? `/packages/${item.slug}` : `/districts/${item.slug}`) : '#');
  const coverUrl = getCoverImage(item);
  const displayTitle = title || item?.title || item?.name || 'Explore Tamil Nadu';
  const displayTags = tags || subtitle || (
    item?.locationLabel
      ? `${item.locationLabel} | ${item.category || 'Tour'} | ₹${item.priceFrom?.toLocaleString('en-IN') || '4,999'}`
      : (item?.presidingDeity || `${item?.region || 'Tamil Nadu'} | Heritage | Culture`)
  );
  const IconComponent = getIcon(item);

  return (
    <Link
      to={linkTo}
      className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer block h-[230px] sm:h-[250px] lg:h-[260px] ${className}`}
    >
      {/* ── Full Cover Image ── */}
      <img
        src={coverUrl}
        alt={displayTitle}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />

      {/* ── Vignette / Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* ── Top Badges (Category / Price) ── */}
      {item?.category && (
        <span className="absolute top-3 left-3 bg-[#c59a27] text-navy-950 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {item.category}
        </span>
      )}
      {(item?.priceFrom || price) && (
        <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
          ₹{(item?.priceFrom || price).toLocaleString('en-IN')}
        </span>
      )}

      {/* ── Bottom Dark Frosted Pill Overlay Bar ── */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 sm:py-2.5 border border-white/15 flex items-center justify-between shadow-lg transition-colors duration-300 group-hover:bg-black/75">
        
        {/* Left: Icon & Text */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#f5d77f]">
            <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
              {displayTitle}
            </h3>
            <p className="text-[11px] sm:text-xs text-white/80 truncate font-medium">
              {displayTags}
            </p>
          </div>
        </div>

        {/* Right: Golden circular arrow button */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4a853] group-hover:bg-[#e4b85c] flex items-center justify-center text-navy-950 font-bold transition-transform duration-300 group-hover:scale-110 flex-shrink-0 shadow-sm">
          <ChevronRight className="w-4 h-4 text-navy-950 stroke-[3]" />
        </div>
      </div>
    </Link>
  );
}
