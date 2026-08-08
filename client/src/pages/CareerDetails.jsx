import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Wallet, Clock, Briefcase, GraduationCap, Map, HelpCircle, CheckCircle2, Building2 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import BookmarkButton from '../components/BookmarkButton';
import Accordion from '../components/Accordion';
import { PageLoader } from '../components/Loader';

export default function CareerDetails() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/careers/${slug}`);
        if (res.data.success) {
          setCareer(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load career details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareer();
  }, [slug]);

  if (loading) return <PageLoader />;

  if (!career) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Not Found</h2>
          <p className="text-gray-500 mt-2">The career path you are looking for doesn't exist.</p>
          <Link to="/explore" className="mt-4 inline-flex items-center text-brand-600 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
          </Link>
        </div>
      </MainLayout>
    );
  }

  const {
    _id,
    title,
    overview,
    category,
    responsibilities,
    technicalSkills,
    softSkills,
    tools,
    education,
    salary,
    futureScope,
    companies,
    difficulty,
    learningDuration,
    faqs,
  } = career;

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const difficultyStyles = {
    Easy: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/30',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800/30',
    Hard: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/30',
  }[difficulty] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <MainLayout>
      <div className="space-y-10 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link to="/explore" className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Save Pathway</span>
            <BookmarkButton careerId={_id} />
          </div>
        </div>

        {/* 1. Header Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-150 p-8 sm:p-12 shadow-sm dark:bg-dark-card dark:border-dark-border">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
              {category?.name}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white font-display leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {overview}
            </p>

            {/* Quick stats grids */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950 dark:text-brand-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-455 uppercase tracking-wider">Median Salary</p>
                  <p className="text-base font-extrabold text-gray-900 dark:text-white mt-0.5">{formatSalary(salary.median)}/yr</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950 dark:text-brand-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-455 uppercase tracking-wider">Difficulty</p>
                  <span className={`inline-flex px-2 py-0.5 mt-1 rounded-full text-xs font-bold border ${difficultyStyles}`}>
                    {difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950 dark:text-brand-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-455 uppercase tracking-wider">Est. Duration</p>
                  <p className="text-base font-extrabold text-gray-900 dark:text-white mt-0.5">{learningDuration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Core Body Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Blocks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Responsibilities */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-display">
                Key Responsibilities
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-650 dark:text-gray-450 leading-relaxed">{resp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Future Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brand-650 dark:text-brand-450" />
                  Education Options
                </h4>
                <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 leading-relaxed">{education}</p>
              </div>

              <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-2">
                  <Map className="w-4 h-4 text-brand-650 dark:text-brand-450" />
                  Future Market Outlook
                </h4>
                <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 leading-relaxed">{futureScope || 'Stable career growth matching modern tech adoption rates.'}</p>
              </div>
            </div>

            {/* FAQs Accordion */}
            {faqs && faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-650 dark:text-brand-450" />
                  Frequently Asked Questions
                </h3>
                <Accordion items={faqs} />
              </div>
            )}
          </div>

          {/* Sidebar Skills list & Companies */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills & Tools Card */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold dark:bg-dark-border dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 dark:border-dark-border" />

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-gray-100 text-gray-750 text-xs font-semibold dark:bg-dark-border dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 dark:border-dark-border" />

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Primary Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-brand-50/50 text-brand-700 text-xs font-semibold dark:bg-brand-950/20 dark:text-brand-400 border border-brand-100/30 dark:border-brand-900/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Companies Card */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm dark:bg-dark-card dark:border-dark-border space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Top Companies Hiring
              </h4>
              <div className="flex flex-wrap gap-2">
                {companies.map((comp, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-dark-border text-gray-800 dark:text-gray-250 text-xs font-bold shadow-sm bg-white dark:bg-dark-card">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. CTA Action Callout */}
        <section className="bg-gradient-to-r from-brand-600 to-indigo-500 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to begin learning?
            </h3>
            <p className="text-sm text-brand-100 leading-relaxed">
              Open the interactive step-by-step roadmap timeline to access hand-picked tutorials, courses, and documentation guides.
            </p>
          </div>
          <Link
            to={`/careers/${slug}/roadmap`}
            className="inline-flex items-center px-6 py-3 bg-white text-brand-650 hover:bg-brand-50 text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
          >
            Open Learning Roadmap
          </Link>
        </section>
      </div>
    </MainLayout>
  );
}
