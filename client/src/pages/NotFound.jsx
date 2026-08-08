import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, AlertCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-650 dark:bg-red-950/30 dark:text-red-400 shadow-inner">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white font-display">404</h1>
          <h2 className="text-2xl font-bold text-gray-850 dark:text-gray-200">Page Not Found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-sm font-semibold rounded-xl text-white shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <HomeIcon className="mr-2 h-5 w-5" /> Go Back Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
