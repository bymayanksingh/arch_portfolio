import { useState, useEffect } from 'react';
import { getProjects } from '../services/firebaseService';
import type { Project } from '../services/firebaseService';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageFallback } from './ImageFallback';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

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
        //console.error('Error fetching projects:', error);
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
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Explore my portfolio of innovative architectural designs and successful projects
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center mb-10 sm:mb-12"
        >
          <div className="flex gap-3 pb-2 sm:pb-0 sm:flex-wrap sm:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
            >
              <Link 
                to={`/projects/${project.id}`}
                className="group block"
              >
                <article className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                    <ImageFallback 
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            </motion.div>
          ))}
        </motion.div>

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