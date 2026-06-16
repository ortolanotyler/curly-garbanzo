import React from 'react';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Section } from '../types';

interface FooterProps {
  onNavigate?: (id: string) => void;
  onViewJobs?: () => void;
  onViewSubmit?: () => void;
  onViewBlog?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onViewJobs, onViewSubmit, onViewBlog }) => {
  const handleNav = (id: string) => {
    if (onNavigate) onNavigate(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const audienceLinks: Array<{ label: string; onClick: () => void }> = [
    { label: 'For Companies', onClick: () => handleNav(Section.HOW_WE_WORK) },
    { label: 'For Candidates', onClick: () => (onViewJobs ? onViewJobs() : handleNav(Section.HERO)) },
    { label: 'Submit Resume', onClick: () => onViewSubmit?.() },
  ];

  const siteLinks: Array<{ label: string; onClick: () => void }> = [
    { label: 'Practice Sectors', onClick: () => handleNav(Section.INDUSTRIES) },
    { label: 'Open Roles', onClick: () => onViewJobs?.() },
    { label: 'Insights', onClick: () => onViewBlog?.() },
    { label: 'Contact', onClick: () => handleNav(Section.CONTACT) },
  ];

  return (
    <footer className="relative bg-brand-dark text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Massive watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          aria-hidden="true"
          className="text-[25vw] font-bold text-brand-silver/[0.02] leading-none absolute -top-10 -left-10 select-none font-sans tracking-tighter uppercase"
        >
          CERTUS
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-silver/[0.03] rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png"
                  className="w-10 h-10 opacity-90"
                  alt="Certus Logo"
                  referrerPolicy="no-referrer"
                />
                <span className="font-sans font-bold text-3xl tracking-tight text-white">
                  CERTUSGROUP
                </span>
              </div>
              <span className="text-white/60 text-[10px] uppercase tracking-[0.4em] mt-1 font-bold ml-[52px]">
                Corporate Search
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Specialized executive search for high-impact Finance, HR, Sales, and Executive roles
              within fast-paced corporate environments across North America.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/showcase/certus-supply-chain-search/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-white/40 hover:bg-white/5 text-white/70 hover:text-white rounded-sm transition-all duration-300"
                aria-label="Follow Certus on LinkedIn"
              >
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <button
                onClick={() => handleNav(Section.CONTACT)}
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-white/40 hover:bg-white/5 text-white/70 hover:text-white rounded-sm transition-all duration-300"
                aria-label="Contact us"
              >
                <Mail size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Audience column */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-6">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
              Audiences
            </h4>
            <ul className="space-y-3">
              {audienceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 text-sm font-light hover:text-brand-silver hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-brand-silver transition-colors"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Site column */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 text-sm font-light hover:text-brand-silver hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-brand-silver transition-colors"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ column */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
              Headquarters
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-medium text-white">Toronto, Canada</h5>
                <ArrowUpRight size={12} className="text-white/30" />
              </div>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                91 Skyway Avenue, Suite 206
                <br />
                Toronto, ON · M9W 6R5
              </p>
              <a
                href="tel:+14372951799"
                className="inline-block mt-3 text-sm text-gray-400 hover:text-brand-silver transition-colors font-light"
              >
                (437) 295 1799
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs tracking-wide font-light">
            © 2008 Certus Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
