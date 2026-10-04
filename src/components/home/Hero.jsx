import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Users } from 'lucide-react';

const POPULAR_DESTINATIONS = [
  'Madurai',
  'Rameswaram',
  'Kodaikanal',
  'Thanjavur',
  'Kanyakumari',
  'Ooty',
  'Chennai',
  'Kumbakonam',
  'Tiruvannamalai',
  'Mahabalipuram',
  'Coimbatore',
  'Trichy',
];

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: '',
    dates: '',
    guests: '2',
  });

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = new URLSearchParams();
    if (form.destination) query.set('destination', form.destination);
    if (form.guests) query.set('guests', form.guests);
    navigate(`/packages?${query.toString()}`);
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#eaf1ed]">
      {/* ── Background Landscape Image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-banner.jpg"
          alt="Tamil Nadu Scenic Temple Landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft gradient mask to ensure left text and search bar are perfectly readable while keeping the right scenery vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent sm:hidden" />
      </div>

      {/* ── Main Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ── Left Column: Headlines & Search Widget ── */}
          <div className="lg:col-span-8 max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#165b3d]">
                WELCOME TO MYMAYON
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0e3b2b] leading-[1.06] tracking-tight mb-2">
              Explore<br />Tamil Nadu
            </h1>

            {/* Subheading / Tagline */}
            <p className="font-accent italic text-xl sm:text-2xl lg:text-3xl text-[#1a553c] font-medium mb-3">
              Authentic. Enriching. Unforgettable.
            </p>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Discover the land of temples, traditions, landscapes and timeless experiences — curated just for you.
            </p>

            {/* ── Floating Pill Search Bar Widget ── */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full shadow-xl shadow-navy-950/15 border border-gray-200/80 p-2 sm:p-2.5 max-w-3xl">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1">
                
                {/* 1. Destination Field */}
                <div className="flex items-center gap-2 px-3 py-2 w-full sm:flex-1 min-w-0">
                  <MapPin className="w-4 h-4 text-[#165b3d] flex-shrink-0" />
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={(e) => setForm(f => ({ ...f, destination: e.target.value }))}
                    placeholder="Where do you want to go?"
                    list="dest-list"
                    className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none truncate"
                  />
                  <datalist id="dest-list">
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1px] h-7 bg-gray-200" />

                {/* 2. Dates Field */}
                <div className="flex items-center gap-2 px-3 py-2 w-full sm:flex-1 min-w-0">
                  <Calendar className="w-4 h-4 text-[#165b3d] flex-shrink-0" />
                  <input
                    type="text"
                    name="dates"
                    value={form.dates}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                    onChange={(e) => setForm(f => ({ ...f, dates: e.target.value }))}
                    placeholder="Check-in - Check-out"
                    className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1px] h-7 bg-gray-200" />

                {/* 3. Guests Selector */}
                <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto">
                  <Users className="w-4 h-4 text-[#165b3d] flex-shrink-0" />
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={(e) => setForm(f => ({ ...f, guests: e.target.value }))}
                    className="bg-transparent text-sm text-gray-800 focus:outline-none cursor-pointer pr-2"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>

                {/* 4. Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0d2a45] hover:bg-[#071d31] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search</span>
                </button>
              </form>
            </div>
          </div>

          {/* ── Right Column: Handwriting Callout ── */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-start self-start pt-6 pr-4 pointer-events-none select-none">
            <div className="font-script text-2xl xl:text-3xl text-[#123e2c] leading-tight rotate-[-4deg] drop-shadow-sm max-w-[260px] text-right">
              <span className="block text-xl xl:text-2xl italic font-normal text-[#17523a]">
                More than travel...
              </span>
              <span className="block font-semibold mt-1">It's a journey</span>
              <span className="block font-semibold">into culture,</span>
              <span className="block font-semibold">nature and</span>
              <span className="block font-semibold">people.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
