import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/* Love story chapters */
const STORY_CHAPTERS = [
  {
    id: 1,
    emoji: '✨',
    title: 'Le Destin',
    titleEn: 'Destiny',
    date: 'The Beginning',
    text: "Parmi des millions de personnes dans ce monde, nos chemins se sont croisés. Comme si l'univers avait toujours su qu'on était faits l'un pour l'autre.",
    textTn: "Men bin el melyin, el mektoub jebna l ba3dhna. Kima el qamar wel shems.",
    color: 'from-purple-400 to-pink-400',
    bg: 'bg-purple-500/5',
  },
  {
    id: 2,
    emoji: '💬',
    title: 'Les Premiers Mots',
    titleEn: 'First Words',
    date: 'The Spark',
    text: "Les premiers messages, les premières conversations qui duraient des heures sans qu'on s'en rende compte. Chaque mot illuminait la journée.",
    textTn: "Awel kelma, awel message... w men ghodwa ma 9dehrch yod5ol min ghir ma y7eki m3ak.",
    color: 'from-pink-400 to-rose-400',
    bg: 'bg-pink-500/5',
  },
  {
    id: 3,
    emoji: '🦋',
    title: 'Les Papillons',
    titleEn: 'Butterflies',
    date: 'Falling',
    text: "Ce moment où j'ai réalisé que tu n'étais pas juste quelqu'un de spécial — tu étais tout. Mon cœur battait plus fort à chaque notification, à chaque appel.",
    textTn: "El le7dha elli fahem-ha — mouch juste special, heya kol 7aja. 9albou yod5ol f crash ki ychouf esm-ha.",
    color: 'from-rose-400 to-red-400',
    bg: 'bg-rose-500/5',
  },
  {
    id: 4,
    emoji: '☀️',
    title: 'Mon Soleil',
    titleEn: 'My Sun',
    date: '3 Août 2025',
    text: "Le jour où tout est devenu officiel. J'ai trouvé mon soleil. Et depuis ce jour, chaque matin est plus lumineux, chaque nuit est plus douce.",
    textTn: "El youm elli kol chay wala official. L9a shemsu. W men youm-ha, el donya wlat a7la.",
    color: 'from-amber-400 to-orange-400',
    bg: 'bg-amber-500/5',
  },
  {
    id: 5,
    emoji: '💝',
    title: "L'Amour Profond",
    titleEn: 'Deep Love',
    date: "Chaque Jour",
    text: "Chaque jour qui passe, l'amour grandit encore plus. Ce n'est pas juste un sentiment — c'est une certitude, une vérité absolue gravée dans l'âme.",
    textTn: "Kol youm, el 7ob yekber akther. Mouch just e7sass — heya 7a9i9a maktoba f rou7ou.",
    color: 'from-red-400 to-pink-500',
    bg: 'bg-red-500/5',
  },
  {
    id: 6,
    emoji: '♾️',
    title: 'Pour Toujours',
    titleEn: 'Forever',
    date: "L'Éternité",
    text: "Cette histoire n'a pas de fin. Deux âmes liées pour l'éternité. Peu importe ce que la vie apporte, cet amour restera inébranlable.",
    textTn: "El 9essa hedhi ma 3andha 5er. Rou7in marboutin lel abad. Mahma sar, el 7obb ma yetzalzelch.",
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-500/5',
  },
];

const OurStory = () => {
  const { isDark } = useTheme();
  const [activeChapter, setActiveChapter] = useState(null);
  const [showTounsi, setShowTounsi] = useState({});

  const toggleLanguage = (id) => {
    setShowTounsi((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-5xl mb-4"
        >
          📖
        </motion.div>
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Our Love Story
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          9essitna — Notre histoire d&apos;amour
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Story chapters */}
      <div className="max-w-3xl mx-auto space-y-6">
        {STORY_CHAPTERS.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <motion.div
              onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
                isDark ? 'glass' : 'glass-light'
              } ${activeChapter === chapter.id ? 'ring-1 ring-romantic-400/30' : ''}`}
            >
              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${chapter.color}`} />

              <div className="p-6 sm:p-8">
                {/* Chapter header */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.span
                    animate={activeChapter === chapter.id ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl sm:text-4xl"
                  >
                    {chapter.emoji}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className={`font-romantic text-2xl sm:text-3xl ${
                      isDark ? 'text-romantic-100' : 'text-romantic-800'
                    }`}>
                      {chapter.title}
                    </h3>
                    <p className={`text-xs font-body tracking-wider uppercase ${
                      isDark ? 'text-romantic-400/40' : 'text-romantic-500/40'
                    }`}>
                      {chapter.date} — {chapter.titleEn}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: activeChapter === chapter.id ? 180 : 0 }}
                    className={`text-sm ${isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'}`}
                  >
                    ▼
                  </motion.div>
                </div>

                {/* Chapter content */}
                <AnimatePresence>
                  {activeChapter === chapter.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <div className={`rounded-xl p-4 sm:p-5 mb-3 ${chapter.bg}`}>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className={`font-elegant text-base sm:text-lg leading-relaxed ${
                            isDark ? 'text-romantic-100/90' : 'text-romantic-800/90'
                          }`}
                        >
                          {showTounsi[chapter.id] ? chapter.textTn : chapter.text}
                        </motion.p>
                      </div>

                      {/* Language toggle */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLanguage(chapter.id);
                        }}
                        className={`text-xs font-body tracking-wider px-3 py-1 rounded-full transition-all ${
                          isDark
                            ? 'bg-romantic-400/10 text-romantic-300/60 hover:bg-romantic-400/20'
                            : 'bg-romantic-400/10 text-romantic-600/60 hover:bg-romantic-400/20'
                        }`}
                      >
                        {showTounsi[chapter.id] ? '🇫🇷 Lire en Français' : '🇹🇳 Lire en Tounsi'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Connection line between chapters */}
            {index < STORY_CHAPTERS.length - 1 && (
              <div className="flex justify-center py-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`w-[1px] h-8 origin-top ${
                    isDark
                      ? 'bg-gradient-to-b from-romantic-400/20 to-transparent'
                      : 'bg-gradient-to-b from-romantic-400/15 to-transparent'
                  }`}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mt-16"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block text-3xl sm:text-4xl"
        >
          💕
        </motion.div>
        <p className={`mt-2 font-elegant text-sm italic ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}>
          ...w el 9essa mazelet fi awalha 💕
        </p>
      </motion.div>
    </div>
  );
};

export default OurStory;
