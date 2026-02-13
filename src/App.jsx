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

            <section id="counter">
              <LoveCounter startDate={LOVE_START_DATE} />
            </section>

            <section id="timeline">
              <Timeline />
            </section>

            <section id="quotes">
              <LoveQuotes />
            </section>

            <section id="reasons">
              <ReasonsILoveYou />
            </section>

            <section id="lovenotes">
              <LoveLettersWall />
            </section>

            <section id="promises">
              <LovePromises />
            </section>

            <section id="dreams">
              <DreamBoard />
            </section>

            <section id="compliments">
              <ComplimentGenerator />
            </section>

            <section id="game">
              <LoveGame />
            </section>

            <section id="surprise">
              <SurpriseButton />
            </section>

            <section id="final">
              <FinalPage />
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
