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
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg">
            Explore my portfolio of innovative architectural designs and successful projects
          </p>
        </div>

        {/* Category Filter Container */}
        <div className="relative mb-10 sm:mb-12">
          {/* Gradient Fade Effect */}
          <div className="absolute left-0 top-1 bottom-1 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none sm:hidden"></div>
          <div className="absolute right-0 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none sm:hidden"></div>

          {/* Scrollable Categories */}
          <div className="relative flex items-center -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
            <div className="flex gap-3 py-1 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    category-btn
                    relative px-5 h-10 rounded-full text-sm font-medium
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center
                    min-w-[80px] select-none
                    ${selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }
                    ${selectedCategory === category 
                      ? 'shadow-md transform scale-105' 
                      : 'hover:shadow-sm'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                    active:scale-95
                  `}
                >
                  <span className="block whitespace-nowrap">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="group block"
            >
              <article className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl">
                {/* Image Container */}
                <div className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-project.jpg';
                    }}
                  />
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="relative p-5 sm:p-6">
                  {/* Title and Location */}
                  <div className="space-y-2">
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-black">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.location} • {project.year}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* View Project Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">View Project</span>
                    <div className="rounded-full p-2 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Show Empty State if no projects */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found in this category.</p>
          </div>
        )}
        
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