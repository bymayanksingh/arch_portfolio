import { Publication } from '../services/firebaseService';
import { ExternalLink } from 'lucide-react';
import { ImageFallback } from './ImageFallback';
import { useState } from 'react';
import { ImageModal } from './ImageModal';

interface PublicationsProps {
  publications: Publication[];
}

export function Publications({ publications }: PublicationsProps) {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [currentPublicationIndex, setCurrentPublicationIndex] = useState(0);

  const handlePrevPublication = () => {
    if (publications.length === 0) return;
    const newIndex = currentPublicationIndex === 0 ? publications.length - 1 : currentPublicationIndex - 1;
    setCurrentPublicationIndex(newIndex);
    const newPub = publications[newIndex];
    if (newPub) {
      setSelectedPublication(newPub);
    }
  };

  const handleNextPublication = () => {
    if (publications.length === 0) return;
    const newIndex = currentPublicationIndex === publications.length - 1 ? 0 : currentPublicationIndex + 1;
    setCurrentPublicationIndex(newIndex);
    const newPub = publications[newIndex];
    if (newPub) {
      setSelectedPublication(newPub);
    }
  };

  return (
    <div className="mb-20">
      <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Publications</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
        Research and writings contributing to architectural discourse
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map((publication, index) => (
          <div key={publication.id} className="group">
            <div className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute right-12 bottom-12 w-40 h-40 bg-black rounded-full transform translate-x-1/2 translate-y-1/2" />
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative">
                <div 
                  className="mb-6 aspect-video overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedPublication(publication);
                    setCurrentPublicationIndex(index);
                  }}
                >
                  <ImageFallback 
                    src={publication.coverImage} 
                    alt={publication.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-black/80 transition-colors duration-300">
                    {publication.title}
                  </h3>
                  <p className="text-black/60 text-sm">
                    {publication.authors.join(', ')}
                  </p>
                  <p className="text-black/60 text-sm">
                    {publication.journal} • {publication.year}
                  </p>
                  <p className="text-black/70 text-sm line-clamp-4 mt-2">
                    {publication.abstract}
                  </p>
                  <div className="pt-4">
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-black/70 hover:text-black transition-colors duration-300"
                    >
                      <span className="mr-2">Read Publication</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publication Modal */}
      {selectedPublication && (
        <ImageModal
          isOpen={!!selectedPublication}
          onClose={() => setSelectedPublication(null)}
          image={selectedPublication.coverImage}
          onPrev={handlePrevPublication}
          onNext={handleNextPublication}
          title={selectedPublication.title}
          showNavigation={publications.length > 1}
          footer={
            <div className="flex justify-center items-center mt-4">
              <a
                href={selectedPublication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-black/90 text-white rounded-lg hover:bg-black transition-colors duration-300"
              >
                <span className="mr-2">Read Full Publication</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          }
        />
      )}
    </div>
  );
}
