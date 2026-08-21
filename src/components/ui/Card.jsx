export default function Card({ children, hover = true, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-navy-100 shadow-md p-6 ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
}
