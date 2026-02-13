import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
        isDark
          ? 'glass hover:bg-romantic-400/10 text-romantic-300'
          : 'glass-light hover:bg-romantic-100 text-romantic-600'
      }`}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
