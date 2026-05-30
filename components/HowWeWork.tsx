import React from 'react';
import { Compass, Search, Handshake } from 'lucide-react';
import { Section } from '../types';

const steps = [
  {
    icon: Compass,
    n: '01',
    label: 'Brief',
    title: 'Start with a real conversation.',
    body: 'A 60-minute call on the role, the team, and what success looks like 12 months in. We build the search around the actual gap, not a copy-pasted job description.',
  },
  {
    icon: Search,
    n: '02',
    label: 'Search',
    title: 'Hand-sourced shortlist.',
    body: 'Targeted outreach across our network of senior finance, operations, and IT leaders in North America. Every shortlisted candidate is interviewed by us first.',
  },
  {
    icon: Handshake,
    n: '03',
    label: 'Place',
    title: 'Three to five candidates in 30–45 days.',
    body: 'We stay in the loop through references, the offer, the signing, and the first 90 days on the job.',
  },
];

const HowWeWork: React.FC = () => {
  return (
    <section id={Section.HOW_WE_WORK} className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px),
                            linear-gradient(to bottom, #444 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              How a search runs
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            Three phases.
          </h2>
          <p className="mt-6 text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Every engagement follows the same arc. The phases give us — and you — clear
            checkpoints on timing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="group relative bg-brand-dark p-8 md:p-10 flex flex-col gap-6 transition-colors duration-500 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-brand-silver group-hover:border-brand-silver/40 transition-colors duration-500">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 tracking-widest">
                    {step.n}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-silver">
                    {step.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-silver scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
