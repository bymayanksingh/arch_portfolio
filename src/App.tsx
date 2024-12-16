import React, { useState, useEffect } from 'react';
import { 
  Routes, 
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';
import { StructuredData, getArchitectSchema } from './components/StructuredData';
import { getAbout } from './services/firebaseService';
import type { About as AboutData } from './services/firebaseService';
import { BackToTop } from './components/BackToTop';

// Root layout component
function RootLayout({ about }: { about: AboutData | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <SEO />
      <StructuredData data={getArchitectSchema(about)} />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        // Error handled silently
      }
    }
    fetchAbout();
  }, []);

  // Create router with all v7 future flags enabled
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout about={about} />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    }
  );

  return <RouterProvider router={router} />;
}