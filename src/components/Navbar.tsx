import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Calendar, Rocket, Users, Mail, Menu, X } from 'lucide-react';

interface NavbarProps {
  setCursorType: (type: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCursorType }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    { path: '/', name: 'Home', icon: <Gamepad2 className="w-5 h-5" /> },
    { path: '/events', name: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { path: '/projects', name: 'Projects', icon: <Rocket className="w-5 h-5" /> },
    { path: '/members', name: 'Members', icon: <Users className="w-5 h-5" /> },
    { path: '/contact', name: 'Contact', icon: <Mail className="w-5 h-5" /> }
  ];
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onMouseEnter={() => setCursorType('home')}
          onMouseLeave={() => setCursorType('default')}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Gamepad2 className="w-8 h-8 text-neon-blue" />
          </motion.div>
          <motion.h1 
            className="text-2xl font-cyber font-bold neon-text-blue"
            whileHover={{ scale: 1.05 }}
          >
            SOLACE
          </motion.h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-cyber-gray text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onMouseEnter={() => setCursorType(link.name.toLowerCase())}
              onMouseLeave={() => setCursorType('default')}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {link.icon}
              </motion.div>
              <span className="font-cyber text-sm">{link.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden glass absolute w-full ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                location.pathname === link.path
                  ? 'bg-cyber-gray text-white'
                  : 'text-gray-300'
              }`}
            >
              {link.icon}
              <span className="font-cyber">{link.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;