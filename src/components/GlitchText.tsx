import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  intensity = 'medium' 
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const element = textRef.current;
    const originalText = text;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|';
    
    // Set intensity parameters
    let glitchInterval: number;
    let glitchDuration: number;
    let glitchProbability: number;
    
    switch (intensity) {
      case 'low':
        glitchInterval = 3000;
        glitchDuration = 100;
        glitchProbability = 0.1;
        break;
      case 'high':
        glitchInterval = 1000;
        glitchDuration = 200;
        glitchProbability = 0.3;
        break;
      case 'medium':
      default:
        glitchInterval = 2000;
        glitchDuration = 150;
        glitchProbability = 0.2;
    }
    
    // Create glitch effect
    const glitchEffect = () => {
      let iterations = 0;
      const maxIterations = 3;
      
      const interval = setInterval(() => {
        if (Math.random() < glitchProbability) {
          // Create glitched text
          let glitchedText = '';
          for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.2) {
              glitchedText += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
              glitchedText += originalText[i];
            }
          }
          
          // Apply glitched text
          element.textContent = glitchedText;
          
          // Apply CSS glitch effect
          gsap.to(element, {
            x: Math.random() * 4 - 2,
            y: Math.random() * 4 - 2,
            skewX: Math.random() * 4 - 2,
            duration: 0.1
          });
        }
        
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(interval);
          element.textContent = originalText;
          
          // Reset position
          gsap.to(element, {
            x: 0,
            y: 0,
            skewX: 0,
            duration: 0.1
          });
        }
      }, glitchDuration);
    };
    
    // Start glitch loop
    const glitchLoop = setInterval(glitchEffect, glitchInterval);
    
    return () => {
      clearInterval(glitchLoop);
    };
  }, [text, intensity]);
  
  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};

export default GlitchText;