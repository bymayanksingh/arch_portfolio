import { Award } from '../services/firebaseService';
import { Trophy } from 'lucide-react';

interface AwardsProps {
  awards: Award[];
}

export function Awards({ awards }: AwardsProps) {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold font-playfair mb-4 text-center">Awards & Recognition</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
        Celebrating excellence and innovation in architecture
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((award) => (
          <div key={award.id} className="group">
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
                    src={award.image} 
                    alt={award.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Trophy className="w-6 h-6 text-black/70 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-semibold leading-tight group-hover:text-black/80 transition-colors duration-300">
                      {award.title}
                    </h3>
                  </div>
                  <p className="text-black/60 text-sm">
                    {award.organization}
                  </p>
                  <p className="text-black/60 text-sm">
                    {award.year}
                  </p>
                  <p className="text-black/70 text-sm line-clamp-4">
                    {award.description}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-black/60 bg-black/5 rounded-full capitalize">
                      {award.category.charAt(0).toUpperCase() + award.category.slice(1)}
                    </span>
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
