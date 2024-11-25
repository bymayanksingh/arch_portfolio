import React from 'react';
import { Calendar, Award, Building2, Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    year: 2023,
    event: "Lead Architect, Urban Harmony Center",
    description: "Leading innovative sustainable architecture projects",
    icon: Building2,
    color: "bg-emerald-100 text-emerald-600",
    details: "Spearheaded multiple award-winning sustainable design projects, managing a team of 15 architects"
  },
  {
    year: 2021,
    event: "International Architecture Award",
    description: "Recognized for excellence in sustainable design",
    icon: Award,
    color: "bg-blue-100 text-blue-600",
    details: "Received the prestigious International Architecture Award for innovative sustainable design solutions"
  },
  {
    year: 2019,
    event: "Founded Studio Arc",
    description: "Established independent architectural practice",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
    details: "Launched an independent practice focusing on sustainable and innovative architectural solutions"
  },
  {
    year: 2017,
    event: "Senior Architect, Foster & Partners",
    description: "Led major international projects",
    icon: Building2,
    color: "bg-rose-100 text-rose-600",
    details: "Managed and delivered high-profile international projects across Europe and Asia"
  },
  {
    year: 2013,
    event: "Started Professional Journey",
    description: "Graduated with honors in Architecture",
    icon: GraduationCap,
    color: "bg-amber-100 text-amber-600",
    details: "Graduated summa cum laude with a Master's in Architecture from the University of Manchester"
  }
];

export function Timeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Professional Journey</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A decade of architectural excellence, innovation, and sustainable design
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="relative pl-8 before:absolute before:left-[9px] before:top-0 before:h-full before:w-0.5 before:bg-gray-200"
              >
                <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${item.color} flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-400">{item.year}</span>
                  <h3 className="font-playfair text-xl font-bold mt-2 mb-2">{item.event}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-500 text-sm mt-2 italic">{item.details}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative mb-16 last:mb-0">
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-bold text-gray-400">{item.year}</span>
                      <h3 className="font-playfair text-2xl font-bold mt-2 mb-2">{item.event}</h3>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <p className="text-gray-500 text-sm italic">{item.details}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}