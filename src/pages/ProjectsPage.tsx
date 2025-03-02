import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import PageTransition from '../components/PageTransition';
import { Github, ExternalLink, X, Code, Users, Calendar } from 'lucide-react';

interface ProjectsPageProps {
  setCursorType: (type: string) => void;
}

// Project data
const projects = [
  {
    id: 1,
    title: 'Neural Network Visualizer',
    description: 'An interactive tool for visualizing neural networks and their learning process in real-time.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TensorFlow.js', 'Three.js', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://example.com',
    members: ['Alex Chen', 'Maya Patel', 'James Wilson'],
    date: 'March 2025'
  },
  {
    id: 2,
    title: 'Cyberpunk Game Engine',
    description: 'A custom game engine designed for creating cyberpunk-themed games with advanced lighting and particle effects.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['C++', 'OpenGL', 'GLSL', 'Vulkan'],
    github: 'https://github.com',
    members: ['Sarah Park', 'David Kim', 'Olivia Rodriguez'],
    date: 'January 2025'
  },
  {
    id: 3,
    title: 'AR Gaming Companion',
    description: 'An augmented reality application that enhances tabletop gaming experiences with interactive 3D models and effects.',
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Unity', 'ARKit', 'ARCore', 'C#'],
    github: 'https://github.com',
    demo: 'https://example.com',
    members: ['Michael Chen', 'Emma Davis'],
    date: 'February 2025'
  },
  {
    id: 4,
    title: 'Quantum Computing Simulator',
    description: 'A simulator for quantum computing algorithms that helps visualize quantum states and operations.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'Qiskit', 'NumPy', 'Matplotlib'],
    github: 'https://github.com',
    members: ['Dr. Elena Patel', 'Marcus Johnson'],
    date: 'April 2025'
  },
  {
    id: 5,
    title: 'Procedural City Generator',
    description: 'A tool that generates detailed cyberpunk cities procedurally for use in games and virtual environments.',
    image: 'https://images.unsplash.com/photo-1480944657103-7fed22359e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'Three.js', 'WebGL', 'Perlin Noise'],
    github: 'https://github.com',
    demo: 'https://example.com',
    members: ['Ryan Zhang', 'Sophia Lee'],
    date: 'May 2025'
  },
  {
    id: 6,
    title: 'AI Game Character System',
    description: 'An artificial intelligence system that creates dynamic and adaptive NPCs for immersive gaming experiences.',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'Unity', 'C#'],
    github: 'https://github.com',
    members: ['James Wilson', 'Alex Chen', 'Emma Davis'],
    date: 'June 2025'
  }
];

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setCursorType }) => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Simulate loading state when opening project details
  const openProjectDetails = (project: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsLoading(false);
    }, 800);
  };
  
  // Default options for react-tilt
  const tiltOptions = {
    max: 15,
    scale: 1.05,
    speed: 1000,
    glare: true,
    "max-glare": 0.3
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-cyber neon-text-purple mb-2">PROJECTS</h1>
            <p className="text-gray-400">Explore our innovative tech and gaming projects</p>
          </div>
          
          {/* Projects Grid */}
          <div className="masonry-grid">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Tilt options={tiltOptions} className="h-full">
                  <div 
                    className="tilt-card h-full cursor-pointer overflow-hidden"
                    onClick={() => openProjectDetails(project)}
                    onMouseEnter={() => setCursorType('projects')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-70"></div>
                    </div>
                    
                    <div className="p-6 tilt-card-content">
                      <h3 className="text-xl font-cyber mb-2 neon-text-purple">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 rounded-full bg-cyber-gray text-neon-blue"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-cyber-gray text-neon-pink">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-400">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{project.members.length} members</span>
                        </div>
                        <div className="flex gap-2">
                          <a 
                            href={project.github} 
                            className="text-gray-400 hover:text-neon-purple transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => setCursorType('projects')}
                            onMouseLeave={() => setCursorType('default')}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                          {project.demo && (
                            <a 
                              href={project.demo} 
                              className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                              onClick={(e) => e.stopPropagation()}
                              onMouseEnter={() => setCursorType('projects')}
                              onMouseLeave={() => setCursorType('default')}
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
          
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-cyber-gray border-t-neon-purple rounded-full animate-spin mb-4"></div>
                <p className="text-neon-purple font-cyber animate-pulse">LOADING</p>
              </div>
            </div>
          )}
          
          {/* Project Modal */}
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl glass-card overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-cyber-gray flex items-center justify-center hover:bg-neon-purple transition-colors duration-300"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  onMouseEnter={() => setCursorType('projects')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="md:flex">
                  {/* Project Image */}
                  <div className="md:w-2/5 h-64 md:h-auto relative">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 md:hidden"></div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="md:w-3/5 p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-cyber neon-text-purple mb-2">{selectedProject.title}</h2>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-neon-blue" />
                        <span>{selectedProject.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string, index: number) => (
                          <span 
                            key={index} 
                            className="text-sm px-3 py-1 rounded-full bg-cyber-gray text-neon-blue"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Team Members */}
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Team Members</h3>
                      <ul className="text-gray-300 space-y-1">
                        {selectedProject.members.map((member: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-purple mr-2">▹</span>
                            <span>{member}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-6">
                      <a 
                        href={selectedProject.github}
                        className="cyber-button group relative"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursorType('projects')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="relative z-10 font-cyber flex items-center">
                          <Github className="w-5 h-5 mr-2" />
                          VIEW CODE
                        </span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <span className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                        </span>
                      </a>
                      
                      {selectedProject.demo && (
                        <a 
                          href={selectedProject.demo}
                          className="cyber-button group relative"
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorType('projects')}
                          onMouseLeave={() => setCursorType('default')}
                        >
                          <span className="relative z-10 font-cyber flex items-center">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            LIVE DEMO
                          </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-green opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;