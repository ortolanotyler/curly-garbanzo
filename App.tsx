import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedJobsHero from './components/FeaturedJobsHero';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IndustriesServed from './components/IndustriesServed';
import SplitGateway from './components/SplitGateway';
import SEO from './components/SEO';
import Reveal from './components/Reveal';
import ErrorBoundary from './components/ErrorBoundary';
import { View, Section } from './types';

// Route-level lazy chunks — these views are only loaded when navigated to,
// keeping the initial gateway/landing bundle lean.
const JobBoardPage = lazy(() => import('./components/JobBoardPage'));
const SubmitResumePage = lazy(() => import('./components/SubmitResumePage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

// Heavy landing-only sections (map: react-simple-maps/d3-geo, feed: motion/markdown)
// — split out so the gateway/initial bundle doesn't carry them.
const LocationsMap = lazy(() => import('./components/LocationsMap'));
const LinkedInFeed = lazy(() => import('./components/LinkedInFeed'));

const RouteLoader: React.FC = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center">
    <Loader2 className="text-brand-silver animate-spin" size={32} strokeWidth={1.5} />
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<View>(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return 'gateway';
    if (path === '/landing') return 'landing';
    if (path.startsWith('/jobs')) return 'jobs';
    if (path === '/submit-resume') return 'submit';
    if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
    return 'not-found';
  });

  const [initialJobId, setInitialJobId] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/jobs/')) {
      return path.split('/jobs/')[1];
    }
    return null;
  });

  const [blogSlug, setBlogSlug] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      return decodeURIComponent(path.split('/blog/')[1].replace(/\/$/, ''));
    }
    return null;
  });

  const prevViewRef = useRef<View>(view);

  useEffect(() => {
    // Only reset scroll on an actual view transition — not on every effect
    // re-run (e.g. HMR / unrelated re-renders), which otherwise yanks the
    // page back to the top mid-scroll.
    if (prevViewRef.current !== view && view !== 'gateway') {
      window.scrollTo(0, 0);
    }
    prevViewRef.current = view;

    const path = window.location.pathname;
    let newPath = '/';
    if (view === 'jobs') newPath = '/jobs';
    else if (view === 'submit') newPath = '/submit-resume';
    else if (view === 'blog') newPath = blogSlug ? `/blog/${blogSlug}` : '/blog';
    else if (view === 'landing') newPath = '/';

    if (path !== newPath && !path.startsWith('/jobs/')) {
      window.history.pushState({}, '', newPath);
    }
  }, [view, blogSlug]);

  const handleNavigate = (sectionId: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBlog = () => {
    setBlogSlug(null);
    setView('blog');
    window.scrollTo(0, 0);
  };

  const openPost = (slug: string) => {
    setBlogSlug(slug);
    setView('blog');
    window.scrollTo(0, 0);
  };

  const backToBlog = () => {
    setBlogSlug(null);
    window.scrollTo(0, 0);
  };

  const handleGatewaySelect = (target: 'landing' | 'sectors' | 'hire') => {
    setView('landing');
    if (target === 'sectors') {
      setTimeout(() => {
        document.getElementById(Section.INDUSTRIES)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (target === 'hire') {
      setTimeout(() => {
        document.getElementById(Section.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const renderContent = () => {
    if (view === 'gateway') {
      return (
        <>
          <SEO isGateway={true} />
          <SplitGateway
            onSelect={handleGatewaySelect}
            onViewJobs={() => setView('jobs')}
            onNavigate={handleNavigate}
          />
        </>
      );
    }

    if (view === 'jobs') {
      return (
        <Suspense fallback={<RouteLoader />}>
          <JobBoardPage
            onBack={() => setView('landing')}
            onViewSubmit={() => setView('submit')}
            initialJobId={initialJobId}
          />
        </Suspense>
      );
    }

    if (view === 'submit') {
      return (
        <Suspense fallback={<RouteLoader />}>
          <SubmitResumePage onBack={() => setView('landing')} />
        </Suspense>
      );
    }

    if (view === 'blog') {
      return (
        <Suspense fallback={<RouteLoader />}>
          {blogSlug ? (
            <BlogPostPage
              slug={blogSlug}
              onBack={() => setView('landing')}
              onBackToBlog={backToBlog}
              onViewJobs={() => setView('jobs')}
            />
          ) : (
            <BlogPage onBack={() => setView('landing')} onOpenPost={openPost} />
          )}
        </Suspense>
      );
    }

    if (view === 'not-found') {
      return (
        <Suspense fallback={<RouteLoader />}>
          <NotFoundPage
            onBack={() => setView('gateway')}
            onViewJobs={() => setView('jobs')}
          />
        </Suspense>
      );
    }

    return (
      <div className="min-h-screen font-sans opacity-0 animate-[fadeIn_1.2s_ease-out_forwards] transition-colors duration-1000 bg-brand-dark text-white selection:bg-brand-silver selection:text-black">
        <SEO />
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>

        <div className="fixed inset-0 z-[-1] bg-brand-dark"></div>

        <Header
          onViewJobs={() => setView('jobs')}
          onViewSubmit={() => setView('submit')}
          onNavigate={handleNavigate}
        />

        <main className="relative z-10">
          <Suspense fallback={<div className="h-[70vh] min-h-[520px] bg-[#070b12] border-y border-white/5" />}>
            <LocationsMap />
          </Suspense>
          <Reveal>
            <Hero
              onViewJobs={() => setView('jobs')}
              onNavigate={handleNavigate}
            />
          </Reveal>
          <Reveal>
            <IndustriesServed />
          </Reveal>
          <Reveal>
            <FeaturedJobsHero onViewJobs={() => setView('jobs')} />
          </Reveal>
          <Reveal>
            <Suspense fallback={<div className="py-24" />}>
              <LinkedInFeed />
            </Suspense>
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>

        <Footer
          onNavigate={(id) => handleNavigate(id)}
          onViewJobs={() => setView('jobs')}
          onViewSubmit={() => setView('submit')}
          onViewBlog={openBlog}
        />
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        {renderContent()}
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
