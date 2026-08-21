// A branded stand-in portrait: initials set on a navy-to-gold gradient disc.
// Keeps the guide/testimonial cards from needing stock photography while
// still feeling intentional and on-brand.
const Avatar = ({ name, size = 96, className = '' }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 ring-2 ring-gold-400/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-display text-gold-300 font-bold" style={{ fontSize: size * 0.32 }}>
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
