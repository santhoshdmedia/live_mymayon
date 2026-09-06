import Hero from '../components/home/Hero';
import ExpeditionOverview from '../components/home/ExpeditionOverview';
import RegionalExplorer from '../components/home/RegionalExplorer';
import CircuitSpotlight from '../components/home/CircuitSpotlight';
import ExpeditionTiers from '../components/home/ExpeditionTiers';
import VisualDirectory from '../components/home/VisualDirectory';
import WildAndCulinary from '../components/home/WildAndCulinary';
import TravelSmart from '../components/home/TravelSmart';
import FeaturesStrip from '../components/home/FeaturesStrip';
import Benefits from '../components/home/Benefits';
import FoundersNote from '../components/home/FoundersNote';
import Destinations from '../components/home/Destinations';
import GalleryPreview from '../components/home/GalleryPreview';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
      {/* 1. Hero with interactive destination search */}
      <Hero />

      {/* 2. PDF Pages 1-2: Grand 38-District Expedition Banner & 4 Stat Pillars */}
      <ExpeditionOverview />

      {/* 3. PDF Pages 3-7: Four Regions. Infinite Stories (Interactive 4-Region Deep Dive) */}
      <RegionalExplorer />

      {/* 4. PDF Pages 9-12 & 14-21: Curated Circuits A–D, 24h Timelines & District Spotlights */}
      <CircuitSpotlight />

      {/* 5. PDF Page 8: Three Tiers of Tamil Nadu (Heritage Standard, Grand Experience, Royal Odyssey) */}
      <ExpeditionTiers />

      {/* 6. PDF Page 13: Tamil Nadu Through the Lens (6 Visual Narratives) */}
      <VisualDirectory />

      {/* 7. PDF Pages 22-23: Wild Tamil Nadu Reserves & 38-District Feast */}
      <WildAndCulinary />

      {/* 8. Quick travel categories strip */}
      <FeaturesStrip />

      {/* 9. District Explorer Directory Preview */}
      <Destinations />

      {/* 10. PDF Pages 24-26: Seasonal Calendar, TTDC Partnership, Safety Logistics & Expedition Call to Action */}
      <TravelSmart />

      {/* 11. Why travel with us benefits */}
      <Benefits />

      {/* 12. Founder's vision & note */}
      <FoundersNote />

      {/* 13. Photographic gallery preview */}
      <GalleryPreview />

      {/* 14. Final planning consultation CTA */}
      <CTA />
    </>
  );
}
