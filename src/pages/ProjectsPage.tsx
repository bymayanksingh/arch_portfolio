import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { getProjects } from '../services/firebaseService';
import type { Project } from '../services/firebaseService';
import { ImageFallback } from '../components/ImageFallback';

interface Category {
  id: string;
  name: string;
}

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Projects' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects only once and store in state
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
        
        // Extract unique categories from projects and handle undefined/null values
        const uniqueCategories = new Set(
          data
            .filter(project => project.category) // Filter out undefined/null categories
            .map(project => (project.category || '').toLowerCase().trim())
        );
        
        const formattedCategories: Category[] = [
          { id: 'all', name: 'All Projects' },
          ...Array.from(uniqueCategories).map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
          }))
        ];
        setCategories(formattedCategories);
        setFilteredProjects(data); // Initially show all projects
      } catch (error) {
        //console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Handle filtering whenever search query or category changes
  useEffect(() => {
    const filtered = projects.filter(project => {
      // Safely handle all text fields
      const projectCategory = (project.category || '').toLowerCase().trim();
      const projectTitle = (project.title || '').toLowerCase().trim();
      const projectLocation = (project.location || '').toLowerCase().trim();
      const searchTerm = searchQuery.toLowerCase().trim();
      
      const matchesSearch = searchQuery === '' || 
        projectTitle.includes(searchTerm) ||
        projectCategory.includes(searchTerm) ||
        projectLocation.includes(searchTerm);
      
      const matchesCategory = activeCategory === 'all' || projectCategory === activeCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProjects(filtered);
  }, [searchQuery, activeCategory, projects]);

  const handleCategoryChange = (categoryId: string) => {
    //console.log('Selected category:', categoryId);
    //console.log('Current projects:', projects.length);
    setActiveCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Explore my portfolio of innovative architectural designs and sustainable solutions
        </p>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search projects by name, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl bg-white">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageFallback 
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-115 transition-all duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-85 transition-all duration-300" />
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category Tag - Always visible */}
                    <div className="inline-block mb-4">
                      <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide shadow-lg">
                        {project.category || 'Uncategorized'}
                      </span>
                    </div>

                    {/* Title and Location */}
                    <div className="space-y-3 transform group-hover:translate-y-[-4px] transition-all duration-500">
                      <h3 className="font-playfair text-2xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <div className="flex items-center space-x-4 text-white/80">
                        <span className="text-sm font-medium">{project.location || 'Unknown Location'}</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm font-medium">{project.date || 'No Date'}</span>
                      </div>
                    </div>

                    {/* View Project Button - Always visible */}
                    <div className="mt-5 flex items-center justify-between transform group-hover:translate-y-[-4px] transition-all duration-500">
                      <span className="inline-flex items-center text-white text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                        View Project Details
                        <svg 
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}