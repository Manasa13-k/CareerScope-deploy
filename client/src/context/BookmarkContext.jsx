import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/api/bookmarks');
      if (res.data.success) {
        setBookmarks(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load bookmarks whenever the user logs in
  useEffect(() => {
    fetchBookmarks();
  }, [user, fetchBookmarks]);

  const addBookmark = async (careerId) => {
    if (!user) {
      showError('Please sign in to bookmark careers');
      return false;
    }
    try {
      const res = await api.post('/api/bookmarks', { careerId });
      if (res.data.success) {
        setBookmarks((prev) => [res.data.data, ...prev]);
        showSuccess('Career bookmarked successfully');
        return true;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add bookmark';
      showError(errorMsg);
      return false;
    }
  };

  const removeBookmark = async (careerId) => {
    if (!user) return false;
    try {
      const res = await api.delete(`/api/bookmarks/${careerId}`);
      if (res.data.success) {
        setBookmarks((prev) => prev.filter((b) => b.career?._id !== careerId && b.career !== careerId));
        showSuccess('Bookmark removed');
        return true;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to remove bookmark';
      showError(errorMsg);
      return false;
    }
  };

  const isBookmarked = useCallback((careerId) => {
    return bookmarks.some((b) => b.career?._id === careerId || b.career === careerId);
  }, [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, loading, fetchBookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
