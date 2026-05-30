import React from 'react';
import { Section } from '../types';

const Hero: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Optimized video asset with Cloudinary transformations for faster loading
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  
  const videoSrc = "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4";
  const videoPoster = "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4";

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const brandSilver = 'text-white'; 
  const sectorTint = 'bg-brand-logistics/10';

  const content = {
    label: "Certainty Delivered.",
    titleLine1: "Certus Corporate",
    titleLine2: "Search",
    p1: "Certus Corporate Search is part of The Certus Group of Companies Inc. We specialize in sourcing high-impact talent for Finance, Operations, and IT roles within corporate environments. We understand the specific demands of these fast-paced sectors, delivering the strategic talent that drives growth and operational excellence."
  };

  return (
    <section id={Section.HERO} className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-brand-dark py-20 md:py-32">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          key={videoSrc}
          muted 
          loop 
          playsInline
          preload="none"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster={videoPoster}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-40' : 'opacity-0'} grayscale-[40%] brightness-[0.8] will-change-opacity`}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Dynamic Overlay Gradients */}
        <div className={`absolute inset-0 z-10 ${sectorTint} mix-blend-multiply opacity-50`}></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-l from-brand-dark via-brand-dark/20 to-transparent"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40"></div>
        
        {/* Technical Grid Pattern */}
        <div 
            className="absolute inset-0 z-30 pointer-events-none opacity-20"
            style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}
        ></div>
      </div>

      {/* 2. LAYER: LOGO WATERMARK - Bottom Left (Moved to left since content is right) */}
      <img 
        src="https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png" 
        className="absolute bottom-[-4%] left-[-4%] w-[35vw] max-w-[550px] opacity-[0.06] z-[3] pointer-events-none select-none"
        style={{ 
          maskImage: 'radial-gradient(circle at bottom left, black 30%, transparent 80%)', 
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 30%, transparent 80%)' 
        }}
        alt="Certus Group Logo Watermark"
      />

      {/* 3. LAYER: Primary Content Grid */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-20">
        
        <div className="flex flex-col md:flex-row gap-12 max-w-4xl items-start">
          
          {/* Main Content Column */}
          <div className="flex flex-col items-start">
            
            {/* Headline */}
            <h1 className="text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[8.5rem] font-medium text-white leading-[0.85] md:leading-[0.82] tracking-tighter mb-8 md:mb-12 select-none relative flex flex-col items-start">
                <span className="block animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
                    {content.titleLine1}
                </span>
                <span className={`block font-serif italic font-light ${brandSilver} animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-0 drop-shadow-lg`}>
                    {content.titleLine2}
                </span>
            </h1>

            {/* About Content */}
            <div className="space-y-6 animate-[fadeIn_1.2s_ease-out_0.6s_forwards] opacity-0 max-w-2xl">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-white"></div>
                  <span className="text-white font-light tracking-[0.3em] text-[10px] uppercase">{content.label}</span>
               </div>
               <div className="space-y-6">
                  <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed text-justify tracking-wide">
                      {content.p1}
                  </p>
               </div>
            </div>

          </div>

        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-40">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-silver to-transparent"></div>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none"></div>

      <style>{`
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(100px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;