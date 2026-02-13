import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';

const PLAYLIST = [
  { src: '/music/song.mp3', title: 'Song' },
  { src: '/music/PARANOIA_PSYCOLOVE02 ( audio officiel).mp3', title: 'Paranoia Psycolove' },
  { src: '/music/Mr SKiLLS  - قراري    Karari  (Officiel Clip).mp3', title: 'Mr SKiLLS - Karari' },
];

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showTrackName, setShowTrackName] = useState(false);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(PLAYLIST[0].src);
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;

    // When a track ends, go to the next one
    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Switch track when currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;
    const wasPlaying = !audioRef.current.paused;
    audioRef.current.src = PLAYLIST[currentTrack].src;
    audioRef.current.load();
    if (wasPlaying) {
      audioRef.current.play().catch(() => {});
    }
    // Show track name briefly
    setShowTrackName(true);
    const timer = setTimeout(() => setShowTrackName(false), 2500);
    return () => clearTimeout(timer);
  }, [currentTrack]);

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

  const nextTrack = useCallback((e) => {
    e.stopPropagation();
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
  }, []);

  const prevTrack = useCallback((e) => {
    e.stopPropagation();
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, []);

  return (
    <>
      {/* Music player - bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2"
      >
        {/* Track name toast */}
        <AnimatePresence>
          {showTrackName && isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-body border ${
                isDark
                  ? 'bg-romantic-950/70 backdrop-blur-xl border-romantic-400/15 text-romantic-300'
                  : 'bg-white/85 backdrop-blur-xl border-romantic-300/25 text-romantic-600 shadow-sm'
              }`}
            >
              🎵 {PLAYLIST[currentTrack].title}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {/* Previous track */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTrack}
            className={`p-2.5 rounded-full transition-all duration-300 border ${
              isDark
                ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
                : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
            }`}
            aria-label="Previous track"
          >
            <FaStepBackward className="text-xs" />
          </motion.button>

          {/* Play/Pause */}
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

          {/* Next track */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTrack}
            className={`p-2.5 rounded-full transition-all duration-300 border ${
              isDark
                ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
                : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
            }`}
            aria-label="Next track"
          >
            <FaStepForward className="text-xs" />
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
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
