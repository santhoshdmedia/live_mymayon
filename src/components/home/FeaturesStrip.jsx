import { ShieldCheck } from 'lucide-react';

// Custom icons tailored to the exact designs in the image
const LeafIcon = () => (
  <svg className="w-9 h-9 text-[#165b3d]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 8 C22 8, 10 20, 10 38 C28 38, 40 26, 40 8 Z" />
    <path d="M10 38 C18 30, 26 22, 34 14" />
  </svg>
);

const TempleIcon = () => (
  <svg className="w-9 h-9 text-[#165b3d]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4 L24 8" strokeWidth="2.5" />
    <path d="M21 8 L27 8 L26 12 L22 12 Z" />
    <path d="M18 12 L30 12 L28 18 L20 18 Z" />
    <path d="M15 18 L33 18 L31 26 L17 26 Z" />
    <path d="M12 26 L36 26 L34 36 L14 36 Z" />
    <path d="M8 36 L40 36 L40 44 L8 44 Z" />
    <path d="M20 44 L20 36 C20 34, 28 34, 28 36 L28 44" />
  </svg>
);

const MountainIcon = () => (
  <svg className="w-9 h-9 text-[#165b3d]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 40 L20 14 L30 32 L36 22 L44 40 Z" />
    <path d="M16 22 L20 28 L24 25" />
    <path d="M33 27 L36 32 L40 30" />
  </svg>
);

const PeopleIcon = () => (
  <svg className="w-9 h-9 text-[#165b3d]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="14" r="5" />
    <path d="M14 36 C14 29, 18 25, 24 25 C30 25, 34 29, 34 36" />
    <circle cx="12" cy="18" r="3.5" />
    <path d="M6 36 C6 31, 8 28, 12 28 C13.5 28, 15 28.5, 16 29.5" />
    <circle cx="36" cy="18" r="3.5" />
    <path d="M42 36 C42 31, 40 28, 36 28 C34.5 28, 33 28.5, 32 29.5" />
  </svg>
);

const SafeIcon = () => (
  <svg className="w-9 h-9 text-[#165b3d]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L38 12 C38 26, 24 40, 24 40 C24 40, 10 26, 10 12 Z" />
    <path d="M17 22 L22 27 L31 17" strokeWidth="2.5" />
  </svg>
);

const TRUST_FEATURES = [
  {
    icon: LeafIcon,
    title: 'Authentic Experiences',
    subtitle: 'Real Culture. Real People.',
  },
  {
    icon: TempleIcon,
    title: 'Heritage & Temples',
    subtitle: 'Timeless Traditions.',
  },
  {
    icon: MountainIcon,
    title: 'Nature & Wildlife',
    subtitle: 'Breathtaking Landscapes.',
  },
  {
    icon: PeopleIcon,
    title: 'Local Experiences',
    subtitle: 'Support Local, Travel Better.',
  },
  {
    icon: SafeIcon,
    title: 'Safe & Reliable',
    subtitle: 'Your Journey, Our Priority.',
  },
];

export default function FeaturesStrip() {
  return (
    <section className="bg-white border-y border-gray-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          {TRUST_FEATURES.map(({ icon: Icon, title, subtitle }, index) => (
            <div
              key={title}
              className={`flex items-center gap-3.5 ${
                index === 4 ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''
              }`}
            >
              <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <Icon />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[#0f3d2a] text-sm sm:text-[15px] leading-snug">
                  {title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-[13px] leading-tight mt-0.5 truncate">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
