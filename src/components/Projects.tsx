import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: "urban-harmony-center",
    title: "Urban Harmony Center",
    category: "Site Layout",
    location: "Singapore",
    date: "March 2024",
    year: 2024,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
    description: "A groundbreaking mixed-use development that seamlessly integrates cultural spaces with sustainable living environments.",
    client: "Singapore Development Corporation",
    area: "45,000 sq.m",
    status: "Completed",
    details: [
      "The Urban Harmony Center represents a new paradigm in mixed-use development, where cultural spaces and residential units coexist in perfect balance.",
      "The project features innovative sustainable technologies, including solar panels, rainwater harvesting, and natural ventilation systems.",
      "The cultural spaces include an art gallery, performance venues, and workshop areas, creating a vibrant community hub."
    ],
    gallery: [
       {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
        caption: "Cultural center interior"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
        caption: "Cultural center interior"
      },
       {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
        caption: "Cultural center interior"
      },
       {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
        caption: "Cultural center interior"
      }
    ]
  },
  {
    id: "urban-harmony-dissertation",
    title: "Urban Harmony Dissertation",
    category: "Dissertation",
    location: "Singapore",
    date: "March 2024",
    year: 2024,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
    description: "A groundbreaking mixed-use development that seamlessly integrates cultural spaces with sustainable living environments.",
    client: "Singapore Development Corporation",
    area: "45,000 sq.m",
    status: "Completed",
    details: [
      "The Urban Harmony Center represents a new paradigm in mixed-use development, where cultural spaces and residential units coexist in perfect balance.",
      "The project features innovative sustainable technologies, including solar panels, rainwater harvesting, and natural ventilation systems.",
      "The cultural spaces include an art gallery, performance venues, and workshop areas, creating a vibrant community hub."
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=2000",
        caption: "Main entrance and plaza"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
        caption: "Cultural center interior"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687166-48ad73805ab5?auto=format&fit=crop&q=80&w=2000",
        caption: "Residential tower"
      }
    ]
  },
  {
    id: "modern-loft-conversion",
    title: "Modern Loft Conversion",
    category: "Interior Design",
    location: "New York",
    date: "February 2024",
    year: 2024,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
    description: "A sophisticated loft conversion that transforms an industrial space into a luxury living area.",
    client: "Private Client",
    area: "280 sq.m",
    status: "Completed",
    details: [
      "Complete transformation of an industrial loft space into a modern living area",
      "Custom-designed furniture and lighting solutions",
      "Integration of smart home technology throughout the space"
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2000",
        caption: "Living area"
      }
    ]
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover my most innovative and impactful architectural designs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              to={`/projects/${project.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={project.image}
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