import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  onViewJobs: () => void;
  onNavigate: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onViewJobs, onNavigate }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const [shouldRenderVideo, setShouldRenderVideo] = React.useState(false);

  const videoSrc = "https://res.cloudinary.com/dvbubqhpp/video/upload/v1779319281/15294386_1080_1920_25fps_wzyx8f.mp4";
  // Cloudinary frame extraction → static poster image, ~50KB instead of multi-MB video
  const videoPoster = "https://res.cloudinary.com/dvbubqhpp/video/upload/so_0,w_1280,q_auto,f_auto/v1779319281/15294386_1080_1920_25fps_wzyx8f.jpg";

  React.useEffect(() => {
    // Skip the video entirely on small screens, slow connections, or reduced-motion preference
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const isSlow = conn?.saveData || (conn?.effectiveType && /2g/.test(conn.effectiveType));
    if (isSmall || prefersReducedMotion || isSlow) return;
    setShouldRenderVideo(true);
  }, []);

  React.useEffect(() => {
    if (!shouldRenderVideo) return;
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
  }, [shouldRenderVideo]);

  const stats = [
    { value: '15+', label: 'Years in search' },
    { value: '90%', label: 'Repeat clients' },
    { value: '30–60d', label: 'Avg. time to shortlist' },
  ];

  return (
    <section
      id={Section.HERO}
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-brand-dark pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {shouldRenderVideo ? (
          <video
            ref={videoRef}
            key={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsVideoLoaded(true)}
            poster={videoPoster}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-30' : 'opacity-0'} grayscale-[40%] brightness-[0.8] will-change-opacity`}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={videoPoster}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30 grayscale-[40%] brightness-[0.8]"
          />
        )}

        <div className="absolute inset-0 z-10 bg-brand-logistics/10 mix-blend-multiply opacity-50"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40"></div>

        <div
          className="absolute inset-0 z-30 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <img
        src="https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png"
        className="absolute bottom-[-4%] right-[-4%] w-[35vw] max-w-[500px] opacity-[0.05] z-[3] pointer-events-none select-none"
        style={{
          maskImage: 'radial-gradient(circle at bottom right, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom right, black 30%, transparent 80%)',
        }}
        alt=""
        aria-hidden="true"
      />

      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_forwards] opacity-0">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/80 font-light tracking-[0.3em] text-[10px] uppercase">
              Certainty Delivered
            </span>
          </div>

          <h1 className="text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5rem] xl:text-[7.5rem] font-medium text-white leading-[0.95] tracking-tight mb-8 md:mb-10">
            <span className="block animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
              Executive search
            </span>
            <span className="block animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.15s_forwards] opacity-0">
              for <span className="font-serif italic font-light text-brand-silver">finance, ops,</span>
            </span>
            <span className="block animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] opacity-0">
              and IT.
            </span>
          </h1>

          <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed max-w-2xl mb-10 md:mb-12 animate-[fadeIn_1.2s_ease-out_0.5s_forwards] opacity-0">
            Part of The Certus Group. We run targeted searches for finance, operations, and IT
            roles at corporate clients across North America.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-24 animate-[fadeIn_1.2s_ease-out_0.7s_forwards] opacity-0">
            <button
              onClick={onViewJobs}
              className="group inline-flex items-center justify-center gap-3 bg-white text-brand-dark hover:bg-brand-silver px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Browse open roles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate(Section.CONTACT)}
              className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white hover:border-white hover:bg-white/5 px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
            >
              Hire with Certus
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-white/10 animate-[fadeIn_1.2s_ease-out_0.9s_forwards] opacity-0">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-medium text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-30 hidden md:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-silver to-transparent"></div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none"></div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
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
