import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaRedoAlt } from 'react-icons/fa';

const wishes = [
  { text: "Je souhaite te serrer dans mes bras un jour très bientôt 🤗", color: 'from-romantic-400 to-accent-rose' },
  { text: "N7eb nfi9 sbe7 w nchoufek 7daya, ya 7abibi 🌅", color: 'from-accent-pink to-accent-purple' },
  { text: "Je souhaite qu'on voyage le monde ensemble, main dans la main ✈️", color: 'from-blue-400 to-accent-purple' },
  { text: "N7eb na3mel m3ak picnic ta7t el njoumet 🌙", color: 'from-indigo-400 to-purple-500' },
  { text: "Mon voeu : te voir sourire en vrai pour la première fois 😊", color: 'from-romantic-400 to-accent-pink' },
  { text: "N7eb ne7ki m3ak 7atta norgdou m3a b3adhna 3al telephone 📞", color: 'from-accent-rose to-romantic-400' },
  { text: "Je souhaite cuisiner pour toi et te faire ton plat préféré 🍳", color: 'from-amber-400 to-orange-500' },
  { text: "أتمنى أن أمسك يدك ونمشي معًا بلا وجهة 💑", color: 'from-accent-purple to-romantic-400' },
  { text: "N7eb nchrilek warda kol youm 7atta twalli t9oul barrani 🌹", color: 'from-red-400 to-romantic-400' },
  { text: "Mon voeu : construire une maison remplie de nos rires 🏡", color: 'from-emerald-400 to-teal-500' },
  { text: "N7eb nra99esek sous la pluie, sans parapluie 🌧️", color: 'from-cyan-400 to-blue-500' },
  { text: "Je souhaite vieillir à tes côtés, ya 3omri 👴👵", color: 'from-romantic-400 to-accent-rose' },
  { text: "N7eb nchouf ghroub el shems m3ak 3la sha6i6 el ba7ar 🌅", color: 'from-orange-400 to-pink-500' },
  { text: "Mon plus grand voeu : te rendre heureuse chaque seconde de ta vie 💝", color: 'from-accent-pink to-accent-purple' },
  { text: "أتمنى أن تكوني آخر وجه أراه كل ليلة وأول وجه أراه كل صباح 🌟", color: 'from-yellow-400 to-amber-500' },
];

const PAPER_COLORS_DARK = [
  'rgba(255,107,157,0.35)',
  'rgba(236,72,153,0.3)',
  'rgba(139,92,246,0.3)',
  'rgba(244,114,182,0.3)',
  'rgba(167,139,250,0.3)',
];

const PAPER_COLORS_LIGHT = [
  'rgba(255,107,157,0.5)',
  'rgba(236,72,153,0.45)',
  'rgba(139,92,246,0.4)',
  'rgba(244,114,182,0.45)',
  'rgba(167,139,250,0.4)',
];

