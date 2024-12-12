import { useState, useEffect } from 'react';
import { getGraduationGallery } from '../services/firebaseService';
import type { GraduationGallery as GalleryType } from '../services/firebaseService';
import { ImageFallback } from './ImageFallback';
import { Loader2 } from 'lucide-react';

export function GraduationGallery() {
  const [gallery, setGallery] = useState<GalleryType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGraduationGallery();
        setGallery(data);
      } catch (error) {
        console.error('Error fetching graduation gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!gallery || gallery.images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Graduation Moments
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating the completion of my architectural journey and the beginning of new adventures.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-items-center">
            {gallery.images.map((url, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer h-64 w-64" 
                onClick={() => setSelectedImage(url)}
              >
                <ImageFallback
                  src={url}
                  alt={`Graduation moment ${index + 1}`}
                  className="w-full h-full object-top object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <div className="text-white text-sm px-4 py-2 bg-black/50 rounded-full">
                    Click to view
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ImageFallback
              src={selectedImage}
              alt="Graduation moment"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}