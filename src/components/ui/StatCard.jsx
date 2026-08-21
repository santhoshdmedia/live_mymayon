export default function StatCard({ number, label }) {
  return (
    <div className="bg-white/8 border border-white/15 rounded-2xl p-6 text-center">
      <p className="text-4xl font-bold text-gold-400 mb-1">{number}</p>
      <p className="text-navy-200 text-sm font-medium">{label}</p>
    </div>
  );
}
