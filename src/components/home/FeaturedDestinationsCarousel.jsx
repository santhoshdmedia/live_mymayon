import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MdTempleHindu } from 'react-icons/md';
import { GiMountainCave, GiSunset, GiWaveSurfer, GiAncientColumns } from 'react-icons/gi';
import { fetchPackages } from '../../api';
import { getCoverImage } from '../../utils/imageResolver';

// Curated fallback packages with high-resolution images
const FALLBACK_PACKAGES = [
  {
    id: 'madurai',
    title: 'Madurai Meenakshi Darshan',
    category: 'Spiritual',
    locationLabel: 'Madurai',
    durationDays: 3,
    priceFrom: 7999,
    coverImage: '/images/madurai.jpg',
    slug: 'madurai-meenakshi-darshan',
    icon: MdTempleHindu,
  },
  {
    id: 'rameswaram',
    title: 'Rameswaram Pilgrimage',
    category: 'Spiritual',
    locationLabel: 'Rameswaram',
    durationDays: 4,
    priceFrom: 11500,
    coverImage: '/images/rameswaram.jpg',
    slug: 'rameswaram-pilgrimage',
    icon: GiWaveSurfer,
  },
  {
    id: 'kodaikanal',
    title: 'Kodaikanal Hill Station Retreat',
    category: 'Nature',
    locationLabel: 'Kodaikanal',
    durationDays: 3,
    priceFrom: 9200,
    coverImage: '/images/kodaikanal.jpg',
    slug: 'kodaikanal-misty-hills-escape',
    icon: GiMountainCave,
  },
  {
    id: 'thanjavur',
    title: 'Thanjavur Big Temple Heritage Trail',
    category: 'Heritage',
    locationLabel: 'Thanjavur',
    durationDays: 3,
    priceFrom: 8500,
    coverImage: '/images/thanjavur.jpg',
    slug: 'thanjavur-big-temple-trail',
    icon: MdTempleHindu,
  },
  {
    id: 'kanyakumari',
    title: 'Kanyakumari Sunrise Circuit',
    category: 'Family',
    locationLabel: 'Kanyakumari',
    durationDays: 3,
    priceFrom: 8900,
    coverImage: '/images/kanyakumari.jpg',
    slug: 'kanyakumari-sunrise-circuit',
    icon: GiSunset,
  },
  {
    id: 'ooty',
    title: 'Nilgiri Blue Mountain Escape',
    category: 'Nature',
    locationLabel: 'Nilgiris (Ooty)',
    durationDays: 4,
    priceFrom: 12400,
    coverImage: '/images/ooty.jpg',
    slug: 'nilgiri-blue-mountain-escape',
    icon: GiMountainCave,
  },
  {
    id: 'chennai',
    title: 'Chennai City Heritage Trail',
    category: 'Culture',
    locationLabel: 'Chennai',
    durationDays: 2,
    priceFrom: 6500,
    coverImage: '/images/chennai.jpg',
    slug: 'chennai-city-heritage-trail',
    icon: GiAncientColumns,
  },
  {
    id: 'kumbakonam',
    title: 'Navagraha Temples Sacred Circuit',
    category: 'Spiritual',
    locationLabel: 'Kumbakonam',
    durationDays: 4,
    priceFrom: 13900,
    coverImage: '/images/kumbakonam.jpg',
    slug: 'navagraha-temples-circuit',
    icon: MdTempleHindu,
  },
];

function getIconForPackage(item) {
  if (item.icon) return item.icon;
  const text = `${item.title || ''} ${item.locationLabel || ''} ${item.category || ''}`.toLowerCase();
  if (text.includes('mountain') || text.includes('kodaikanal') || text.includes('ooty') || text.includes('nilgiri') || text.includes('hills') || text.includes('nature')) {
    return GiMountainCave;
  }
  if (text.includes('beach') || text.includes('sea') || text.includes('rameswaram') || text.includes('ocean')) {
    return GiWaveSurfer;
  }
  if (text.includes('kanyakumari') || text.includes('sunrise') || text.includes('sunset')) {
    return GiSunset;
  }
  if (text.includes('heritage') || text.includes('chennai') || text.includes('mahabalipuram') || text.includes('chola') || text.includes('thanjavur')) {
    return GiAncientColumns;
  }
  return MdTempleHindu;
}

