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
        
        {/* Header - Minimal & Sharp */}
        <div className="mb-12 md:mb-20">
           <h2 className="text-4xl md:text-7xl font-medium text-white tracking-tighter">
             Corporate <span className="text-white italic font-serif font-light">Sectors</span>
           </h2>
        </div>

        {/* Refined Grid Layout - 4 Columns on desktop for better density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-[2/3] overflow-hidden bg-[#151619] border border-white/5 rounded-2xl transition-all duration-700 hover:border-brand-silver/30 flex flex-col shadow-2xl"
            >
              {/* Background Image with vibrant color reveal */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={cat.image} 
                  alt={`${cat.category} Recruitment Services - Certus Supply Chain Search`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                {/* Gradient Overlay - Dramatic reveal with legibility protection */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent transition-all duration-700 group-hover:from-brand-dark group-hover:via-brand-dark/95 group-hover:to-brand-dark/40"></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-white/10 group-hover:border-brand-silver/40 transition-all duration-500 z-20"></div>

              {/* Content Area */}
              <div className="relative z-20 p-5 md:p-6 flex flex-col h-full justify-end">
                
                {/* Title & Description Container */}
                <div className="flex flex-col gap-1 transform transition-all duration-700">
                   <h3 className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
                      {cat.category}
                   </h3>
                   
                   <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
                     <div className="overflow-hidden">
                       <p className="text-xs md:text-sm text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-light pt-1">
                          {cat.description}
                       </p>
                     </div>
                   </div>
                </div>

              </div>

              {/* Subtle Glow Sweep */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-brand-silver/5 via-transparent to-white/5"></div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default IndustriesServed;