import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    total: diff,
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * CountdownTimer
 * ─────────────────────────────────────────────────────────────────────────
 * Live "time remaining" display counting down to `target` (a Date or ISO
 * string). Ticks every second. Renders nothing once the target has passed.
 */
export default function CountdownTimer({ target, label = 'Offer ends in', theme = 'dark', className = '' }) {
  const [left, setLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    setLeft(getTimeLeft(target));
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target || left.total <= 0) return null;

  const units = [
    { value: left.days,    label: 'Days' },
    { value: left.hours,   label: 'Hrs' },
    { value: left.minutes, label: 'Min' },
    { value: left.seconds, label: 'Sec' },
  ];

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      <span className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${isLight ? 'text-navy-500' : 'text-white/80'}`}>
        <Timer className="w-3.5 h-3.5" /> {label}
      </span>
      <div className="flex items-center gap-2">
        {units.map(({ value, label: unitLabel }) => (
          <div key={unitLabel}
            className={`flex flex-col items-center justify-center rounded-lg w-14 h-14 sm:w-16 sm:h-16 ${
              isLight
                ? 'bg-white border border-navy-100 shadow-sm'
                : 'bg-white/15 backdrop-blur-sm border border-white/20'
            }`}>
            <span className={`text-lg sm:text-xl font-bold leading-none tabular-nums ${isLight ? 'text-navy-800' : 'text-white'}`}>
              {String(value).padStart(2, '0')}
            </span>
            <span className={`text-[10px] mt-1 uppercase tracking-wide ${isLight ? 'text-navy-400' : 'text-white/70'}`}>{unitLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
