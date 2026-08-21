import { useState, useEffect } from 'react';

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  return diff > 0 ? diff : 0;
}

function formatTimeLeft(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function LaunchCountdown({ launchDate, onLaunch }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(launchDate));

  useEffect(() => {
    setTimeLeft(getTimeLeft(launchDate));

    const interval = setInterval(() => {
      const remaining = getTimeLeft(launchDate);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onLaunch?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate, onLaunch]);

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-center px-6">
      <p className="uppercase tracking-widest text-xs text-terracotta mb-3">
        Tamil Nadu Tourism
      </p>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-xl">
        The journey begins soon
      </h1>

      <p className="text-gray-500 max-w-md mb-10">
        We're putting the finishing touches on your guide to Tamil Nadu.
      </p>

      <div className="flex gap-4 md:gap-8">
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Min', value: minutes },
          { label: 'Sec', value: seconds },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="min-w-[4.2rem] bg-white border border-gray-200 rounded px-2 py-3 text-2xl md:text-4xl font-bold tabular-nums">
              {String(value).padStart(2, '0')}
            </div>
            <span className="mt-2 text-[0.7rem] tracking-widest uppercase text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}