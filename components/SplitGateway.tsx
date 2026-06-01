import React, { useState, useRef, useEffect } from 'react';
import { Section } from '../types';
import { ArrowRight } from 'lucide-react';
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
    hire: 'https://res.cloudinary.com/dvbubqhpp/video/upload/q_auto,f_auto,w_1280/v1774975858/13076629_3840_2160_60fps_nmqkal.mp4',
    candidates: 'https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4',
  };

  const posters = {
    hire: 'https://res.cloudinary.com/dvbubqhpp/video/upload/so_0,w_1280,q_auto,f_auto/v1774975858/13076629_3840_2160_60fps_nmqkal.jpg',
    candidates: 'https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4',
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

  // Diagonal split: wordmark side dominates ~65% on top, ~50% on bottom.
  // Right side (sectors) fills the rest.
  const getClipPath = (side: 'left' | 'right') => {
    if (isMobile) {
      if (side === 'left') return 'polygon(0 0, 100% 0, 100% 52%, 0 62%)';
      return 'none';
    }
    if (side === 'left') {
      if (hovered === 'sectors') return 'polygon(0 0, 50% 0, 35% 100%, 0 100%)';
      if (hovered === 'wordmark') return 'polygon(0 0, 80% 0, 65% 100%, 0 100%)';
      return 'polygon(0 0, 65% 0, 50% 100%, 0 100%)';
    }
    return 'none';
  };

  const sectors = ['Finance & HR', 'Operations', 'IT Leadership', 'Executive'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-dark font-sans selection:bg-brand-silver selection:text-black">
      <Header onViewJobs={onViewJobs} onNavigate={onNavigate} />

      {/* RIGHT SIDE — Sectors panel (renders first so the wordmark side clips on top) */}
      <div
        className="absolute inset-0 h-full w-full cursor-pointer bg-brand-logistics transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        onClick={() => onSelect('sectors')}
        onMouseEnter={() => !isMobile && setHovered('sectors')}
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${hovered === 'sectors' ? 'opacity-60' : 'opacity-25'}`}
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />
          ) : (
            <img
              src={posters.candidates}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
          )}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${hovered === 'sectors' ? 'opacity-30' : 'opacity-100'}`}></div>
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
          className={`${
            isMobile
              ? 'absolute bottom-0 left-0 h-[48%] w-full items-center px-6 text-center pb-12'
              : 'absolute top-0 right-0 h-full w-[35%] items-end pr-10 lg:pr-24 text-right'
          } flex flex-col justify-center z-20 pointer-events-none transition-all duration-700 ${
            isMobile ? 'opacity-100' : hovered === 'sectors' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <div className="space-y-8 max-w-sm pointer-events-auto">
            {/* Eyebrow line */}
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'}`}>
              <div className="w-16 h-[1px] bg-brand-silver"></div>
            </div>

            {/* Sector list */}
            <div className={`flex flex-col gap-3 ${isMobile ? 'items-center' : 'items-end'}`}>
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className={`flex items-center gap-3 ${isMobile ? '' : 'flex-row-reverse'}`}
                >
                  <span className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-white">
                    {sector}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-brand-silver"></div>
                </div>
              ))}
            </div>

            {/* Dot pattern divider */}
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} gap-1.5 opacity-50`}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-brand-silver/60"></div>
              ))}
            </div>

            {/* CTA */}
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} pt-2`}>
              <div className="group flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white">
                <span className="group-hover:tracking-[0.35em] transition-all duration-500">
                  Explore Sectors
                </span>
                <ArrowRight
                  strokeWidth={1.5}
                  className={`w-5 h-5 transition-transform duration-300 ${
                    hovered === 'sectors' ? 'translate-x-2' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT SIDE — Wordmark panel (clipped, sits on top) */}
      <div
        className="absolute inset-0 h-full z-30 w-full cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]"
        style={{
          clipPath: getClipPath('left'),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        onClick={() => onSelect('landing')}
        onMouseEnter={() => !isMobile && setHovered('wordmark')}
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${
                hovered === 'wordmark' ? 'opacity-45' : 'opacity-25'
              }`}
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />
          ) : (
            <img
              src={posters.hire}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
          )}

          <div className="absolute inset-0 bg-brand-dark/60"></div>
          <div
            className="absolute inset-0 z-10 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: isMobile ? 'none' : 'radial-gradient(circle at 30% 50%, black, transparent 80%)',
            }}
          ></div>
        </div>

        {/* Wordmark — vertically centered, left-anchored */}
        <div
          className={`${
            isMobile
              ? 'absolute top-0 left-0 h-[60%] w-full items-center px-6 text-center pt-24'
              : 'absolute top-0 left-0 h-full w-[55%] items-start pl-10 lg:pl-20 xl:pl-28 text-left'
          } flex flex-col justify-center z-40 transition-all duration-700 ${
            hovered === 'sectors' ? 'opacity-30 -translate-x-12 blur-sm' : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="space-y-0 drop-shadow-2xl">
            <h1 className="text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10rem] xl:text-[12rem] font-medium text-white leading-[0.85] tracking-tighter">
              Certus
            </h1>
            <h1 className="text-[14vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7.5rem] xl:text-[9rem] font-medium text-white leading-[0.85] tracking-tighter">
              Corporate
            </h1>
            <h1 className="text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[9rem] xl:text-[11rem] font-serif italic font-light text-brand-silver leading-[0.85] tracking-tight -mt-1 md:-mt-2">
              Search
            </h1>
          </div>
        </div>

        {/* Bottom-left About Us link */}
        {!isMobile && (
          <div
            className={`absolute bottom-8 left-10 lg:left-20 xl:left-28 z-40 transition-all duration-700 ${
              hovered === 'sectors' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect('landing');
              }}
              className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
            >
              <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              About Us
            </button>
          </div>
        )}

        {!isMobile && <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/10 h-full"></div>}
      </div>

      {/* Mobile About Us link */}
      {isMobile && (
        <button
          type="button"
          onClick={() => onSelect('landing')}
          className="absolute bottom-6 left-6 z-50 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70"
        >
          <ArrowRight strokeWidth={1.5} className="w-3.5 h-3.5" />
          About Us
        </button>
      )}
    </div>
  );
};

export default SplitGateway;
