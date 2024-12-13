import { Suspense, lazy } from 'react';

// Lazy load components
const Hero = lazy(() => import('../components/Hero').then(module => ({ default: module.Hero })));
const HomeAbout = lazy(() => import('../components/HomeAbout').then(module => ({ default: module.HomeAbout })));
const Timeline = lazy(() => import('../components/Timeline').then(module => ({ default: module.Timeline })));
const Projects = lazy(() => import('../components/Projects').then(module => ({ default: module.Projects })));
const Testimonials = lazy(() => import('../components/Testimonials').then(module => ({ default: module.Testimonials })));
const SkillUpgrade = lazy(() => import('../components/SkillUpgrade').then(module => ({ default: module.SkillUpgrade })));

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-[200px] flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

export function Home() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <HomeAbout />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <SkillUpgrade />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Timeline />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
    </>
  );
}