import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Compass, Cpu, Shield, Cloud, Database, ArrowRight, Award } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import MainLayout from '../layouts/MainLayout';
import { CategoryCardSkeleton } from '../components/Loader';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/categories');
        if (res.data.success) {
          // Display top 4 categories on home page
          setCategories(res.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load home categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-20 pb-16">
        {/* 1. Hero Section */}
        <section className="relative py-12 md:py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              Interactive Tech Learning Pathways
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white font-display leading-tight">
              Chart Your Journey in <br />
              <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">
                Modern Technology
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Discover roadmap pathways, acquire technical skillsets, save custom bookmarks, and prepare for industry recruitment.
            </p>

            {/* Premium Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <div className="flex items-center bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-2 shadow-md focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
                <Search className="text-gray-400 h-5 w-5 ml-2 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search careers (e.g. Frontend, DevOps, Data Scientist)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-brand-700 transition-colors flex-shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 2. Top Categories Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-150 dark:border-dark-border pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">
                Browse Career Sectors
              </h2>
              <p className="text-sm text-gray-505 dark:text-gray-400 mt-1">
                Explore dedicated occupational branches in the technical landscape.
              </p>
            </div>
            <Link
              to="/categories"
              className="text-sm font-bold text-brand-650 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1 group"
            >
              See All Sectors
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <CategoryCardSkeleton key={i} />)
            ) : categories.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white border border-gray-100 rounded-2xl dark:bg-dark-card dark:border-dark-border">
                <p className="text-gray-500 dark:text-gray-400">No categories found. Run seed script first.</p>
              </div>
            ) : (
              categories.map((cat) => <CategoryCard key={cat._id} category={cat} />)
            )}
          </div>
        </section>

        {/* 3. Highlight Pitch Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-brand-50/50 dark:bg-brand-950/10 border border-brand-100/40 dark:border-brand-900/10 rounded-3xl p-8 sm:p-12">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display leading-tight">
              Structured learning roadmaps built for the modern tech professional.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Skip the informational overload. Our curated learning roadmaps are designed to take you from a absolute beginner to job-ready candidate by offering high-quality resources, technical requirements, and step-by-step guidance.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="p-1 rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mt-0.5">
                  <Compass className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display">Targeted Pathways</h4>
                  <p className="text-xs text-gray-550 dark:text-gray-400 mt-0.5">Focus only on core tools, frameworks, and workflows required in real job profiles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="p-1 rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mt-0.5">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display">Difficulty Groupings</h4>
                  <p className="text-xs text-gray-550 dark:text-gray-400 mt-0.5">Select and browse occupations categorized from Easy, Medium, or Hard difficulty levels.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-150 dark:bg-dark-card dark:border-dark-border p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="text-base font-bold text-gray-900 dark:text-white font-display">Latest Featured Occupation</h4>
            <div className="h-40 bg-gradient-to-tr from-brand-650 to-indigo-500 rounded-xl flex items-center justify-center p-6 text-white text-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Development</span>
                <h5 className="text-lg font-extrabold font-display">Software Developer</h5>
                <p className="text-xs text-brand-100">Median Salary: $110,000/yr</p>
              </div>
            </div>
            <Link
              to="/explore"
              className="flex items-center justify-center w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow transition-colors cursor-pointer"
            >
              Start Exploring Careers
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
