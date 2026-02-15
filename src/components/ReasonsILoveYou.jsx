import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHeart } from 'react-icons/fa';

const reasons = [
  {
    id: 1,
    front: '💖',
    reason: 'Your smile lights up my entire world and makes everything feel right.',
  },
  {
    id: 2,
    front: '😊',
    reason: 'The way you laugh — it\'s the most beautiful sound I\'ve ever heard.',
  },
  {
    id: 3,
    front: '🌟',
    reason: 'Your kindness and compassion inspire me to be a better person every day.',
  },
  {
    id: 4,
    front: '✨',
    reason: 'You make ordinary moments feel extraordinary, just by being there.',
  },
  {
    id: 5,
    front: '👀',
    reason: 'Your eyes are my favorite place to get lost — I could gaze into them forever.',
  },
  {
    id: 6,
    front: '💪',
    reason: 'You believe in me even when I don\'t believe in myself.',
  },
  {
    id: 7,
    front: '🤗',
    reason: 'Every hug from you feels like coming home after a long journey.',
  },
  {
    id: 8,
    front: '🦋',
    reason: 'You still give me butterflies, every single time I see you.',
  },
  {
    id: 9,
    front: '🌹',
    reason: 'The way you care about everyone around you shows how beautiful your soul is.',
  },
  {
    id: 10,
    front: '🔥',
    reason: 'Your strength and determination amaze me — you\'re unstoppable.',
  },
  {
    id: 11,
    front: '🎵',
    reason: 'Your voice is my favorite melody — I could listen to you talk forever.',
  },
  {
    id: 12,
    front: '🌈',
    reason: 'You see beauty in everything, and you\'ve taught me to do the same.',
  },
];

const ReasonCard = ({ reason, index, isDark }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flip-card h-52 sm:h-56"
    >
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''} h-full cursor-pointer`}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div
            className={`flip-card-front flex flex-col items-center justify-center p-6 ${
              isDark ? 'glass' : 'glass-light'
            } transition-all duration-300`}
          >
            <span className="text-4xl mb-3">{reason.front}</span>
            <span className="font-elegant text-3xl font-bold gradient-text">
              #{reason.id}
            </span>
            <div className="flex items-center gap-1 mt-3">
              <FaHeart className="text-romantic-400/40 text-xs" />
              <span
                className={`text-xs font-body ${
                  isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'
                }`}
              >
                Tap to reveal
              </span>
            </div>
          </div>

          {/* Back */}
          <div
            className={`flip-card-back flex flex-col items-center justify-center p-6 bg-gradient-to-br from-romantic-400 to-accent-purple text-white`}
          >
            <FaHeart className="text-white/30 text-xl mb-3" />
            <p className="font-body text-sm sm:text-base text-center leading-relaxed font-medium">
              {reason.reason}
            </p>
            <span className="text-white/30 text-xs mt-3 font-body">
              Reason #{reason.id}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReasonsILoveYou = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Reasons I Love You
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Ya 7abibi, les raisons sont infinies... voici quelques unes
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {reasons.map((reason, index) => (
          <ReasonCard
            key={reason.id}
            reason={reason}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`text-center mt-12 font-elegant text-lg italic ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}
      >
        ...w mlyoun sabab okhra, ya nour 3ini, que les mots ne peuvent exprimer 💕
      </motion.p>
    </div>
  );
};

export default ReasonsILoveYou;
