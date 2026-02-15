import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { LOVE_START_DATE } from '../App';
import { FaHeart, FaCalendarAlt, FaStar, FaGift, FaBirthdayCake, FaRing } from 'react-icons/fa';

// Helper: get next occurrence of a monthiversary
const getNextMonthiversary = (startDate) => {
  const now = new Date();
  const day = startDate.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  // Try this month
  let next = new Date(year, month, day);
  if (next <= now) {
    // Try next month
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    next = new Date(year, month, day);
  }

  // Calculate which monthiversary number this is
  const startMonth = startDate.getFullYear() * 12 + startDate.getMonth();
  const nextMonth = next.getFullYear() * 12 + next.getMonth();
  const monthNumber = nextMonth - startMonth;

  return { date: next, label: `${monthNumber} mois ensemble`, monthNumber };
};

// Helper: get next anniversary
const getNextAnniversary = (startDate) => {
  const now = new Date();
  let year = now.getFullYear();
  let next = new Date(year, startDate.getMonth(), startDate.getDate());
  if (next <= now) {
    next = new Date(year + 1, startDate.getMonth(), startDate.getDate());
  }
  const yearNumber = next.getFullYear() - startDate.getFullYear();
  return { date: next, label: `${yearNumber} an${yearNumber > 1 ? 's' : ''} d'amour`, yearNumber };
};

// Helper: get next Valentine's Day
const getNextValentine = () => {
  const now = new Date();
  let year = now.getFullYear();
  let next = new Date(year, 1, 14);
  if (next <= now) {
    next = new Date(year + 1, 1, 14);
  }
  return { date: next, label: "Saint Valentin" };
};

const getTimeUntil = (targetDate) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
};

const CountdownCard = ({ event, isDark, index }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeUntil(event.date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntil(event.date));
    }, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group relative rounded-2xl p-6 transition-all duration-300 ${
        isDark ? 'glass' : 'glass-light'
      } hover:shadow-xl ${
        isDark ? 'hover:shadow-romantic-400/10' : 'hover:shadow-romantic-400/20'
      }`}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} mb-4`}
      >
        <event.icon className="text-white text-lg" />
      </div>

      {/* Title & date */}
      <h3
        className={`font-elegant text-lg font-semibold mb-1 ${
          isDark ? 'text-romantic-100' : 'text-romantic-800'
        }`}
      >
        {event.title}
      </h3>
      <p
        className={`text-xs font-body mb-4 ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'
        }`}
      >
        {formatDate(event.date)}
      </p>

      {/* Countdown digits */}
      {timeLeft.isPast ? (
        <div className="text-center">
          <span className="text-2xl">🎉</span>
          <p className={`font-elegant text-sm italic mt-1 ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-600/60'
          }`}>
            C'est aujourd'hui !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: timeLeft.days, label: 'Jours' },
            { value: timeLeft.hours, label: 'Heures' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((unit) => (
            <div key={unit.label} className="text-center">
              <div
                className={`font-elegant text-2xl font-bold ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <div
                className={`text-[10px] font-body uppercase tracking-wider ${
                  isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'
                }`}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtitle */}
      <p
        className={`text-xs font-body mt-4 italic ${
          isDark ? 'text-romantic-200/40' : 'text-romantic-600/40'
        }`}
      >
        {event.subtitle}
      </p>
    </motion.div>
  );
};

const LoveCountdown = () => {
  const { isDark } = useTheme();

  const monthiversary = getNextMonthiversary(LOVE_START_DATE);
  const anniversary = getNextAnniversary(LOVE_START_DATE);
  const valentine = getNextValentine();

  const events = [
    {
      title: monthiversary.label,
      date: monthiversary.date,
      subtitle: `Notre ${monthiversary.monthNumber}ème mois, ya 7abibi 💕`,
      icon: FaCalendarAlt,
      color: 'from-romantic-400 to-accent-rose',
    },
    {
      title: anniversary.label,
      date: anniversary.date,
      subtitle: `${anniversary.yearNumber} an${anniversary.yearNumber > 1 ? 's' : ''} de bonheur ensemble 🎊`,
      icon: FaRing,
      color: 'from-accent-pink to-accent-purple',
    },
    {
      title: valentine.label,
      date: valentine.date,
      subtitle: "La fête des amoureux, m3a b3adhna 💝",
      icon: FaHeart,
      color: 'from-red-400 to-romantic-400',
    },
    {
      title: "Notre Rencontre",
      date: (() => {
        const now = new Date();
        // Next July 16
        let year = now.getFullYear();
        let d = new Date(year, 6, 16);
        if (d <= now) d = new Date(year + 1, 6, 16);
        return d;
      })(),
      subtitle: "L'anniversaire du jour où tout a commencé 💬",
      icon: FaStar,
      color: 'from-accent-purple to-romantic-400',
    },
  ];

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
          Counting Down To Us
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Chaque seconde nous rapproche, ya rou7i
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Countdown cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <CountdownCard
            key={event.title}
            event={event}
            isDark={isDark}
            index={index}
          />
        ))}
      </div>

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
        Kol youm elli y3addi y9arrebna akther lel a7lem mte3na, ya 7abibi 🤲💕
      </motion.p>
    </div>
  );
};

export default LoveCountdown;
