import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';

import Home from './pages/Home';
import Explore from './pages/Explore';
import CareerDetails from './pages/CareerDetails';
import LearningRoadmap from './pages/LearningRoadmap';
import Categories from './pages/Categories';
import Bookmarks from './pages/Bookmarks';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BookmarkProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/careers/:slug" element={<CareerDetails />} />
                <Route path="/careers/:slug/roadmap" element={<LearningRoadmap />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </BookmarkProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
