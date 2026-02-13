import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio('/music/song.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Try to auto-play on first user interaction anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {
          // Autoplay still blocked
        });
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      {/* Music toggle button - bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`relative p-4 rounded-full transition-all duration-300 border ${
            isDark
              ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
              : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
          } ${isPlaying ? (isDark ? 'glow-pink border-romantic-400/30' : 'shadow-lg shadow-romantic-400/25 border-romantic-400/40') : ''}`}
          aria-label={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-4 w-5 justify-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="music-bar" />
              ))}
            </div>
          ) : (
            <FaVolumeMute className="text-lg" />
          )}
        </motion.button>

        {/* "Click to play" prompt */}
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: 2, duration: 0.4 }}
              className={`px-3 py-2 rounded-lg text-xs font-body whitespace-nowrap border ${
                isDark
                  ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/10 text-romantic-300/70'
                  : 'bg-white/80 backdrop-blur-xl border-romantic-300/20 text-romantic-600/70 shadow-sm'
              }`}
            >
              🎵 Click anywhere to play music
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
