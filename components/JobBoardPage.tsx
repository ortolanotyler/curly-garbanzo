import React, { useState, useEffect } from 'react';
import { JobPosting } from '../types';
import { ArrowLeft, MapPin, DollarSign, ArrowRight, Share2, Check } from 'lucide-react';
import JobDetailDrawer from './JobDetailDrawer';
import * as jobService from '../services/jobService';
import SEO from './SEO';

interface JobBoardPageProps {
  onBack: () => void;
  onViewSubmit?: () => void;
  initialJobId?: string | null;
}

type CategoryKey = 'all' | 'finance' | 'operations' | 'it' | 'executive';

const CATEGORIES: Array<{ key: CategoryKey; label: string; match: (job: JobPosting) => boolean }> = [
  { key: 'all', label: 'All', match: () => true },
  {
    key: 'finance',
    label: 'Finance',
    match: (job) =>
      /\b(finance|cfo|controller|treasury|accounting|fp&?a|audit|payroll)\b/i.test(
        `${job.title} ${job.summary || ''}`
      ),
  },
  {
    key: 'operations',
    label: 'Operations',
    match: (job) =>
      /\b(operations?|coo|supply\s?chain|logistics|warehouse|plant|3pl|freight|procurement|fulfilment|fulfillment)\b/i.test(
        `${job.title} ${job.summary || ''}`
      ),
  },
  {
    key: 'it',
    label: 'IT & Tech',
    match: (job) =>
      /\b(it|cio|cto|engineer(?:ing)?|software|data|technology|developer|salesforce|edi|architect|systems|bi)\b/i.test(
        `${job.title} ${job.summary || ''}`
      ),
  },
  {
    key: 'executive',
    label: 'Executive',
    match: (job) =>
      /\b(ceo|coo|cfo|cio|cto|president|chief|vp|vice president|director|head of|managing director)\b/i.test(
        job.title
      ),
  },
];

