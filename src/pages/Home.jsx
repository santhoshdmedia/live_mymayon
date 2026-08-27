import Hero from '../components/home/Hero';
import FeaturesStrip from '../components/home/FeaturesStrip';
import Benefits from '../components/home/Benefits';
import FoundersNote from '../components/home/FoundersNote';
import Destinations from '../components/home/Destinations';
import GalleryPreview from '../components/home/GalleryPreview';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <Benefits />
      <FoundersNote />
      <Destinations />
      <GalleryPreview />
      <CTA />
    </>
  );
}
