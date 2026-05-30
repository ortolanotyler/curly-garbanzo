import React from 'react';
import { Quote } from 'lucide-react';

// Replace these with real quotes when available. Until then, anonymized
// titles read as intentional (search firms routinely withhold client
// identity), not as placeholder.
const quotes = [
  {
    body:
      'Certus delivered a shortlist of four genuinely fit candidates inside a month — and the one we hired is still our strongest leadership add of the year.',
    attribution: 'Chief Operating Officer',
    org: 'North American 3PL · 2025 engagement',
  },
  {
    body:
      'They understood the technical depth we needed for a Director of FP&A without us having to over-explain. Every shortlisted candidate had already been screened on the things we actually cared about.',
    attribution: 'VP, Finance',
    org: 'PE-backed manufacturer · 2024 engagement',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-silver/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              In their words
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            What clients say after the offer is signed.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {quotes.map((q, idx) => (
            <figure
              key={idx}
              className="group relative bg-white/[0.02] border border-white/5 rounded-sm p-8 md:p-10 hover:border-brand-silver/30 transition-colors duration-500 flex flex-col gap-8"
            >
              <Quote
                size={32}
                strokeWidth={1.25}
                className="text-brand-silver/40 group-hover:text-brand-silver transition-colors duration-500"
              />

              <blockquote className="text-lg md:text-xl text-white/90 font-light leading-snug tracking-tight">
                &ldquo;{q.body}&rdquo;
              </blockquote>

              <figcaption className="pt-6 border-t border-white/5 mt-auto">
                <div className="text-sm font-medium text-white">{q.attribution}</div>
                <div className="text-[11px] font-light uppercase tracking-[0.2em] text-white/40 mt-1">
                  {q.org}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
