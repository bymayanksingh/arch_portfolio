import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ScrollNudge() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="bg-black/10 backdrop-blur-sm border border-black/5 px-5 py-2 rounded-full shadow-sm">
          <span className="text-sm font-light text-black/70">
            Scroll to discover
          </span>
        </div>
        <div className="animate-float">
          <div className="bg-black/5 backdrop-blur-sm p-2 rounded-full">
            <ChevronDown className="w-5 h-5 text-black/50" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
