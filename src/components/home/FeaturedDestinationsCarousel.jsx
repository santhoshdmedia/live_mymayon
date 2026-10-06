import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MdTempleHindu } from 'react-icons/md';
import { GiMountainCave, GiSunset, GiWaveSurfer, GiAncientColumns } from 'react-icons/gi';
import { fetchPackages, fetchDistricts } from '../../api';

// Curated destinations with cover images matching the exact design in the image
const FEATURED_ITEMS = [
  {
    id: 'madurai',
    title: 'Madurai',
    tags: 'Temples | Culture | Heritage',
    coverImage: '/images/madurai.jpg',
    link: '/packages/madurai-meenakshi-darshan',
    icon: MdTempleHindu,
  },
  {
    id: 'rameswaram',
    title: 'Rameswaram',
    tags: 'Spiritual | Sea | History',
    coverImage: '/images/rameswaram.jpg',
    link: '/packages/rameswaram-pilgrimage',
    icon: GiWaveSurfer,
  },
  {
    id: 'kodaikanal',
    title: 'Kodaikanal',
    tags: 'Hills | Nature | Serenity',
    coverImage: '/images/kodaikanal.jpg',
    link: '/packages?destination=Kodaikanal',
    icon: GiMountainCave,
  },
  {
    id: 'thanjavur',
    title: 'Thanjavur',
    tags: 'Art | Architecture | Legacy',
    coverImage: '/images/thanjavur.jpg',
    link: '/packages/thanjavur-big-temple-trail',
    icon: MdTempleHindu,
  },
  {
    id: 'kanyakumari',
    title: 'Kanyakumari',
    tags: 'Sunrise | Oceans | Peace',
    coverImage: '/images/kanyakumari.jpg',
    link: '/packages/kanyakumari-sunrise-circuit',
    icon: GiSunset,
  },
  {
    id: 'ooty',
    title: 'Nilgiris (Ooty)',
    tags: 'Tea Hills | Heritage Train | Mist',
    coverImage: '/images/ooty.jpg',
    link: '/packages/nilgiri-blue-mountain-escape',
    icon: GiMountainCave,
  },
  {
    id: 'chennai',
    title: 'Chennai',
    tags: 'Heritage | Coastline | Living History',
    coverImage: '/images/chennai.jpg',
    link: '/packages/chennai-city-heritage-trail',
    icon: GiAncientColumns,
  },
  {
    id: 'kumbakonam',
    title: 'Kumbakonam',
    tags: 'Navagraha | Temple Arts | Kaveri Delta',
    coverImage: '/images/kumbakonam.jpg',
    link: '/packages/navagraha-temples-circuit',
    icon: MdTempleHindu,
  },
  {
    id: 'tiruvannamalai',
    title: 'Tiruvannamalai',
    tags: 'Arunachala | Sacred Fire | Giri Valam',
    coverImage: '/images/tiruvannamalai.jpg',
    link: '/districts/tiruvannamalai',
    icon: MdTempleHindu,
  },
  {
    id: 'mahabalipuram',
    title: 'Mahabalipuram',
    tags: 'Shore Temple | UNESCO | Rock Reliefs',
    coverImage: '/images/mahabalipuram.jpg',
    link: '/districts/chengalpattu',
    icon: GiAncientColumns,
  },
];

export default function FeaturedDestinationsCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [items, setItems] = useState(FEATURED_ITEMS);

  // Check scroll position to toggle arrow buttons
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

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
                FEATURED DESTINATIONS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0e3b2b] tracking-tight">
              Discover Tamil Nadu's Hidden Gems
            </h2>
          </div>

          <Link
            to="/destinations/district-explorer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#165b3d] hover:text-[#0e3b2b] group self-start sm:self-auto transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>


        {/* Carousel Container with side navigation buttons */}
        <div className="relative group/carousel">
          {/* Previous Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Destinations"
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
            aria-label="Next Destinations"
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
            {items.map((item) => {
              const IconComponent = item.icon || MdTempleHindu;
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[290px] xl:w-[300px] h-[210px] sm:h-[225px] rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer block"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Full Cover Image */}
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Floating Frosted Bottom Overlay Bar */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 border border-white/15 flex items-center justify-between shadow-lg transition-colors duration-300 group-hover:bg-black/75">
                    
                    {/* Left: Icon & Text */}
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#f5d77f]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-white/80 truncate font-medium">
                          {item.tags}
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
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
