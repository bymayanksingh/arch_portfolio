import React, { Fragment, useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, MoveIcon, Maximize2 } from 'lucide-react';
import { ImageFallback } from './ImageFallback';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images?: { url: string; caption?: string }[];
  image?: string;
  title?: string;
  caption?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalItems?: number;
  renderImage?: (image: { url: string; caption?: string }) => React.ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  image,
  title,
  caption,
  onPrevious,
  onNext,
  showNavigation = false,
  currentIndex = 0,
  totalItems = 0,
  renderImage,
}: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

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
        case '+':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
          handleRotate();
          break;
        case '0':
          resetTransforms();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrevious, onNext, onClose]);

  useEffect(() => {
    // Reset position when image changes
    resetTransforms();
  }, [currentIndex]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 4));
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
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      
      // Calculate boundaries based on zoom level
      const maxOffset = (scale - 1) * 200; // Adjust this value based on your needs
      
      setPosition({
        x: Math.max(Math.min(newX, maxOffset), -maxOffset),
        y: Math.max(Math.min(newY, maxOffset), -maxOffset)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      setScale(prev => Math.max(0.5, Math.min(4, prev + delta)));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      <div className="relative w-full h-full md:h-auto md:max-w-7xl px-2 sm:px-4 md:px-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 md:right-6 top-2 sm:top-4 md:top-6 z-10 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Image controls */}
        <div className="absolute left-2 sm:left-4 md:left-6 top-2 sm:top-4 md:top-6 z-10 flex flex-wrap gap-2">
          <button
            onClick={handleZoomIn}
            className="p-1.5 sm:p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 sm:p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleRotate}
            className="p-1.5 sm:p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            title="Rotate (R)"
          >
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={resetTransforms}
            className="p-1.5 sm:p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            title="Reset (0)"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          {scale > 1 && (
            <div className="p-1.5 sm:p-2 text-white/70 bg-black/20 rounded-full">
              <MoveIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          )}
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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetTransforms();
                onNext?.();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </>
        )}

        {/* Main content container with flex column */}
        <div className="flex flex-col h-screen md:h-[calc(100vh-4rem)] gap-2 sm:gap-4">
          {/* Image container */}
          <div 
            ref={imageRef}
            className="relative flex-1 min-h-0 w-full cursor-move"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {renderImage ? (
              renderImage(images ? images[currentIndex] : { url: image || '', caption: caption })
            ) : (
              <ImageFallback
                src={images ? images[currentIndex].url : (image || '')}
                alt={images ? images[currentIndex].caption || 'Modal image' : (title || 'Modal image')}
                className="w-full h-full object-contain transition-all duration-300"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                draggable={false}
              />
            )}
          </div>

          {/* Image info - Now rendered below the image */}
          {(title || caption || (showNavigation && totalItems > 1)) && (
            <div className="w-full px-2 sm:px-0 pb-2 sm:pb-0" onClick={(e) => e.stopPropagation()}>
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-white">
                <div className="max-w-3xl mx-auto">
                  {title && (
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {title}
                    </h3>
                  )}
                  {caption && (
                    <p className="text-white/80 text-xs sm:text-sm">{caption}</p>
                  )}
                  {images && images[currentIndex]?.caption && (
                    <p className="text-white/80 text-xs sm:text-sm">{images[currentIndex].caption}</p>
                  )}
                  {showNavigation && totalItems > 1 && (
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/60">
                      {currentIndex + 1} of {totalItems}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}