import React from 'react';

export function GraduationVideo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Graduation Ceremony 🎓
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating my architectural journey at the University of Manchester
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          {/* 16:9 aspect ratio wrapper */}
          <div className="relative pt-[56.25%] bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/uo7F__USXwY"
              title="University of Manchester Graduation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-black/5 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-black/5 rounded-full transform translate-x-1/2 translate-y-1/2" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, black 1px, transparent 1px),
                linear-gradient(to bottom, black 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Class of 2024 • University of Manchester
          </p>
        </div>
      </div>
    </section>
  );
}