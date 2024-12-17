import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed right-8 p-3 bg-black/80 hover:bg-black text-white rounded-full shadow-lg backdrop-blur-sm 
            transition-all duration-300 transform hover:scale-110 z-50 group
            ${isProjectDetail ? 'bottom-28' : 'bottom-8'}`}
        >
          <ChevronUp className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}
