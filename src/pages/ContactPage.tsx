import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface ContactPageProps {
  setCursorType: (type: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCursorType }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormState({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setIsSuccess(false);
        }, 3000);
      }, 1500);
    }
  };
  
  // Social media links
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com', color: 'hover:text-neon-purple' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', color: 'hover:text-neon-blue' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com', color: 'hover:text-neon-blue' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com', color: 'hover:text-neon-pink' }
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-cyber neon-text-blue mb-2">CONTACT US</h1>
            <p className="text-gray-400">Get in touch with the Solace team</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-2xl font-cyber mb-6">Send a Message</h2>
              
              {isSuccess ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-neon-green bg-opacity-20 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-cyber text-neon-green mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-center">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`cyber-input ${errors.name ? 'border-red-500' : ''}`}
                      onMouseEnter={() => setCursorType('contact')}
                      onMouseLeave={() => setCursorType('default')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`cyber-input ${errors.email ? 'border-red-500' : ''}`}
                      onMouseEnter={() => setCursorType('contact')}
                      onMouseLeave={() => setCursorType('default')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`cyber-input ${errors.subject ? 'border-red-500' : ''}`}
                      onMouseEnter={() => setCursorType('contact')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership">Membership</option>
                      <option value="Events">Events</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={`cyber-input resize-none ${errors.message ? 'border-red-500' : ''}`}
                      onMouseEnter={() => setCursorType('contact')}
                      onMouseLeave={() => setCursorType('default')}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="cyber-button group relative w-full"
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursorType('contact')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <span className="relative z-10 font-cyber flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          SEND MESSAGE
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                    </span>
                  </button>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="glass-card p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-cyber mb-6">Club Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-cyber text-neon-blue mb-2">Location</h3>
                    <p className="text-gray-300">
                      Tech Innovation Campus<br />
                      123 Digital Avenue<br />
                      Cyber City, CY 12345
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-cyber text-neon-pink mb-2">Meeting Times</h3>
                    <p className="text-gray-300">
                      General Meetings: Tuesdays, 6:00 PM - 8:00 PM<br />
                      Game Nights: Fridays, 7:00 PM - 11:00 PM<br />
                      Hackathons: Monthly (see Events page)
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-cyber text-neon-green mb-2">Email</h3>
                    <p className="text-gray-300">
                      General: info@solacegaming.tech<br />
                      Events: events@solacegaming.tech<br />
                      Membership: join@solacegaming.tech
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="glass-card p-6 md:p-8">
                <h2 className="text-2xl font-cyber mb-6">Connect With Us</h2>
                
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      className={`w-12 h-12 rounded-full bg-cyber-gray flex items-center justify-center text-white ${link.color} transition-colors duration-300`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      onMouseEnter={() => setCursorType('contact')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-400">
                    Follow us on social media for the latest updates, events, and gaming content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;