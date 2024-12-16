import { useEffect, useState } from 'react';
import { Linkedin, Mail, MapPin, Phone, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAbout } from '../services/firebaseService';
import type { About } from '../services/firebaseService';

export function Footer() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        //console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  return (
    <footer className="relative bg-soft-black text-white mt-auto overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.1]">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -left-20 bottom-0 w-80 h-80 bg-white rounded-full transform translate-y-1/2" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                          linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">{about?.name}</h3>
            <p className="text-gray-400 mb-4">{about?.shortDescription}</p>
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${about?.email}`}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={about?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={about?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {about?.services ? (
                about.services.map((service, index) => (
                  <li key={index} className="text-gray-400 hover:text-white transition-colors">
                    {service}
                  </li>
                ))
              ) : (
                <>
                  <li className="text-gray-400">Site Layouts</li>
                  <li className="text-gray-400">Interior Design</li>
                  <li className="text-gray-400">3D Rendering</li>
                  <li className="text-gray-400">Construction Docs</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Me</h4>
            <div className="space-y-4">
              {about?.email && (
                <a 
                  href={`mailto:${about.email}`} 
                  className="flex items-center group text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-12 flex justify-center">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm">{about.email}</span>
                </a>
              )}
              {about?.phone && (
                <a 
                  href={`tel:${about.phone}`} 
                  className="flex items-center group text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-12 flex justify-center">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm">{about.phone}</span>
                </a>
              )}
              {about?.city && about?.country && (
                <div className="flex items-center group text-gray-400">
                  <div className="w-12 flex justify-center">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm">{about.city}, {about.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {about?.name}, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
