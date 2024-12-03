import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, Award, Building2, Users } from 'lucide-react';
import { About, getAbout, Stats } from '../services/firebaseService';
import { getStats } from '../services/dataService';
import { ImageFallback } from './ImageFallback';

const iconMap = {
  Building2,
  Award,
  Users
};

export function HomeAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const aboutData = await getAbout();
        setAbout(aboutData);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div className="relative order-2 lg:order-1">
            <ImageFallback 
              src={about?.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"}
              alt={about?.name || "Profile"}
              className="rounded-2xl shadow-2xl w-full aspect-[4/3] sm:aspect-[16/12] lg:aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-md rounded-b-2xl p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {stats?.items ? (
                  stats.items.map((stat, index) => {
                    const Icon = iconMap[stat.icon as keyof typeof iconMap] || Building2;
                    return (
                      <div key={index} className="text-center">
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-white" />
                        <div className="font-playfair text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-200">{stat.label}</div>
                      </div>
                    );
                  })
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold">About Me</h2>
            <p className="text-xl text-gray-600">
              {about?.title || "Transforming spaces with innovative architectural solutions"}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {about?.description || "As a licensed architect with over a decade of experience, I specialize in creating sustainable, innovative spaces that harmoniously blend form and function. My approach combines traditional architectural principles with cutting-edge technology."}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-soft-black text-white rounded-lg hover:bg-soft-black-hover transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a 
                href={about?.resume || "/cv.pdf"}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}