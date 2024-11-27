import React, { useState, useEffect } from 'react';
import { getTimeline } from '../services/dataService';
import type { TimelineItem } from '../services/firebaseService';
import { Building, Award, Briefcase, Building2 } from 'lucide-react';

const iconMap = {
  Building,
  Award,
  Briefcase,
  Building2
};

export function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimelineData() {
      try {
        const data = await getTimeline();
        setTimelineData(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        setError('Unable to load timeline data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchTimelineData();
  }, []);

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 h-48 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="timeline" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-playfair mb-4">Professional Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A timeline of my architectural career and key milestones
          </p>
        </div>

        <div className="relative">
          {/* Vertical line - only visible on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 md:block hidden"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                } md:flex-row flex-row`}
              >
                {/* Content */}
                <div
                  className={`md:w-5/12 w-full pl-4 sm:pl-6 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  } text-left`}
                >
                  <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
                      <div className="absolute -right-6 -top-6 w-32 h-32 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute right-12 bottom-12 w-40 h-40 bg-black rounded-full transform translate-x-1/2 translate-y-1/2" />
                      <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    {/* Grid Pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500"
                      style={{
                        backgroundImage: `linear-gradient(to right, black 1px, transparent 1px),
                                        linear-gradient(to bottom, black 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Accent Lines */}
                    <div className={`absolute ${index % 2 === 0 ? '-left-6' : '-right-6'} top-1/2 w-12 h-[1px] bg-black opacity-[0.03] group-hover:w-24 group-hover:opacity-[0.06] transition-all duration-700`} />
                    <div className="absolute left-1/2 -bottom-6 h-12 w-[1px] bg-black opacity-[0.03] group-hover:h-24 group-hover:opacity-[0.06] transition-all duration-700 transform -translate-x-1/2" />

                    {/* Content */}
                    <div className="relative">
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                        <div 
                          className={`relative p-2 rounded-lg ${item.color.replace('text-', 'bg-').replace('600', '100')} group-hover:scale-110 transition-transform duration-500`}
                        >
                          {React.createElement(iconMap[item.icon] || Building, {
                            className: `w-5 h-5 ${item.color}`,
                            strokeWidth: 2
                          })}
                          <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
                        </div>
                        <span
                          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                            item.color.replace('text-', 'text-opacity-90 hover:text-opacity-100 ')
                          }`}
                          style={{ 
                            backgroundColor: item.color + '15',
                            textShadow: '0 1px 2px rgba(0,0,0,0.02)'
                          }}
                        >
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight group-hover:text-black transition-colors duration-300">{item.event}</h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                      {item.details && (
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed border-t border-gray-100 pt-3 group-hover:text-gray-600 transition-colors duration-300">{item.details}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Circle - only visible on desktop */}
                <div className="absolute md:left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden md:flex">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-gray-200 z-10"></div>
                  <div className="absolute w-6 h-6 rounded-full bg-gray-100 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}