import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import LinkedInFeed from './components/LinkedInFeed';
import FeaturedJobsHero from './components/FeaturedJobsHero';
import LocationsMap from './components/LocationsMap';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IndustriesServed from './components/IndustriesServed';
import SplitGateway from './components/SplitGateway';
import HowWeWork from './components/HowWeWork';
import TeamStrip from './components/TeamStrip';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import { View, Section } from './types';

// Route-level lazy chunks — these views are only loaded when navigated to,
// keeping the initial gateway/landing bundle lean.
const JobBoardPage = lazy(() => import('./components/JobBoardPage'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));
const SubmitResumePage = lazy(() => import('./components/SubmitResumePage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

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
    if (path === '/admin') return 'admin';
    return 'not-found';
  });

  const [initialJobId, setInitialJobId] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/jobs/')) {
      return path.split('/jobs/')[1];
    }
    return null;
  });

  useEffect(() => {
    if (view !== 'gateway') {
      window.scrollTo(0, 0);
    }

    const path = window.location.pathname;
    let newPath = '/';
    if (view === 'jobs') newPath = '/jobs';
    else if (view === 'submit') newPath = '/submit-resume';
    else if (view === 'admin') newPath = '/admin';
    else if (view === 'landing') newPath = '/';

    if (path !== newPath && !path.startsWith('/jobs/')) {
      window.history.pushState({}, '', newPath);
    }
  }, [view]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === Section.ADMIN) {
      setView('admin');
      return;
    }

    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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

    if (view === 'admin') {
      return (
        <Suspense fallback={<RouteLoader />}>
          <AdminPortal onExit={() => setView('landing')} />
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
          <Hero
            onViewJobs={() => setView('jobs')}
            onNavigate={handleNavigate}
          />
          <IndustriesServed />
          <HowWeWork />
          <TeamStrip />
          <LinkedInFeed />
          <LocationsMap />
          <FeaturedJobsHero onViewJobs={() => setView('jobs')} />
          <Contact />
        </main>

        <Footer
          onNavigate={(id) => handleNavigate(id)}
          onViewJobs={() => setView('jobs')}
          onViewSubmit={() => setView('submit')}
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
