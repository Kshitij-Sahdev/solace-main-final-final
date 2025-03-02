import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronDown } from 'lucide-react';

import PageTransition from '../components/PageTransition';
import ParticleBackground from '../components/ParticleBackground';
import GlitchText from '../components/GlitchText';

interface HomePageProps {
  setCursorType: (type: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCursorType }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio for easter egg
  useEffect(() => {
    audioRef.current = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Logo glitch effect with GSAP
  useEffect(() => {
    if (!logoRef.current) return;
    
    const logo = logoRef.current;
    
    // Initial animation
    gsap.fromTo(
      logo,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );
    
    // Glitch effect timeline
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    glitchTimeline
      .to(logo, {
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        skewX: () => Math.random() * 10 - 5,
        duration: 0.1
      })
      .to(logo, {
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        skewX: () => Math.random() * 10 - 5,
        duration: 0.1
      })
      .to(logo, {
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        skewX: () => Math.random() * 10 - 5,
        duration: 0.1
      })
      .to(logo, { x: 0, y: 0, skewX: 0, duration: 0.2 });
    
    return () => {
      glitchTimeline.kill();
    };
  }, []);
  
  // Easter egg handler
  const triggerEasterEgg = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setEasterEggTriggered(true);
    setTimeout(() => setEasterEggTriggered(false), 3000);
  };
  
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <ParticleBackground variant="cyber" />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          {/* Hidden Easter Egg Button */}
          <button
            className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full opacity-10 hover:opacity-20 z-10 transition-opacity duration-300"
            onClick={triggerEasterEgg}
            aria-label="Easter Egg"
            onMouseEnter={() => setCursorType('events')}
            onMouseLeave={() => setCursorType('home')}
          />
          
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
                🎮 ABSOLUTE CINEMA 🎬
              </motion.div>
            </motion.div>
          )}
          
          {/* Logo */}
          <div ref={logoRef} className="mb-6">
            <motion.div
              className="flex items-center justify-center w-24 h-24 bg-cyber-dark rounded-full mb-4 mx-auto"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Gamepad2 className="w-12 h-12 text-neon-blue" />
            </motion.div>
          </div>
          
          {/* Club Name */}
          <GlitchText
            text="SOLACE"
            className="text-6xl md:text-8xl font-cyber font-bold neon-text-blue mb-4 tracking-wider"
            intensity="medium"
          />
          
          {/* Tagline with RGB effect */}
          <motion.h2 
            className="text-xl md:text-2xl font-mono mb-8 text-center animate-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Future of Gaming & Tech
          </motion.h2>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link 
              to="/events"
              className="cyber-button group relative"
              onMouseEnter={() => setCursorType('events')}
              onMouseLeave={() => setCursorType('home')}
            >
              <span className="relative z-10 font-cyber">EXPLORE</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              </span>
            </Link>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-white opacity-70" />
          </motion.div>
        </section>
        
        {/* About Section */}
        <section className="py-20 px-4 bg-cyber-dark bg-opacity-80">
          <div className="container mx-auto max-w-4xl">
            <motion.h2 
              className="text-3xl md:text-4xl font-cyber mb-8 text-center neon-text-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              ABOUT SOLACE
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-cyber mb-4 text-neon-blue">Our Mission</h3>
                <p className="text-gray-300 mb-4">
                  Solace Gaming & Tech Club is a community of passionate gamers, developers, and tech enthusiasts dedicated to pushing the boundaries of technology and gaming.
                </p>
                <p className="text-gray-300">
                  We provide a platform for innovation, learning, and collaboration in a supportive environment where creativity thrives.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-cyber mb-4 text-neon-pink">What We Do</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">▹</span>
                    <span>Host gaming tournaments and hackathons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▹</span>
                    <span>Develop innovative tech projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-2">▹</span>
                    <span>Organize workshops and tech talks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">▹</span>
                    <span>Build a community of like-minded individuals</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Events Preview */}
        <section className="py-20 px-4 bg-cyber-black bg-cyber-grid">
          <div className="container mx-auto max-w-6xl">
            <motion.h2 
              className="text-3xl md:text-4xl font-cyber mb-12 text-center neon-text-green"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              FEATURED EVENTS
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Cyberpunk Tournament",
                  date: "June 15, 2025",
                  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  color: "neon-blue"
                },
                {
                  title: "AI Hackathon",
                  date: "July 22, 2025",
                  image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  color: "neon-pink"
                },
                {
                  title: "VR Workshop",
                  date: "August 10, 2025",
                  image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  color: "neon-purple"
                }
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className="glass-card overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-cyber mb-2 neon-text-${event.color}`}>{event.title}</h3>
                    <p className="text-gray-400 mb-4">{event.date}</p>
                    <Link 
                      to="/events" 
                      className="text-sm font-cyber uppercase tracking-wider text-white hover:text-neon-blue transition-colors duration-300"
                      onMouseEnter={() => setCursorType('events')}
                      onMouseLeave={() => setCursorType('home')}
                    >
                      Learn More →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/events"
                className="cyber-button group relative"
                onMouseEnter={() => setCursorType('events')}
                onMouseLeave={() => setCursorType('home')}
              >
                <span className="relative z-10 font-cyber">VIEW ALL EVENTS</span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute inset-0 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default HomePage;