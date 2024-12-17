import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getProject, Project, getRelatedProjects } from '../services/firebaseService';
import { ImageModal } from '../components/ImageModal';
import { ImageFallback } from '../components/ImageFallback';
import { Clap } from '../components/Clap';

export function ProjectDetail() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch project data with normalized ID
  const fetchProjectData = async (projectId: string) => {
    setLoading(true);
    try {
      const normalizedId = projectId.toLowerCase();
      const projectData = await getProject(normalizedId);
      
      if (projectData) {
        setProject(projectData);
        // Fetch related projects using the normalized ID
        if (projectData.category) {
          const relatedProjects = await getRelatedProjects(normalizedId, projectData.category);
          setRelatedProjects(relatedProjects);
        }
      } else {
        setError('Project not found');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Error loading project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      // The ID from the URL will be normalized in getProject
      fetchProjectData(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleRelatedProjectClick = (projectId: string) => {
    // No need to normalize the ID here since it's already lowercase from the API
    navigate(`/projects/${projectId}`);
    window.scrollTo(0, 0);
  };

  const handlePrevImage = () => {
    const newIndex = currentImageIndex === 0 ? project.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(project.gallery[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex === project.gallery.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(project.gallery[newIndex]);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{error || 'Project not found'}</h1>
        <Link to="/projects" className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back to Projects Link */}
          <Link
            to="/projects"
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm text-black rounded-lg hover:bg-white transition-colors shadow-md"
          >
            <ArrowLeft className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            Back to Projects
          </Link>

          <div onKeyDown={handleKeyDown} tabIndex={0}>
            <div className="mb-6 sm:mb-8">
              <Clap 
                projectId={project?.id || ''} 
                initialClaps={project?.claps || 0}
              />
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="mb-8 sm:mb-12">
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-sm sm:text-base">
                  <span>{project.location}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{project.year}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="mb-8 sm:mb-12">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setSelectedImage({ url: project.coverImage, caption: project.title })}
                >
                  <ImageFallback 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-black/50 text-white text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                      Click to view
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About the Project</h2>
                    <p className="text-gray-600 text-sm sm:text-base">{project.description}</p>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {project.details.map((detail, index) => (
                      <p key={index} className="text-gray-600 text-sm sm:text-base">{detail}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50/50 p-4 sm:p-6 rounded-lg">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4">Project Details</h2>
                  <dl className="space-y-3 sm:space-y-4 text-sm sm:text-base">
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
                    <div>
                      <dt className="font-semibold">Source</dt>
                      <dd className="text-gray-600">
                        {project.source && (
                          <a 
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline transition-colors inline-flex items-center gap-1"
                          >
                            {(() => {
                              try {
                                const url = new URL(project.source);
                                const hostname = url.hostname.replace('www.', '');
                                return hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
                              } catch {
                                return project.source;
                              }
                            })()}
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative cursor-pointer group"
                        onClick={() => {
                          setSelectedImage(image);
                          setCurrentImageIndex(index);
                        }}
                      >
                        <ImageFallback
                          src={image.url}
                          alt={image.caption || `Gallery image ${index + 1}`}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <div className="bg-black/50 text-white text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                            View Image
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="mt-12 sm:mt-16">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Related Projects</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {relatedProjects.map((relatedProject) => (
                      <div
                        key={relatedProject.id}
                        onClick={() => handleRelatedProjectClick(relatedProject.id)}
                        className="group cursor-pointer"
                      >
                        <div className="relative mb-2 sm:mb-3">
                          <ImageFallback
                            src={relatedProject.coverImage}
                            alt={relatedProject.title}
                            className="w-full aspect-[4/3] object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base group-hover:text-black/70 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">{relatedProject.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <ImageModal
              isOpen={!!selectedImage}
              onClose={() => setSelectedImage(null)}
              images={project.gallery}
              image={selectedImage.url}
              caption={selectedImage.caption}
              onPrevious={handlePrevImage}
              onNext={handleNextImage}
              showNavigation={project.gallery && project.gallery.length > 1}
              currentIndex={currentImageIndex}
              totalItems={project.gallery ? project.gallery.length : 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}