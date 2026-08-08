import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category }) {
  const { name, slug, description, icon } = category;

  // Resolve Lucide Icon dynamically
  const IconComponent = Icons[icon] || Icons.Folder;

  return (
    <Link
      to={`/explore?category=${slug}`}
      className="group relative flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 dark:bg-dark-card dark:border-dark-border dark:hover:border-brand-900/50 transform hover:-translate-y-1"
    >
      {/* Icon frame */}
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950 dark:text-brand-400 dark:group-hover:bg-brand-500 dark:group-hover:text-white transition-all duration-300 shadow-sm">
        <IconComponent className="w-7 h-7 transform group-hover:scale-110 transition-transform" />
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white font-display group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Hover visual cue */}
      <span className="mt-4 text-xs font-bold text-brand-650 dark:text-brand-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Pathway <Icons.ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
