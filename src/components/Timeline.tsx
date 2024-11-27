import React, { useState, useEffect } from 'react';
import { getTimeline } from '../services/firebaseService';
import type { TimelineItem } from '../services/firebaseService';
import { Building, Award, Briefcase, Building2 } from 'lucide-react';

const iconMap = {
  Building,
  Award,
  Briefcase,
  Building2
};

const timeline = [
  {
    year: 2023,
    event: "Lead Architect, Urban Harmony Center",
    description: "Leading innovative sustainable architecture projects",
    icon: Building2,
    color: "bg-emerald-100 text-emerald-600",
    details: "Spearheaded multiple award-winning sustainable design projects, managing a team of 15 architects"
  },
  {
    year: 2021,
    event: "International Architecture Award",
    description: "Recognized for excellence in sustainable design",
    icon: Award,
    color: "bg-blue-100 text-blue-600",
    details: "Received the prestigious International Architecture Award for innovative sustainable design solutions"
  },
  {
    year: 2019,
    event: "Founded Studio Arc",
    description: "Established independent architectural practice",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
    details: "Launched an independent practice focusing on sustainable and innovative architectural solutions"
  },
  {
    year: 2017,
    event: "Senior Architect, Foster & Partners",
    description: "Led major international projects",
    icon: Building2,
    color: "bg-rose-100 text-rose-600",
    details: "Managed and delivered high-profile international projects across Europe and Asia"
  },
  {
    year: 2013,
    event: "Started Professional Journey",
    description: "Graduated with honors in Architecture",
    icon: Building,
    color: "bg-amber-100 text-amber-600",
    details: "Graduated summa cum laude with a Master's in Architecture from the University of Manchester"
  }
];

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
        setError('Failed to load timeline data');
      } finally {
        setLoading(false);
      }
    }
    fetchTimelineData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center">{error}</div>;
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
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                      style={{ backgroundColor: item.color + '20', color: item.color }}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    {item.details && (
                      <p className="text-sm text-gray-500 mt-2">{item.details}</p>
                    )}
                  </div>
                </div>

                {/* Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200 border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}