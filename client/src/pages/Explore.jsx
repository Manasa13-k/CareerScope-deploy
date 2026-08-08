import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import CareerCard from '../components/CareerCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import { CareerCardSkeleton } from '../components/Loader';

export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to read query params
  const getQueryParam = useCallback((paramName) => {
    return new URLSearchParams(location.search).get(paramName) || '';
  }, [location.search]);

  // States
  const [careers, setCareers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState(() => getQueryParam('search'));
  const [category, setCategory] = useState(() => getQueryParam('category'));
  const [difficulty, setDifficulty] = useState(() => getQueryParam('difficulty'));
  const [sort, setSort] = useState(() => getQueryParam('sort') || 'title');
  const [page, setPage] = useState(() => parseInt(getQueryParam('page'), 10) || 1);
  const limit = 6; // Display 6 items per page

  const [searchInput, setSearchInput] = useState(() => getQueryParam('search'));

  // Sync state with URL params when they change externally (e.g. navigation)
  useEffect(() => {
    const urlSearch = getQueryParam('search');
    const urlCategory = getQueryParam('category');
    const urlDifficulty = getQueryParam('difficulty');
    const urlSort = getQueryParam('sort') || 'title';
    const urlPage = parseInt(getQueryParam('page'), 10) || 1;

    setSearch(urlSearch);
    setSearchInput(urlSearch);
    setCategory(urlCategory);
    setDifficulty(urlDifficulty);
    setSort(urlSort);
    setPage(urlPage);
  }, [location.search, getQueryParam]);

  // Sync URL when filter/search/page states change locally
  const updateURL = useCallback(({ newSearch, newCategory, newDifficulty, newSort, newPage }) => {
    const params = new URLSearchParams();
    
    const s = newSearch !== undefined ? newSearch : search;
    const c = newCategory !== undefined ? newCategory : category;
    const d = newDifficulty !== undefined ? newDifficulty : difficulty;
    const so = newSort !== undefined ? newSort : sort;
    const p = newPage !== undefined ? newPage : page;

    if (s) params.append('search', s);
    if (c) params.append('category', c);
    if (d) params.append('difficulty', d);
    if (so && so !== 'title') params.append('sort', so);
    if (p && p !== 1) params.append('page', p);

    navigate(`/explore?${params.toString()}`, { replace: true });
  }, [search, category, difficulty, sort, page, navigate]);

  // Fetch careers from API
  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (difficulty) params.append('difficulty', difficulty);
      if (sort) params.append('sort', sort);
      params.append('page', page);
      params.append('limit', limit);

      const res = await api.get(`/api/careers?${params.toString()}`);
      if (res.data.success) {
        setCareers(res.data.data);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.error('Failed to fetch careers list', err);
    } finally {
      setLoading(false);
    }
  }, [search, category, difficulty, sort, page]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  // Event handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    updateURL({ newSearch: searchInput, newPage: 1 });
  };

  const handleSelectCategory = (slug) => {
    setPage(1);
    updateURL({ newCategory: slug, newPage: 1 });
  };

  const handleSelectDifficulty = (diff) => {
    setPage(1);
    updateURL({ newDifficulty: diff, newPage: 1 });
  };

  const handleSelectSort = (newSort) => {
    setPage(1);
    updateURL({ newSort, newPage: 1 });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateURL({ newPage });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setPage(1);
    updateURL({ newSearch: '', newCategory: '', newDifficulty: '', newSort: 'title', newPage: 1 });
  };

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display">
            Career Directory
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse structured learning roadmaps, skills, salary details, and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={handleSelectCategory}
              selectedDifficulty={difficulty}
              onSelectDifficulty={handleSelectDifficulty}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Right Column: List & Toolbar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar: Search input & Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-dark-card border border-gray-150 dark:border-dark-border p-4 rounded-2xl shadow-sm">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Keyword search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-bg text-sm outline-none focus:border-brand-500 dark:text-white"
                />
              </form>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-gray-505 dark:text-gray-450 uppercase tracking-wider">
                  Sort By
                </span>
                <select
                  value={sort}
                  onChange={(e) => handleSelectSort(e.target.value)}
                  className="px-3 py-2 border border-gray-250 dark:border-dark-border bg-white dark:bg-dark-card rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 outline-none focus:border-brand-550"
                >
                  <option value="title">Title (A–Z)</option>
                  <option value="newest">Newest</option>
                  <option value="highest-salary">Highest Salary</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="duration">Learning Duration</option>
                </select>
              </div>
            </div>

            {/* Careers Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <CareerCardSkeleton key={i} />)}
              </div>
            ) : careers.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-150 rounded-3xl dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-650 mx-auto dark:bg-brand-950 dark:text-brand-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">No Careers Found</h3>
                <p className="max-w-md mx-auto text-sm text-gray-500 dark:text-gray-455 px-4 leading-relaxed">
                  We couldn't find any careers matching your active search terms or category filters. Try clearing your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careers.map((career) => (
                    <CareerCard key={career._id} career={career} />
                  ))}
                </div>

                <Pagination
                  page={page}
                  total={total}
                  limit={limit}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
