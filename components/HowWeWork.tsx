import React from 'react';
import { Section } from '../types';

const steps = [
  {
    title: 'Start with a real conversation.',
    body: 'A 60-minute call on the role, the team, and what success looks like 12 months in. We build the search around the actual gap, not a copy-pasted job description.',
  },
  {
    title: 'Hand-sourced shortlist.',
    body: 'Targeted outreach across our network of senior finance, operations, and IT leaders in North America. Every shortlisted candidate is interviewed by us first.',
  },
  {
    title: 'Three to five candidates in 30–45 days.',
    body: 'We stay in the loop through references, the offer, the signing, and the first 90 days on the job.',
  },
];

const HowWeWork: React.FC = () => {
  return (
    <section id={Section.HOW_WE_WORK} className="relative py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
            How a search runs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-brand-dark p-8 md:p-10 flex flex-col gap-4"
            >
              <h3 className="text-xl md:text-2xl font-medium text-white leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
