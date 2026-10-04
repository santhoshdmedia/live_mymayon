import Hero from '../components/home/Hero';
import FeaturesStrip from '../components/home/FeaturesStrip';
import FeaturedDestinationsCarousel from '../components/home/FeaturedDestinationsCarousel';
import TamilNaduAwaitsStrip from '../components/home/TamilNaduAwaitsStrip';
import ExpeditionOverview from '../components/home/ExpeditionOverview';
import RegionalExplorer from '../components/home/RegionalExplorer';
import CircuitSpotlight from '../components/home/CircuitSpotlight';
import ExpeditionTiers from '../components/home/ExpeditionTiers';
import VisualDirectory from '../components/home/VisualDirectory';
import WildAndCulinary from '../components/home/WildAndCulinary';
import TravelSmart from '../components/home/TravelSmart';
import Benefits from '../components/home/Benefits';
import FoundersNote from '../components/home/FoundersNote';
import Destinations from '../components/home/Destinations';
import GalleryPreview from '../components/home/GalleryPreview';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
      {/* 1. Exact Redesigned Hero with scenic Tamil Nadu backdrop & interactive search */}
      <Hero />

      {/* 2. Exact 5-Pillar Value Proposition Strip (Authentic Experiences, Heritage, Nature, Local, Safe) */}
      <FeaturesStrip />

      {/* 3. Exact Featured Destinations / Packages Carousel with cover images & bottom dark frosted pills */}
      <FeaturedDestinationsCarousel />

      {/* 4. Exact Decorative Ribbon Banner: Golden Lotus, "Tamil Nadu Awaits..." & Social Links */}
      <TamilNaduAwaitsStrip />

      {/* 5. Grand 38-District Expedition Banner & 4 Stat Pillars */}
      <ExpeditionOverview />

      {/* 6. Four Regions. Infinite Stories (Interactive 4-Region Deep Dive) */}
      <RegionalExplorer />

      {/* 7. Curated Circuits A–D, 24h Timelines & District Spotlights */}
      <CircuitSpotlight />

      {/* 8. Three Tiers of Tamil Nadu (Heritage Standard, Grand Experience, Royal Odyssey) */}
      <ExpeditionTiers />

      {/* 9. Tamil Nadu Through the Lens (6 Visual Narratives) */}
      <VisualDirectory />

      {/* 10. Wild Tamil Nadu Reserves & 38-District Feast */}
      <WildAndCulinary />

      {/* 11. 38 District Explorer Directory */}
      <Destinations />

      {/* 12. Seasonal Calendar, TTDC Partnership, Safety Logistics */}
      <TravelSmart />

      {/* 13. Why travel with us benefits */}
      <Benefits />

      {/* 14. Founder's vision & note */}
      <FoundersNote />

      {/* 15. Photographic gallery preview */}
      <GalleryPreview />

      {/* 16. Final planning consultation CTA */}
      <CTA />
    </>
  );
}
