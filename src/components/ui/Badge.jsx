export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 ${className}`}>
      <span className="w-5 h-[2px] bg-gold-500 rounded-full" />
      {children}
    </span>
  );
}