const JobBoardPage: React.FC<JobBoardPageProps> = ({ onBack, onViewSubmit, initialJobId }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await jobService.getJobsByDomain();
      setJobs(data);
      setLoading(false);
      
      // Handle initial job selection from URL
      if (initialJobId && data.length > 0) {
        const job = data.find(j => String(j.id) === initialJobId);
        if (job) {
          setSelectedJob(job);
        }
      }
    };
    fetchJobs();
  }, [initialJobId]);

  // Update URL when selected job changes
  useEffect(() => {
    const path = window.location.pathname;
    if (selectedJob) {
      const newPath = `/jobs/${selectedJob.id}`;
      if (path !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    } else if (path.startsWith('/jobs/')) {
      window.history.pushState({}, '', '/jobs');
    }
  }, [selectedJob]);

  const handleShare = (e: React.MouseEvent, jobId: string | number) => {
    e.stopPropagation();
    const url = `${window.location.origin}/jobs/${jobId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(jobId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/jobs/')) {
        const jobId = path.split('/jobs/')[1];
        const job = jobs.find(j => String(j.id) === jobId);
        if (job) {
          setSelectedJob(job);
        } else {
          setSelectedJob(null);
        }
      } else {
        setSelectedJob(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [jobs]);

  // Skeleton Loader for Job Cards
const JobCardSkeleton: React.FC = () => (
    <div className="bg-white/[0.01] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col h-[280px] animate-pulse">
        <div className="flex justify-between items-start mb-8">
            <div className="w-24 h-4 bg-white/5 rounded-sm"></div>
            <div className="w-8 h-8 bg-white/5 rounded-sm"></div>
        </div>
        <div className="space-y-4 mb-8">
            <div className="w-3/4 h-8 bg-white/10 rounded-sm"></div>
            <div className="w-1/2 h-6 bg-white/5 rounded-sm"></div>
        </div>
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="space-y-2">
                <div className="w-32 h-4 bg-white/5 rounded-sm"></div>
                <div className="w-24 h-4 bg-white/5 rounded-sm"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5"></div>
        </div>
    </div>
);

  const activeFilter = CATEGORIES.find((c) => c.key === activeCategory) || CATEGORIES[0];
  const visibleJobs = jobs.filter(activeFilter.match);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans relative bg-[#0F151E] transition-colors duration-700">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-[#0F151E]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={onBack}
                        className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all">
                             <ArrowLeft size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">Back to Gateway</span>
                    </button>
                </div>
                
                <div className="flex flex-col items-end cursor-pointer group select-none" onClick={onBack}>
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png" 
                            className="w-6 h-6 opacity-90"
                            alt="Certus Logo"
                            referrerPolicy="no-referrer"
                        />
                        <span className="font-sans font-bold text-xl tracking-tight leading-none text-white transition-all duration-300">
                            CERTUS<span className="text-white">GROUP</span>
                        </span>
                    </div>
                    <span className="text-white/50 text-[8px] font-bold uppercase tracking-[0.4em] mt-1.5 group-hover:text-brand-silver transition-colors mr-1">
                        Current Openings
                    </span>
                </div>
            </div>
        </header>

        {/* Roles Grid */}
        <main className="flex-grow pt-24 pb-24 px-6 lg:px-8 z-10">
            <SEO title="Active Job Mandates" description="Explore current Sales, Operations, and Leadership opportunities within the 3PL, Asset-Based, Freight Forwarding, and Customs sectors." />
            <div className="max-w-7xl mx-auto">
                <h1 className="sr-only">Certus Group Supply Chain Search - Job Board</h1>
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Active <span className="text-white italic font-serif font-light">Mandates</span>
                        </h2>
                        <p className="mt-4 text-gray-500 text-sm font-light uppercase tracking-widest">
                            {visibleJobs.length === jobs.length
                                ? `Showing ${jobs.length} priority search opportunities`
                                : `${visibleJobs.length} of ${jobs.length} mandates · ${CATEGORIES.find(c => c.key === activeCategory)?.label}`}
                        </p>
                    </div>

                    {onViewSubmit && (
                        <button
                            onClick={onViewSubmit}
                            className="group inline-flex items-center gap-3 self-start md:self-end border border-white/15 hover:border-white text-white/80 hover:text-white px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
                        >
                            Not seeing a fit? Submit your resume
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>

                {/* Category filter chips */}
                {jobs.length > 0 && (
                    <div className="mb-10 flex flex-wrap items-center gap-2">
                        {CATEGORIES.map((cat) => {
                            const count = cat.key === 'all' ? jobs.length : jobs.filter(cat.match).length;
                            const selected = activeCategory === cat.key;
                            const disabled = count === 0 && cat.key !== 'all';
                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => !disabled && setActiveCategory(cat.key)}
                                    disabled={disabled}
                                    className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-200 ${
                                        selected
                                            ? 'border-brand-silver bg-brand-silver text-brand-dark'
                                            : disabled
                                                ? 'border-white/5 text-white/20 cursor-not-allowed'
                                                : 'border-white/10 text-white/60 hover:border-white/40 hover:text-white'
                                    }`}
                                >
                                    {cat.label}
                                    <span className={`text-[9px] font-mono tabular-nums ${selected ? 'text-brand-dark/70' : 'text-white/40 group-hover:text-white/70'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => <JobCardSkeleton key={i} />)}
                    </div>
                ) : visibleJobs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* JobPosting Structured Data — emit for all jobs so search engines index them */}
                        {jobs.map((job) => (
                            <SEO key={`seo-${job.id}`} job={job} schemaOnly={true} />
                        ))}
                        {visibleJobs.map((job) => (
                            <button 
                                type="button"
                                key={job.id} 
                                onClick={() => setSelectedJob(job)}
                                className={`
                                    relative w-full group cursor-pointer bg-white/[0.01] border border-white/5 rounded-sm overflow-hidden
                                    transition-all duration-500 ease-out hover:-translate-y-1
                                    flex flex-col backdrop-blur-sm text-left
                                    hover:border-brand-silver/30
                                `}
                                aria-label={`View details for ${job.title}`}
                            >
                                <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest px-2 py-1 border border-white/5 rounded-sm">
                                            REF: {job.ref}
                                        </span>
                                        <button 
                                            onClick={(e) => handleShare(e, job.id)}
                                            className="p-2 rounded-sm border border-white/5 hover:border-brand-silver/30 hover:bg-white/5 transition-all group/share relative"
                                            title="Copy Job Link"
                                        >
                                            {copiedId === job.id ? (
                                                <Check size={14} className="text-green-400" />
                                            ) : (
                                                <Share2 size={14} className="text-gray-500 group-hover/share:text-brand-silver" />
                                            )}
                                            {copiedId === job.id && (
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy border border-white/10 text-[10px] text-white px-2 py-1 rounded-sm whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                                                    Link Copied
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-silver transition-colors tracking-tight leading-tight text-balance">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-10 line-clamp-2 font-light text-justify">
                                        {job.summary}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-brand-silver" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="hidden sm:flex items-center gap-2">
                                                <DollarSign size={14} className="text-brand-silver" />
                                                <span>{job.salary}</span>
                                            </div>
                                        </div>

                                        <div className="p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-brand-dark transition-all duration-300">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-silver/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </button>
                        ))}
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="text-center py-32 border border-dashed border-white/5 rounded-sm bg-white/[0.01]">
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">
                            No mandates in {activeFilter.label}
                        </p>
                        <p className="text-gray-600 text-sm mb-6">
                            Nothing active in this practice right now.
                        </p>
                        <button
                            type="button"
                            onClick={() => setActiveCategory('all')}
                            className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-silver hover:text-white border border-brand-silver/40 hover:border-white px-5 py-2.5 rounded-sm transition-colors"
                        >
                            Show all mandates
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-40 border border-dashed border-white/5 rounded-sm bg-white/[0.01]">
                        <p className="text-gray-600 font-bold text-xs uppercase tracking-widest mb-2">No Mandates Available</p>
                        <p className="text-gray-700 text-sm">Check back soon for new opportunities.</p>
                    </div>
                )}
            </div>
        </main>

        <JobDetailDrawer 
            job={selectedJob} 
            isOpen={!!selectedJob} 
            onClose={() => setSelectedJob(null)} 
        />
    </div>
  );
};

export default JobBoardPage;