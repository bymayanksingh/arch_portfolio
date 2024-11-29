import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Building2, Award, BookOpen, Users, Ruler, Compass } from 'lucide-react';

interface ResumeSection {
  id: string;
  title: string;
  icon: keyof typeof iconMap;
  items: Array<{
    title: string;
    subtitle: string;
    date: string;
    description: string[];
    skills?: string[];
    location?: string;
  }>;
}

const iconMap = {
  Building2,
  Award,
  BookOpen,
  Users,
  Ruler,
  Compass
};

export function Resume() {
  const [activeSection, setActiveSection] = useState<string>('experience');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the blueprint animation
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const resumeData: ResumeSection[] = [
    {
      id: 'experience',
      title: 'Professional Experience',
      icon: 'Building2',
      items: [
        {
          title: 'Senior Architect',
          subtitle: 'Architecture Firm Name',
          date: '2020 - Present',
          location: 'San Francisco, CA',
          description: [
            'Led design teams for multiple award-winning sustainable building projects',
            'Managed client relationships and project budgets exceeding $50M',
            'Implemented innovative sustainable design solutions'
          ],
          skills: ['Sustainable Design', 'Project Management', 'Client Relations']
        },
        // Add more experience items
      ]
    },
    {
      id: 'education',
      title: 'Education',
      icon: 'BookOpen',
      items: [
        {
          title: 'Master of Architecture',
          subtitle: 'University Name',
          date: '2015 - 2017',
          location: 'City, State',
          description: [
            'Focus on Sustainable Urban Design',
            'Thesis: "Future of Sustainable Urban Housing"'
          ]
        }
        // Add more education items
      ]
    },
    // Add more sections as needed
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <Compass className="w-12 h-12 animate-spin text-gray-800" />
          <div className="absolute inset-0 border-t-2 border-gray-800 rounded-full animate-ping" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Architectural Journey
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            A visual exploration of my professional path in architecture
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </button>
        </div>

        {/* Interactive Timeline */}
        <div className="grid lg:grid-cols-[250px,1fr] gap-8">
          {/* Navigation */}
          <nav className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            {resumeData.map((section) => {
              const Icon = iconMap[section.icon];
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all
                    ${activeSection === section.id 
                      ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="relative">
            {/* Decorative Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />

            {resumeData.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeSection === section.id ? 1 : 0,
                  y: activeSection === section.id ? 0 : 20,
                  display: activeSection === section.id ? 'block' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="space-y-8 pl-8"
              >
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-10 top-0 w-3 h-3 rounded-full bg-gray-900 
                                  ring-4 ring-white group-hover:ring-gray-100 transition-all" />
                    
                    {/* Content Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-shadow
                                  border border-gray-100 group-hover:border-gray-200">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">
                            {item.subtitle}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-900 font-medium">
                            {item.date}
                          </div>
                          {item.location && (
                            <div className="text-gray-500 text-sm">
                              {item.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, i) => (
                          <li key={i} className="text-gray-600 flex items-start">
                            <span className="mr-2 mt-1.5">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {item.skills && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
