export default function Input({ name, type='text', placeholder, value, onChange, icon: Icon, className='' }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />}
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full border border-navy-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition placeholder:text-navy-300 py-2.5 pr-3 ${Icon ? 'pl-9' : 'pl-3.5'} ${className}`} />
    </div>
  );
}
