import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';

// Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ProjectsPage from './pages/ProjectsPage';
import MembersPage from './pages/MembersPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();
  const [cursorType, setCursorType] = useState<string>('default');
  
  // Update cursor type based on the current page
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCursorType('home');
    else if (path.includes('/events')) setCursorType('events');
    else if (path.includes('/projects')) setCursorType('projects');
    else if (path.includes('/members')) setCursorType('members');
    else if (path.includes('/contact')) setCursorType('contact');
    else setCursorType('default');
  }, [location]);

  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans">
      <CustomCursor cursorType={cursorType} />
      <Navbar setCursorType={setCursorType} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage setCursorType={setCursorType} />} />
          <Route path="/events" element={<EventsPage setCursorType={setCursorType} />} />
          <Route path="/projects" element={<ProjectsPage setCursorType={setCursorType} />} />
          <Route path="/members" element={<MembersPage setCursorType={setCursorType} />} />
          <Route path="/contact" element={<ContactPage setCursorType={setCursorType} />} />
          <Route path="*" element={<NotFoundPage setCursorType={setCursorType} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;