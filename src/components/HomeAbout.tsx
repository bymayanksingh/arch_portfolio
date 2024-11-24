import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, Award, Building2, Users } from 'lucide-react';

const stats = [
  { icon: Building2, label: "Projects", value: "50+" },
  { icon: Award, label: "Awards", value: "12" },
  { icon: Users, label: "Clients", value: "100+" },
];

export function HomeAbout() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
              alt="Pragya Singh"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-b-2xl p-6">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center text-white">
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-playfair text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-playfair text-4xl font-bold">About Me</h2>
            <p className="text-xl text-gray-600">
              Transforming spaces with innovative architectural solutions
            </p>
            <p className="text-gray-600 leading-relaxed">
              As a licensed architect with over a decade of experience, I specialize in creating 
              sustainable, innovative spaces that harmoniously blend form and function. My approach 
              combines traditional architectural principles with cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a 
                href="/cv.pdf" 
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}