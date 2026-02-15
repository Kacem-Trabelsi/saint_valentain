import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';

const starMessages = [
  { text: "Tu es mon étoile la plus brillante, ya nour 3ini ✨", emoji: '🌟' },
  { text: "Chaque nuit je regarde le ciel et je pense à toi, 7abibi", emoji: '🌙' },
  { text: "On regarde les mêmes étoiles, même de loin — w hedha ykafini", emoji: '💫' },
  { text: "Un jour on comptera les étoiles ensemble, enti w ena", emoji: '⭐' },
  { text: "أنتِ أجمل من كل نجوم السماء مجتمعة", emoji: '🌠' },
  { text: "Mon voeu le plus cher : te voir heureuse chaque jour, ya rou7i", emoji: '💖' },
  { text: "Tu illumines ma vie comme une constellation dans la nuit", emoji: '✨' },
  { text: "N7ebbek akther mel njoumet elli f el sma", emoji: '🌙' },
  { text: "Chaque étoile filante, je fais le même voeu : être avec toi", emoji: '🌟' },
  { text: "Enti el nejma elli medha9etli triki f el dhlam", emoji: '💫' },
  { text: "Quand le monde dort, mon coeur te murmure je t'aime", emoji: '🌙' },
  { text: "حبيبتي، أنتِ قمري ونجمتي وكل سمائي", emoji: '⭐' },
];

const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    messageIndex: i % starMessages.length,
    brightness: Math.random() * 0.6 + 0.4,
  }));
};

const LoveStars = () => {
  const { isDark } = useTheme();
  const [stars] = useState(() => generateStars(40));
  const [revealedMessage, setRevealedMessage] = useState(null);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [discoveredStars, setDiscoveredStars] = useState(new Set());
  const [shootingStar, setShootingStar] = useState(null);

  // Shooting star animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShootingStar({
        id: Date.now(),
        startX: Math.random() * 60 + 20,
        startY: Math.random() * 30,
      });
      setTimeout(() => setShootingStar(null), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleStarClick = useCallback((star) => {
    setRevealedMessage(starMessages[star.messageIndex]);
    if (!discoveredStars.has(star.id)) {
      setDiscoveredStars((prev) => new Set([...prev, star.id]));
      setDiscoveredCount((prev) => prev + 1);
    }
  }, [discoveredStars]);

  return (
    <div className="min-h-screen py-20 px-4 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Our Love Stars
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Clique sur les étoiles pour découvrir des messages cachés, ya 7abibi
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Star sky container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className={`relative max-w-5xl mx-auto rounded-3xl overflow-hidden ${
          isDark ? 'bg-romantic-950/80' : 'bg-gradient-to-b from-indigo-950 to-romantic-950'
        }`}
        style={{ height: '500px', border: '1px solid rgba(255,107,157,0.1)' }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-romantic-400/5 rounded-full blur-3xl" />
        </div>

        {/* Shooting star */}
        <AnimatePresence>
          {shootingStar && (
            <motion.div
              key={shootingStar.id}
              initial={{
                x: `${shootingStar.startX}%`,
                y: `${shootingStar.startY}%`,
                opacity: 1,
              }}
              animate={{
                x: `${shootingStar.startX + 30}%`,
                y: `${shootingStar.startY + 40}%`,
                opacity: 0,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-20"
              style={{
                boxShadow: '0 0 6px 2px rgba(255,255,255,0.8), -30px -10px 20px rgba(255,255,255,0.3)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Stars */}
        {stars.map((star) => (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star)}
            className="absolute rounded-full cursor-pointer focus:outline-none group"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size * 2 + 8}px`,
              height: `${star.size * 2 + 8}px`,
            }}
            whileHover={{ scale: 2.5 }}
            whileTap={{ scale: 3 }}
          >
            {/* Star glow */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                discoveredStars.has(star.id)
                  ? 'bg-romantic-400'
                  : 'bg-white'
              }`}
              style={{
                width: `${star.size * 2}px`,
                height: `${star.size * 2}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: discoveredStars.has(star.id)
                  ? `0 0 ${star.size * 4}px ${star.size * 2}px rgba(255,107,157,0.6)`
                  : `0 0 ${star.size * 3}px ${star.size}px rgba(255,255,255,${star.brightness * 0.5})`,
              }}
              animate={{
                opacity: [star.brightness, star.brightness * 0.4, star.brightness],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        ))}

        {/* Discovery counter */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-xs font-body text-white/40">
            {discoveredCount}/{stars.length} étoiles découvertes ⭐
          </span>
        </div>

        {/* Instruction */}
        <div className="absolute bottom-4 right-4 z-10">
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs font-body text-white/30"
          >
            ✨ Touche les étoiles...
          </motion.span>
        </div>
      </motion.div>

      {/* Message popup */}
      <AnimatePresence>
        {revealedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealedMessage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-md w-full rounded-3xl p-8 text-center ${
                isDark
                  ? 'bg-gradient-to-br from-romantic-950 via-romantic-900/95 to-romantic-950 border border-romantic-400/15'
                  : 'bg-gradient-to-br from-white via-romantic-50 to-white border border-romantic-200'
              } shadow-2xl`}
            >
              <button
                onClick={() => setRevealedMessage(null)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isDark
                    ? 'text-romantic-300/60 hover:bg-romantic-400/10'
                    : 'text-romantic-500/60 hover:bg-romantic-100'
                }`}
              >
                <FaTimes className="text-sm" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="text-5xl mb-4"
              >
                {revealedMessage.emoji}
              </motion.div>

              <p
                className={`font-elegant text-xl leading-relaxed italic ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                {revealedMessage.text}
              </p>

              <div className="romantic-divider mt-6" />
              <p className={`text-xs mt-3 ${isDark ? 'text-romantic-400/30' : 'text-romantic-400/50'}`}>
                Un message caché dans les étoiles 💫
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`text-center mt-8 font-elegant text-lg italic ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}
      >
        Kol nejma fiha message men 9albi lik, ya rou7i 🌙
      </motion.p>
    </div>
  );
};

export default LoveStars;
