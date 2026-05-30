import React from 'react';

// To swap in real client logos: replace each entry below with
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
    <section className="relative py-16 md:py-20 bg-brand-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 justify-center">
          <div className="w-8 h-[1px] bg-brand-silver/40"></div>
          <span className="text-white/40 font-light tracking-[0.3em] text-[10px] uppercase">
            Trusted across
          </span>
          <div className="w-8 h-[1px] bg-brand-silver/40"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-12 opacity-50 hover:opacity-90 transition-opacity duration-300"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt || logo.label}
                  className="max-h-10 w-auto grayscale brightness-200"
                  loading="lazy"
                />
              ) : (
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60 text-center leading-tight">
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] font-light tracking-[0.25em] uppercase text-white/30">
          Client identities withheld by engagement confidentiality
        </p>
      </div>
    </section>
  );
};

export default TrustStrip;
