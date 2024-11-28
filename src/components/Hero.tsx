import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getHero } from '../services/firebaseService';
import type { Hero as HeroType } from '../services/firebaseService';
import { getStats } from '../services/dataService';
import { ArrowRight, ScrollText, Award, Building2, Users } from 'lucide-react';

const iconMap = {
  Building2,
  Award,
  Users
};

export function Hero() {
  const [heroData, setHeroData] = useState<HeroType | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const data = await getHero();
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load hero data');
      } finally {
        setLoading(false);
      }
    }

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

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  }, [scrollY]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </section>
    );
  }

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden parallax-container">
      {/* Background Image with Overlay */}
      <div ref={backgroundRef} className="absolute inset-0 transition-transform will-change-transform parallax-bg">
        <div className="relative w-full h-full scale-110">
          <img 
            src={heroData?.backgroundImage || "https://images.unsplash.com/photo-1637088059531-4ffcc89d0dd3"}
            alt="Abstract Architecture"
            loading="eager"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        </div>
        
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-animate" 
               style={{
                 backgroundImage: 'linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(0deg, #ffffff 1px, transparent 1px)',
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative h-screen transition-transform will-change-transform parallax-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="max-w-3xl space-y-8">
            {/* Intro Text */}
            <div className="space-y-6">
              <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
                Hello, I'm{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold">{heroData?.name || 'Name'}</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>
              </h1>
              <p className="font-cormorant text-2xl sm:text-2xl md:text-3xl text-white/90 font-light max-w-2xl leading-relaxed tracking-wide">
                {heroData?.subtitle || 'Licensed architect in Manchester, specializing in sustainable design and innovative architectural solutions.'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact"
                aria-label="Contact me for architectural projects"
                className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <button
                onClick={scrollToProjects}
                aria-label="Scroll to view architecture projects"
                className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
                <ScrollText className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
              </button>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-8 sm:gap-12 max-w-lg">
              {stats?.items ? (
                stats.items.map((stat, index) => {
                  const Icon = iconMap[stat.icon as keyof typeof iconMap] || Building2;
                  return (
                    <div key={index} className="text-center group">
                      <Icon className="w-6 h-6 mx-auto mb-3 text-white/60 group-hover:text-white transition-colors duration-300" />
                      <div className="font-cormorant text-3xl sm:text-4xl font-semibold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm tracking-wider uppercase group-hover:text-white/80 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  );
                })
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center animate">
        <div className="w-1 h-10 rounded-full bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 transform -translate-y-1/2 animate-scroll"></div>
        </div>
        <span className="text-white/60 text-sm mt-4 tracking-wider uppercase">Scroll Down</span>
      </div>
    </section>
  );
}
