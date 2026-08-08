import React from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Lock, Compass, AlertCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import CareerCard from '../components/CareerCard';
import { CareerCardSkeleton } from '../components/Loader';

export default function Bookmarks() {
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const { isAuthenticated, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
          {Array.from({ length: 4 }).map((_, i) => <CareerCardSkeleton key={i} />)}
        </div>
      </MainLayout>
    );
  }

  // Guest Access: Lock Screen
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center py-20 space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Protected Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please register or sign in to save your learning roadmaps and manage bookmarks.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 border border-gray-300 dark:border-dark-border text-gray-705 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display flex items-center gap-2">
            <Bookmark className="w-8 h-8 text-brand-650 dark:text-brand-450 fill-brand-100 dark:fill-brand-950/20" />
            Your Saved Bookmarks
          </h1>
          <p className="text-sm text-gray-505 dark:text-gray-400 mt-1">
            Access and manage your selected occupational roadmap pathways.
          </p>
        </div>

        {bookmarksLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <CareerCardSkeleton key={i} />)}
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-150 rounded-3xl dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-650 mx-auto dark:bg-brand-950 dark:text-brand-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">No Bookmarks Saved</h3>
            <p className="max-w-md mx-auto text-sm text-gray-500 dark:text-gray-455 px-4 leading-relaxed">
              You haven't bookmarked any occupations yet. Explore the directories list and click on the bookmark icon to save interest pathways here.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 mr-2" /> Explore Occupations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bmk) => (
              bmk.career && (
                <CareerCard key={bmk._id} career={bmk.career} />
              )
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
