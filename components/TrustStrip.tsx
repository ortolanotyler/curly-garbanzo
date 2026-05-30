import React from 'react';

// To swap in real client logos: replace each entry with
// { src: 'https://...', alt: 'Brand Name' }. The component will render
// <img> instead of the text fallback automatically.
type LogoSlot = { label: string; src?: string; alt?: string };

const logos: LogoSlot[] = [
  { label: 'Fortune 500 Logistics' },
  { label: 'Top-10 Canadian Bank' },
  { label: 'Global 3PL' },
  { label: 'Public Manufacturer' },
  { label: 'Healthcare Holdings' },
  { label: 'Private Equity Portfolio' },
];

const TrustStrip: React.FC = () => {
  return (
    <section className="relative py-14 md:py-16 bg-brand-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-white/40 font-light tracking-[0.3em] text-[10px] uppercase mb-8">
          Recent placements
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-10 opacity-50 hover:opacity-90 transition-opacity"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt || logo.label}
                  className="max-h-8 w-auto grayscale brightness-200"
                  loading="lazy"
                />
              ) : (
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/60 text-center leading-tight">
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
