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
  { path: '/', label: 'Home', ariaLabel: 'Go to Home page' },
  { path: '/projects', label: 'Projects', ariaLabel: 'View Architecture Projects' },
  { path: '/about', label: 'About', ariaLabel: 'Learn more about the Architect' }
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
            className="flex items-center gap-3 group"
          >
            <img 
              src="/apple-icon-60x60.png"
              alt="Logo"
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="relative">
              <span className="font-playfair text-xl relative inline-block">
                {about?.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-primary/30 group-hover:w-full transition-all duration-500 ease-out"></span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.ariaLabel}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${location.pathname === item.path 
                    ? 'text-text-soft-black' 
                    : 'text-gray-600 hover:text-text-soft-black'
                  }
                  group
                `}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-text-soft-black transform origin-left transition-transform duration-200 ease-out
                  ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                </span>
              </Link>
            ))}
            <Link
              to="/contact"
              aria-label="Contact the Architect"
              className="ml-4 px-6 py-2 bg-soft-black text-white rounded-full hover:bg-soft-black-hover transition-colors duration-300"
            >
              Let's Talk
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
                    ? 'bg-gray-100 text-text-soft-black'
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
                className="block w-full px-4 py-3 bg-soft-black text-white text-center rounded-lg hover:bg-soft-black-hover transition-colors"
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