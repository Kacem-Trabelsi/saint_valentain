import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

const FinalPage = () => {
  const { isDark } = useTheme();
  const [answered, setAnswered] = useState(false);
  const [choice, setChoice] = useState('');

  const launchConfetti = () => {
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#ff6b9d', '#EC4899', '#8B5CF6', '#F59E0B', '#ff477e'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 300);

    // Heart-shaped burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5, x: 0.5 },
        colors,
        shapes: ['circle'],
        scalar: 1.5,
      });
    }, 800);
  };

  const handleAnswer = (answer) => {
    setChoice(answer);
    setAnswered(true);
    launchConfetti();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-romantic-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!answered ? (
          /* Question */
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10 max-w-3xl"
          >
            {/* Decorative hearts */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl mb-8"
            >
              💝
            </motion.div>

            {/* Main question */}
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-romantic text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text mb-4 leading-tight"
            >
              Will you always be
            </motion.h2>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-romantic text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text mb-8 leading-tight"
            >
              my Valentine, ya 7abibi?
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="romantic-divider mb-12"
            />

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer('yes')}
                className="relative group min-w-[200px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-400 to-accent-pink opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-r from-romantic-400 to-accent-pink text-white font-elegant text-xl font-semibold px-10 py-5 rounded-full shadow-lg">
                  YES ❤️
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer('forever')}
                className="relative group min-w-[200px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-romantic-400 opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-r from-accent-purple to-romantic-400 text-white font-elegant text-xl font-semibold px-10 py-5 rounded-full shadow-lg">
                  YES FOREVER 💍
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* Celebration */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center relative z-10 max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 100 }}
              className="text-7xl sm:text-8xl mb-8"
            >
              {choice === 'forever' ? '💍' : '❤️'}
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text-gold mb-6"
            >
              {choice === 'forever'
                ? 'Dima w l\'ebed, ya rou7i!'
                : 'N7ebbek ya 7abibi!'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`font-elegant text-lg sm:text-xl italic leading-relaxed mb-8 ${
                isDark ? 'text-romantic-200/70' : 'text-romantic-700/70'
              }`}
            >
              {choice === 'forever'
                ? "Ya 9albi, you've made me the happiest person in the world. Dima m3ak, à travers chaque saison, chaque tempête, et chaque lever de soleil. أنتِ حبي الأبدي، يا عمري. 💝"
                : "9albi lik, ya 7abibi, lyoum w kol youm. Merci d'avoir choisi de m'aimer. Enti kol 7aja, ya rou7i. ❤️"}
            </motion.p>

            <div className="romantic-divider mb-6" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="space-y-2"
            >
              <p
                className={`font-body text-sm ${
                  isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
                }`}
              >
                Fait avec tout mon amour, ken lik ya 7abibi 💕
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                ❤️
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalPage;
