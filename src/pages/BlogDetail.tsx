import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { featureFlags } from '../config/featureFlags';
import { blogPosts } from '../data/blogPosts';
import { ImageFallback } from '../components/ImageFallback';
import { ScrollNudge } from '../components/ScrollNudge';
import { Clap } from '../components/Clap';
import ReactMarkdown from 'react-markdown';

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  
  // If blog feature is not enabled, redirect to home
  if (!featureFlags.SHOW_BLOG) {
    return <Navigate to="/" replace />;
  }

  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white shadow-md"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>
            <Clap 
              projectId={post.id} 
              initialClaps={0}
            />
          </div>

          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-[60vh]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <ImageFallback
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      {post.author.avatar && (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-lg"
                        />
                      )}
                      <span className="ml-2 font-medium">{post.author.name}</span>
                    </div>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-8">
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

              <div className="prose max-w-none 
                prose-h1:font-playfair prose-h1:text-4xl prose-h1:font-medium prose-h1:mb-6 prose-h1:leading-tight prose-h1:text-gray-900
                prose-h2:font-playfair prose-h2:text-2xl prose-h2:font-medium prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-gray-800
                prose-h3:font-sans prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-gray-700
                prose-p:font-sans prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-600
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-medium
                prose-ul:my-4 prose-ul:list-none 
                prose-ol:my-4 prose-ol:list-none
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                prose-hr:my-8 prose-hr:border-gray-200
                [&>*:first-child]:!mt-0
                [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-gray-600 [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:mb-6"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="font-playfair" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="font-playfair" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="font-sans" {...props} />
                    ),
                    p: ({ node, children, ...props }) => {
                      const hasOnlyImage = React.Children.toArray(children).every(
                        child => React.isValidElement(child) && child.type === 'img'
                      );
                      
                      if (hasOnlyImage) {
                        return <div className="my-8" {...props}>{children}</div>;
                      }
                      
                      return <p className="text-gray-600 text-lg leading-relaxed" {...props}>{children}</p>;
                    },
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="space-y-4 list-none ml-0 counter-reset-ordered" {...props} />
                    ),
                    li: ({ node, ordered, ...props }) => {
                      if (ordered) {
                        return (
                          <li className="pl-12 relative before:absolute before:left-0 before:top-0 before:flex before:items-center before:justify-center before:w-8 before:h-8 before:bg-blue-50 before:text-blue-600 before:rounded-lg before:text-sm before:font-medium before:counter-increment-ordered before:content-[counter(ordered)] hover:before:bg-blue-100 transition-colors" {...props} />
                        );
                      }
                      return (
                        <li className="pl-8 relative flex items-start group">
                          <span className="absolute left-0 top-2.5 flex items-center justify-center w-3 h-3">
                            <span className="absolute w-full h-full bg-blue-100 rounded-md transform rotate-45 group-hover:bg-blue-200 transition-colors"></span>
                            <span className="absolute w-1.5 h-1.5 bg-blue-500 rounded-sm"></span>
                          </span>
                          <span className="block">{props.children}</span>
                        </li>
                      );
                    },
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="relative pl-8 py-4 my-8 border-l-4 border-blue-500/30 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl">
                        <div className="absolute left-4 top-0 transform -translate-y-3">
                          <svg className="w-8 h-8 text-blue-300/50" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                        </div>
                        <div className="relative text-gray-700 italic text-lg" {...props} />
                      </blockquote>
                    ),
                    img: ({ node, src, alt, ...props }) => (
                      <figure className="my-8 group">
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img 
                            src={src} 
                            alt={alt} 
                            className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500" 
                            {...props} 
                          />
                        </div>
                        {alt && (
                          <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200" {...props} />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-t border-gray-100" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="relative group my-8">
                          <div className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                            {match[1]}
                          </div>
                          <pre className="overflow-x-auto">
                            <code
                              className={`${className} block bg-gray-900 text-gray-100 rounded-xl p-6 text-sm font-mono leading-relaxed`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-md font-mono" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
      <ScrollNudge />
    </main>
  );
}
