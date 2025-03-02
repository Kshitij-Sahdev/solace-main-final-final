import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import { Home, Gamepad2 } from 'lucide-react';

interface NotFoundPageProps {
  setCursorType: (type: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ setCursorType }) => {
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);
      
      // Check if Konami code is entered
      if (newKonami.join(',') === konamiCode.join(',')) {
        triggerEasterEgg();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);
  
  // Easter egg handler
  const triggerEasterEgg = () => {
    setEasterEggTriggered(true);
    
    // Play sound
    const audio = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3');
    audio.play();
    
    // Reset after animation
    setTimeout(() => setEasterEggTriggered(false), 3000);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        
        {/* Glitch Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-neon-blue w-full opacity-70"
              style={{ top: `${Math.random() * 100}%` }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {/* 404 Content */}
        <div className="text-center z-10 max-w-2xl">
          <GlitchText
            text="404"
            className="text-8xl md:text-9xl font-cyber font-bold neon-text-pink mb-4"
            intensity="high"
          />
          
          <motion.h2
            className="text-2xl md:text-3xl font-cyber mb-6 text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            LOST IN THE VOID?
          </motion.h2>
          
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for has been consumed by the digital abyss. 
            Perhaps it was never meant to exist in this reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="cyber-button group relative"
              onMouseEnter={() => setCursorType('home')}
              onMouseLeave={() => setCursorType('default')}
            >
              <span className="relative z-10 font-cyber flex items-center">
                <Home className="w-5 h-5 mr-2" />
                RETURN HOME
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              </span>
            </Link>
            
            {/* Hidden Easter Egg Button */}
            <button
              className="cyber-button group relative opacity-30 hover:opacity-100 transition-opacity duration-300"
              onClick={triggerEasterEgg}
              onMouseEnter={() => setCursorType('events')}
              onMouseLeave={() => setCursorType('default')}
            >
              <span className="relative z-10 font-cyber flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2" />
                RETRY LEVEL
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              </span>
            </button>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            <p>Hint: Try the Konami code...</p>
          </div>
        </div>
        
        {/* Easter Egg Animation */}
        {easterEggTriggered && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-6xl font-bold text-white"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1, times: [0, 0.2, 0.8, 1] }}
            >
              🎮 GAME OVER 🎬
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;