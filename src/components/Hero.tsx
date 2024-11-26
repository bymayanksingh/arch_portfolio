import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ScrollText } from 'lucide-react';

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1637088059531-4ffcc89d0dd3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Abstract Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-animate" 
               style={{
                 backgroundImage: 'linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(0deg, #ffffff 1px, transparent 1px)',
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="max-w-3xl space-y-8">
            {/* Intro Text */}
            <div className="space-y-6">
              <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
                Hello, I'm{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold">Pragya</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>
              </h1>
              <p className="font-cormorant text-2xl sm:text-2xl md:text-3xl text-white/90 font-light max-w-2xl leading-relaxed tracking-wide">
                Licensed architect in Manchester, specializing in sustainable design 
                and innovative architectural solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact"
                className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
                <ScrollText className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              <div className="text-center">
                <div className="font-cormorant text-3xl sm:text-4xl font-semibold text-white mb-2">50+</div>
                <div className="text-white/60 text-sm tracking-wider uppercase">Projects</div>
              </div>
              <div className="text-center">
                <div className="font-cormorant text-3xl sm:text-4xl font-semibold text-white mb-2">12</div>
                <div className="text-white/60 text-sm tracking-wider uppercase">Awards</div>
              </div>
              <div className="text-center">
                <div className="font-cormorant text-3xl sm:text-4xl font-semibold text-white mb-2">10+</div>
                <div className="text-white/60 text-sm tracking-wider uppercase">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center animate">
        <div className="w-1 h-10 rounded-full bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 transform -translate-y-1/2 animate-scroll"></div>
        </div>
        <span className="text-white/60 text-sm mt-4 tracking-wider uppercase">Scroll Down</span>
      </div>
    </section>
  );
}
