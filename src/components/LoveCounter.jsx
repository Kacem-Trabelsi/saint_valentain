import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaClock, FaCalendarAlt, FaInfinity } from 'react-icons/fa';

const LoveCounter = ({ startDate }) => {
  const { isDark } = useTheme();
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const counterItems = [
    { label: 'Days', value: timeElapsed.days, icon: FaCalendarAlt, color: 'from-romantic-400 to-accent-rose' },
    { label: 'Hours', value: timeElapsed.hours, icon: FaClock, color: 'from-accent-pink to-accent-purple' },
    { label: 'Minutes', value: timeElapsed.minutes, icon: FaHeart, color: 'from-accent-purple to-romantic-400' },
    { label: 'Seconds', value: timeElapsed.seconds, icon: FaInfinity, color: 'from-romantic-400 to-accent-pink' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Every Second Counts
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Since August 3, 2025 at 1:12 AM — Time spent loving you is never wasted
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Counter cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl w-full"
      >
        {counterItems.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`relative group rounded-2xl p-6 sm:p-8 text-center ${
              isDark ? 'glass' : 'glass-light'
            } transition-all duration-300`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-romantic-400 to-accent-purple" />

            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${item.color} mb-4 opacity-80`}>
              <item.icon className="text-white text-lg" />
            </div>

            {/* Value */}
            <motion.div
              key={item.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <span className={`font-elegant text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                {String(item.value).padStart(item.label === 'Days' ? 1 : 2, '0')}
              </span>
            </motion.div>

            {/* Label */}
            <span
              className={`font-body text-sm tracking-widest uppercase ${
                isDark ? 'text-romantic-300/50' : 'text-romantic-600/50'
              }`}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`mt-12 font-body text-sm ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}
      >
        ...w mazelt, ya rou7i — forever with you ♾️
      </motion.p>
    </div>
  );
};

export default LoveCounter;
