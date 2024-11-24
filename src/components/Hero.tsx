import React from 'react';

export function Hero() {
  return (
    <section className="pt-16">
      <div className="relative h-[90vh] bg-black">
        <img 
          src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=2000"
          alt="Architecture"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Creating Spaces<br />That Inspire</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              10 years of architectural excellence, bringing visions to life through innovative design and sustainable solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}