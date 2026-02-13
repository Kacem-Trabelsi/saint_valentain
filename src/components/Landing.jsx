import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaChevronDown } from 'react-icons/fa';

const LOVE_MESSAGE =
  "Ya 7abibi, every moment with you feels like a beautiful dream I never want to wake up from. Enti nour 3ini, mon cœur, my everything. This is for you, ya rou7i... for making every single day magical just by being you.";

const EASTER_EGG_MESSAGE =
  "You found the secret! 🌟 Enti a7sen we7da f 7ayeti. I love you more than all the stars in the sky, ya 7abibi. أنتِ حبي الأبدي — Tu es mon pour toujours. 💝✨";

const Landing = () => {
  const { isDark } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const typingRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const speed = 45;

    const type = () => {
      if (index < LOVE_MESSAGE.length) {
        setTypedText(LOVE_MESSAGE.slice(0, index + 1));
        index++;
        typingRef.current = setTimeout(type, speed);
      } else {
        setIsTypingDone(true);
      }
    };

    const startDelay = setTimeout(() => type(), 2000);

    return () => {
      clearTimeout(startDelay);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  // Easter egg handler
  const handleHeartClick = () => {
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);

    // Add sparkle effect
    const sparkle = {
      id: Date.now(),
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    };
    setSparkles((prev) => [...prev, sparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, 600);

    if (newCount >= 5 && !showEasterEgg) {
      setShowEasterEgg(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-0" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Decorative top element */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="mb-6"
        >
          <span className="text-sm tracking-[0.3em] uppercase font-body text-romantic-400/60">
            ✦ A Love Letter ✦
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring' }}
          className="font-romantic text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 relative"
        >
          <span className="gradient-text">For Chams</span>
          {/* Clickable heart for Easter Egg */}
          <motion.button
            onClick={handleHeartClick}
            whileTap={{ scale: 1.3 }}
            className="relative inline-block ml-2 cursor-pointer focus:outline-none animate-heartbeat"
            aria-label="Click the heart"
          >
            <span className="text-5xl sm:text-6xl md:text-7xl">❤️</span>
            {/* Sparkles */}
            <AnimatePresence>
              {sparkles.map((sparkle) => (
                <motion.span
                  key={sparkle.id}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    x: sparkle.x,
                    y: sparkle.y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
                >
                  ✨
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.button>
        </motion.h1>

        {/* Romantic divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="romantic-divider mb-8"
        />

        {/* Typewriter text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="min-h-[120px] flex items-start justify-center"
        >
          <p
            className={`font-elegant text-lg sm:text-xl md:text-2xl leading-relaxed italic max-w-2xl ${
              isDark ? 'text-romantic-200/80' : 'text-romantic-700/80'
            } ${!isTypingDone ? 'typewriter-cursor' : ''}`}
          >
            &ldquo;{typedText}&rdquo;
          </p>
        </motion.div>

        {/* Easter Egg Message */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className={`mt-8 p-6 rounded-2xl max-w-lg mx-auto ${
                isDark ? 'glass' : 'glass-light'
              }`}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-3"
              >
                🌟
              </motion.div>
              <p
                className={`font-elegant text-base italic ${
                  isDark ? 'text-romantic-200' : 'text-romantic-700'
                }`}
              >
                {EASTER_EGG_MESSAGE}
              </p>
              <p className="text-xs mt-3 text-romantic-400/50">
                Secret unlocked! You clicked 5 times 💝
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span
          className={`text-xs tracking-widest uppercase font-body ${
            isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
          }`}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown
            className={`text-lg ${
              isDark ? 'text-romantic-400/40' : 'text-romantic-500/40'
            }`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
