import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-playfair text-2xl font-bold">Pragya Singh</Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`hover:text-gray-600 ${location.pathname === '/' ? 'text-black' : 'text-gray-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`hover:text-gray-600 ${location.pathname.includes('/projects') ? 'text-black' : 'text-gray-500'}`}
            >
              Projects
            </Link>
            <Link 
              to="/about"
              className={`hover:text-gray-600 ${location.pathname === '/about' ? 'text-black' : 'text-gray-500'}`}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className={`hover:text-gray-600 ${location.pathname === '/contact' ? 'text-black' : 'text-gray-500'}`}
            >
              Contact
            </Link>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block px-3 py-2 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/projects"
              className="block px-3 py-2 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/about"
              className="block px-3 py-2 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className="block px-3 py-2 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}