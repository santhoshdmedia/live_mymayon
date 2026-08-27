import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Image as ImageIcon,
  MapPin,
  Heart,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Share2,
  Calendar
} from 'lucide-react';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { fetchPackages, fetchDistricts, fetchHeroSlides, fetchGallery, likeGalleryItem } from '../api';
import useScrollReveal from '../hooks/useScrollReveal';
import { Spinner } from '../components/ui/States';

// Curated high-resolution fallback & foundational showcase items
const CURATED_GALLERY = [
  {
    id: 'c-1',
    title: 'Brihadeeswara Temple at Twilight',
    category: 'Spiritual & Temples',
    location: 'Thanjavur',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    description: '1,000-year-old Chola architectural marvel carved purely out of granite.',
    tag: 'UNESCO World Heritage',
    likes: 142,
  },
  {
    id: 'c-2',
    title: 'Meenakshi Amman Gopuram Towers',
    category: 'Spiritual & Temples',
    location: 'Madurai',
    image: 'https://images.unsplash.com/photo-1609766857329-873b88b08709?auto=format&fit=crop&w=1200&q=80',
    description: 'Vibrant sculpted towers depicting thousands of mythological figures.',
    tag: 'Living Legend',
    likes: 198,
  },
  {
    id: 'c-3',
    title: 'Kanyakumari Triveni Sangam Sunrise',
    category: 'Coastal & Beaches',
    location: 'Kanyakumari',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    description: 'The sacred meeting point of the Arabian Sea, Indian Ocean, and Bay of Bengal.',
    tag: 'Three Seas',
    likes: 165,
  },
  {
    id: 'c-4',
    title: 'Nilgiri Mountain Tea Gardens in Mist',
    category: 'Nature & Hills',
    location: 'Ooty / Nilgiris',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Rolling emerald hills and historic heritage toy train routes in the Western Ghats.',
    tag: 'Hill Retreat',
    likes: 210,
  },
  {
    id: 'c-5',
    title: 'Shore Temple by the Bay of Bengal',
    category: 'Heritage & History',
    location: 'Mahabalipuram',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    description: '8th-century Pallava structural temple overlooking the waves.',
    tag: 'Pallava Heritage',
    likes: 177,
  },
  {
    id: 'c-6',
    title: 'Pichavaram Mangrove Forest Dawn Row',
    category: 'Nature & Hills',
    location: 'Chidambaram / Cuddalore',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: "The world's second-largest mangrove ecosystem navigated via wooden boats.",
    tag: 'Eco Discovery',
    likes: 124,
  },
  {
    id: 'c-7',
    title: 'Chettinad Heritage Mansion Courtyard',
    category: 'Heritage & History',
    location: 'Karaikudi / Chettinad',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Burmese teak pillars, Italian marble, and Athangudi handmade tiles.',
    tag: 'Aristocratic Living',
    likes: 139,
  },
  {
    id: 'c-8',
    title: 'Rameshwaram Corridor of 1,200 Pillars',
    category: 'Spiritual & Temples',
    location: 'Rameswaram',
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1200&q=80',
    description: "The world's longest temple corridor with intricately sculpted stone columns.",
    tag: 'Char Dham',
    likes: 230,
  },
  {
    id: 'c-9',
    title: 'Traditional Bharatanatyam Temple Recital',
    category: 'Culture & Festivals',
    location: 'Thanjavur / Chennai',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80',
    description: 'Centuries-old classical dance form dedicated to divine storytelling and devotion.',
    tag: 'Living Art',
    likes: 184,
  },
  {
    id: 'c-10',
    title: 'Authentic Chettinad Banana Leaf Feast',
    category: 'Cuisine & Trails',
    location: 'Karaikudi',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    description: 'Slow-roasted stone-ground spices, kuzhambu, and traditional hospitality.',
    tag: 'Culinary Icon',
    likes: 156,
  },
  {
    id: 'c-11',
    title: 'Kodaikanal Lake in Evening Fog',
    category: 'Nature & Hills',
    location: 'Kodaikanal',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Star-shaped lake surrounded by misty pine forests and shola valleys.',
    tag: 'Princess of Hills',
    likes: 147,
  },
  {
    id: 'c-12',
    title: 'Dhanushkodi Land’s End Ghost Town',
    category: 'Coastal & Beaches',
    location: 'Rameswaram Island',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Where the oceans merge at the ruins of India’s most mythical shoreline.',
    tag: 'Mystic Coast',
    likes: 215,
  },
];

const CATEGORIES = [
  'All',
  'Spiritual & Temples',
  'Heritage & History',
  'Nature & Hills',
  'Coastal & Beaches',
  'Culture & Festivals',
  'Cuisine & Trails',
];

