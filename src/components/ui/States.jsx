import { AlertCircle, RefreshCw } from 'lucide-react';

export const Spinner = ({ className = '' }) => (
  <div className={`flex justify-center items-center py-16 ${className}`}>
    <div className="w-10 h-10 rounded-full border-2 border-navy-100 border-t-gold-500 animate-spin" />
  </div>
);

export const ErrorBlock = ({ message, onRetry }) => (
  <div className="flex flex-col items-center gap-4 py-16 text-center px-4">
    <AlertCircle className="w-12 h-12 text-rose-400" />
    <p className="text-navy-600 font-medium">{message || 'Something went wrong.'}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-500 font-semibold"
      >
        <RefreshCw className="w-4 h-4" /> Try again
      </button>
    )}
  </div>
);

export const EmptyBlock = ({ message = 'Nothing to show yet.' }) => (
  <div className="flex flex-col items-center gap-3 py-16 text-center px-4">
    <p className="text-navy-400">{message}</p>
  </div>
);
