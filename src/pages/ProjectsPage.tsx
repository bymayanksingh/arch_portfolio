import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Loader2 } from 'lucide-react';
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
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Projects' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
        
        // Generate unique categories from projects
        const uniqueCategories = new Set(data.map(project => project.category));
        const formattedCategories: Category[] = [
          { id: 'all', name: 'All Projects' },
          ...Array.from(uniqueCategories).map(category => ({
            id: category.toLowerCase().replace(/\s+/g, '-'),
            name: category
          }))
        ];
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      project.category.toLowerCase() === activeCategory.replace(/-/g, ' ');

    return matchesSearch && matchesCategory;
  });

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
              onClick={() => setActiveCategory(category.id)}
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
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <ImageFallback 
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-black/40 px-3 py-1 rounded-full text-white text-sm inline-block mb-2 self-start">
                      {project.category}
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center text-white/80 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{project.date}</span>
                      </div>
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