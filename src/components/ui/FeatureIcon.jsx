const FeatureIcon = ({ icon: Icon, label, description = '' }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-4 ring-1 ring-gold-400/30 hover:ring-gold-400 hover:shadow-lg transition-all">
        <Icon className="w-9 h-9 text-gold-400" />
      </div>
      <h3 className="font-bold text-navy-800 mb-1">{label}</h3>
      {description && <p className="text-sm text-navy-500">{description}</p>}
    </div>
  );
};

export default FeatureIcon;