export default function Gallery() {
  const [items, setItems] = useState(CURATED_GALLERY);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [likedMap, setLikedMap] = useState({});
  const ref = useScrollReveal();

  // Fetch dynamic photos from backend gallery, packages & districts
  useEffect(() => {
    let active = true;
    Promise.allSettled([fetchGallery(), fetchPackages(), fetchDistricts(), fetchHeroSlides()])
      .then(([galRes, pkgsRes, distsRes, slidesRes]) => {
        if (!active) return;
        const dynamicList = [];

        // 1. Direct admin uploaded gallery items (highest priority)
        if (galRes.status === 'fulfilled') {
          const galList = Array.isArray(galRes.value?.data) ? galRes.value.data : (Array.isArray(galRes.value) ? galRes.value : []);
          galList.forEach((g) => {
            const imgUrl = typeof g.image === 'string' ? g.image : g.image?.url;
            if (imgUrl) {
              dynamicList.push({
                id: g._id || `gal-${g.title}`,
                title: g.title,
                category: g.category || 'Spiritual & Temples',
                location: g.location || 'Tamil Nadu',
                image: imgUrl,
                description: g.description || '',
                tag: g.tag || g.category,
                packageSlug: g.packageSlug || '',
                districtSlug: g.districtSlug || '',
                likes: g.likes || 120,
              });
            }
          });
        }

        // 2. Extract from packages
        if (pkgsRes.status === 'fulfilled') {
          const pkgs = Array.isArray(pkgsRes.value?.data) ? pkgsRes.value.data : (Array.isArray(pkgsRes.value) ? pkgsRes.value : []);
          pkgs.forEach((p) => {
            if (p.heroImage) {
              dynamicList.push({
                id: `pkg-${p._id || p.slug}`,
                title: p.title,
                category: p.category?.includes('Spiritual') ? 'Spiritual & Temples' : (p.category?.includes('Heritage') ? 'Heritage & History' : (p.category?.includes('Nature') ? 'Nature & Hills' : 'Spiritual & Temples')),
                location: p.locationLabel || 'Tamil Nadu',
                image: p.heroImage,
                description: p.description || `${p.durationDays || 'Multi'}-day curated tour package with verified stays.`,
                tag: `${p.durationDays || 'Tour'} Days Package`,
                packageSlug: p.slug,
                likes: 135,
              });
            }
          });
        }

        // 3. Extract from districts
        if (distsRes.status === 'fulfilled') {
          const dists = Array.isArray(distsRes.value?.data) ? distsRes.value.data : (Array.isArray(distsRes.value) ? distsRes.value : []);
          dists.forEach((d) => {
            if (d.heroImage) {
              dynamicList.push({
                id: `dist-${d._id || d.slug}`,
                title: `${d.name} — ${d.presidingDeity || 'Heritage Landmark'}`,
                category: d.region === 'Southern' || d.region === 'Delta' ? 'Spiritual & Temples' : 'Heritage & History',
                location: `${d.name} District`,
                image: d.heroImage,
                description: d.description || `Explore ${d.templeCount || 0} famous temples and historical monuments in ${d.name}.`,
                tag: `${d.region || 'Tamil Nadu'} District`,
                districtSlug: d.slug,
                likes: 110,
              });
            }
          });
        }

        // Combine unique dynamic photos with curated collection
        const seen = new Set();
        const combined = [...dynamicList, ...CURATED_GALLERY].filter((item) => {
          if (!item.image || seen.has(item.image)) return false;
          seen.add(item.image);
          return true;
        });

        setItems(combined.length > 0 ? combined : CURATED_GALLERY);
        setLoading(false);
      })
      .catch(() => {
        setItems(CURATED_GALLERY);
        setLoading(false);
      });

    return () => { active = false; };
  }, []);

  // Filter items
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCat === 'All' || item.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [items, selectedCat, searchQuery]);

  // Lightbox keyboard controls
  const closeLightbox = useCallback(() => setActivePhotoIndex(null), []);
  const nextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);
  const prevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePhotoIndex, closeLightbox, nextPhoto, prevPhoto]);

  // Handle Like Button
  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activePhoto = activePhotoIndex !== null ? filtered[activePhotoIndex] : null;

  return (
    <div ref={ref} className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="relative bg-navy-radial text-cream py-20 lg:py-24 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[450px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2 animate-fade-in-down">
            Curated Visuals
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fade-in-up">
            Photo Gallery
          </h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Immerse yourself in the sacred architecture, tranquil coastlines, misty hills, and timeless traditions of Tamil Nadu.
          </p>

          {/* Quick Counter Strip */}
          <div className="flex items-center justify-center gap-8 mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-display">{items.length}+</p>
              <p className="text-xs text-navy-200 uppercase tracking-wider mt-0.5">Showcase Photos</p>
            </div>
            <div className="w-[1px] h-8 bg-gold-400/30" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-display">38</p>
              <p className="text-xs text-navy-200 uppercase tracking-wider mt-0.5">Districts Captured</p>
            </div>
            <div className="w-[1px] h-8 bg-gold-400/30" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-display">100%</p>
              <p className="text-xs text-navy-200 uppercase tracking-wider mt-0.5">Authentic Stays & Trails</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-navy-100 shadow-sm py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
              const isActive = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md shadow-gold-500/25 scale-105'
                      : 'bg-cream text-navy-700 hover:bg-gold-50 hover:text-gold-700 border border-navy-200/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-navy-950/20 text-navy-950 font-bold' : 'bg-navy-200/50 text-navy-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, deity, tag…"
              className="w-full pl-9 pr-4 py-2 text-xs bg-cream/70 border border-navy-200 rounded-full focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30 transition placeholder:text-navy-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Photo Grid Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="py-20 text-center">
            <Spinner className="mx-auto" />
            <p className="text-navy-500 text-sm mt-4 font-medium">Loading high-resolution gallery…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-navy-100 p-8 shadow-sm">
            <ImageIcon className="w-12 h-12 text-gold-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-navy-800 mb-1">No matching photos found</h3>
            <p className="text-navy-500 text-sm max-w-md mx-auto mb-6">
              Try adjusting your search query or selecting a different category from above.
            </p>
            <Button
              onClick={() => {
                setSelectedCat('All');
                setSearchQuery('');
              }}
              variant="outline"
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              const isLiked = likedMap[item.id];
              return (
                <div
                  key={item.id || idx}
                  className="scroll-reveal reveal-up group relative bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-2xl hover:shadow-gold-900/15 hover:-translate-y-1.5 transition-all duration-500 flex flex-col cursor-pointer"
                  style={{ animationDelay: `${(idx % 6) * 90}ms` }}
                  onClick={() => setActivePhotoIndex(idx)}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-navy-950/80 backdrop-blur-md text-gold-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gold-400/30 shadow-sm">
                        {item.tag || item.category}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleLike(e, item.id)}
                        className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                          isLiked
                            ? 'bg-rose-500 text-white scale-110'
                            : 'bg-navy-950/60 text-white/90 hover:bg-rose-500 hover:text-white'
                        }`}
                        aria-label="Like photo"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Expand Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <div className="w-12 h-12 rounded-full bg-gold-500/90 text-navy-950 flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <Expand className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bottom overlay location tag */}
                    <div className="absolute bottom-3 left-3 text-white/90 text-xs flex items-center gap-1.5 font-medium drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-navy-800 text-base leading-snug mb-1 group-hover:text-gold-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-navy-100 text-xs">
                      <span className="text-gold-600 font-semibold flex items-center gap-1">
                        View Photo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-navy-400 font-medium flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                        {(item.likes || 120) + (isLiked ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Plan Trip Callout */}
      <section className="py-16 bg-white border-t border-navy-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="scroll-reveal reveal-up">
            <span className="text-gold-600 font-accent italic text-lg mb-1 block">Live the Experience</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Inspired by what you see?
            </h2>
            <p className="text-navy-600 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Every photo in this gallery is a real destination featured in our curated itineraries. Let us build your personalized trip in 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/plan-my-trip">
                <Button size="lg">
                  <Sparkles className="w-4 h-4" /> Plan My Custom Journey
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="secondary" size="lg">
                  Browse All Packages <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[110] bg-navy-950/96 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white border-b border-gold-400/20 pb-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="bg-gold-500 text-navy-950 font-bold text-xs px-2.5 py-1 rounded-full">
                {activePhoto.category}
              </span>
              <span className="text-xs text-navy-200 hidden sm:inline flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                {activePhoto.location}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-navy-300 font-medium">
                {activePhotoIndex + 1} of {filtered.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Center Stage with Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Prev Button */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white flex items-center justify-center border border-gold-400/30 transition-all shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Photo */}
            <div className="relative max-w-5xl max-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-gold-400/20 bg-navy-900">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain max-h-[70vh] select-none"
              />
            </div>

            {/* Next Button */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white flex items-center justify-center border border-gold-400/30 transition-all shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption Bar */}
          <div
            className="max-w-4xl w-full mx-auto bg-navy-900/90 border border-gold-400/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-cream"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center sm:text-left">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-0.5">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-navy-200 max-w-xl">
                {activePhoto.description}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to={
                  activePhoto.packageSlug
                    ? `/packages/${activePhoto.packageSlug}`
                    : activePhoto.districtSlug
                    ? `/districts/${activePhoto.districtSlug}`
                    : `/plan-my-trip?destination=${encodeURIComponent(activePhoto.location)}`
                }
                onClick={closeLightbox}
              >
                <Button size="sm">
                  Plan Trip Here <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
