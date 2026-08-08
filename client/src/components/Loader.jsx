import React from 'react';

// General spinner for button actions or quick loads
export function Loader({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  }[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-brand-200 border-t-brand-600 dark:border-brand-900/30 dark:border-t-brand-400 ${sizeClasses}`}
      />
    </div>
  );
}

// Skeleton loader representing a career card
export function CareerCardSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-white p-6 border border-gray-100 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4 animate-pulse">
      {/* Category badge & bookmark button skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>
      {/* Title skeleton */}
      <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      {/* Overview text skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md" />
      </div>
      {/* Grid statistics skeleton */}
      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100 dark:border-dark-border">
        <div className="space-y-1">
          <div className="h-3 w-12 bg-gray-150 dark:bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-12 bg-gray-150 dark:bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-12 bg-gray-150 dark:bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}

// Skeleton loader representing a category card
export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 border border-gray-100 dark:bg-dark-card dark:border-dark-border shadow-sm flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      <div className="h-3 w-16 bg-gray-150 dark:bg-gray-800 rounded" />
    </div>
  );
}

// Full page loader overlay
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-dark-bg/75 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center space-y-4">
        <Loader size="large" />
        <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 font-display tracking-wider animate-pulse">
          LOADING CAREERSCOPE...
        </p>
      </div>
    </div>
  );
}
