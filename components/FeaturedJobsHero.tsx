import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';
import JobDetailDrawer from './JobDetailDrawer';
import ApplicationModal from './ApplicationModal';
import SEO from './SEO';

interface FeaturedJobsHeroProps {
  onViewJobs: () => void;
}

const JOBS_PER_PAGE = 3;

const FeaturedJobsHero: React.FC<FeaturedJobsHeroProps> = ({ onViewJobs }) => {
  const [allJobs, setAllJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applyingTo, setApplyingTo] = useState<JobPosting | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobsData = await jobService.getJobsByDomain();
      setAllJobs(jobsData);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const displayedJobs = allJobs.slice(currentIndex, currentIndex + JOBS_PER_PAGE);

  const handleNext = () => {
    if (currentIndex + JOBS_PER_PAGE < allJobs.length) {
      setCurrentIndex((prev) => prev + JOBS_PER_PAGE);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - JOBS_PER_PAGE >= 0) {
      setCurrentIndex((prev) => prev - JOBS_PER_PAGE);
    } else {
      const lastPageStart = Math.floor((allJobs.length - 1) / JOBS_PER_PAGE) * JOBS_PER_PAGE;
      setCurrentIndex(lastPageStart);
    }
  };

  if (!loading && allJobs.length === 0) return null;

  const totalPages = Math.max(1, Math.ceil(allJobs.length / JOBS_PER_PAGE));
  const currentPage = Math.floor(currentIndex / JOBS_PER_PAGE) + 1;

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-silver/[0.03] rounded-full blur-[140px] pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-brand-silver"></div>
              <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
                Active searches
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
              Roles we&rsquo;re placing right now.
            </h2>
          </div>

          <button
            onClick={onViewJobs}
            className="group inline-flex items-center gap-3 self-start md:self-end border border-white/15 hover:border-white text-white/80 hover:text-white px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
          >
            All open roles
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-brand-silver animate-spin" size={36} />
          </div>
        ) : (
          <div className="space-y-6">
            {allJobs.map((job) => (
              <SEO key={`seo-${job.id}`} job={job} title={`${job.title} in ${job.location}`} />
            ))}

            <div className="space-y-3">
              {displayedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-sm p-6 md:p-7 hover:border-brand-silver/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-silver scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      {job.ref}
                    </span>
                    <h3 className="mt-2 text-xl md:text-2xl font-medium text-white group-hover:text-brand-silver transition-colors leading-tight tracking-tight">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 md:gap-8 shrink-0">
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/60">
                      <MapPin size={14} className="text-brand-silver" strokeWidth={1.5} />
                      <span>{job.location}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/60">
                      <DollarSign size={14} className="text-brand-silver" strokeWidth={1.5} />
                      <span>{job.salary}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setApplyingTo(job);
                      }}
                      className="inline-flex items-center gap-2 bg-white text-brand-dark hover:bg-brand-silver px-5 py-3 min-h-[44px] rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      Apply
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {allJobs.length > JOBS_PER_PAGE && (
              <div className="flex items-center justify-between pt-8 mt-4 border-t border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-11 h-11 rounded-sm border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95"
                    aria-label="Previous page"
                  >
                    <ArrowRight size={18} className="rotate-180" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-sm border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95"
                    aria-label="Next page"
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedJob && (
        <JobDetailDrawer
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {applyingTo && (
        <ApplicationModal
          job={applyingTo}
          isOpen={!!applyingTo}
          onClose={() => setApplyingTo(null)}
        />
      )}
    </section>
  );
};

export default FeaturedJobsHero;
