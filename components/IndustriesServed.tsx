import React from 'react';
import { Section } from '../types';

const IndustriesServed: React.FC = () => {
  const categories = [
    {
      category: "Finance & Human Resources",
      description: "Sourcing financial leaders and HR experts. Roles include: CFO, Controller, Director of Finance, Insurance Advisor, Payroll Manager, & HR Business Partner.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000"
    },
    {
      category: "Operations & Logistics",
      description: "Connecting operational experts across 3PL, Freight, and Customs. Roles include: Director of Operations, Warehouse Solutions Designer, Customs Manager, & Logistics Coordinator.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000"
    },
    {
      category: "Information Technology",
      description: "Specialized recruitment for IT leadership and technical experts. Roles include: CIO, Salesforce Developer, Business Intelligence Analyst, Solutions Architect, & EDI Manager.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
    },
    {
      category: "Executive Leadership",
      description: "Strategic search for C-suite and VP-level talent. Roles include: VP of Sales, VP of Data Science, Product Head, & Global Logistics Directors.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section id={Section.INDUSTRIES} className="relative py-36 bg-brand-dark overflow-hidden font-sans">
      
      {/* Cinematic Background Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px), 
                            linear-gradient(to bottom, #444 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-12 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              Practice Areas
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            What we recruit for.
          </h2>
          <p className="mt-6 text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Four practice areas. Each one led by a recruiter with deep experience in the vertical.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] overflow-hidden bg-[#151619] border border-white/5 rounded-sm transition-all duration-500 hover:border-brand-silver/40 flex flex-col"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={`${cat.category} recruitment — Certus Corporate Search`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/85 to-brand-dark/30"></div>
              </div>

              <div className="absolute top-5 left-5 z-20">
                <span className="font-mono text-[10px] text-white/40 tracking-widest">
                  0{idx + 1}
                </span>
              </div>

              <div className="relative z-20 p-6 flex flex-col h-full justify-end gap-3">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
                  {cat.category}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {cat.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-silver scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30"></div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default IndustriesServed;