import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer from '../components/Toast';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-gray-100 transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Global Toast Alerts Renderer */}
      <ToastContainer />

      {/* Bottom Footer Section */}
      <Footer />
    </div>
  );
}