const WishJar = () => {
  const { isDark } = useTheme();
  const [currentWish, setCurrentWish] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [usedWishes, setUsedWishes] = useState([]);
  const [jarShake, setJarShake] = useState(false);
  const [floatingPapers, setFloatingPapers] = useState([]);

  const paperColors = isDark ? PAPER_COLORS_DARK : PAPER_COLORS_LIGHT;

  const pickWish = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setJarShake(true);
    setTimeout(() => setJarShake(false), 600);

    // Floating paper animation
    const papers = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 140,
      y: -(Math.random() * 100 + 40),
      rotate: Math.random() * 360,
    }));
    setFloatingPapers(papers);
    setTimeout(() => setFloatingPapers([]), 1200);

    // Pick a random wish not yet used
    const available = wishes.filter((_, i) => !usedWishes.includes(i));
    const pool = available.length > 0 ? available : wishes;
    const randomIndex = wishes.indexOf(pool[Math.floor(Math.random() * pool.length)]);

    setTimeout(() => {
      setCurrentWish({ ...wishes[randomIndex], index: randomIndex });
      setUsedWishes((prev) => {
        const next = [...prev, randomIndex];
        return next.length >= wishes.length ? [] : next;
      });
      setIsAnimating(false);
    }, 700);
  }, [isAnimating, usedWishes]);

  const resetJar = () => {
    setCurrentWish(null);
    setUsedWishes([]);
  };

  const remaining = wishes.length - usedWishes.length;

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Wish Jar
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Pioche un voeu du bocal, ya 7abibi — chacun vient du coeur
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      <div className="max-w-lg w-full text-center relative">
        {/* Floating papers animation */}
        <AnimatePresence>
          {floatingPapers.map((paper) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.5 }}
              animate={{
                opacity: 0,
                x: paper.x,
                y: paper.y,
                rotate: paper.rotate,
                scale: 1.1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/3 pointer-events-none z-20"
            >
              <div className={`w-6 h-8 rounded-sm shadow-lg ${
                isDark
                  ? 'bg-gradient-to-br from-romantic-400/50 to-accent-purple/40'
                  : 'bg-gradient-to-br from-romantic-400/60 to-accent-purple/50'
              }`} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ===== THE JAR ===== */}
        <motion.div
          animate={jarShake ? { rotate: [0, -4, 4, -3, 3, -1, 0], y: [0, -4, 0] } : {}}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative inline-block"
          >
            {/* Glow behind jar */}
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute -inset-6 rounded-full blur-2xl ${
                isDark ? 'bg-romantic-400/10' : 'bg-romantic-400/15'
              }`}
            />

            {/* Jar body */}
            <div
              className={`relative w-44 h-52 sm:w-52 sm:h-60 mx-auto overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10'
                  : 'bg-gradient-to-b from-white/60 to-white/30 border border-romantic-200/40'
              }`}
              style={{
                borderRadius: '12px 12px 40% 40%',
              }}
            >
              {/* Jar lid */}
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-[75%] h-7 z-10 ${
                  isDark
                    ? 'bg-gradient-to-b from-romantic-300/25 to-romantic-400/15 border border-romantic-400/20'
                    : 'bg-gradient-to-b from-romantic-300/40 to-romantic-200/30 border border-romantic-300/30'
                }`}
                style={{ borderRadius: '8px 8px 2px 2px' }}
              />

              {/* Lid knob */}
              <div
                className={`absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-3 rounded-t-full z-10 ${
                  isDark ? 'bg-romantic-300/20' : 'bg-romantic-300/35'
                }`}
              />

              {/* Papers inside jar */}
              <div className="absolute inset-0 flex flex-wrap items-end justify-center p-3 pt-8 gap-[3px] overflow-hidden">
                {wishes.map((_, i) => {
                  const isUsed = usedWishes.includes(i);
                  const colorIdx = i % paperColors.length;
                  const rotation = ((i * 37 + 13) % 50) - 25;
                  return (
                    <motion.div
                      key={i}
                      animate={
                        isUsed
                          ? { opacity: 0.1, scale: 0.6, y: 4 }
                          : {
                              opacity: 1,
                              scale: 1,
                              y: [0, -2, 0],
                              rotate: [rotation, rotation + 2, rotation],
                            }
                      }
                      transition={
                        isUsed
                          ? { duration: 0.4 }
                          : {
                              y: { duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                              rotate: { duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
                            }
                      }
                      className="w-5 h-7 rounded-sm shadow-sm"
                      style={{
                        background: paperColors[colorIdx],
                        transform: `rotate(${rotation}deg)`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Glass reflection */}
              <div className={`absolute top-4 left-2 w-4 h-[60%] rounded-full blur-sm ${
                isDark ? 'bg-white/[0.04]' : 'bg-white/30'
              }`} />

              {/* Inner glow at bottom */}
              <motion.div
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute inset-0 ${
                  isDark
                    ? 'bg-gradient-to-t from-romantic-400/10 to-transparent'
                    : 'bg-gradient-to-t from-romantic-400/15 to-transparent'
                }`}
              />
            </div>

            {/* Remaining count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 text-center text-xs font-body tracking-wider ${
                isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
              }`}
            >
              {remaining} voeux restants
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Pick button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={pickWish}
          disabled={isAnimating}
          className="relative group mb-10"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-400 to-accent-purple blur-xl"
          />
          <div className={`relative text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-body inline-flex items-center gap-3 transition-all ${
            isDark
              ? 'bg-gradient-to-r from-romantic-400 to-accent-purple text-white shadow-lg shadow-romantic-400/20'
              : 'bg-gradient-to-r from-romantic-400 to-accent-purple text-white shadow-lg shadow-romantic-400/30'
          }`}>
            <FaHeart className="text-sm" />
            <span>{currentWish ? 'Pioche un autre voeu' : 'Pioche un voeu'}</span>
          </div>
        </motion.button>

        {/* Current wish display */}
        <AnimatePresence mode="wait">
          {currentWish && (
            <motion.div
              key={currentWish.index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
              className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden ${
                isDark
                  ? 'bg-white/[0.04] border border-white/10 backdrop-blur-md'
                  : 'bg-white/70 border border-romantic-200/30 backdrop-blur-md shadow-lg shadow-romantic-100/50'
              }`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentWish.color}`} />

              {/* Decorative quote marks */}
              <div className={`absolute top-3 left-4 text-4xl font-serif select-none ${
                isDark ? 'text-romantic-400/10' : 'text-romantic-400/15'
              }`}>
                &ldquo;
              </div>

              <p
                className={`font-elegant text-lg sm:text-xl leading-relaxed relative z-10 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
                dir={currentWish.text.match(/[\u0600-\u06FF]/) ? 'rtl' : 'ltr'}
              >
                {currentWish.text}
              </p>

              {/* Bottom fold */}
              <div className={`absolute bottom-0 right-0 w-8 h-8 ${
                isDark ? 'bg-romantic-900/30' : 'bg-romantic-100/50'
              }`}
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset */}
        {usedWishes.length > 3 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={resetJar}
            className={`mt-6 block mx-auto text-xs font-body inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
              isDark
                ? 'text-romantic-300/40 hover:text-romantic-300/60 hover:bg-romantic-400/10'
                : 'text-romantic-600/40 hover:text-romantic-600/60 hover:bg-romantic-100'
            }`}
          >
            <FaRedoAlt className="text-[10px]" />
            Remettre tous les voeux
          </motion.button>
        )}
      </div>

      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`text-center mt-12 font-elegant text-base sm:text-lg italic ${
          isDark ? 'text-romantic-300/30' : 'text-romantic-600/30'
        }`}
      >
        Kol voeu men 9albi, inshallah yet7a99ou koulhom m3ak 🤲
      </motion.p>
    </div>
  );
};

export default WishJar;
