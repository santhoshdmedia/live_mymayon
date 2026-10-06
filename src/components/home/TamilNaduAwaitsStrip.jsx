import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export default function TamilNaduAwaitsStrip() {
  return (
    <div className="bg-[#071f43] border-y border-gold-400/25 py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Golden Lotus Line Art Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg
            className="w-10 h-10 text-[#d4a359] opacity-90 transition-transform hover:scale-110"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Lotus Petals SVG */}
            <path d="M32 10 C32 10, 24 24, 24 38 C24 46, 32 52, 32 52 C32 52, 40 46, 40 38 C40 24, 32 10, 32 10 Z" />
            <path d="M32 20 C24 24, 14 34, 14 44 C14 50, 20 53, 26 53 C29 53, 32 52, 32 52" />
            <path d="M32 20 C40 24, 50 34, 50 44 C50 50, 44 53, 38 53 C35 53, 32 52, 32 52" />
            <path d="M26 53 C20 54, 8 50, 8 42 C8 36, 14 30, 22 28" />
            <path d="M38 53 C44 54, 56 50, 56 42 C56 36, 50 30, 42 28" />
            <path d="M20 54 C26 58, 38 58, 44 54" strokeWidth="2" />
          </svg>
        </div>

        {/* Center: Gold Accent Line with "Tamil Nadu Awaits..." */}
        <div className="flex items-center justify-center flex-1 px-4 min-w-0">
          <div className="w-12 sm:w-24 md:w-36 h-[1px] bg-gradient-to-r from-transparent via-[#d4a359]/60 to-[#d4a359]" />
          <span className="font-accent italic text-base sm:text-lg md:text-xl text-[#f3d282] font-medium tracking-wider px-4 whitespace-nowrap">
            Tamil Nadu Awaits...
          </span>
          <div className="w-12 sm:w-24 md:w-36 h-[1px] bg-gradient-to-l from-transparent via-[#d4a359]/60 to-[#d4a359]" />
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/80 hover:text-[#d4a359] transition-colors p-1"
          >
            <FaInstagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/80 hover:text-[#d4a359] transition-colors p-1"
          >
            <FaFacebookF className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white/80 hover:text-[#d4a359] transition-colors p-1"
          >
            <FaYoutube className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/80 hover:text-[#d4a359] transition-colors p-1"
          >
            <FaLinkedinIn className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>
        </div>


      </div>
    </div>
  );
}
