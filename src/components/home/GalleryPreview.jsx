import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, Sparkles, MapPin, Heart, Expand } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { fetchGallery } from '../../api';
import useScrollReveal from '../../hooks/useScrollReveal';

const FALLBACK_PREVIEWS = [
  {
    title: 'Brihadeeswara Temple at Twilight',
    category: 'Spiritual & Temples',
    location: 'Thanjavur',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tag: 'UNESCO Heritage',
    likes: 142,
  },
  {
    title: 'Meenakshi Amman Gopuram Towers',
    category: 'Spiritual & Temples',
    location: 'Madurai',
    image: 'https://images.unsplash.com/photo-1609766857329-873b88b08709?auto=format&fit=crop&w=800&q=80',
    tag: 'Living Legend',
    likes: 198,
  },
  {
    title: 'Kanyakumari Triveni Sangam Sunrise',
    category: 'Coastal & Beaches',
    location: 'Kanyakumari',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    tag: 'Three Seas',
    likes: 165,
  },
  {
    title: 'Nilgiri Mountain Tea Gardens in Mist',
    category: 'Nature & Hills',
    location: 'Ooty / Nilgiris',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tag: 'Hill Retreat',
    likes: 210,
  },
  {
    title: 'Shore Temple by the Bay of Bengal',
    category: 'Heritage & History',
    location: 'Mahabalipuram',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    tag: 'Pallava Heritage',
    likes: 177,
  },
  {
    title: 'Rameshwaram Corridor of 1,200 Pillars',
    category: 'Spiritual & Temples',
    location: 'Rameswaram',
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
    tag: 'Char Dham',
    likes: 230,
  },
];

export default function GalleryPreview() {
  const [photos, setPhotos] = useState(FALLBACK_PREVIEWS);
  const ref = useScrollReveal();

  useEffect(() => {
    let active = true;
    fetchGallery()
      .then((res) => {
        if (!active) return;
        const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        if (list.length > 0) {
          const parsed = list.slice(0, 6).map((item) => ({
            title: item.title,
            category: item.category,
            location: item.location,
            image: typeof item.image === 'string' ? item.image : item.image?.url,
            tag: item.tag || item.category,
            likes: item.likes || 120,
          })).filter(p => p.image);
          if (parsed.length > 0) setPhotos(parsed);
        }
      })
      .catch(() => {});

    return () => { active = false; };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-cream/50 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal reveal-up flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle
            eyebrow="Visual Moments"
            title="Tamil Nadu Through the Lens"
            description="Explore authentic photography from sacred shrines, misty tea estates, living heritage towns, and coastal sunsets."
            className="mb-0 text-left"
          />
          <Link to="/gallery" className="flex-shrink-0">
            <Button variant="secondary" size="md">
              <ImageIcon className="w-4 h-4" /> View Full Gallery <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <Link
              key={idx}
              to="/gallery"
              className="scroll-reveal reveal-up group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-gold-900/15 hover:-translate-y-1.5 transition-all duration-500 bg-navy-900 aspect-[4/3] block"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-black/20 opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-navy-950/80 backdrop-blur-md text-gold-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-gold-400/30">
                  {item.tag || item.category}
                </span>
                <span className="text-white/90 text-xs flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  {item.likes}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] text-gold-400 font-medium flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3" /> {item.location}
                </p>
                <h3 className="font-bold text-sm sm:text-base text-white leading-snug line-clamp-1 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Hover Expand Glow */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-lg">
                  <Expand className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 scroll-reveal reveal-up">
          <Link to="/gallery">
            <Button size="lg" className="mx-auto">
              <Sparkles className="w-4 h-4" /> Explore 100+ Showcase Photos <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
