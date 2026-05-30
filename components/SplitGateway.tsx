import React, { useState, useRef, useEffect } from 'react';
import { Section } from '../types';
import { ArrowRight } from 'lucide-react';
import Header from './Header';

interface SplitGatewayProps {
  onSelect: (target: 'landing' | 'sectors') => void;
  onViewJobs: () => void;
  onNavigate?: (sectionId: string) => void;
}

const SplitGateway: React.FC<SplitGatewayProps> = ({ onSelect, onViewJobs, onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const tradesVideoRef = useRef<HTMLVideoElement>(null);
  const jobsVideoRef = useRef<HTMLVideoElement>(null);

  const navyBg = 'bg-brand-dark'; // Skilled Trades Blue
  const steelBg = 'bg-brand-logistics'; // Practice Sectors Slate
  const silverText = 'text-white'; 

  const videos = {
    'skilled-trades': "https://res.cloudinary.com/dvbubqhpp/video/upload/q_auto,f_auto,w_1280/v1774975858/13076629_3840_2160_60fps_nmqkal.mp4",
    'sectors': "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4"
  };

  const posters = {
    'skilled-trades': "https://res.cloudinary.com/dvbubqhpp/video/upload/so_0,w_1280,q_auto,f_auto/v1774975858/13076629_3840_2160_60fps_nmqkal.jpg",
    'sectors': "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4"
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setScrollPos(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Removed manual play/pause logic to prevent stuttering. 
  // Videos now loop continuously and visibility is handled via opacity/filters.

  const getClipPath = (side: 'left' | 'right') => {
    if (isMobile) {
      if (side === 'left') {
        // Skilled Trades (Top on mobile)
        return `polygon(0 0, 100% 0, 100% 52%, 0 62%)`;
      }
      return 'none'; 
    }
    
    if (side === 'left') {
      if (hovered === 'sectors') return 'polygon(0 0, 45% 0, 25% 100%, 0 100%)'; 
      if (hovered === 'skilled-trades') return 'polygon(0 0, 95% 0, 75% 100%, 0 100%)';   
      return 'polygon(0 0, 75% 0, 55% 100%, 0 100%)'; 
    }
    return 'none';
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-dark font-sans selection:bg-brand-silver selection:text-black">
      
      <Header 
        onViewJobs={onViewJobs}
        onNavigate={onNavigate} 
      />

      {/* CORE INDUSTRIES (Bottom on Mobile, Right on Desktop) */}
      <div 
        className={`${isMobile ? 'absolute inset-0 h-full' : 'absolute inset-0 h-full'} w-full cursor-pointer ${steelBg} transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]`}
        style={{ 
          clipPath: isMobile ? getClipPath('right') : 'none',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        onClick={() => onNavigate?.(Section.HERO)}
        onMouseEnter={() => !isMobile && setHovered('sectors')}
        onMouseLeave={() => !isMobile && setHovered(null)}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={jobsVideoRef}
            src={videos['sectors']}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posters['sectors']}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out will-change-opacity ${hovered === 'sectors' ? 'opacity-60' : 'opacity-20'}`}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          />
          
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${hovered === 'sectors' ? 'opacity-0' : 'opacity-100'}`}></div>
          <div 
            className="absolute inset-0 z-10 opacity-20 pointer-events-none transition-opacity duration-700"
            style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: isMobile ? 'none' : 'radial-gradient(circle at 70% 50%, black, transparent 80%)'
            }}
          ></div>
        </div>

        <div className={`${isMobile ? 'absolute bottom-0 left-0 h-[48%] w-full items-center px-6 text-center pb-8' : 'absolute top-0 right-0 h-full w-[40%] items-end pr-10 lg:pr-24 text-right'} flex flex-col justify-end pb-20 md:pb-32 z-20 pointer-events-none transition-all duration-700 ${isMobile ? 'opacity-100' : (hovered === 'sectors' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8')}`}>
          <div className="space-y-4 md:space-y-12 max-w-xl pointer-events-auto transform transition-transform duration-500 active:scale-95">
            {isMobile && (
              <h2 className="text-2xl font-normal text-white leading-tight tracking-tight mb-4">
                Corporate <span className={`font-serif italic font-light ${silverText}`}>Sectors</span>
              </h2>
            )}

            <div className={`flex flex-col ${isMobile ? 'items-center' : 'items-end'} gap-2 md:gap-5`}>
              {['Finance', 'Operations', 'IT Leadership', 'Strategic Planning'].map((role, i) => (
                <div key={i} className="flex items-center gap-4 group/item">
                  {isMobile ? null : (
                    <div className={`w-1 h-1 rounded-full transition-all duration-300 ${hovered === 'sectors' || isMobile ? 'bg-brand-silver' : 'bg-white/20'}`}></div>
                  )}
                  <span className={`text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 ${hovered === 'sectors' || isMobile ? 'text-white' : 'text-white/40'}`}>
                    {role}
                  </span>
                </div>
              ))}
            </div>
            
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} pt-2 md:pt-8`}>
               <div className={`group flex items-center gap-4 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${hovered === 'sectors' || isMobile ? 'text-white' : 'text-white/40'}`}>
                 <span className="group-hover:tracking-[0.3em] transition-all duration-500">Explore Sectors</span>
                 <ArrowRight strokeWidth={1.5} className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${hovered === 'sectors' ? 'translate-x-2' : ''}`} />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLED TRADES (Top on Mobile, Left on Desktop) */}
      <div 
        className={`${isMobile ? 'absolute inset-0 h-full z-30' : 'absolute inset-0 h-full z-30'} w-full cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] md:active:scale-100 will-change-[clip-path,transform]`}
        style={{ 
          clipPath: getClipPath('left'),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        onClick={() => onSelect('landing')}
        onMouseEnter={() => !isMobile && setHovered('skilled-trades')}
        onMouseLeave={() => !isMobile && setHovered(null)}
      >
        <div className={`absolute inset-0 ${navyBg}`}>
           <video
            ref={tradesVideoRef}
            src={videos['skilled-trades']}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posters['skilled-trades']}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out will-change-opacity ${hovered === 'skilled-trades' ? 'opacity-60' : 'opacity-20'}`}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
           />

           <div className={`absolute inset-0 bg-brand-dark/60 transition-opacity duration-700 ${hovered === 'skilled-trades' ? 'opacity-0' : 'opacity-100'}`}></div>
           <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${hovered === 'skilled-trades' ? 'opacity-100' : 'opacity-0'}`}></div>
           <div 
            className="absolute inset-0 z-10 opacity-20 pointer-events-none transition-opacity duration-700"
            style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: isMobile ? 'none' : 'radial-gradient(circle at 30% 50%, black, transparent 80%)'
            }}
           ></div>
        </div>
        
        <div className={`${isMobile ? 'absolute top-0 left-0 h-[60%] w-full items-center px-6 text-center pt-24' : 'absolute top-0 left-0 h-full w-[50%] md:w-[60%] lg:w-[55%] items-start pl-10 lg:pl-24 text-left'} flex flex-col justify-start pt-20 md:pt-32 z-40 transition-all duration-700 ${hovered === 'sectors' ? 'opacity-30 -translate-x-12 blur-sm' : 'opacity-100 translate-x-0'}`}>
          <div className="space-y-6 md:space-y-12 max-w-2xl transform transition-transform duration-500 active:scale-95">

             
             <div className="space-y-1 md:space-y-4 drop-shadow-xl">
               <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] font-medium text-white leading-[0.8] tracking-tighter">
                Certus
               </h1>
               <h2 className="text-lg sm:text-4xl md:text-6xl lg:text-7xl font-light text-white/90 leading-tight tracking-tight">
                Corporate <span className={`font-serif italic font-light ${silverText}`}>Search</span>
               </h2>
             </div>

             <div className="flex flex-col gap-4 mt-8">
               {['Finance', 'Operations', 'Tech', 'Executive'].map(sector => (
                 <div key={sector} className="flex items-center gap-4 text-white/80 text-xl md:text-2xl font-light tracking-wide">
                   <div className="w-2 h-2 bg-brand-silver rounded-full"></div>
                   <span>{sector}</span>
                 </div>
               ))}
             </div>

             <div className={`flex ${isMobile ? 'justify-center' : 'justify-start'} pt-12 md:pt-24`}>
               <div className={`group flex items-center gap-8 transition-all duration-1000 ${hovered === 'skilled-trades' || isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500">
                      <ArrowRight strokeWidth={1} className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-1">The Agency</span>
                    <span className="text-sm md:text-base font-light text-white tracking-[0.1em] group-hover:tracking-[0.15em] transition-all duration-500">
                      About <span className="font-serif italic">Certus</span>
                    </span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        {!isMobile && <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/10 h-full"></div>}
      </div>

      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 pointer-events-none ${hovered ? 'opacity-0 translate-y-4' : 'opacity-40 translate-y-0'}`}>
          <div className="flex flex-col items-center gap-4">
             <div className="w-px h-12 bg-white/20"></div>
          </div>
      </div>
    </div>
  );
};

export default SplitGateway;
