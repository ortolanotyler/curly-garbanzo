import React from 'react';
import { Section } from '../types';

interface HeroProps {
  onViewJobs: () => void;
  onNavigate: (sectionId: string) => void;
}

// Landing-page intro hero. Sits below SplitGateway and above the rest of
// the landing flow. Bigger and quieter than the gateway — no CTAs, no
// video, just typography and a faint backdrop.
const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id={Section.HERO}
      className="relative bg-brand-dark border-b border-white/5 py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle dot grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Faint top-left silver glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-silver/[0.04] rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.05] max-w-4xl">
          Shared services executive search.
        </h1>
        <p className="mt-6 md:mt-8 text-base md:text-xl text-white/60 font-light leading-relaxed max-w-2xl">
          Senior finance, HR, operations, and IT placements at corporate clients across North America.
        </p>
      </div>
    </section>
  );
};

export default Hero;
