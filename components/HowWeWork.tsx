import React from 'react';
import { Section } from '../types';

const steps = [
  {
    title: 'Brief',
    body: 'A 60-minute call on the role, the team, and what success looks like 12 months in.',
  },
  {
    title: 'Search',
    body: 'Targeted outreach across our network of senior finance, operations, and IT leaders in North America. Every shortlisted candidate is interviewed by us first.',
  },
  {
    title: 'Shortlist',
    body: 'Three to five candidates in 30 to 45 days. We stay in the loop through references, the offer, and the first 90 days on the job.',
  },
];

const HowWeWork: React.FC = () => {
  return (
    <section id={Section.HOW_WE_WORK} className="relative py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
