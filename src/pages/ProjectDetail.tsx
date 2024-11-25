import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projectsData } from '../data/projects';
import { ImageModal } from '../components/ImageModal';

export function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

  return (
    <div className="pt-24 pb-20" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-black mb-8">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <div 
            className="relative cursor-pointer"
            onClick={() => setSelectedImage({ url: project.coverImage, caption: project.title })}
          >
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-[70vh] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                Click to view
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="font-playfair text-2xl font-bold mb-4">About the Project</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>
            <div className="space-y-4">
              {project.details.map((detail, index) => (
                <p key={index} className="text-gray-600">{detail}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-4">Project Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold">Client</dt>
                <dd className="text-gray-600">{project.client}</dd>
              </div>
              <div>
                <dt className="font-semibold">Area</dt>
                <dd className="text-gray-600">{project.area}</dd>
              </div>
              <div>
                <dt className="font-semibold">Status</dt>
                <dd className="text-gray-600">{project.status}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Image Gallery */}
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-square cursor-pointer group"
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index);
                }}
              >
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                    Click to view
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-7xl w-full bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video">
              <img
                src={project.gallery[currentImageIndex].url}
                alt={project.gallery[currentImageIndex].caption}
                className="w-full h-full object-cover"
              />
              
              {project.gallery.length > 3 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold">{project.gallery[currentImageIndex].caption}</h3>
              <p className="text-gray-600 mt-2">Image {currentImageIndex + 1} of {project.gallery.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}