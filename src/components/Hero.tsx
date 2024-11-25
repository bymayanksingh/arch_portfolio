import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ScrollText } from 'lucide-react';

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2000"
          alt="Abstract Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(0deg, #ffffff 1px, transparent 1px)',
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-8">
            {/* Intro Text */}
            <div className="space-y-4">
              <h2 className="text-white/80 text-xl md:text-2xl font-light tracking-wider">
                Welcome to My Portfolio
              </h2>
              <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-white">
                Hello, I'm{' '}
                <span className="relative inline-block">
                  Pragya
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30"></span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
                Licensed architect in Manchester, specializing in sustainable design 
                and innovative architectural solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact"
                className="group inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
                <ScrollText className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-8 max-w-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/60 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">12</div>
                <div className="text-white/60 text-sm">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-white/60 text-sm">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-1 h-16 rounded-full bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 transform -translate-y-1/2 animate-scroll"></div>
        </div>
        <span className="text-white/60 text-sm mt-4">Scroll Down</span>
      </div>
    </section>
  );
}