import { useState, useEffect } from 'react';
import { getTestimonials } from '../services/firebaseService';
import type { Testimonial } from '../services/firebaseService';
import { Quote, ExternalLink } from 'lucide-react';

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
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what my past employers & clients have to say about their experience working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="group relative bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                       hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 
                       hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Quote */}
              <div className="absolute -right-6 -top-6 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-32 h-32 transform rotate-12" />
              </div>

              {/* Quote Icon */}
              <div className="absolute -top-4 right-8 z-10">
                <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center
                            transform -rotate-6 group-hover:rotate-0 transition-transform duration-300
                            shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="relative mb-8">
                  {/* Small decorative quote */}
                  <span className="absolute -left-2 -top-2 text-4xl text-primary opacity-20 font-serif">"</span>
                  <p className="text-gray-700 leading-relaxed font-light italic pl-4 relative z-10">
                    {testimonial.content}
                  </p>
                  <span className="absolute -bottom-4 -right-1 text-4xl text-primary opacity-20 font-serif rotate-180">"</span>
                </div>

                {/* Profile */}
                <div className="flex items-center mt-8 pt-6 border-t border-gray-100">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    {testimonial.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                          width={56}
                          height={56}
                          className="w-full h-full rounded-full object-cover ring-4 ring-gray-50
                                   group-hover:ring-primary/10 transition-all duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-avatar.jpg';
                            console.warn(`Failed to load image for testimonial: ${testimonial.id}`);
                          }}
                        />
                        <div className="absolute inset-0 rounded-full ring-1 ring-black/5"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 ring-4 ring-gray-50
                                    group-hover:ring-primary/10 transition-all duration-300" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                  {testimonial.source && (
                    <a
                      href={testimonial.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 text-sm bg-primary/5 hover:bg-primary/10 
                               text-primary hover:text-primary/90 px-3 py-1.5 rounded-full transition-all duration-300
                               group/source transform hover:-translate-y-0.5"
                      aria-label={`View source of ${testimonial.name}'s testimonial`}
                    >
                      <span className="hidden sm:inline font-medium">View Source</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/source:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}