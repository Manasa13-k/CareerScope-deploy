import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserPlus, Compass, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showError('Please fill out all fields');
      return;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      showSuccess('Account created successfully! Welcome to CareerScope.');
      navigate('/dashboard');
    } catch (err) {
      showError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center py-10 md:py-16">
        <div className="max-w-md w-full bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 rounded-3xl shadow-lg space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center text-sm font-semibold text-brand-650 hover:text-brand-700 dark:text-brand-400 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 mx-auto shadow-inner">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-505 dark:text-gray-400">
              Join CareerScope to access interactive roadmaps and save interests.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-sm outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-dark-card dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-sm outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-dark-card dark:text-white"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="•••••••• (Min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-sm outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-dark-card dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-405 hover:text-gray-600 dark:text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center text-xs sm:text-sm text-gray-505 dark:text-gray-400 border-t border-gray-100 dark:border-dark-border pt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-650 hover:text-brand-700 dark:text-brand-400">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
