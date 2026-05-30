import React from 'react';
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
  const videoPoster = "https://res.cloudinary.com/dvbubqhpp/video/upload/so_0,w_1280,q_auto,f_auto/v1779319281/15294386_1080_1920_25fps_wzyx8f.jpg";

  React.useEffect(() => {
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
        if (entry.isIntersecting) videoRef.current?.play().catch(() => {});
        else videoRef.current?.pause();
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [shouldRenderVideo]);

  return (
    <section
      id={Section.HERO}
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-brand-dark"
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
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-25' : 'opacity-0'} grayscale-[40%] brightness-[0.7]`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={videoPoster}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-25 grayscale-[40%] brightness-[0.7]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-[12vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5rem] xl:text-[6.5rem] font-medium text-white leading-[0.95] tracking-tight mb-8 animate-[fadeUp_1s_ease-out_forwards] opacity-0">
            Executive search for <span className="font-serif italic font-light text-brand-silver">finance, operations,</span> and IT.
          </h1>

          <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed max-w-xl mb-10 animate-[fadeUp_1s_ease-out_0.2s_forwards] opacity-0">
            Senior leadership placements across North America.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-[fadeUp_1s_ease-out_0.4s_forwards] opacity-0">
            <button
              onClick={onViewJobs}
              className="bg-white text-brand-dark hover:bg-brand-silver px-7 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              Browse open roles
            </button>
            <button
              onClick={() => onNavigate(Section.CONTACT)}
              className="border border-white/25 text-white hover:bg-white/5 px-7 py-3.5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              Hire with Certus
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
