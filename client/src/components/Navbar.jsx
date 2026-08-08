import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Compass, Sun, Moon, Menu, X, User, LogOut, LayoutDashboard, Bookmark } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-bg/85 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex flex-shrink-0 items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md">
                <Compass className="h-6 w-6 animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-display">
                Career<span className="text-brand-600">Scope</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 border border-gray-100 dark:border-dark-border shadow-xl dark:bg-dark-card animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-dark-border mb-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Signed In As</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
                      {user?.role === 'admin' && (
                        <span className="mt-1 inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
                          Administrator
                        </span>
                      )}
                    </div>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950/20 dark:hover:text-brand-400 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/bookmarks"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950/20 dark:hover:text-brand-400 transition-colors"
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>Bookmarks</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-2 rounded-xl px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-brand-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white dark:border-dark-border dark:bg-dark-bg p-4 space-y-3 animate-slide-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-200 dark:border-dark-border my-2" />
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 rounded-xl px-4 py-2.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card"
              >
                <LayoutDashboard className="h-5 w-5 text-gray-500" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 rounded-xl px-4 py-2.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card"
              >
                <Bookmark className="h-5 w-5 text-gray-500" />
                <span>Bookmarks</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center space-x-2 rounded-xl px-4 py-2.5 text-base font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-gray-300 dark:border-dark-border py-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl bg-brand-600 py-2 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
