export default function Button({
  children, variant = 'primary', size = 'md', className = '',
  disabled = false, type = 'button', onClick, as: Tag = 'button',
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-2.5 text-sm', lg: 'px-8 py-3.5 text-base' };
  const variants = {
    primary:   'bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-gold hover:shadow-lg',
    secondary: 'border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-cream',
    ghost:     'border-2 border-white/40 text-cream hover:bg-white/10 hover:border-white/60',
    outline:   'border-2 border-gold-400 text-gold-600 hover:bg-gold-50',
  };
  return (
    <Tag type={Tag === 'button' ? type : undefined} onClick={onClick} disabled={Tag === 'button' ? disabled : undefined}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
