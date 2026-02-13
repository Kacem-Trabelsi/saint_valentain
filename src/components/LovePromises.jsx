import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  FaHeart,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaPlane,
  FaHome,
  FaStar,
  FaInfinity,
  FaMoon,
} from 'react-icons/fa';

const promises = [
  {
    icon: FaHandHoldingHeart,
    title: 'I promise to always be there',
    text: "Even when the distance is hard, I'll never let you feel alone, ya 7abibi.",
    color: 'from-romantic-400 to-accent-rose',
  },
  {
    icon: FaShieldAlt,
    title: 'I promise to protect your heart',
    text: "Your heart is the most precious thing I've ever held. I'll guard it with my life, mon ange.",
    color: 'from-accent-pink to-accent-purple',
  },
  {
    icon: FaPlane,
    title: 'I promise to close the distance',
    text: "One day, there will be no more screens between us. I'll cross every ocean for you, ya 9albi.",
    color: 'from-accent-purple to-romantic-400',
  },
  {
    icon: FaHome,
    title: "I promise to build our future",
    text: "A home filled with love, laughter, and your beautiful smile. That's my dream, ma vie.",
    color: 'from-romantic-400 to-accent-pink',
  },
  {
    icon: FaStar,
    title: 'I promise to make you proud',
    text: "I'll work hard every day to become the man you deserve, ya nour 3ini.",
    color: 'from-accent-rose to-accent-purple',
  },
  {
    icon: FaMoon,
    title: 'I promise to love you endlessly',
    text: "Through every hardship, every doubt, my love for you will only grow stronger, حبيبتي.",
    color: 'from-accent-purple to-romantic-400',
  },
  {
    icon: FaInfinity,
    title: 'I promise you forever',
    text: "Not just today, not just tomorrow — forever. You are my beginning and my end, mon amour.",
    color: 'from-romantic-400 to-accent-rose',
  },
  {
    icon: FaHeart,
    title: 'I promise to never give up on us',
    text: "No matter what life throws at us, I choose you. Always. يا عمري, you are my everything.",
    color: 'from-accent-pink to-accent-purple',
  },
];

const LovePromises = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          My Promises To You
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Wa3di lik, ya rou7i — my word is my bond
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Promise cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
      >
        {promises.map((promise, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`group relative rounded-2xl p-6 transition-all duration-300 ${
              isDark ? 'glass' : 'glass-light'
            } hover:shadow-xl ${
              isDark ? 'hover:shadow-romantic-400/10' : 'hover:shadow-romantic-400/20'
            }`}
          >
            {/* Glow on hover */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${promise.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${promise.color} mb-4`}
            >
              <promise.icon className="text-white text-lg" />
            </div>

            {/* Title */}
            <h3
              className={`font-elegant text-lg font-semibold mb-3 ${
                isDark ? 'text-romantic-100' : 'text-romantic-800'
              }`}
            >
              {promise.title}
            </h3>

            {/* Text */}
            <p
              className={`font-body text-sm leading-relaxed ${
                isDark ? 'text-romantic-200/60' : 'text-romantic-600/60'
              }`}
            >
              {promise.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`text-center mt-12 font-elegant text-lg italic ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}
      >
        هذي وعودي ليك، يا حبيبتي — These are my promises to you, forever 💍
      </motion.p>
    </div>
  );
};

export default LovePromises;
