import React from 'react';
import { Mail, Phone, Linkedin, ArrowRight } from 'lucide-react';

const skills = [
  "Sustainable Design",
  "Urban Planning",
  "3D Visualization",
  "Project Management",
  "BIM",
  "AutoCAD",
  "Revit",
  "SketchUp"
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              alt="Profile"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <p className="text-lg mb-6">
              With a decade of experience in architectural design, I specialize in creating sustainable, 
              innovative spaces that harmonize with their environment while meeting the unique needs of each client.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ArrowRight size={16} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <a href="mailto:contact@architect.com" className="flex items-center space-x-2 text-gray-600 hover:text-black">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-600 hover:text-black">
                <Phone size={20} />
                <span>Call</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black">
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