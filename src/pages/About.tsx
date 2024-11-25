import React, { useState, useRef } from 'react';
import { Download, Mail, Phone, Linkedin, Award, Building2, Users, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageModal } from '../components/ImageModal';

const skills = [
  "Architecture",
  "Interior Design",
  "Building Design",
  "3D Rendering",
  "Supervision",
  "Project Management",
  "BIM",
  "AutoCAD"
];

const stats = [
  { icon: Building2, label: "Projects Completed", value: "50+" },
  { icon: Award, label: "Awards Won", value: "12" },
  { icon: Users, label: "Happy Clients", value: "100+" },
  { icon: Lightbulb, label: "Creative Solutions", value: "200+" }
];

const certificates = [
  {
    title: "LEED Accredited Professional",
    organization: "U.S. Green Building Council",
    year: "2023",
    description: "Certification in sustainable building practices and green architecture",
    image: "https://images.unsplash.com/photo-1617994452722-4145e196248b?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Architectural License",
    organization: "Royal Institute of British Architects",
    year: "2022",
    description: "Professional architectural practice license",
    image: "https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "BIM Management Certificate",
    organization: "Autodesk Certified Professional",
    year: "2021",
    description: "Advanced certification in Building Information Modeling",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Sustainable Design Excellence",
    organization: "International Green Building Institute",
    year: "2020",
    description: "Recognition for excellence in sustainable architectural design",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Urban Planning Certification",
    organization: "American Planning Association",
    year: "2019",
    description: "Specialized certification in urban planning and development",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Historic Preservation Certificate",
    organization: "National Trust for Historic Preservation",
    year: "2018",
    description: "Advanced training in historical building preservation",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600"
  }
];

export function About() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);

  const scrollCertificates = (direction: 'left' | 'right') => {
    if (certificatesRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      certificatesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforming spaces with innovative architectural solutions
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With over a decade of experience in architecture and design, I specialize in creating 
              sustainable, innovative spaces that harmoniously blend form and function. My approach 
              combines traditional architectural principles with cutting-edge technology and 
              environmental consciousness.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/cv.pdf" 
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </a>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
              alt="Profile" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Certificates Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Certifications</h2>
          <div className="relative">
            {certificates.length > 4 && (
              <>
                <button
                  onClick={() => scrollCertificates('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollCertificates('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div 
              ref={certificatesRef}
              className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedCertificate(cert)}
                  className="flex-none w-[300px] group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer snap-start"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </div>
                  <div className="relative p-6 h-full flex flex-col justify-end min-h-[320px]">
                    <div className="flex items-start mb-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                        <p className="text-white/80 text-sm">{cert.organization}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{cert.year}</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm backdrop-blur-sm">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-6">
                My diverse skill set allows me to handle projects from concept to completion, 
                ensuring excellence at every stage of the architectural process.
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Professional Affiliations</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Royal Institute of British Architects (RIBA)</li>
                <li>• American Institute of Architects (AIA)</li>
                <li>• Green Building Council</li>
                <li>• International Association of Architects</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Let's create something amazing together.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:contact@architect.com" className="flex items-center text-gray-600 hover:text-black">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
            <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-black">
              <Phone className="w-5 h-5 mr-2" />
              Call
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-black">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        image={selectedCertificate?.image || ''}
        title={selectedCertificate?.title || ''}
      />
    </div>
  );
}