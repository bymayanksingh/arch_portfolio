import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
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
  onPrevious, 
  onNext,
  showNavigation = false,
  currentIndex,
  totalItems
}: ImageModalProps) {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
    if (e.key === 'ArrowRight' && onNext) onNext();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {showNavigation && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious?.();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          {showNavigation && currentIndex !== undefined && totalItems && (
            <p className="text-gray-600 mt-2">
              Image {currentIndex + 1} of {totalItems}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}