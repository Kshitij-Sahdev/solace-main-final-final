import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Calendar, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface EventsPageProps {
  setCursorType: (type: string) => void;
}

// Event data
const eventCategories = [
  {
    id: 'tournaments',
    name: 'Tournaments',
    events: [
      {
        id: 1,
        title: 'Cyberpunk 2077 Tournament',
        date: 'June 15, 2025',
        time: '6:00 PM - 10:00 PM',
        location: 'Virtual',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Compete in our Cyberpunk 2077 tournament for a chance to win exclusive prizes and establish yourself as the top player in the community.',
        prizes: ['$500 Cash Prize', 'Gaming Peripherals', 'Exclusive In-game Items'],
        registrationLink: '#'
      },
      {
        id: 2,
        title: 'League of Legends Championship',
        date: 'July 8, 2025',
        time: '5:00 PM - 9:00 PM',
        location: 'Solace HQ',
        image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Form your team and battle in our League of Legends championship. Show your skills and teamwork to claim victory.',
        prizes: ['$750 Team Prize', 'Gaming Chairs', 'Tournament Trophies'],
        registrationLink: '#'
      },
      {
        id: 3,
        title: 'Valorant Showdown',
        date: 'August 22, 2025',
        time: '7:00 PM - 11:00 PM',
        location: 'Virtual',
        image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Showcase your tactical prowess in our Valorant tournament. Precision and teamwork will be key to victory.',
        prizes: ['$600 Team Prize', 'Gaming Peripherals', 'Exclusive Skins'],
        registrationLink: '#'
      }
    ]
  },
  {
    id: 'hackathons',
    name: 'Hackathons',
    events: [
      {
        id: 4,
        title: 'AI Innovation Hackathon',
        date: 'July 22-24, 2025',
        time: '48 Hours',
        location: 'Tech Campus',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Build innovative AI solutions to real-world problems in this 48-hour hackathon. Mentors from leading tech companies will be available.',
        prizes: ['$2000 First Prize', 'Startup Incubation', 'Job Opportunities'],
        registrationLink: '#'
      },
      {
        id: 5,
        title: 'Blockchain Development Challenge',
        date: 'September 10-12, 2025',
        time: '72 Hours',
        location: 'Virtual',
        image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Develop decentralized applications on blockchain technology. Create solutions for finance, gaming, or social impact.',
        prizes: ['$3000 First Prize', 'Crypto Rewards', 'Investor Connections'],
        registrationLink: '#'
      }
    ]
  },
  {
    id: 'workshops',
    name: 'Workshops',
    events: [
      {
        id: 6,
        title: 'VR Development Workshop',
        date: 'August 10, 2025',
        time: '10:00 AM - 4:00 PM',
        location: 'Solace HQ',
        image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Learn the fundamentals of VR development with hands-on experience. Create your first VR application by the end of the day.',
        instructors: ['Dr. Maya Chen, VR Specialist', 'Alex Rivera, Game Developer'],
        registrationLink: '#'
      },
      {
        id: 7,
        title: 'Game Design Masterclass',
        date: 'October 5, 2025',
        time: '11:00 AM - 5:00 PM',
        location: 'Tech Campus',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Master the principles of game design from industry professionals. Learn about mechanics, level design, and player psychology.',
        instructors: ['James Wilson, Lead Game Designer', 'Sarah Park, UX Specialist'],
        registrationLink: '#'
      },
      {
        id: 8,
        title: 'Cybersecurity Bootcamp',
        date: 'November 15, 2025',
        time: '9:00 AM - 6:00 PM',
        location: 'Solace HQ',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Dive into cybersecurity with our intensive bootcamp. Learn about threat detection, penetration testing, and security best practices.',
        instructors: ['Michael Chen, Security Expert', 'Olivia Rodriguez, Ethical Hacker'],
        registrationLink: '#'
      }
    ]
  },
  {
    id: 'past',
    name: 'Past Events',
    events: [
      {
        id: 9,
        title: 'Game Jam 2024',
        date: 'March 15-17, 2024',
        time: '72 Hours',
        location: 'Virtual',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Our annual game jam brought together developers from around the world to create games based on the theme "Digital Renaissance".',
        highlights: ['25 Games Created', '150+ Participants', 'Live Streamed Finale'],
        galleryLink: '#'
      },
      {
        id: 10,
        title: 'Tech Talk: Future of AI',
        date: 'February 10, 2024',
        time: '7:00 PM - 9:00 PM',
        location: 'Solace HQ',
        image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Industry leaders discussed the future of AI and its impact on gaming, technology, and society.',
        speakers: ['Dr. Elena Patel, AI Researcher', 'Marcus Johnson, Tech Entrepreneur'],
        recordingLink: '#'
      }
    ]
  }
];

