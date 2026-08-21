export function TriangleWatermark({ className = '' }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <polygon points="200,20 380,380 20,380" stroke="currentColor" strokeWidth="2" fill="none" className="text-gold-400" />
      <polygon points="200,60 340,360 60,360" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-gold-400" />
      <polygon points="200,100 300,340 100,340" stroke="currentColor" strokeWidth="1" fill="none" className="text-gold-400" />
      <polygon points="200,140 260,320 140,320" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gold-400" />
    </svg>
  );
}

export function Divider({ className = '', tone = 'default' }) {
  const color = tone === 'light' ? 'from-transparent via-white/20 to-transparent' : 'from-transparent via-gold-300 to-transparent';
  return <div className={`h-px bg-gradient-to-r ${color} my-2 ${className}`} aria-hidden="true" />;
}

export function FramedMedia({ children, className = '' }) {
  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      {children}
      <div className="absolute inset-0 ring-1 ring-gold-400/20 rounded-3xl pointer-events-none" />
    </div>
  );
}
