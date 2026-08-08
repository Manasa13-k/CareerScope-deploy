import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

export default function BookmarkButton({ careerId, className = '' }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [animating, setAnimating] = useState(false);
  const active = isBookmarked(careerId);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    if (active) {
      await removeBookmark(careerId);
    } else {
      await addBookmark(careerId);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative p-2 rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-card hover:scale-105 transition-all duration-200 ${
        active
          ? 'bg-brand-50 border-brand-200 text-brand-600 dark:bg-brand-950/20 dark:border-brand-850 dark:text-brand-400'
          : 'bg-white text-gray-400 hover:text-gray-650 dark:bg-dark-card'
      } ${animating ? 'scale-90' : ''} ${className}`}
      aria-label={active ? 'Remove bookmark' : 'Bookmark career'}
    >
      <Bookmark className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
    </button>
  );
}
