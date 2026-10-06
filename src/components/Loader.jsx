import { useEffect } from 'react';
import logoEmblem from '../assets/logo-emblem.png';

export default function Loader({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="fixed inset-0 z-[999] bg-[#071f43] flex flex-col items-center justify-center gap-5">
      <img src={logoEmblem} alt="My Mayon" className="h-20 w-auto object-contain drop-shadow-[0_4px_24px_rgba(212,163,89,0.35)] animate-pulse" />
      <div className="w-44 h-1 bg-navy-800 rounded-full overflow-hidden">
        <div className="h-full bg-gold-500 rounded-full animate-[loading_1.2s_ease-in-out_forwards]" />
      </div>
      <p className="text-gold-300 font-accent italic text-base tracking-wide">Loading Memories…</p>
      <style>{`@keyframes loading{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

