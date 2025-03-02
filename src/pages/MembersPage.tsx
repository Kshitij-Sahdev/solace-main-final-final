import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Github, Linkedin, Twitter, X, ChevronLeft } from 'lucide-react';

interface MembersPageProps {
  setCursorType: (type: string) => void;
}

// Team members data
const teamMembers = [
]