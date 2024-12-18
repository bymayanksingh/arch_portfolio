import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Search, Clock, Tag, Loader2, Calendar } from 'lucide-react';
import { featureFlags } from '../config/featureFlags';
import { blogPosts } from '../data/blogPosts';
import { ImageFallback } from '../components/ImageFallback';
import { ScrollNudge } from '../components/ScrollNudge';
import { useDebounce } from '../hooks/useDebounce';
import type { BlogPost } from '../types/blog';

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [loading] = useState(false);

  // If blog feature is not enabled, redirect to home
  if (!featureFlags.SHOW_BLOG) {
    return <Navigate to="/" replace />;
  }

  const filteredPosts = blogPosts.filter(post => {
    const searchLower = debouncedSearchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="relative pb-5 sm:pb-0">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-5xl sm:text-6xl font-playfair font-bold leading-tight text-gray-900 mb-6">
                Architectural{' '}
                <span className="relative">
                  Insights
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/30 rounded-full transform -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Exploring the intersection of{' '}
                <span className="text-blue-600 font-medium">design</span>,{' '}
                <span className="text-green-600 font-medium">sustainability</span>, and{' '}
                <span className="text-amber-600 font-medium">innovation</span>{' '}
                in modern architecture
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearching(true);
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all duration-200 hover:shadow-md"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                {isSearching && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 rounded-t-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      <ImageFallback
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        {post.author.avatar && (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full ring-2 ring-white shadow-md"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {post.author.name}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 font-medium"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollNudge />
    </main>
  );
}
