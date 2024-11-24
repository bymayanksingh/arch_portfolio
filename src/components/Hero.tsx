import React from 'react';

export function Hero() {
  return (
    <section className="pt-16">
      <div className="relative h-[90vh]">
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2000"
          alt="Abstract Architecture"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="font-playfair text-7xl md:text-8xl font-bold text-white mb-6">
                Hello, I'm Pragya!
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Licensed architect in Manchester —
              </p>
              <a 
                href="#contact"
                className="inline-block mt-8 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}