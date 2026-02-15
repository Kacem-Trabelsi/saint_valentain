import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  FaPlane,
  FaHome,
  FaRing,
  FaGraduationCap,
  FaHeart,
  FaUmbrellaBeach,
  FaMoon,
  FaStar,
  FaCar,
} from 'react-icons/fa';

const dreams = [
  {
    icon: FaPlane,
    title: 'Our First Meeting',
    description: 'El youm elli bech nchoufek lel marra el oula... bech ykoun a7la youm f 7ayeti',
    timeline: 'Bientôt inshallah',
    color: 'from-blue-400 to-accent-purple',
    emoji: '✈️',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Vacances Ensemble',
    description: "A beach, a sunset, and you by my side. El ba7ar, el ghroub, w enti 7daya",
    timeline: 'Our first trip',
    color: 'from-cyan-400 to-blue-500',
    emoji: '🏖️',
  },
  {
    icon: FaCar,
    title: 'Late Night Drives',
    description: "Nemchiw f el lil bel karhba, el musique tkhabbat, w ne7kiw 3la kol 7aja",
    timeline: "One day soon",
    color: 'from-purple-400 to-accent-pink',
    emoji: '🚗',
  },
  {
    icon: FaMoon,
    title: 'Soirées Sous Les Étoiles',
    description: "Asseyons-nous ensemble et comptons les étoiles. Kol nejma nsammiha 3lik",
    timeline: "Under our sky",
    color: 'from-indigo-400 to-purple-500',
    emoji: '🌙',
  },
  {
    icon: FaGraduationCap,
    title: 'Build Our Success',
    description: "Nenj7ou m3a b3adhna, we support each other. Enti tenna w ena tennnek",
    timeline: 'Always growing',
    color: 'from-emerald-400 to-teal-500',
    emoji: '🎓',
  },
  {
    icon: FaHome,
    title: 'Notre Maison',
    description: "Dar s8ira fiha barsha 7ob, dh7ok, w enti. That's all I need, ya rou7i",
    timeline: 'Our future home',
    color: 'from-amber-400 to-orange-500',
    emoji: '🏡',
  },
  {
    icon: FaRing,
    title: 'The Big Question',
    description: "Youm bech narkha3 3la roukbti w n9ollek el klemett elli testannewhom 9albi...",
    timeline: 'When the time is right',
    color: 'from-romantic-400 to-accent-rose',
    emoji: '💍',
  },
  {
    icon: FaHeart,
    title: 'Pour Toujours',
    description: "Dima w l'ebed m3ak. Kol youm, kol lahdha, kol nefes — lik enti ya 7abibi",
    timeline: 'Eternally',
    color: 'from-accent-pink to-romantic-400',
    emoji: '♾️',
  },
  {
    icon: FaStar,
    title: 'All Our Firsts',
    description: "First hug, first walk together, first dinner, first everything... m3ak kol 7aja tkoun a7la",
    timeline: 'Can\'t wait',
    color: 'from-yellow-400 to-amber-500',
    emoji: '⭐',
  },
];

const DreamBoard = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 14 },
    },
  };

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
          Our Dream Board
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          A7lemna m3a b3adhna — Everything I want with you
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Dream cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
      >
        {dreams.map((dream, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative"
          >
            <div
              className={`rounded-2xl p-6 h-full transition-all duration-300 ${
                isDark ? 'glass' : 'glass-light'
              } hover:shadow-xl ${
                isDark ? 'hover:shadow-romantic-400/10' : 'hover:shadow-romantic-400/20'
              }`}
            >
              {/* Top row: icon + emoji */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dream.color} flex items-center justify-center`}
                >
                  <dream.icon className="text-white text-lg" />
                </div>
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                >
                  {dream.emoji}
                </motion.span>
              </div>

              {/* Title */}
              <h3
                className={`font-elegant text-lg font-semibold mb-2 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                {dream.title}
              </h3>

              {/* Description */}
              <p
                className={`font-body text-sm leading-relaxed mb-4 ${
                  isDark ? 'text-romantic-200/60' : 'text-romantic-600/60'
                }`}
              >
                {dream.description}
              </p>

              {/* Timeline badge */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dream.color}`} />
                <span
                  className={`text-xs font-body tracking-wider ${
                    isDark ? 'text-romantic-400/50' : 'text-romantic-500/50'
                  }`}
                >
                  {dream.timeline}
                </span>
              </div>
            </div>
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
        Kol hedha w akthar, inshallah m3ak ya rou7i 🤲💕
      </motion.p>
    </div>
  );
};

export default DreamBoard;
