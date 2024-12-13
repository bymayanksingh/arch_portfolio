import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, X } from 'lucide-react';
import { getProjects } from '../services/firebaseService';
import type { Project } from '../services/firebaseService';
import { ImageFallback } from '../components/ImageFallback';
import { ScrollNudge } from '../components/ScrollNudge';

interface Category {
  id: string;
  name: string;
}

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLocation, setActiveLocation] = useState('all');
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 0, max: 9999 });
  const [locations, setLocations] = useState<string[]>(['all']);
  const [availableYears, setAvailableYears] = useState<{ min: number; max: number }>({ min: 9999, max: 0 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Projects' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects only once and store in state
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
        
        // Extract unique categories
        const uniqueCategories = new Set(
          data
            .filter(project => project.category) 
            .map(project => (project.category || '').toLowerCase().trim())
        );
        
        // Extract unique locations
        const uniqueLocations = new Set(
          data
            .filter(project => project.location)
            .map(project => (project.location || '').toLowerCase().trim())
        );

        // Find min and max years
        const years = data
          .filter(project => project.year)
          .map(project => parseInt(project.year));
        
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        
        const formattedCategories: Category[] = [
          { id: 'all', name: 'All Projects' },
          ...Array.from(uniqueCategories).map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
          }))
        ];

        const formattedLocations = ['all', ...Array.from(uniqueLocations)];
        
        setCategories(formattedCategories);
        setLocations(formattedLocations);
        setAvailableYears({ min: minYear, max: maxYear });
        setYearRange({ min: minYear, max: maxYear });
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Handle filtering whenever any filter changes
  useEffect(() => {
    const filtered = projects.filter(project => {
      const projectCategory = (project.category || '').toLowerCase().trim();
      const projectTitle = (project.title || '').toLowerCase().trim();
      const projectLocation = (project.location || '').toLowerCase().trim();
      const projectYear = project.year ? parseInt(project.year) : 0;
      const searchTerm = searchQuery.toLowerCase().trim();
      
      const matchesSearch = searchQuery === '' || 
        projectTitle.includes(searchTerm) ||
        projectCategory.includes(searchTerm) ||
        projectLocation.includes(searchTerm);
      
      const matchesCategory = activeCategory === 'all' || projectCategory === activeCategory;
      const matchesLocation = activeLocation === 'all' || projectLocation === activeLocation;
      const matchesYearRange = projectYear >= yearRange.min && projectYear <= yearRange.max;

      return matchesSearch && matchesCategory && matchesLocation && matchesYearRange;
    });

    setFilteredProjects(filtered);
  }, [searchQuery, activeCategory, activeLocation, yearRange, projects]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleLocationChange = (location: string) => {
    setActiveLocation(location);
  };

  const handleYearRangeChange = (type: 'min' | 'max', value: number) => {
    setYearRange(prev => {
      const newValue = parseInt(value.toString());
      if (type === 'min') {
        // Ensure min doesn't exceed max
        return { ...prev, min: Math.min(newValue, prev.max) };
      } else {
        // Ensure max doesn't go below min
        return { ...prev, max: Math.max(newValue, prev.min) };
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <ScrollNudge />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Explore my portfolio of innovative and sustainable architectural solutions.
        </p>
        
        <div className="space-y-8 mb-12">
          {/* Filter Sections Container */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-semibold">Filters</h3>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveLocation('all');
                  setYearRange(availableYears);
                }}
                className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-8">
              {/* Categories Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                        activeCategory === category.id
                          ? 'bg-black text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationChange(location)}
                      className={`px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                        activeLocation === location
                          ? 'bg-black text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {location === 'all' ? 'All Locations' : location.charAt(0).toUpperCase() + location.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Range Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Year Range</h4>
                  <span className="text-sm bg-gray-50 px-3 py-1 rounded-full text-gray-600">
                    {yearRange.min} - {yearRange.max}
                  </span>
                </div>
                <div className="relative mt-4 h-2">
                  {/* Track Background */}
                  <div className="absolute inset-0 h-2 bg-gray-100 rounded-full"></div>
                  
                  {/* Selected Range */}
                  <div 
                    className="absolute h-2 bg-black rounded-full"
                    style={{
                      left: `${((yearRange.min - availableYears.min) / (availableYears.max - availableYears.min)) * 100}%`,
                      right: `${100 - ((yearRange.max - availableYears.min) / (availableYears.max - availableYears.min)) * 100}%`
                    }}
                  ></div>
                  
                  {/* Slider Container */}
                  <div className="relative h-2">
                    {/* Min Range Input */}
                    <input
                      type="range"
                      min={availableYears.min}
                      max={availableYears.max}
                      value={yearRange.min}
                      onChange={(e) => handleYearRangeChange('min', parseInt(e.target.value))}
                      className="pointer-events-none absolute appearance-none bg-transparent w-full h-2 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0"
                    />
                    
                    {/* Max Range Input */}
                    <input
                      type="range"
                      min={availableYears.min}
                      max={availableYears.max}
                      value={yearRange.max}
                      onChange={(e) => handleYearRangeChange('max', parseInt(e.target.value))}
                      className="pointer-events-none absolute appearance-none bg-transparent w-full h-2 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeCategory !== 'all' || activeLocation !== 'all' || 
          yearRange.min !== availableYears.min || yearRange.max !== availableYears.max) && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-sm">
                Category: {categories.find(c => c.id === activeCategory)?.name}
                <X 
                  className="w-4 h-4 ml-2 cursor-pointer hover:text-black/70" 
                  onClick={() => setActiveCategory('all')}
                />
              </span>
            )}
            {activeLocation !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-sm">
                Location: {activeLocation.charAt(0).toUpperCase() + activeLocation.slice(1)}
                <X 
                  className="w-4 h-4 ml-2 cursor-pointer hover:text-black/70" 
                  onClick={() => setActiveLocation('all')}
                />
              </span>
            )}
            {(yearRange.min !== availableYears.min || yearRange.max !== availableYears.max) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-sm">
                Year: {yearRange.min} - {yearRange.max}
                <X 
                  className="w-4 h-4 ml-2 cursor-pointer hover:text-black/70" 
                  onClick={() => setYearRange(availableYears)}
                />
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-8 text-sm text-gray-500">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl bg-white">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageFallback 
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-115 transition-all duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-85 transition-all duration-300" />
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category Tag - Always visible */}
                    <div className="inline-block mb-4">
                      <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide shadow-lg">
                        {project.category || 'Uncategorized'}
                      </span>
                    </div>

                    {/* Title and Location */}
                    <div className="space-y-3 transform group-hover:translate-y-[-4px] transition-all duration-500">
                      <h3 className="font-playfair text-2xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <div className="flex items-center space-x-4 text-white/80">
                        <span className="text-sm font-medium">{project.location || 'Unknown Location'}</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm font-medium">{project.date || 'No Date'}</span>
                      </div>
                    </div>

                    {/* View Project Button - Always visible */}
                    <div className="mt-5 flex items-center justify-between transform group-hover:translate-y-[-4px] transition-all duration-500">
                      <span className="inline-flex items-center text-white text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                        View Project Details
                        <svg 
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}