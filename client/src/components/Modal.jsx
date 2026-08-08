import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-card border border-gray-100 dark:border-dark-border transition-all animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-dark-border dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
}
