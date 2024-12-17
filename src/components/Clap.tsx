import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProjectClaps } from '../services/firebaseService';

interface ClapProps {
  projectId: string;
  initialClaps?: number;
}

export function Clap({ projectId, initialClaps = 0 }: ClapProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [isClapping, setIsClapping] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  // Load claps from localStorage
  useEffect(() => {
    const userClaps = localStorage.getItem(`claps_${projectId}`);
    if (userClaps) {
      setClaps(parseInt(userClaps));
    }
  }, [projectId]);

  const handleClap = async () => {
    if (isClapping) return;
    
    setIsClapping(true);
    const newClaps = claps + 1;
    setClaps(newClaps);
    
    // Add particle effect
    setParticles(prev => [...prev, Date.now()]);
    
    // Update localStorage
    localStorage.setItem(`claps_${projectId}`, newClaps.toString());
    
    // Update Firebase
    try {
      await updateProjectClaps(projectId, newClaps);
    } catch (error) {
      console.error('Failed to update claps:', error);
    }
    
    setTimeout(() => {
      setIsClapping(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <AnimatePresence>
          {particles.map((id) => (
            <motion.div
              key={id}
              className="absolute text-white pointer-events-none"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -20, scale: 0.5 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                setParticles(prev => prev.filter(p => p !== id));
              }}
            >
              👏
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClap}
          className="p-3 bg-black/80 hover:bg-black text-white rounded-full shadow-lg backdrop-blur-sm 
            transition-all duration-300 transform hover:scale-110 group flex flex-col items-center"
          aria-label="Clap for this project"
        >
          <span className="text-xl group-hover:-translate-y-0.5 transition-transform duration-300">👏</span>
          <span className="text-sm font-light mt-0.5">{claps}</span>
        </motion.button>
      </div>
    </div>
  );
}
