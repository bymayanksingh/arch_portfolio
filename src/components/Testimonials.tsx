import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, Urban Developers Inc.",
    content: "Their innovative approach to sustainable architecture has transformed our vision of modern urban spaces. The attention to detail and commitment to excellence is unmatched.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Michael Torres",
    role: "Director, Global Architecture Forum",
    content: "A visionary architect who consistently delivers beyond expectations. Their work speaks volumes about their dedication to creating spaces that inspire and endure.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Emma Watson",
    role: "Principal, Design Excellence Ltd",
    content: "Working with them has been an absolute pleasure. Their ability to blend functionality with aesthetic beauty is remarkable. They've set new standards in architectural innovation.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from my valued employers about their experiences with me and the impact of my architectural solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-black/10" />
                <p className="text-gray-700 italic mb-6 relative z-10 text-lg">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}