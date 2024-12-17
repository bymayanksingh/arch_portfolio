import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface ClapProps {
  projectId: string;
  initialClaps?: number;
}

export function Clap({ projectId, initialClaps = 0 }: ClapProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [isClapping, setIsClapping] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);
  const [userClaps, setUserClaps] = useState(0);

  // Load initial data
  useEffect(() => {
    if (!projectId) return;

    // Load user's personal claps from localStorage
    const savedUserClaps = localStorage.getItem(`claps_${projectId}`);
    if (savedUserClaps) {
      setUserClaps(parseInt(savedUserClaps));
    }

    // Get initial claps from Firestore
    const fetchClaps = async () => {
      try {
        const clapsRef = doc(db, 'projectClaps', projectId);
        const clapsSnap = await getDoc(clapsRef);
        
        if (clapsSnap.exists()) {
          setClaps(clapsSnap.data().count || 0);
        } else {
          // Initialize with 0 claps
          await setDoc(clapsRef, { count: 0 });
          setClaps(0);
        }
      } catch (error) {
        console.error('Error fetching initial claps:', error);
      }
    };

    fetchClaps();
  }, [projectId]);

  const handleClap = async () => {
    if (isClapping || !projectId) return;
    setIsClapping(true);

    try {
      const newClaps = claps + 1;
      const clapsRef = doc(db, 'projectClaps', projectId);
      
      // Update Firestore
      await setDoc(clapsRef, { count: newClaps });

      // Update local state
      setClaps(newClaps);
      const newUserClaps = userClaps + 1;
      setUserClaps(newUserClaps);
      setParticles(prev => [...prev, Date.now()]);
      
      // Update localStorage
      localStorage.setItem(`claps_${projectId}`, newUserClaps.toString());
    } catch (error) {
      console.error('Failed to update claps:', error);
    } finally {
      setTimeout(() => {
        setIsClapping(false);
      }, 300);
    }
  };

  // Don't render if no projectId
  if (!projectId) return null;

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
