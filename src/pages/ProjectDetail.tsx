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
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Projects Link */}
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 mb-8 bg-white/80 backdrop-blur-sm text-black rounded-lg hover:bg-white transition-colors shadow-md"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>

          <div onKeyDown={handleKeyDown} tabIndex={0}>
            <Clap 
              projectId={project?.id || ''} 
              initialClaps={project?.claps || 0}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <ImageFallback 
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
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              {/* Gallery Grid */}
              <div>
                <h2 className="font-playfair text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        alt={image.caption}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                          View Image
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects Section */}
              {relatedProjects.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-playfair text-2xl font-bold mb-8">Related Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProjects.map((relatedProject) => (
                      <div
                        key={relatedProject.id}
                        className="group cursor-pointer"
                        onClick={() => handleRelatedProjectClick(relatedProject.id!)}
                      >
                        <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                          {relatedProject.coverImage ? (
                            <ImageFallback
                              src={relatedProject.coverImage}
                              alt={relatedProject.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image available</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold px-4 text-center">
                              {relatedProject.title}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">{relatedProject.title}</h3>
                        <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                          {relatedProject.shortDescription || relatedProject.description}
                        </p>
                        <p className="text-gray-500 mt-2 text-sm">{relatedProject.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Modal */}
              <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                image={selectedImage?.url || ''}
                title={project.title}
                caption={selectedImage?.caption}
                onPrevious={handlePrevImage}
                onNext={handleNextImage}
                showNavigation={project.gallery.length > 1}
                currentIndex={currentImageIndex}
                totalItems={project.gallery.length}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}