import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <span>© 2024 ARCH.STUDIO. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300"><Github /></a>
            <a href="#" className="hover:text-gray-300"><Linkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}