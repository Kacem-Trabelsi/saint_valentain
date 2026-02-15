import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
  FaMusic,
  FaTimes,
  FaPlay,
  FaPause,
  FaRandom,
} from 'react-icons/fa';
import YouTube from 'react-youtube';

/* ============================================
   PLAYLIST — Love songs in Arabic, French & English
   type: 'mp3' for local files, 'yt' for YouTube
   ============================================ */
const PLAYLIST = [
  // --- Local MP3 ---
  { type: 'mp3', src: '/music/song.mp3', title: 'Song', artist: 'Local', lang: '🎵' },
  { type: 'mp3', src: '/music/PARANOIA_PSYCOLOVE02 ( audio officiel).mp3', title: 'Psycholove 02', artist: 'Paranoia 08', lang: '🇹🇳' },

  // --- Arabic ---
  { type: 'yt', videoId: 'djtqwInkPfo', title: 'Tamally Maak', artist: 'Amr Diab', lang: '🇪🇬' },
  { type: 'yt', videoId: 'U1zd4aYtovg', title: 'Aa Bali Habibi', artist: 'Elissa', lang: '🇱🇧' },
  { type: 'yt', videoId: 'yazLEOGIK5Y', title: 'Ah W Noss', artist: 'Nancy Ajram', lang: '🇱🇧' },
  { type: 'yt', videoId: 'kx7Go4qRnIw', title: 'Ana Wa Laila', artist: 'Kadim Al Sahir', lang: '🇮🇶' },
  { type: 'yt', videoId: 'xdq1Vy9CpY4', title: 'Ah Ya Leil', artist: 'Sherine', lang: '🇪🇬' },

  // --- French ---
  { type: 'yt', videoId: 'K5KAc5CoCuk', title: 'Derniere Danse', artist: 'Indila', lang: '🇫🇷' },
  { type: 'yt', videoId: 'VGHl2kKbHoI', title: "Est-ce que tu m'aimes", artist: 'Maitre Gims', lang: '🇫🇷' },
  { type: 'yt', videoId: '1SOjkPxrozc', title: 'Formidable', artist: 'Stromae', lang: '🇧🇪' },
  { type: 'yt', videoId: '0UEWZHT-w-c', title: 'Les Rues de Ma Peine', artist: 'Amir', lang: '🇫🇷' },
  { type: 'yt', videoId: 'iToH6GuN2S4', title: 'Pour oublier', artist: 'Kendji Girac', lang: '🇫🇷' },

  // --- English ---
  { type: 'yt', videoId: '450p7goxZqg', title: 'All of Me', artist: 'John Legend', lang: '🇺🇸' },
  { type: 'yt', videoId: '2Vv-BfVoq4g', title: 'Perfect', artist: 'Ed Sheeran', lang: '🇬🇧' },
  { type: 'yt', videoId: 'LjhCEhWiKXk', title: 'Just The Way You Are', artist: 'Bruno Mars', lang: '🇺🇸' },
  { type: 'yt', videoId: '0put0_a--Ng', title: 'Make You Feel My Love', artist: 'Adele', lang: '🇬🇧' },
  { type: 'yt', videoId: 'ShZ978fBl6Y', title: 'You Are The Reason', artist: 'Calum Scott', lang: '🇬🇧' },
];

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const audioRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showTrackName, setShowTrackName] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const track = PLAYLIST[currentTrack];

  // ---- MP3 Audio Setup ----
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => goNext();
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Track switching ----
  useEffect(() => {
    const currentTrackData = PLAYLIST[currentTrack];

    // Stop MP3 if switching to YT
    if (currentTrackData.type === 'yt' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    // Stop YT if switching to MP3
    if (currentTrackData.type === 'mp3' && ytPlayerRef.current) {
      try { ytPlayerRef.current.stopVideo(); } catch {}
    }

    // Load MP3
    if (currentTrackData.type === 'mp3' && audioRef.current) {
      audioRef.current.src = currentTrackData.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }

    // YT will auto-load via the component re-render

    setShowTrackName(true);
    const timer = setTimeout(() => setShowTrackName(false), 3000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // ---- First interaction auto-play ----
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        playCurrentTrack();
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInteracted]);

  // ---- Playback controls ----
  const playCurrentTrack = useCallback(() => {
    const t = PLAYLIST[currentTrack];
    if (t.type === 'mp3' && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(() => {});
    } else if (t.type === 'yt' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        setShowPrompt(false);
      } catch {}
    }
  }, [currentTrack]);

  const pauseCurrentTrack = useCallback(() => {
    const t = PLAYLIST[currentTrack];
    if (t.type === 'mp3' && audioRef.current) {
      audioRef.current.pause();
    } else if (t.type === 'yt' && ytPlayerRef.current) {
      try { ytPlayerRef.current.pauseVideo(); } catch {}
    }
    setIsPlaying(false);
  }, [currentTrack]);

  const toggleMusic = () => {
    if (isPlaying) {
      pauseCurrentTrack();
    } else {
      playCurrentTrack();
    }
  };

  const goNext = useCallback(() => {
    if (shuffle) {
      let next;
      do { next = Math.floor(Math.random() * PLAYLIST.length); }
      while (next === currentTrack && PLAYLIST.length > 1);
      setCurrentTrack(next);
    } else {
      setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    }
  }, [shuffle, currentTrack]);

  const goPrev = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, []);

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    // Playback starts via the useEffect for currentTrack
    setTimeout(() => playCurrentTrack(), 300);
  };

  // ---- YouTube handlers ----
  const onYTReady = (event) => {
    ytPlayerRef.current = event.target;
    event.target.setVolume(35);
    if (isPlaying && track.type === 'yt') {
      event.target.playVideo();
    }
  };

  const onYTEnd = () => {
    goNext();
  };

  const onYTPlay = () => {
    setIsPlaying(true);
    setShowPrompt(false);
  };

  const onYTPause = () => {
    // Only set paused if user actually paused (not track switching)
  };

  const ytOpts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <>
      {/* Hidden YouTube player */}
      {track.type === 'yt' && (
        <div className="fixed -top-[200px] -left-[200px] w-0 h-0 overflow-hidden pointer-events-none">
          <YouTube
            videoId={track.videoId}
            opts={ytOpts}
            onReady={onYTReady}
            onEnd={onYTEnd}
            onPlay={onYTPlay}
            onPause={onYTPause}
          />
        </div>
      )}

      {/* Playlist Panel */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-20 left-6 z-50 w-80 max-h-[60vh] rounded-2xl overflow-hidden ${
              isDark
                ? 'bg-romantic-950/95 backdrop-blur-2xl border border-romantic-400/15'
                : 'bg-white/95 backdrop-blur-2xl border border-romantic-200 shadow-xl'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              isDark ? 'border-romantic-400/10' : 'border-romantic-200/50'
            }`}>
              <div className="flex items-center gap-2">
                <FaMusic className={`text-sm ${isDark ? 'text-romantic-400' : 'text-romantic-500'}`} />
                <span className={`font-elegant text-sm font-semibold ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}>
                  Love Playlist
                </span>
                <span className={`text-xs ${isDark ? 'text-romantic-400/40' : 'text-romantic-500/40'}`}>
                  ({PLAYLIST.length})
                </span>
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? 'hover:bg-romantic-400/10 text-romantic-300/60' : 'hover:bg-romantic-100 text-romantic-500/60'
                }`}
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Track list */}
            <div className="overflow-y-auto max-h-[calc(60vh-50px)] scrollbar-thin">
              {PLAYLIST.map((t, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectTrack(index)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
                    index === currentTrack
                      ? isDark
                        ? 'bg-romantic-400/10 border-l-2 border-romantic-400'
                        : 'bg-romantic-100/80 border-l-2 border-romantic-500'
                      : isDark
                        ? 'hover:bg-romantic-400/5 border-l-2 border-transparent'
                        : 'hover:bg-romantic-50 border-l-2 border-transparent'
                  }`}
                >
                  {/* Track number or playing indicator */}
                  <div className="w-6 text-center flex-shrink-0">
                    {index === currentTrack && isPlaying ? (
                      <div className="flex items-end gap-[1px] h-3 justify-center">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className="music-bar" style={{ height: `${6 + i * 3}px`, width: '2px' }} />
                        ))}
                      </div>
                    ) : (
                      <span className={`text-xs font-body ${
                        isDark ? 'text-romantic-400/30' : 'text-romantic-500/30'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-body truncate ${
                      index === currentTrack
                        ? 'text-romantic-400 font-medium'
                        : isDark ? 'text-romantic-200' : 'text-romantic-700'
                    }`}>
                      {t.title}
                    </p>
                    <p className={`text-xs font-body truncate ${
                      isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'
                    }`}>
                      {t.artist}
                    </p>
                  </div>

                  {/* Language flag */}
                  <span className="text-sm flex-shrink-0">{t.lang}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className={`px-3 py-1.5 rounded-lg text-xs font-body border max-w-[250px] ${
                isDark
                  ? 'bg-romantic-950/80 backdrop-blur-xl border-romantic-400/15 text-romantic-300'
                  : 'bg-white/90 backdrop-blur-xl border-romantic-300/25 text-romantic-600 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{track.lang}</span>
                <div className="truncate">
                  <span className="font-medium">{track.title}</span>
                  <span className={`${isDark ? 'text-romantic-400/40' : 'text-romantic-500/40'}`}> - {track.artist}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {/* Playlist toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`p-2.5 rounded-full transition-all duration-300 border ${
              isDark
                ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
                : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
            } ${showPlaylist ? (isDark ? 'border-romantic-400/30 text-romantic-200' : 'border-romantic-400/40 text-romantic-700') : ''}`}
            aria-label="Toggle playlist"
          >
            <FaMusic className="text-xs" />
          </motion.button>

          {/* Previous track */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
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
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
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
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className={`p-2.5 rounded-full transition-all duration-300 border ${
              isDark
                ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
                : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
            }`}
            aria-label="Next track"
          >
            <FaStepForward className="text-xs" />
          </motion.button>

          {/* Shuffle toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShuffle(!shuffle)}
            className={`p-2.5 rounded-full transition-all duration-300 border ${
              isDark
                ? 'bg-romantic-950/60 backdrop-blur-xl border-romantic-400/15 hover:bg-romantic-400/15 text-romantic-300 hover:text-romantic-200'
                : 'bg-white/80 backdrop-blur-xl border-romantic-300/30 hover:bg-romantic-100 text-romantic-600 hover:text-romantic-700 shadow-md shadow-romantic-400/10'
            } ${shuffle ? (isDark ? 'border-romantic-400/30 text-romantic-200' : 'border-romantic-400/40 text-romantic-700') : ''}`}
            aria-label="Shuffle"
          >
            <FaRandom className="text-xs" />
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
