import React, { useState, useRef, useEffect } from 'react';
import { Section } from '../types';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';
import Header from './Header';

interface SplitGatewayProps {
  onSelect: (target: 'landing' | 'sectors' | 'hire') => void;
  onViewJobs: () => void;
  onNavigate?: (sectionId: string) => void;
}

const SplitGateway: React.FC<SplitGatewayProps> = ({ onSelect, onViewJobs, onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRenderVideos, setShouldRenderVideos] = useState(false);
  const hireVideoRef = useRef<HTMLVideoElement>(null);
  const candidatesVideoRef = useRef<HTMLVideoElement>(null);

  const videos = {
    hire: "https://res.cloudinary.com/dvbubqhpp/video/upload/q_auto,f_auto,w_1280/v1774975858/13076629_3840_2160_60fps_nmqkal.mp4",
    candidates: "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4",
  };

  const posters = {
    hire: "https://res.cloudinary.com/dvbubqhpp/video/upload/so_0,w_1280,q_auto,f_auto/v1774975858/13076629_3840_2160_60fps_nmqkal.jpg",
    candidates: "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4",
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const isSlow = conn?.saveData || (conn?.effectiveType && /2g/.test(conn.effectiveType));
    if (!prefersReducedMotion && !isSlow && window.innerWidth >= 768) {
      setShouldRenderVideos(true);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getClipPath = (side: 'left' | 'right') => {
    if (isMobile) {
      if (side === 'left') {
        return `polygon(0 0, 100% 0, 100% 52%, 0 62%)`;
      }
      return 'none';
    }

    if (side === 'left') {
      if (hovered === 'candidates') return 'polygon(0 0, 45% 0, 25% 100%, 0 100%)';
      if (hovered === 'hire') return 'polygon(0 0, 95% 0, 75% 100%, 0 100%)';
      return 'polygon(0 0, 75% 0, 55% 100%, 0 100%)';
    }
    return 'none';
  };

  const hirePractices = ['Finance', 'Operations', 'IT Leadership', 'Executive'];
  const candidateMandates = ['Senior finance roles', 'Operations leadership', 'IT & tech mandates', 'Executive searches'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-dark font-sans selection:bg-brand-silver selection:text-black">
      <Header
        onViewJobs={onViewJobs}
        onNavigate={onNavigate}
      />

      {/* CANDIDATES SIDE — bottom on mobile, right on desktop */}
      <div
        className="absolute inset-0 h-full w-full cursor-pointer bg-brand-logistics transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]"
        style={{
          clipPath: isMobile ? 'none' : 'none',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        onClick={onViewJobs}
        onMouseEnter={() => !isMobile && setHovered('candidates')}
        onMouseLeave={() => !isMobile && setHovered(null)}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {shouldRenderVideos ? (
            <video
              ref={candidatesVideoRef}
              src={videos.candidates}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={posters.candidates}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out will-change-opacity ${hovered === 'candidates' ? 'opacity-60' : 'opacity-20'}`}
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />
          ) : (
            <img
              src={posters.candidates}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${hovered === 'candidates' ? 'opacity-0' : 'opacity-100'}`}></div>
          <div
            className="absolute inset-0 z-10 opacity-20 pointer-events-none transition-opacity duration-700"
            style={{
              backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: isMobile ? 'none' : 'radial-gradient(circle at 70% 50%, black, transparent 80%)',
            }}
          ></div>
        </div>

        <div
          className={`${isMobile
            ? 'absolute bottom-0 left-0 h-[48%] w-full items-center px-6 text-center pb-10'
            : 'absolute top-0 right-0 h-full w-[40%] items-end pr-10 lg:pr-24 text-right'
          } flex flex-col justify-center pb-20 md:pb-0 z-20 pointer-events-none transition-all duration-700 ${
            isMobile ? 'opacity-100' : (hovered === 'candidates' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8')
          }`}
        >
          <div className="space-y-6 max-w-sm pointer-events-auto transform transition-transform duration-500 active:scale-95">
            <div className={`flex items-center gap-3 ${isMobile ? 'justify-center' : 'justify-end'}`}>
              <Briefcase size={12} strokeWidth={1.5} className="text-brand-silver" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
                For Candidates
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.05] tracking-tight">
              Browse open <span className="font-serif italic font-light text-brand-silver">roles.</span>
            </h2>

            <p className="text-sm font-light text-white/60 leading-relaxed">
              Senior finance, operations, IT, and executive searches across North America.
            </p>

            <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} pt-1`}>
              <div className="group inline-flex items-center gap-3 border border-white/30 hover:border-white text-white hover:bg-white/5 px-6 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors">
                View open roles
                <ArrowRight strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANIES / HIRE SIDE — top on mobile, left on desktop */}
      <div
        className="absolute inset-0 h-full z-30 w-full cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]"
        style={{
          clipPath: getClipPath('left'),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        onClick={() => onSelect('hire')}
        onMouseEnter={() => !isMobile && setHovered('hire')}
        onMouseLeave={() => !isMobile && setHovered(null)}
      >
        <div className="absolute inset-0 bg-brand-dark">
          {shouldRenderVideos ? (
            <video
              ref={hireVideoRef}
              src={videos.hire}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={posters.hire}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out will-change-opacity ${hovered === 'hire' ? 'opacity-60' : 'opacity-20'}`}
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />
          ) : (
            <img
              src={posters.hire}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}

          <div className={`absolute inset-0 bg-brand-dark/60 transition-opacity duration-700 ${hovered === 'hire' ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${hovered === 'hire' ? 'opacity-100' : 'opacity-0'}`}></div>
          <div
            className="absolute inset-0 z-10 opacity-20 pointer-events-none transition-opacity duration-700"
            style={{
              backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: isMobile ? 'none' : 'radial-gradient(circle at 30% 50%, black, transparent 80%)',
            }}
          ></div>
        </div>

        <div
          className={`${isMobile
            ? 'absolute top-0 left-0 h-[60%] w-full items-center px-6 text-center pt-28'
            : 'absolute top-0 left-0 h-full w-[50%] md:w-[60%] lg:w-[55%] items-start pl-10 lg:pl-24 text-left'
          } flex flex-col justify-center pt-20 md:pt-0 pb-20 md:pb-16 z-40 transition-all duration-700 ${
            hovered === 'candidates' ? 'opacity-30 -translate-x-12 blur-sm' : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="space-y-6 md:space-y-8 max-w-xl transform transition-transform duration-500 active:scale-95">
            <div className={`flex items-center gap-3 ${isMobile ? 'justify-center' : ''}`}>
              <Building2 size={12} strokeWidth={1.5} className="text-brand-silver" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
                For Companies
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[0.95] tracking-tight drop-shadow-xl">
              Executive search for <span className="font-serif italic font-light text-brand-silver">finance, operations,</span> and IT.
            </h1>

            <div className={`flex flex-wrap gap-x-5 gap-y-2 ${isMobile ? 'justify-center' : ''} pt-1`}>
              {hirePractices.map((practice, idx) => (
                <React.Fragment key={practice}>
                  <span className="text-xs md:text-sm font-light text-white/60 tracking-wide">
                    {practice}
                  </span>
                  {idx < hirePractices.length - 1 && (
                    <span className="text-white/20 hidden md:inline">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className={`flex ${isMobile ? 'justify-center' : 'justify-start'} pt-2`}>
              <div className="group inline-flex items-center gap-3 bg-white text-brand-dark px-6 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-brand-silver">
                Start a search
                <ArrowRight strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
        {!isMobile && <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/10 h-full"></div>}
      </div>

      {/* Skip-intro affordance for repeat visitors */}
      <button
        onClick={() => onSelect('landing')}
        className={`absolute bottom-6 right-6 z-50 group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}
        aria-label="Skip intro and view full site"
      >
        <span>Continue</span>
        <ArrowRight strokeWidth={1.5} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-none ${hovered ? 'opacity-0 translate-y-4' : 'opacity-30 translate-y-0'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default SplitGateway;
