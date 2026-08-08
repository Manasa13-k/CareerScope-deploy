import React from 'react';
import { Compass, Code, LayoutGrid, CheckCircle2, ShieldAlert } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function About() {
  const stack = [
    { name: 'React 19', role: 'Component-driven reactive user interface framework' },
    { name: 'Vite', role: 'Speedy local development and production compiler asset builder' },
    { name: 'Tailwind CSS v4', role: 'CSS-first configuration utility framework supplying typography styles' },
    { name: 'Express.js', role: 'Robust Node web application server backing API routes' },
    { name: 'Mongoose & MongoDB', role: 'Flexible document mapper managing user bookmark records' },
    { name: 'JSON Web Tokens', role: 'Bearer token security authorization headers' },
  ];

  return (
    <MainLayout>
      <div className="space-y-12 pb-16 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-50 text-brand-700 dark:bg-brand-950/20 dark:text-brand-400">
            About the Project
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white font-display">
            CareerScope Platform
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            A production-ready MERN Stack application engineered to map occupational pathways and guide aspiring developers.
          </p>
        </div>

        {/* Section 1: Vision */}
        <section className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-4">
          <h2 className="text-xl font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-650" /> Our Vision
          </h2>
          <p className="text-sm text-gray-650 dark:text-gray-405 leading-relaxed">
            The technology sector evolves at a rapid pace, often leaving newcomers overwhelmed by the number of resources, frameworks, and programming languages. CareerScope aggregates this information, structuring it into logical, sequential study roadmaps with key salary ranges, tool lists, and companies hiring.
          </p>
        </section>

        {/* Section 2: Technical Stack */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold font-display text-gray-950 dark:text-white flex items-center gap-2 border-b border-gray-150 dark:border-dark-border pb-3">
            <Code className="w-5 h-5 text-brand-650" /> Technical Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stack.map((item, i) => (
              <div key={i} className="p-5 bg-white border border-gray-100 dark:bg-dark-card dark:border-dark-border rounded-2xl shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white font-display">{item.name}</h4>
                  <p className="text-xs text-gray-550 dark:text-gray-450 mt-0.5 leading-relaxed">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Clean MVC Backend */}
        <section className="bg-brand-50/50 border border-brand-100 dark:bg-brand-950/10 dark:border-brand-900/30 rounded-3xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-brand-850 dark:text-brand-400 font-display flex items-center gap-1.5">
            <LayoutGrid className="w-5 h-5" /> Modular MVC Code Design
          </h3>
          <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-450 leading-relaxed">
            Engineered with strict separation of concerns, the API leverages async-error middleware, request validation using express-validator, text indices for fast database search, and clean token protection filters. The codebase provides a production-grade template ready for future AI-driven pathway generators.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
