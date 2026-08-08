import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useToast } from '../context/ToastContext';
import { User, Bookmark, LayoutDashboard, Calendar, Mail, Shield, LogOut, Compass, PlusCircle, Database } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { Loader } from '../components/Loader';
import api from '../services/api';

export default function Dashboard() {
  const { user, loading: authLoading, logout, isAdmin } = useAuth();
  const { bookmarks, loading: bookmarksLoading, fetchBookmarks } = useBookmarks();
  const { showSuccess, showError, showInfo } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSeedAdmin = async () => {
    showInfo('Triggering career database seeding...');
    try {
      const res = await api.post('/api/careers/seed'); // we can connect this to seed trigger in Phase 5
      if (res.data.success) {
        showSuccess('Database seeded successfully!');
        fetchBookmarks();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Seeding failed or route not defined yet');
    }
  };

  if (authLoading) return <Loader size="large" className="min-h-[50svh]" />;

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center py-20 space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-650 flex items-center justify-center mx-auto shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Access Denied</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please sign in to view your account dashboard.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow transition-colors cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-brand-650 dark:text-brand-455" />
              User Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your profile details and monitor career pathways.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-red-200 dark:border-red-900/30 text-xs font-bold rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-1.5" /> Logout
          </button>
        </div>

        {/* Dashboard Grid layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns: Profile Stats Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 font-extrabold text-xl shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-955 dark:text-white font-display">{user.name}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-dark-border dark:text-gray-300 mt-1">
                    {user.role} role
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-dark-border" />

              {/* Profile Details List */}
              <div className="space-y-4 text-sm text-gray-650 dark:text-gray-350">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-brand-650 dark:text-brand-400" />
                    <span className="font-bold text-brand-650 dark:text-brand-400">System Admin access</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Columns: Bookmarks summary & Admin triggers */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats counter widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-150 p-6 rounded-2xl dark:bg-dark-card dark:border-dark-border shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950 dark:text-brand-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-450 uppercase font-bold tracking-wider">Bookmarked Careers</p>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {bookmarksLoading ? '...' : bookmarks.length}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-150 p-6 rounded-2xl dark:bg-dark-card dark:border-dark-border shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950 dark:text-brand-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-450 uppercase font-bold tracking-wider">Explore Link</p>
                  <Link to="/explore" className="text-xs sm:text-sm font-bold text-brand-650 hover:underline flex items-center mt-2.5">
                    Browse Occupations
                  </Link>
                </div>
              </div>
            </div>

            {/* Saved Bookmarks Preview List */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-dark-border">
                <h3 className="text-base font-bold text-gray-955 dark:text-white font-display">
                  Recent Saved Pathways
                </h3>
                <Link to="/bookmarks" className="text-xs font-bold text-brand-650 hover:underline">
                  View All
                </Link>
              </div>

              {bookmarksLoading ? (
                <div className="h-20 flex items-center justify-center">
                  <Loader size="small" />
                </div>
              ) : bookmarks.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500">
                  No bookmarks saved. <Link to="/explore" className="text-brand-650 font-semibold hover:underline">Find occupations</Link> to start.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-dark-border">
                  {bookmarks.slice(0, 3).map((bmk) => (
                    bmk.career && (
                      <div key={bmk._id} className="flex items-center justify-between py-3">
                        <div>
                          <Link to={`/careers/${bmk.career.slug}`} className="font-bold text-sm text-gray-900 dark:text-white hover:text-brand-650 transition-colors">
                            {bmk.career.title}
                          </Link>
                          <p className="text-xs text-gray-450 mt-0.5">{bmk.career.difficulty} difficulty</p>
                        </div>
                        <Link
                          to={`/careers/${bmk.career.slug}/roadmap`}
                          className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 text-brand-700 dark:text-brand-400 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Roadmap
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Admin Console Widget (Admin only) */}
            {isAdmin && (
              <div className="bg-brand-50/50 border border-brand-100 dark:bg-brand-950/10 dark:border-brand-900/30 rounded-3xl p-6 space-y-4">
                <h3 className="text-base font-bold text-brand-850 dark:text-brand-400 font-display flex items-center gap-1.5">
                  <Shield className="w-5 h-5" /> Admin Control Console
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-455 leading-relaxed">
                  As an administrator, you have access to create, update, and delete occupations or categories database records.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/explore"
                    className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 mr-1.5" /> Manage Careers
                  </Link>
                  <button
                    onClick={handleSeedAdmin}
                    className="inline-flex items-center px-4 py-2 border border-brand-200 dark:border-brand-900/30 bg-white dark:bg-dark-card text-brand-700 dark:text-brand-400 text-xs font-bold rounded-xl shadow-sm hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <Database className="w-4 h-4 mr-1.5" /> Run Careers Seeder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
