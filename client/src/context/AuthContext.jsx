import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Load user profile on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // Register user
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/register', { name, email, password });
      if (res.data.success) {
        setToken(res.data.data.token);
        setUser({
          _id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          role: res.data.data.role,
        });
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Registration failed';
      throw new Error(errorMsg);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data.success) {
        setToken(res.data.data.token);
        setUser({
          _id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          role: res.data.data.role,
        });
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || 'Login failed';
      throw new Error(errorMsg);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
