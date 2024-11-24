import React from 'react';
import { Download, Mail, Phone, Linkedin } from 'lucide-react';

const skills = [
  "Architecture",
  "Interior Design",
  "Building Design",
  "3D Rendering",
  "Supervision",
  "Project Management",
  "BIM",
  "AutoCAD"
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
              alt="Modern Architecture"
              className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
            />
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-6">About Me</h2>
              <p className="text-xl text-gray-600 mb-6">
                Architecture driven by innovations —
              </p>
              <p className="text-gray-600 leading-relaxed">
                I'm a licensed architect in India and interior designer located in Manchester 
                and working all over the USA.
              </p>
            </div>

            {/* Skills Section */}
            <div>
              <p className="text-lg font-semibold mb-4">I'm good at:</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              I specialize as a design and full-service architect for new residences, 
              home additions, and commercial buildings. I also provide additional services 
              like obtaining permits, due diligence, and architectural supervision. 
              If you like what I do, contact me to discuss our next great project!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/cv.pdf" 
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            {/* Contact Links */}
            <div className="flex space-x-6 pt-4">
              <a href="mailto:contact@architect.com" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <Phone size={20} />
                <span>Call</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}