export default function FeaturedDestinationsCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check scroll position to toggle arrow buttons
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    let active = true;
    async function loadDynamicPackages() {
      setLoading(true);
      try {
        // 1. Fetch featured packages configured in admin panel
        const featuredRes = await fetchPackages({ featured: 'true' });
        const featuredList = featuredRes?.data || (Array.isArray(featuredRes) ? featuredRes : []);

        if (active) {
          if (featuredList.length > 0) {
            setItems(featuredList);
          } else {
            // 2. If no packages are flagged featured, fetch all published packages
            const allRes = await fetchPackages();
            const allList = allRes?.data || (Array.isArray(allRes) ? allRes : []);
            if (allList.length > 0) {
              setItems(allList);
            } else {
              setItems(FALLBACK_PACKAGES);
            }
          }
        }
      } catch (err) {
        console.warn('Could not load dynamic packages from API, using fallback:', err);
        if (active) {
          setItems(FALLBACK_PACKAGES);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDynamicPackages();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  return (
    <section className="py-12 lg:py-16 bg-[#faf9f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#d4a359]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4a359]">
                CURATED TOUR PACKAGES
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0e3b2b] tracking-tight">
              Featured Packages & Itineraries
            </h2>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#165b3d] hover:text-[#0e3b2b] group self-start sm:self-auto transition-colors"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Carousel Container with side navigation buttons */}
        <div className="relative group/carousel">
          {/* Previous Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Packages"
            className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 hover:text-black hover:border-[#c59a27] cursor-pointer ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next Packages"
            className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 hover:text-black hover:border-[#c59a27] cursor-pointer ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {loading ? (
              // Sleek Skeleton Placeholders
              [1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[290px] xl:w-[300px] h-[220px] sm:h-[235px] rounded-2xl bg-gray-200 animate-pulse relative overflow-hidden"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 h-12 bg-gray-300/80 rounded-xl" />
                </div>
              ))
            ) : (
              items.map((item) => {
                const IconComponent = getIconForPackage(item);
                const linkTo = item.slug ? `/packages/${item.slug}` : (item.link || '/packages');
                const coverImage = getCoverImage(item);
                const displayTitle = item.title || item.name;
                const subtitle = item.durationDays
                  ? `${item.locationLabel || 'Tamil Nadu'} • ${item.durationDays} Days`
                  : (item.tags || item.locationLabel || 'Curated Itinerary');

                return (
                  <Link
                    key={item._id || item.id || item.slug}
                    to={linkTo}
                    className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[290px] xl:w-[300px] h-[220px] sm:h-[235px] rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer block"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    {/* Full Cover Image — automatically uses hero image from uploaded images */}
                    <img
                      src={coverImage}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/madurai.jpg';
                      }}
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Badges (Category / Price) */}
                    {item.category && (
                      <span className="absolute top-2.5 left-2.5 bg-[#c59a27] text-navy-950 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm z-10">
                        {item.category}
                      </span>
                    )}
                    {Boolean(item.priceFrom) && (
                      <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 shadow-sm z-10">
                        ₹{Number(item.priceFrom).toLocaleString('en-IN')}
                      </span>
                    )}

                    {/* Floating Frosted Bottom Overlay Bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 border border-white/15 flex items-center justify-between shadow-lg transition-colors duration-300 group-hover:bg-black/75">
                      
                      {/* Left: Icon & Text */}
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#f5d77f]">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                            {displayTitle}
                          </h3>
                          <p className="text-[11px] text-white/80 truncate font-medium">
                            {subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right: Golden circular arrow button */}
                      <div className="w-7 h-7 rounded-full bg-[#d4a359] group-hover:bg-[#e2b46c] flex items-center justify-center text-[#071f43] font-bold transition-transform duration-300 group-hover:scale-110 flex-shrink-0 shadow-sm">
                        <ChevronRight className="w-4 h-4 text-[#071f43] stroke-[3]" />
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
