import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingSocial from './components/layout/FloatingSocial';
import { Spinner } from './components/ui/States';
import LaunchCountdown from './components/Launchcountdownpreview';

const Home            = lazy(() => import('./pages/Home'));
const About           = lazy(() => import('./pages/About'));
const Destinations    = lazy(() => import('./pages/Destinations'));
const TamilNadu       = lazy(() => import('./pages/destinations/TamilNadu'));
const India           = lazy(() => import('./pages/destinations/India'));
const International   = lazy(() => import('./pages/destinations/International'));
const DistrictExplorer= lazy(() => import('./pages/destinations/DistrictExplorer'));
const DestinationDetail = lazy(() => import('./pages/destinations/DestinationDetail'));
const DistrictDetail  = lazy(() => import('./pages/destinations/DistrictDetail'));
const SpiritualTourism= lazy(() => import('./pages/SpiritualTourism'));
const Packages        = lazy(() => import('./pages/Packages'));
const PackageDetail   = lazy(() => import('./pages/PackageDetail'));
const Experiences     = lazy(() => import('./pages/Experiences'));
const Gallery         = lazy(() => import('./pages/Gallery'));
const PlanMyTrip      = lazy(() => import('./pages/PlanMyTrip'));
const Blog            = lazy(() => import('./pages/Blog'));
const Partner         = lazy(() => import('./pages/Partner'));
const Contact         = lazy(() => import('./pages/Contact'));

// Set your real launch moment here (IST offset shown — adjust if needed)
const LAUNCH_DATE = new Date('2026-08-23T04:30:00+05:30');

function App() {
  const [loading, setLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(() => Date.now() >= LAUNCH_DATE.getTime());
function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();   // uses the passed-in target, not a fresh offset
  return diff > 0 ? diff : 0;
}
  if (!isLaunched) {
    return <LaunchCountdown launchDate={LAUNCH_DATE} onLaunch={() => setIsLaunched(true)} />;
  }

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className={`min-h-screen bg-cream transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Suspense fallback={<Spinner className="min-h-[60vh]" />}>
            <Routes>
              <Route path="/"                                    element={<Home />} />
              <Route path="/about"                              element={<About />} />
              <Route path="/destinations"                       element={<Destinations />} />
              <Route path="/destinations/tamil-nadu"            element={<TamilNadu />} />
              <Route path="/destinations/india"                 element={<India />} />
              <Route path="/destinations/international"         element={<International />} />
              <Route path="/destinations/district-explorer"     element={<DistrictExplorer />} />
              <Route path="/destinations/:slug"                 element={<DestinationDetail />} />
              <Route path="/districts/:slug"                    element={<DistrictDetail />} />
              <Route path="/spiritual-tourism"                  element={<SpiritualTourism />} />
              <Route path="/packages"                           element={<Packages />} />
              <Route path="/packages/:slug"                     element={<PackageDetail />} />
              <Route path="/experiences"                        element={<Experiences />} />
              <Route path="/gallery"                            element={<Gallery />} />
              <Route path="/plan-my-trip"                       element={<PlanMyTrip />} />
              <Route path="/blog"                               element={<Blog />} />
              <Route path="/partner"                            element={<Partner />} />
              <Route path="/contact"                            element={<Contact />} />
            </Routes>
          </Suspense>
          <Footer />
          <FloatingSocial />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;