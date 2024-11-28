import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getAbout } from '../services/firebaseService';
import type { About } from '../services/firebaseService';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const navItems = [
  { path: '/', label: 'Home', ariaLabel: 'Go to Home page', fullLabel: 'Home - Architecture Portfolio' },
  { path: '/projects', label: 'Projects', ariaLabel: 'View Architecture Projects', fullLabel: 'View Architectural Projects Portfolio' },
  { path: '/about', label: 'About', ariaLabel: 'Learn more about the Architect', fullLabel: 'About the Architect - Experience & Expertise' }
];

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const location = useLocation();
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
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-playfair text-xl font-bold relative group"
            aria-label={`${about?.name || 'Professional Architect'} - Return to Homepage`}
          >
            <span className="relative z-10">{about?.name}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.ariaLabel}
                title={item.fullLabel}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <span className="relative z-10">{item.fullLabel}</span>
                {location.pathname === item.path && (
                  <span className="absolute inset-0 bg-gray-100 rounded-full"></span>
                )}
                <span className="absolute inset-0 bg-gray-100 rounded-full opacity-0 transform scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
              </Link>
            ))}
            <Link
              to="/contact"
              aria-label="Contact the Architect for Projects"
              title="Get in Touch for Architectural Services"
              className="ml-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Let's Talk About Your Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Link
                to="/contact"
                className="block w-full px-4 py-3 bg-black text-white text-center rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}