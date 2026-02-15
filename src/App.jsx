import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import Landing from './components/Landing';
import LoveCounter from './components/LoveCounter';
import Timeline from './components/Timeline';
import LoveQuotes from './components/LoveQuotes';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import LovePromises from './components/LovePromises';
import LoveLettersWall from './components/LoveLettersWall';
import DreamBoard from './components/DreamBoard';
import LoveStars from './components/LoveStars';
import WishJar from './components/WishJar';
import LoveCountdown from './components/LoveCountdown';
import ComplimentGenerator from './components/ComplimentGenerator';
import LoveGame from './components/LoveGame';
import SurpriseButton from './components/SurpriseButton';
import FinalPage from './components/FinalPage';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';

/* ============================================
   CONFIGURATION - Customize your love story!
   ============================================ */

// The date you and Chams started your relationship
// August 3, 2025 at 1:12 AM
export const LOVE_START_DATE = new Date(2025, 7, 3, 1, 12, 0); // 3 Août 2025, 1h12

/* Animated love divider between sections */
const LoveDivider = ({ emoji = '💕' }) => {
  const { isDark } = useTheme();
  return (
    <div className="relative py-8 overflow-hidden">
      {/* Animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full max-w-xs mx-auto h-[1px]"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(255,107,157,0.3), rgba(139,92,246,0.3), rgba(255,107,157,0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,107,157,0.2), rgba(139,92,246,0.2), rgba(255,107,157,0.2), transparent)',
        }}
      />
      {/* Center emoji */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-lg inline-block"
        >
          {emoji}
        </motion.span>
      </motion.div>
    </div>
  );
};

/* Section wrapper with scroll animation */
const AnimatedSection = ({ id, children, delay = 0 }) => (
  <section id={id}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </section>
);

function App() {
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 ${
        isDark
          ? 'bg-gradient-romantic'
          : 'bg-gradient-romantic-light'
      }`}
    >
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Global Music Player */}
      <MusicPlayer />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <section id="landing">
              <Landing />
            </section>

            <LoveDivider emoji="💝" />

            <AnimatedSection id="counter">
              <LoveCounter startDate={LOVE_START_DATE} />
            </AnimatedSection>

            <LoveDivider emoji="📖" />

            <AnimatedSection id="timeline">
              <Timeline />
            </AnimatedSection>

            <LoveDivider emoji="💬" />

            <AnimatedSection id="quotes">
              <LoveQuotes />
            </AnimatedSection>

            <LoveDivider emoji="💕" />

            <AnimatedSection id="reasons">
              <ReasonsILoveYou />
            </AnimatedSection>

            <LoveDivider emoji="📝" />

            <AnimatedSection id="lovenotes">
              <LoveLettersWall />
            </AnimatedSection>

            <LoveDivider emoji="🤝" />

            <AnimatedSection id="promises">
              <LovePromises />
            </AnimatedSection>

            <LoveDivider emoji="✨" />

            <AnimatedSection id="dreams">
              <DreamBoard />
            </AnimatedSection>

            <LoveDivider emoji="⭐" />

            <AnimatedSection id="stars">
              <LoveStars />
            </AnimatedSection>

            <LoveDivider emoji="🏺" />

            <AnimatedSection id="wishjar">
              <WishJar />
            </AnimatedSection>

            <LoveDivider emoji="⏳" />

            <AnimatedSection id="countdown">
              <LoveCountdown />
            </AnimatedSection>

            <LoveDivider emoji="🌹" />

            <AnimatedSection id="compliments">
              <ComplimentGenerator />
            </AnimatedSection>

            <LoveDivider emoji="🎮" />

            <AnimatedSection id="game">
              <LoveGame />
            </AnimatedSection>

            <LoveDivider emoji="💌" />

            <AnimatedSection id="surprise">
              <SurpriseButton />
            </AnimatedSection>

            <LoveDivider emoji="💍" />

            <AnimatedSection id="final">
              <FinalPage />
            </AnimatedSection>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
