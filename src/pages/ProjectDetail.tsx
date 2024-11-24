import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';

export function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-black mb-8">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
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
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-[70vh] object-cover rounded-lg"
          />
        </div>

        {/* Project Description */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>
            <div className="space-y-4">
              {project.details.map((detail, index) => (
                <p key={index} className="text-gray-600">{detail}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Project Details</h2>
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

            {/* External Links */}
            {project.externalLinks && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Featured On</h3>
                <div className="space-y-3">
                  {project.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-black"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}