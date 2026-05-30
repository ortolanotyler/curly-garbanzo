import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, Building2 } from 'lucide-react';
import SEO from './SEO';

interface NotFoundPageProps {
  onBack: () => void;
  onViewJobs: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBack, onViewJobs }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '404 — Page not found · Certus Corporate Search';
    return () => {
      document.title = 'Certus Group | Supply Chain Search & Specialized Recruitment';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col font-sans relative overflow-hidden">
      <SEO title="404 — Page not found" noindex />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-silver/[0.04] rounded-full blur-[160px] pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px),
                            linear-gradient(to bottom, #444 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      ></div>

      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to homepage</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              404 · Page not found
            </span>
            <div className="w-10 h-[1px] bg-brand-silver"></div>
          </div>

          <h1 className="text-[18vw] sm:text-[12rem] md:text-[14rem] font-medium text-white leading-none tracking-tighter mb-2 select-none">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05] mb-6">
            This page doesn&rsquo;t exist.
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            It may have moved, or the link was wrong. Head back to the homepage or browse open
            roles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="group inline-flex items-center justify-center gap-3 bg-white text-brand-dark hover:bg-brand-silver px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              <Building2 size={14} />
              Return home
            </button>
            <button
              onClick={onViewJobs}
              className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white hover:border-white hover:bg-white/5 px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
            >
              <Briefcase size={14} />
              Browse open roles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
