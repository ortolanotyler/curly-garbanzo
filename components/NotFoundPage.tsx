import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
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
      document.title = 'Certus Corporate Search | Shared services executive search';
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
        <div className="max-w-2xl text-center">
          <h1 className="text-[14vw] sm:text-[10rem] md:text-[11rem] font-medium text-white leading-none tracking-tighter mb-4 select-none">
            404
          </h1>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
            This page doesn&rsquo;t exist. Head home or browse open roles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onBack}
              className="bg-white text-brand-dark hover:bg-brand-silver px-7 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              Return home
            </button>
            <button
              onClick={onViewJobs}
              className="border border-white/25 text-white hover:bg-white/5 px-7 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              Browse open roles
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
