import React from 'react';

// Replace these with real quotes when available.
const quotes = [
  {
    body:
      'Four candidates we&rsquo;d actually hire, inside a month. The one we picked is still the best leadership hire we&rsquo;ve made this year.',
    attribution: 'Chief Operating Officer',
    org: 'North American 3PL · 2025',
  },
  {
    body:
      'They knew what we needed for a Director of FP&A without us having to spell it out. Every candidate they sent was already screened on the things that actually mattered.',
    attribution: 'VP, Finance',
    org: 'PE-backed manufacturer · 2024',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {quotes.map((q, idx) => (
            <figure
              key={idx}
              className="bg-white/[0.02] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col gap-6"
            >
              <blockquote className="text-lg text-white/90 font-light leading-snug">
                &ldquo;{q.body}&rdquo;
              </blockquote>
              <figcaption className="pt-4 border-t border-white/5 mt-auto">
                <div className="text-sm font-medium text-white">{q.attribution}</div>
                <div className="text-xs font-light text-white/50 mt-1">{q.org}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
