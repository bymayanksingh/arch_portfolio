import { useState, useEffect } from 'react';
import { GraduationCap, Brain, Lightbulb, ArrowUpRight, Clock, Target, Rocket } from 'lucide-react';
import { getUpskilling } from '../services/firebaseService';
import type { Upskilling } from '../types/upskilling';

// Icon mapping
const iconMap = {
  'graduation-cap': GraduationCap,
  'clock': Clock,
  'target': Target,
  'rocket': Rocket,
  'brain': Brain,
  'lightbulb': Lightbulb,
};

export function SkillUpgrade() {
  const [upskilling, setUpskilling] = useState<Upskilling | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpskilling() {
      try {
        const data = await getUpskilling();
        setUpskilling(data);
      } catch (error) {
        console.error('Error fetching upskilling data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUpskilling();
  }, []);

  if (loading) {
    return (
      <div className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!upskilling) return null;

  // Get the icon component
  const StatusIcon = iconMap[upskilling.status.icon as keyof typeof iconMap];

  return (
    <div className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10 text-center lg:text-left">
              {/* Upskilling Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 text-primary 
                           font-semibold text-base mb-8 relative group cursor-default
                           border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.05)]">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-sm opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"></div>
                {StatusIcon && <StatusIcon className="w-5 h-5 relative group-hover:rotate-12 transition-transform duration-300" />}
                <span className="relative whitespace-nowrap">
                  {upskilling.status.text}
                  <span className="absolute -bottom-0.5 left-0 w-full h-[3px] bg-primary/20 rounded-full"></span>
                </span>
                <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary/20 animate-ping"></span>
                <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary/40"></span>
              </div>

              {/* Main Content */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-xl mx-auto lg:mx-0">
                  {upskilling.title}
                </h2>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {upskilling.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto lg:mx-0">
                  {upskilling.features.sort((a, b) => a.order - b.order).map((feature) => {
                    const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap];
                    return (
                      <div 
                        key={feature.id}
                        className="group p-4 sm:p-6 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                      >
                        {FeatureIcon && (
                          <FeatureIcon className="w-8 h-8 text-primary/80 mb-3 group-hover:scale-110 transition-transform mx-auto lg:mx-0" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <a 
                    href={upskilling.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 text-primary 
                             font-medium rounded-full group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {upskilling.cta.text}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-first lg:order-last">
              <img
                src={upskilling.image.url}
                alt={upskilling.image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
