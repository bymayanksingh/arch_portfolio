import React from 'react';
import { Download, Mail, Phone, Linkedin, Award, Building2, Users, Lightbulb } from 'lucide-react';

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

const stats = [
  { icon: Building2, label: "Projects Completed", value: "50+" },
  { icon: Award, label: "Awards Won", value: "12" },
  { icon: Users, label: "Happy Clients", value: "100+" },
  { icon: Lightbulb, label: "Creative Solutions", value: "200+" }
];

export function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforming spaces with innovative architectural solutions
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With over a decade of experience in architecture and design, I specialize in creating 
              sustainable, innovative spaces that harmoniously blend form and function. My approach 
              combines traditional architectural principles with cutting-edge technology and 
              environmental consciousness.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/cv.pdf" 
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </a>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
              alt="Profile" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-6">
                My diverse skill set allows me to handle projects from concept to completion, 
                ensuring excellence at every stage of the architectural process.
              </p>
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
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Professional Affiliations</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Royal Institute of British Architects (RIBA)</li>
                <li>• American Institute of Architects (AIA)</li>
                <li>• Green Building Council</li>
                <li>• International Association of Architects</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Let's create something amazing together.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:contact@architect.com" className="flex items-center text-gray-600 hover:text-black">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
            <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-black">
              <Phone className="w-5 h-5 mr-2" />
              Call
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-black">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}