import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Code, Briefcase, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 dark:bg-dark-card dark:border-dark-border py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white font-display">
                Career<span className="text-brand-600">Scope</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Navigate tech occupational fields, chart learning roadmaps, and save interests with modern AI assistance.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                  Occupations
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dashboard */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors" title="Source Code">
                <Code className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors" title="Website">
                <Globe className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors" title="Professional Profile">
                <Briefcase className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-dark-border my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CareerScope. All rights reserved.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" /> by Google Deepmind pair programming
          </p>
        </div>
      </div>
    </footer>
  );
}
