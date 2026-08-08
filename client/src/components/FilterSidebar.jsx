import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  onResetFilters,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/categories');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load categories in filter sidebar', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="w-full bg-white border border-gray-150 rounded-2xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-brand-650 dark:text-brand-455" />
          Filter Careers
        </h3>
        {(selectedCategory || selectedDifficulty) && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-250 mb-3 uppercase tracking-wider text-[11px]">
            By Category
          </h4>
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-2/3" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onSelectCategory('')}
                className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === ''
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/20 dark:text-brand-450'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-border'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/20 dark:text-brand-455'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-border'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-250 mb-3 uppercase tracking-wider text-[11px]">
            By Difficulty
          </h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelectDifficulty('')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedDifficulty === ''
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/20 dark:text-brand-450'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-border'
              }`}
            >
              All Tiers
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => onSelectDifficulty(diff)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/20 dark:text-brand-455'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-border'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
