import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../services/firebaseService';
import type { Testimonial } from '../services/firebaseService';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="text-red-600">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!testimonials.length) {
    return <div className="py-20 text-center">No testimonials available.</div>;
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-playfair mb-4">Client Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150';
                      console.warn(`Failed to load image for testimonial: ${testimonial.id}`);
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4" />
                )}
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}