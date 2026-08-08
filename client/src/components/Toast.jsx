import React from 'react';
import { useToast } from '../context/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const { type, message } = toast;

  // Icon and theme mapping based on type
  const config = {
    success: {
      bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50',
      text: 'text-green-800 dark:text-green-300',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/50',
      text: 'text-red-800 dark:text-red-300',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/50',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
  }[type] || {
    bg: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800',
    text: 'text-gray-800 dark:text-gray-200',
    icon: <Info className="w-5 h-5 text-gray-500" />,
  };

  return (
    <div
      className={`flex items-start p-4 rounded-xl border shadow-lg pointer-events-auto transform transition-all duration-300 animate-slide-in ${config.bg}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">{config.icon}</div>
      <div className={`flex-grow text-sm font-medium ${config.text}`}>{message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
