import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin } from 'lucide-react';
import { projectsData } from '../data/projects';

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'dissertation', name: 'Dissertation' },
  { id: 'site-layout', name: 'Site Layout' },
  { id: 'interior-design', name: 'Interior Design' },
  { id: '3d-rendering', name: '3D Rendering' },
  { id: 'construction', name: 'Construction Docs' },
  { id: 'model-making', name: 'Model Making' }
];

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      project.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Explore our portfolio of innovative architectural designs and sustainable solutions
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
          {filteredProjects.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
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
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}