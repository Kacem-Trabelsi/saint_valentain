import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const sections = [
  { id: 'landing', label: 'Welcome', emoji: '💝' },
  { id: 'counter', label: 'Our Time', emoji: '⏰' },
  { id: 'timeline', label: 'Memories', emoji: '📖' },
  { id: 'quotes', label: 'Mon Cœur', emoji: '💬' },
  { id: 'reasons', label: 'Ya 9albi', emoji: '💕' },
  { id: 'lovenotes', label: 'Notes', emoji: '📝' },
  { id: 'promises', label: 'Wa3di', emoji: '🤝' },
  { id: 'dreams', label: 'A7lemna', emoji: '✨' },
  { id: 'compliments', label: 'Jmilek', emoji: '🌹' },
  { id: 'game', label: 'Game', emoji: '🎮' },
  { id: 'surprise', label: 'Surprise', emoji: '💌' },
  { id: 'final', label: 'Forever', emoji: '💍' },
];

const Navbar = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('landing');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
    >
      {sections.map(({ id, label, emoji }) => {
        const isActive = activeSection === id;

        return (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className="flex items-center gap-2 group"
            whileHover={{ x: -4 }}
          >
            {/* Label - shows on hover */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isHovered || isActive ? 1 : 0,
                x: isHovered || isActive ? 0 : 10,
              }}
              className={`text-xs font-body whitespace-nowrap px-2 py-1 rounded-md transition-colors ${
                isDark
                  ? isActive
                    ? 'text-romantic-300 bg-romantic-400/10'
                    : 'text-romantic-400/50'
                  : isActive
                  ? 'text-romantic-600 bg-romantic-100'
                  : 'text-romantic-500/40'
              }`}
            >
              {emoji} {label}
            </motion.span>

            {/* Dot */}
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-gradient-to-br from-romantic-400 to-accent-purple shadow-lg shadow-romantic-400/30'
                  : isDark
                  ? 'w-2 h-2 bg-romantic-400/20 group-hover:bg-romantic-400/40'
                  : 'w-2 h-2 bg-romantic-400/30 group-hover:bg-romantic-400/50'
              }`}
              layout
            />
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default Navbar;
