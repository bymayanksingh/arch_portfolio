import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import type { About } from './services/firebaseService';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
    fetchAbout();
  }, []);

  return (
    <Router>
      <SEO />
      <StructuredData data={getArchitectSchema(about)} />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}