import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-border px-4 py-4 sm:px-6 mt-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-card dark:border-dark-border dark:text-gray-300 dark:hover:bg-dark-border transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-card dark:border-dark-border dark:text-gray-300 dark:hover:bg-dark-border transition-colors"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-650 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{(page - 1) * limit + 1}</span> to{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {Math.min(page * limit, total)}
            </span>{' '}
            of <span className="font-bold text-gray-900 dark:text-white">{total}</span> results
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm border border-gray-250 dark:border-dark-border overflow-hidden" aria-label="Pagination">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="relative inline-flex items-center bg-white dark:bg-dark-card px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-450 dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <span className="relative inline-flex items-center bg-white dark:bg-dark-card px-4 py-2 text-sm font-bold text-brand-650 dark:text-brand-450">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="relative inline-flex items-center bg-white dark:bg-dark-card px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-450 dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
