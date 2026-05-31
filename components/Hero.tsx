import React from 'react';
import { Section } from '../types';

interface HeroProps {
  onViewJobs: () => void;
  onNavigate: (sectionId: string) => void;
}

// Thin landing-page intro band. Sits below SplitGateway as a quiet
// section header for the rest of the page. No video, no CTAs, no
// stats. The split gateway is the real hero.
const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id={Section.HERO}
      className="bg-brand-dark border-b border-white/5 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-lg md:text-2xl text-white font-light leading-snug tracking-tight max-w-3xl">
          Certus Corporate Search places senior finance, operations, and IT leaders at
          corporate clients across North America.
        </p>
      </div>
    </section>
  );
};

export default Hero;