const EventsPage: React.FC<EventsPageProps> = ({ setCursorType }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Filter events based on active filters
  const filteredCategories = activeFilters.length > 0
    ? eventCategories.filter(category => activeFilters.includes(category.id))
    : eventCategories;
  
  // Toggle filter
  const toggleFilter = (categoryId: string) => {
    if (activeFilters.includes(categoryId)) {
      setActiveFilters(activeFilters.filter(id => id !== categoryId));
    } else {
      setActiveFilters([...activeFilters, categoryId]);
    }
  };
  
  // Scroll row horizontally
  const scrollRow = (index: number, direction: 'left' | 'right') => {
    const row = rowRefs.current[index];
    if (row) {
      const scrollAmount = 300;
      const targetScroll = direction === 'left' 
        ? row.scrollLeft - scrollAmount 
        : row.scrollLeft + scrollAmount;
      
      row.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-cyber neon-text-pink mb-2">EVENTS</h1>
              <p className="text-gray-400">Discover upcoming tournaments, hackathons, and workshops</p>
            </div>
            
            {/* Filters */}
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-neon-pink" />
                <span className="text-sm text-gray-400">Filter:</span>
                
                {eventCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                      activeFilters.includes(category.id) || activeFilters.length === 0
                        ? 'bg-cyber-gray text-white'
                        : 'bg-cyber-dark text-gray-400'
                    }`}
                    onClick={() => toggleFilter(category.id)}
                    onMouseEnter={() => setCursorType('events')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Event Categories (Netflix-style) */}
          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.id} className="relative">
                <h2 className="text-2xl font-cyber mb-4">{category.name}</h2>
                
                {/* Scroll Controls */}
                <div className="absolute right-0 top-0 flex gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-cyber-gray flex items-center justify-center text-white hover:bg-neon-pink transition-colors duration-300"
                    onClick={() => scrollRow(categoryIndex, 'left')}
                    aria-label="Scroll left"
                    onMouseEnter={() => setCursorType('events')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full bg-cyber-gray flex items-center justify-center text-white hover:bg-neon-pink transition-colors duration-300"
                    onClick={() => scrollRow(categoryIndex, 'right')}
                    aria-label="Scroll right"
                    onMouseEnter={() => setCursorType('events')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Event Row */}
                <div 
                  className="netflix-row"
                  ref={el => rowRefs.current[categoryIndex] = el}
                >
                  {category.events.map(event => (
                    <motion.div
                      key={event.id}
                      className="netflix-card relative group"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                      onClick={() => setSelectedEvent(event)}
                      onMouseEnter={() => setCursorType('events')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-md"></div>
                      <div className="absolute bottom-0 left-0 p-3">
                        <h3 className="text-white font-cyber text-sm">{event.title}</h3>
                        <div className="flex items-center text-xs text-gray-300 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-neon-pink bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Event Modal */}
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
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
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-cyber-gray flex items-center justify-center hover:bg-neon-pink transition-colors duration-300"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
                onMouseEnter={() => setCursorType('events')}
                onMouseLeave={() => setCursorType('default')}
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="md:flex">
                {/* Event Image */}
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 md:hidden"></div>
                </div>
                
                {/* Event Details */}
                <div className="md:w-3/5 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-cyber neon-text-pink mb-2">{selectedEvent.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-neon-blue" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="text-gray-300">
                      <span className="text-neon-blue mr-2">⏰</span>
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="text-gray-300">
                      <span className="text-neon-blue mr-2">📍</span>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedEvent.description}</p>
                  
                  {/* Conditional Content Based on Event Type */}
                  {selectedEvent.prizes && (
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Prizes</h3>
                      <ul className="text-gray-300 space-y-1">
                        {selectedEvent.prizes.map((prize: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-green mr-2">▹</span>
                            <span>{prize}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedEvent.instructors && (
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Instructors</h3>
                      <ul className="text-gray-300 space-y-1">
                        {selectedEvent.instructors.map((instructor: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-blue mr-2">▹</span>
                            <span>{instructor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedEvent.highlights && (
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Highlights</h3>
                      <ul className="text-gray-300 space-y-1">
                        {selectedEvent.highlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-purple mr-2">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedEvent.speakers && (
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-neon-green mb-2">Speakers</h3>
                      <ul className="text-gray-300 space-y-1">
                        {selectedEvent.speakers.map((speaker: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-pink mr-2">▹</span>
                            <span>{speaker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {selectedEvent.registrationLink && (
                      <a 
                        href={selectedEvent.registrationLink}
                        className="cyber-button group relative"
                        onMouseEnter={() => setCursorType('events')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="relative z-10 font-cyber">REGISTER NOW</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <span className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                        </span>
                      </a>
                    )}
                    
                    {selectedEvent.galleryLink && (
                      <a 
                        href={selectedEvent.galleryLink}
                        className="cyber-button group relative"
                        onMouseEnter={() => setCursorType('events')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="relative z-10 font-cyber">VIEW GALLERY</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-green opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                        </span>
                      </a>
                    )}
                    
                    {selectedEvent.recordingLink && (
                      <a 
                        href={selectedEvent.recordingLink}
                        className="cyber-button group relative"
                        onMouseEnter={() => setCursorType('events')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="relative z-10 font-cyber">WATCH RECORDING</span>
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
    </PageTransition>
  );
};

export default EventsPage;