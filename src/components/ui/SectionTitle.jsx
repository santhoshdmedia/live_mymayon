export default function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`mb-2 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 mb-3 ${centered ? 'justify-center' : ''}`}>
          <span className="w-5 h-[2px] bg-gold-500 rounded-full" />
          {eyebrow}
          <span className="w-5 h-[2px] bg-gold-500 rounded-full" />
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 leading-tight">{title}</h2>
      {description && <p className="text-navy-500 mt-3 leading-relaxed max-w-2xl text-base {centered ? 'mx-auto' : ''}">{description}</p>}
    </div>
  );
}
