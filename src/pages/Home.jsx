import Hero from '../components/home/Hero';
import FeaturesStrip from '../components/home/FeaturesStrip';
import Benefits from '../components/home/Benefits';
import Destinations from '../components/home/Destinations';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <Benefits />
      <Destinations />
      <CTA />
    </>
  );
}
