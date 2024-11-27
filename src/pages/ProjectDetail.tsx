import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import { getProject, Project } from '../services/firebaseService';
import { ImageModal } from '../components/ImageModal';

export function ProjectDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      if (!id) {
        console.log('No ID provided, redirecting to projects page');
        navigate('/projects');
        return;
      }

      console.log('Attempting to fetch project with ID:', id);
      setLoading(true);
      setError(null);
      
      try {
        // Use the exact ID from your Firebase document
        const projectId = id.toLowerCase(); // Convert to lowercase to match Firebase ID format
        console.log('Fetching project with normalized ID:', projectId);
        
        const projectData = await getProject(projectId);
        console.log('Received project data:', projectData);
        
        if (!projectData) {
          console.log('No project found for ID:', projectId);
          setError('Project not found');
          return;
        }
        
        setProject(projectData);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Project not found'}</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/1200x800?text=Project+Image';
              }}
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
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x600?text=Gallery+Image';
                  }}
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
  );
}