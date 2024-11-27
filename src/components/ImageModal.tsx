import React, { Fragment, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title?: string;
  caption?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalItems?: number;
}

export function ImageModal({
  isOpen,
  onClose,
  image,
  title,
  caption,
  onPrevious,
  onNext,
  showNavigation = false,
  currentIndex = 0,
  totalItems = 0,
}: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          onPrevious?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrevious, onNext, onClose]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetTransforms = () => {
    setScale(1);
    setRotation(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image controls */}
        <div className="absolute left-6 top-6 z-10 flex space-x-2">
          <button
            onClick={handleZoomIn}
            className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <ZoomOut className="w-6 h-6" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <RotateCw className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation buttons */}
        {showNavigation && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetTransforms();
                onPrevious?.();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetTransforms();
                onNext?.();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Image container */}
        <div 
          className="relative w-full"
          style={{ height: 'calc(100vh - 12rem)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image}
            alt={title || 'Modal image'}
            className="w-full h-full object-contain transition-all duration-300"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          />
        </div>

        {/* Image info */}
        {(title || caption || (showNavigation && totalItems > 1)) && (
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div 
              className="bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <h3 className="text-lg font-semibold mb-1">
                  {title}
                </h3>
              )}
              {caption && (
                <p className="text-white/80 text-sm">{caption}</p>
              )}
              {showNavigation && totalItems > 1 && (
                <div className="mt-2 text-sm text-white/60">
                  {currentIndex + 1} of {totalItems}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}