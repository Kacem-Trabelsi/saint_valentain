import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';

const SURPRISE_MESSAGE = `Ya 7abibi, ya 9albi, ya rou7i,

Law ne9der na3tik 7aja we7da f 7aytek, na3tik tchoufik b 3ini. Ken wa9tha bech tefhmi 9addech enti ghalia 3liya.

حبيبتي، أنتِ أول ما أفكر فيه لما نفيق، وآخر خاطرة قبل ما نرقد. حبك يعطيني القوة، ضحكتك تعطيني الفرحة، ووجودك يعطيني السلام.

Mon amour, tu es la première chose à laquelle je pense en me réveillant, et la dernière avant de m'endormir. Ton amour me donne la force, ton sourire me donne la joie.

I promise to love you today, tomorrow, and every day after that. You are my forever person, my greatest blessing.

N7ebbek ya 3omri, dima w l'ebed ❤️`;

const SurpriseButton = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          A Surprise For You
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Something special awaits...
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Surprise button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative group"
        >
          {/* Animated glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-400 to-accent-purple opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 scale-150" />
          <div className="absolute inset-0 rounded-full animate-ping bg-romantic-400/10" style={{ animationDuration: '3s' }} />

          <div className="relative btn-romantic text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 rounded-full font-elegant animate-glow">
            <span className="relative z-10">Click for a surprise 💌</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Surprise Modal / Love Letter */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: -30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-lg w-full rounded-3xl overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-romantic-950 via-romantic-900/95 to-romantic-950'
                  : 'bg-gradient-to-br from-white via-romantic-50 to-white'
              } shadow-2xl`}
            >
              {/* Decorative top bar */}
              <div className="h-1 bg-gradient-to-r from-romantic-400 via-accent-purple to-romantic-400" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
                  isDark
                    ? 'text-romantic-300/60 hover:bg-romantic-400/10'
                    : 'text-romantic-500/60 hover:bg-romantic-100'
                }`}
              >
                <FaTimes />
              </button>

              <div className="p-8 sm:p-10">
                {/* Envelope animation */}
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-center mb-6"
                >
                  <motion.span
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl inline-block"
                  >
                    💌
                  </motion.span>
                </motion.div>

                {/* Title */}
                <h3 className="font-romantic text-3xl sm:text-4xl gradient-text text-center mb-6">
                  A Love Letter
                </h3>

                {/* Letter content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <p
                    className={`font-elegant text-sm sm:text-base leading-relaxed whitespace-pre-line italic ${
                      isDark ? 'text-romantic-200/80' : 'text-romantic-700/80'
                    }`}
                  >
                    {SURPRISE_MESSAGE}
                  </p>
                </motion.div>

                {/* Bottom decoration */}
                <div className="romantic-divider mt-8" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-4"
                >
                  <span className="text-2xl">💝</span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurpriseButton;
