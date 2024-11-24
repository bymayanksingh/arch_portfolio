import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Pragya Singh</h3>
            <p className="text-gray-400 mb-4">Creating innovative architectural solutions for a sustainable future.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Site Layouts</li>
              <li className="text-gray-400">Interior Design</li>
              <li className="text-gray-400">3D Rendering</li>
              <li className="text-gray-400">Construction Docs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="mailto:contact@architect.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                contact@architect.com
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-2" />
                New York, NY
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Pragya Singh, All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <span className="mx-2 text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}