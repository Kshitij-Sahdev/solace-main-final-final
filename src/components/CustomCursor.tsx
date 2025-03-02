import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  cursorType: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Determine cursor style based on type and state
  const getCursorStyle = () => {
    if (isPointer) {
      return {
        width: '3rem',
        height: '3rem',
        backgroundColor: 'rgba(255, 0, 255, 0.2)',
        mixBlendMode: 'screen' as const,
        border: '2px solid #ff00ff'
      };
    }
    
    switch (cursorType) {
      case 'home':
        return {
          width: '2rem',
          height: '2rem',
          backgroundColor: 'rgba(0, 243, 255, 0.2)',
          mixBlendMode: 'screen' as const,
          border: '2px solid #00f3ff'
        };
      case 'events':
        return {
          width: '2rem',
          height: '2rem',
          backgroundColor: 'rgba(255, 0, 255, 0.2)',
          mixBlendMode: 'screen' as const,
          border: '2px solid #ff00ff'
        };
      case 'projects':
        return {
          width: '2rem',
          height: '2rem',
          backgroundColor: 'rgba(176, 38, 255, 0.2)',
          mixBlendMode: 'screen' as const,
          border: '2px solid #b026ff'
        };
      case 'members':
        return {
          width: '2rem',
          height: '2rem',
          backgroundColor: 'rgba(15, 255, 80, 0.2)',
          mixBlendMode: 'screen' as const,
          border: '2px solid #0fff50'
        };
      default:
        return {
          width: '2rem',
          height: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          mixBlendMode: 'screen' as const,
          border: '2px solid rgba(255, 255, 255, 0.5)'
        };
    }
  };
  
  if (typeof window === 'undefined' || isHidden) return null;
  
  return (
    <motion.div
      className="custom-cursor"
      style={{
        ...getCursorStyle(),
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  );
};

export default CustomCursor;