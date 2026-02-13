import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const loveNotes = [
  { text: "N7ebbek akthar mel klemett elli n9adder n9oulha 💕", color: 'from-romantic-400 to-accent-pink' },
  { text: "Tu me manques chaque seconde où on ne parle pas 🌙", color: 'from-accent-purple to-romantic-400' },
  { text: "Enti el 7aja el a7la elli saret f 7ayeti ✨", color: 'from-accent-pink to-accent-purple' },
  { text: "Je rêve du jour où je pourrai te serrer dans mes bras 🤗", color: 'from-romantic-400 to-accent-rose' },
  { text: "Your voice is the most beautiful sound in the world 🎵", color: 'from-accent-rose to-accent-purple' },
  { text: "9albi ma ya3ref 7ad ghirek, ya nour 3ini 💝", color: 'from-accent-purple to-romantic-400' },
  { text: "Chaque matin je remercie Dieu de t'avoir dans ma vie 🌅", color: 'from-romantic-400 to-accent-pink' },
  { text: "I fall in love with you more every single day 🌹", color: 'from-accent-pink to-accent-rose' },
  { text: "Enti el donya el kol, ya rou7i 🌍", color: 'from-accent-purple to-romantic-400' },
  { text: "Mon cœur est à toi, pour toujours et à jamais 💌", color: 'from-romantic-400 to-accent-purple' },
  { text: "Ki na7ki m3ak, el wa9t yemchi w ma n7ess bih ⏳", color: 'from-accent-rose to-romantic-400' },
  { text: "You make the distance feel like nothing 🌉", color: 'from-accent-pink to-accent-purple' },
  { text: "حبيبتي، أنتِ أجمل قصة في حياتي 📖", color: 'from-romantic-400 to-accent-rose' },
  { text: "Même à des milliers de km, mon cœur est avec toi 💗", color: 'from-accent-purple to-accent-pink' },
  { text: "W ki nor9od, enti ekher 5atra 9bal ma n8ammedh 3ini 🌙", color: 'from-romantic-400 to-accent-purple' },
  { text: "I would choose you in every lifetime, ya 7abibi ♾️", color: 'from-accent-rose to-romantic-400' },
];

const LoveLettersWall = () => {
  const { isDark } = useTheme();
  const [expandedNote, setExpandedNote] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
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
          Love Notes For You
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Kol we7da men 9albi — Each one straight from my heart
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Notes masonry grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-6xl mx-auto"
      >
        {loveNotes.map((note, index) => (
          <motion.div
            key={index}
            variants={noteVariants}
            whileHover={{ scale: 1.04, rotate: Math.random() > 0.5 ? 1 : -1 }}
            onClick={() => setExpandedNote(expandedNote === index ? null : index)}
            className={`break-inside-avoid mb-4 cursor-pointer group`}
          >
            <div
              className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 overflow-hidden ${
                isDark ? 'glass' : 'glass-light'
              } ${
                expandedNote === index
                  ? 'shadow-xl ' + (isDark ? 'shadow-romantic-400/20' : 'shadow-romantic-400/30')
                  : ''
              }`}
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${note.color} opacity-60`}
              />

              {/* Note text */}
              <p
                className={`font-elegant text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
                dir={note.text.includes('حبيبتي') || note.text.includes('أنتِ') ? 'rtl' : 'ltr'}
              >
                {note.text}
              </p>

              {/* Expand indicator */}
              <motion.div
                animate={expandedNote === index ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`mt-3 text-right text-lg ${
                  expandedNote === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                } transition-opacity`}
              >
                {expandedNote === index ? '💝' : '💌'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
        W mazelt barsha klemett f 9albi, ya 7abibi... 💕
      </motion.p>
    </div>
  );
};

export default LoveLettersWall;