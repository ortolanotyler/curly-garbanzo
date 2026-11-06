import React, { useEffect, useState } from 'react';
import { JobPosting } from '../types';
import { ArrowLeft, MapPin, DollarSign, Briefcase, ArrowRight, Share2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ApplicationModal from './ApplicationModal';
import * as jobService from '../services/jobService';
import SEO from './SEO';

const SITE_ORIGIN = 'https://corp.certusgroup.com';
const LOGO = 'https://corp.certusgroup.com/CertusLOGO_burgundy_circle.png';

interface JobPageProps {
  jobId: string;
  onBack: () => void;
  onViewAll: () => void;
}

/**
 * Standalone page for a directly loaded /jobs/:id URL (2026-11-06).
 *
 * Before this, a direct load mounted the whole board with the job in a popup,
 * plus JobPosting schema for EVERY job and a second canonical pointing at /jobs.
 * Google renders JS, so each job URL looked like a copy of the board. This page
 * carries only this job's schema (via <SEO job>) and a single self-canonical,
 * matching the prerendered dist/jobs/<id>/index.html.
 */
const JobPage: React.FC<JobPageProps> = ({ jobId, onBack, onViewAll }) => {
  const [job, setJob] = useState<JobPosting | null | undefined>(undefined);
  const [isApplying, setIsApplying] = useState(false);
  const [copied, setCopied] = useState(false);
  // dist/jobs/<id>/index.html already ships this job's JobPosting JSON-LD; don't add a second copy.
  const [hasStaticSchema] = useState(() =>
    Array.from(document.querySelectorAll('script[type="application/ld+json"]:not([data-rh])')).some((el) =>
      (el.textContent || '').includes('"JobPosting"')
    )
  );

  useEffect(() => {
    let cancelled = false;
    jobService.getJobsByDomain().then((data) => {
      if (cancelled) return;
      const id = decodeURIComponent(jobId).replace(/\/$/, '');
      setJob(data.find((j) => String(j.id) === id) || null);
    });
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  const goAll = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    window.history.pushState({}, '', '/jobs');
    onViewAll();
  };

  const handleShare = () => {
    if (!job) return;
    navigator.clipboard.writeText(`${SITE_ORIGIN}/jobs/${job.id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans relative bg-[#0F151E]">
      <header className="sticky top-0 z-50 bg-[#0F151E]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/jobs" onClick={goAll} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">All open roles</span>
          </a>
          <div className="flex flex-col items-end cursor-pointer group select-none" onClick={onBack}>
            <div className="flex items-center gap-3">
              <img src={LOGO} className="w-6 h-6 opacity-90" alt="Certus Logo" referrerPolicy="no-referrer" />
              <span className="font-sans font-bold text-xl tracking-tight leading-none text-white">
                CERTUS<span className="text-white">GROUP</span>
              </span>
            </div>
            <span className="text-white/50 text-[8px] font-bold uppercase tracking-[0.4em] mt-1.5 group-hover:text-brand-silver transition-colors mr-1">
              Current Openings
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {job === undefined ? null : job === null ? (
            <>
              <SEO
                title="Position filled"
                description="This position is no longer available. View current openings."
                canonical={`${SITE_ORIGIN}/jobs`}
                noindex
              />
              <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-6">Position filled</h1>
              <p className="text-gray-400 text-lg font-light mb-10">This position is no longer available.</p>
              <a href="/jobs" onClick={goAll} className="inline-flex items-center gap-3 bg-white text-brand-dark hover:bg-brand-silver px-6 py-3 rounded-sm font-bold text-sm transition-all">
                View current openings <ArrowRight size={16} />
              </a>
            </>
          ) : (
            <>
              <SEO job={job} canonical={`${SITE_ORIGIN}/jobs/${job.id}`} omitJobSchema={hasStaticSchema} />
              <article>
                {job.ref && (
                  <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded-sm border border-brand-steel/30 text-brand-silver bg-brand-steel/10">
                    REF: {job.ref}
                  </span>
                )}
                <div className="flex items-start justify-between gap-6 mb-8">
                  <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1]">{job.title}</h1>
                  <button
                    onClick={handleShare}
                    className="p-2.5 mt-1 rounded-sm border border-white/10 hover:border-brand-silver/30 hover:bg-white/5 transition-all flex-shrink-0"
                    title="Copy job link"
                    aria-label="Copy job link"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} className="text-gray-400" />}
                  </button>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 pb-8 mb-10 border-b border-white/10 text-gray-300">
                  {job.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-brand-silver" />{job.location}</span>}
                  {job.salary && <span className="flex items-center gap-2"><DollarSign size={16} className="text-brand-silver" />{job.salary}</span>}
                  {job.type && <span className="flex items-center gap-2"><Briefcase size={16} className="text-brand-silver" />{job.type}</span>}
                </div>

                {job.description ? (
                  <div className="prose prose-invert max-w-none text-gray-400 font-light leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{job.description}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="space-y-10 text-gray-400 font-light leading-relaxed">
                    {job.summary && <p className="text-base">{job.summary}</p>}
                    {job.responsibilities?.length > 0 && (
                      <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">The mandate</h2>
                        <ul className="list-disc pl-5 space-y-3">{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </section>
                    )}
                    {job.requirements?.length > 0 && (
                      <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Candidate profile</h2>
                        <ul className="list-disc pl-5 space-y-3">{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </section>
                    )}
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-white/10">
                  <button
                    onClick={() => setIsApplying(true)}
                    className="w-full sm:w-auto px-10 py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-3 bg-brand-silver hover:bg-white text-black"
                  >
                    Apply for this position <ArrowRight size={18} />
                  </button>
                  <p className="text-xs text-gray-600 mt-4">
                    {job.ref ? <>Reference ID: <span className="text-gray-400">{job.ref}</span> &bull; </> : null}Confidentiality guaranteed
                  </p>
                  <p className="mt-8">
                    <a href="/jobs" onClick={goAll} className="text-sm text-gray-500 hover:text-white transition-colors">
                      See all open roles &rarr;
                    </a>
                  </p>
                </div>
              </article>
              <ApplicationModal job={job} isOpen={isApplying} onClose={() => setIsApplying(false)} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobPage;
