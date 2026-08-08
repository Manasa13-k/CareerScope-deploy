import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

export default function RoadmapTimeline({ roadmap }) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-dark-card rounded-2xl border border-dashed border-gray-200 dark:border-dark-border">
        <p className="text-gray-500 dark:text-gray-400">No roadmap steps defined for this career.</p>
      </div>
    );
  }

  // Sort by step number just in case
  const sortedSteps = [...roadmap].sort((a, b) => a.step - b.step);

  return (
    <div className="relative border-l-2 border-brand-100 dark:border-brand-900/40 ml-4 md:ml-6 pl-6 md:pl-8 space-y-10 py-2">
      {sortedSteps.map((stepItem, index) => {
        const isLast = index === sortedSteps.length - 1;

        return (
          <div key={stepItem._id || index} className="relative group">
            {/* Step Number Dot indicator */}
            <span className="absolute -left-12 md:-left-[43px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-sm shadow-md ring-4 ring-white dark:ring-dark-bg group-hover:scale-110 transition-transform">
              {stepItem.step}
            </span>

            {/* Step Content Card */}
            <div className="bg-white border border-gray-150 dark:bg-dark-card dark:border-dark-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/40 transition-all duration-300 transform hover:-translate-y-0.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                {stepItem.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {stepItem.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Graduation/Completion node at the end */}
      <div className="relative group pt-2">
        <span className="absolute -left-12 md:-left-[43px] top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-4 ring-white dark:ring-dark-bg">
          <Award className="w-4 h-4" />
        </span>
        <div className="bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30 p-5 rounded-2xl ml-0">
          <h4 className="text-sm font-bold text-emerald-850 dark:text-emerald-400 font-display uppercase tracking-wider">
            Pathway Complete
          </h4>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-500 font-medium">
            You've built the foundational and technical skillset for this occupational directory.
          </p>
        </div>
      </div>
    </div>
  );
}
