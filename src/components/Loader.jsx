import { useEffect } from 'react';
import logo from '../assets/logo.png';
export default function Loader({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="fixed inset-0 z-[999] bg-navy-800 flex flex-col items-center justify-center gap-5">
      <img src={logo} alt="My Mayon" className="w-16 h-16 rounded-full ring-2 ring-gold-400/50 animate-pulse" />
      <div className="w-40 h-0.5 bg-navy-700 rounded-full overflow-hidden">
        <div className="h-full bg-gold-400 rounded-full animate-[loading_1.2s_ease-in-out_forwards]" />
      </div>
      <p className="text-gold-300 font-accent italic text-sm tracking-wide">Loading Memories…</p>
      <style>{`@keyframes loading{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}
