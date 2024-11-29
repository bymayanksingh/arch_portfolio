import { Publication } from '../services/firebaseService';
import { ExternalLink } from 'lucide-react';

interface PublicationsProps {
  publications: Publication[];
}

export function Publications({ publications }: PublicationsProps) {
  return (
    <div className="mb-20">
      <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Publications</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
        Research and writings contributing to architectural discourse
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map((publication) => (
          <div key={publication.id} className="group">
            <div className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute right-12 bottom-12 w-40 h-40 bg-black rounded-full transform translate-x-1/2 translate-y-1/2" />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="mb-6 aspect-video overflow-hidden rounded-lg">
                  <img 
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
                  {publication.doi && (
                    <p className="text-black/60 text-sm">
                      DOI: {publication.doi}
                    </p>
                  )}
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
    </div>
  );
}
