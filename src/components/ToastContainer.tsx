import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useMagazine();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#181818] border border-[#c9a227] text-white p-4 shadow-2xl flex items-start justify-between space-x-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          <div className="flex items-start space-x-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-sans leading-relaxed text-[#e5e5e5]">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#666] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
