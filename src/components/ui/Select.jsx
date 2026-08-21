export default function Select({ name, placeholder, value, onChange, options=[], className='' }) {
  return (
    <select name={name} value={value} onChange={onChange}
      className={`w-full border border-navy-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300 transition py-2.5 px-3.5 text-navy-700 ${!value ? 'text-navy-300' : ''} ${className}`}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
