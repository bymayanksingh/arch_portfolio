import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAbout, getSkills } from '../services/firebaseService';
import type { About as AboutType } from '../services/firebaseService';
import { Download, Mail, Phone, Linkedin } from 'lucide-react';

export function About() {
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [aboutResult, skillsResult] = await Promise.all([
          getAbout(),
          getSkills()
        ]);
        setAboutData(aboutResult);
        setSkills(skillsResult);
      } catch (error) {
        setError('Error fetching about data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center">{error}</div>;
  }

  if (!aboutData) {
    return <div className="py-20 text-center">Error loading about information</div>;
  }

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <img 
              src={aboutData.image}
              alt={aboutData.name}
              className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
            />
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-4xl font-bold mb-4">{aboutData.name}</h2>
              <p className="text-xl text-gray-600 mb-6">{aboutData.title}</p>
              <p className="text-gray-600">{aboutData.description}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <a href={`mailto:${aboutData.email}`} className="text-gray-600 hover:text-gray-900">
                  {aboutData.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <a href={`tel:${aboutData.phone}`} className="text-gray-600 hover:text-gray-900">
                  {aboutData.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 text-gray-600" />
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* Resume Download */}
            <div>
              <a
                href={aboutData.resume}
                download
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}