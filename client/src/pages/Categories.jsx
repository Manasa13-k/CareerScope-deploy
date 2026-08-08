import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MainLayout from '../layouts/MainLayout';
import CategoryCard from '../components/CategoryCard';
import { CategoryCardSkeleton } from '../components/Loader';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/categories');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load categories catalog', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display">
            Career Sectors
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse careers grouped by modern industry domains.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl dark:bg-dark-card dark:border-dark-border">
            <p className="text-gray-500 dark:text-gray-400">No categories found in the database. Run seed script first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
