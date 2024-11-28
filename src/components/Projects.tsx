import { useState, useEffect } from 'react';
import { getProjects } from '../services/firebaseService';
import type { Project } from '../services/firebaseService';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const allProjects = await getProjects();
        // Filter only featured projects
        const featuredProjects = allProjects.filter(project => project.featured);
        setProjects(featuredProjects);
        
        // Extract unique categories from featured projects only
        const uniqueCategories = Array.from(
          new Set(featuredProjects.map(project => project.category))
        );
        setCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center">{error}</div>;
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-playfair mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my portfolio of innovative architectural designs and successful projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div className={`w-full col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 
            ${filteredProjects.length === 1 ? 'md:grid-cols-1 lg:grid-cols-1 max-w-lg' : 
              filteredProjects.length === 2 ? 'md:grid-cols-2 lg:grid-cols-2 max-w-3xl' : 'max-w-7xl'}`}>
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block w-full"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 mb-3">{project.location}, {project.year}</p>
                    <p className="text-white/90 mb-4">{project.description}</p>
                    <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">View Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}