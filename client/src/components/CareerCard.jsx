import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Wallet, Clock, ArrowRight } from 'lucide-react';
import BookmarkButton from './BookmarkButton';

export default function CareerCard({ career }) {
  const { _id, title, slug, overview, category, difficulty, learningDuration, salary, technicalSkills } = career;

  // Map difficulty styles
  const difficultyStyles = {
    Easy: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/30',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800/30',
    Hard: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/30',
  }[difficulty] || 'bg-gray-50 text-gray-700 border-gray-200';

  // Format currency
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-brand-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-dark-card dark:border-dark-border dark:hover:border-brand-900/50">
      <div className="space-y-4">
        {/* Header: Category Badge & Bookmark Button */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
            {category?.name || 'Uncategorized'}
          </span>
          <BookmarkButton careerId={_id} />
        </div>

        {/* Title & Overview Link */}
        <Link to={`/careers/${slug}`} className="block group-hover:text-brand-600 transition-colors">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-display group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {overview}
          </p>
        </Link>

        {/* Technical Skills Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {technicalSkills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-dark-border dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
          {technicalSkills?.length > 3 && (
            <span className="inline-flex items-center text-xs font-medium text-gray-400">
              +{technicalSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer statistics and link */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
        <div className="grid grid-cols-3 gap-2 text-center text-xs pb-4">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 flex items-center mb-1"><Wallet className="h-3 w-3 mr-0.5" /> Salary</span>
            <span className="font-bold text-gray-900 dark:text-white">{formatSalary(salary.median)}</span>
          </div>
          <div className="flex flex-col items-center border-x border-gray-100 dark:border-dark-border px-1">
            <span className="text-gray-400 flex items-center mb-1"><Briefcase className="h-3 w-3 mr-0.5" /> Difficulty</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${difficultyStyles}`}>
              {difficulty}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 flex items-center mb-1"><Clock className="h-3 w-3 mr-0.5" /> Duration</span>
            <span className="font-bold text-gray-900 dark:text-white truncate max-w-full">{learningDuration}</span>
          </div>
        </div>

        <Link
          to={`/careers/${slug}`}
          className="flex items-center justify-center w-full px-4 py-2 border border-brand-100 dark:border-brand-900/30 text-xs font-semibold rounded-xl text-brand-650 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:text-brand-400 dark:hover:bg-brand-950/45 transition-colors"
        >
          View Roadmap
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
