import React, { useState } from 'react';
import { ImageIcon, Building2 } from 'lucide-react';

interface ImageFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackClassName?: string;
}

export function ImageFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackClassName = '',
  ...props 
}: ImageFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error || !src) {
    return (
      <div 
        className={`relative overflow-hidden ${fallbackClassName || className}`}
        {...props}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Decorative circles */}
        <div className="absolute inset-0">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-black/5 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute right-12 bottom-12 w-40 h-40 bg-black/5 rounded-full transform translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/5 to-transparent">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-black/5">
              <Building2 className="w-6 h-6 text-black/40" />
            </div>
            <div className="max-w-[80%]">
              <p className="text-sm font-medium text-black/60 line-clamp-2">{alt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div 
          className={`relative overflow-hidden ${fallbackClassName || className}`}
          {...props}
        >
          {/* Loading state with subtle animation */}
          <div className="absolute inset-0 bg-black/5 animate-pulse">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
                opacity: 0.02
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-black/10 border-t-black/30 rounded-full animate-spin" />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
}
