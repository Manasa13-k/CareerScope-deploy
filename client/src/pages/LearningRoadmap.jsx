import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, BookOpen, ExternalLink, Globe, PlayCircle, Book } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import RoadmapTimeline from '../components/RoadmapTimeline';
import { PageLoader } from '../components/Loader';

export default function LearningRoadmap() {
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
        console.error('Failed to load roadmap details', err);
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Roadmap Not Found</h2>
          <p className="text-gray-500 mt-2">The career path roadmap you are looking for doesn't exist.</p>
          <Link to="/explore" className="mt-4 inline-flex items-center text-brand-600 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
          </Link>
        </div>
      </MainLayout>
    );
  }

  const { title, roadmap, learningDuration, difficulty, learningResources } = career;

  // Resolve Resource type icons
  const getResourceIcon = (type) => {
    switch (type) {
      case 'Course':
        return <PlayCircle className="w-5 h-5 text-brand-650" />;
      case 'Book':
        return <Book className="w-5 h-5 text-brand-650" />;
      case 'Documentation':
        return <Globe className="w-5 h-5 text-brand-650" />;
      default:
        return <BookOpen className="w-5 h-5 text-brand-650" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-10 pb-16">
        {/* Navigation Breadcrumb */}
        <div>
          <Link to={`/careers/${slug}`} className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Career Overview
          </Link>
        </div>

        {/* Header Title block */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-display">
            Learning Roadmap: <span className="text-brand-650 dark:text-brand-400">{title}</span>
          </h1>
          <p className="text-sm text-gray-505 dark:text-gray-400 mt-1">
            Follow this structured timeline and complete study resources to build professional skills.
          </p>
        </div>

        {/* Split Layout: Left Timeline, Right resources card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Vertical Timeline stepper */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-950 dark:text-white font-display pb-2 border-b border-gray-100 dark:border-dark-border mb-6">
              Step-by-Step Pathway
            </h2>
            <RoadmapTimeline roadmap={roadmap} />
          </div>

          {/* Right Column: General Info and Resources List */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick stats panel */}
            <div className="bg-white border border-gray-150 p-6 rounded-2xl dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-450">Roadmap Estimation</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Learning Duration</span>
                  <span className="font-bold text-gray-900 dark:text-white">{learningDuration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Path Difficulty</span>
                  <span className="font-bold text-gray-900 dark:text-white">{difficulty}</span>
                </div>
              </div>
            </div>

            {/* Hand-Picked Learning Resources */}
            <div className="bg-white border border-gray-150 p-6 rounded-2xl dark:bg-dark-card dark:border-dark-border shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-450">Hand-Picked Resources</h3>
              
              <div className="space-y-4">
                {learningResources && learningResources.length > 0 ? (
                  learningResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-4 p-4 border border-gray-100 dark:border-dark-border rounded-xl hover:border-brand-200 dark:hover:border-brand-900/30 bg-gray-50/50 dark:bg-dark-card hover:bg-white dark:hover:bg-dark-border/10 transition-all shadow-sm"
                    >
                      {/* Icon */}
                      <div className="p-2 rounded-xl bg-brand-50 text-brand-650 dark:bg-brand-950/20 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        {getResourceIcon(res.type)}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-650 dark:text-brand-450">
                          {res.type}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display truncate mt-0.5 group-hover:text-brand-650 dark:group-hover:text-brand-450">
                          {res.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-450 flex items-center gap-1 mt-1 font-semibold">
                          Visit Site <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-gray-550">No external resources added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
