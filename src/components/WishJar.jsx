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

const WishJar = () => {
  const { isDark } = useTheme();
  const [currentWish, setCurrentWish] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [usedWishes, setUsedWishes] = useState([]);
  const [jarShake, setJarShake] = useState(false);
  const [floatingPapers, setFloatingPapers] = useState([]);

  const pickWish = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setJarShake(true);
    setTimeout(() => setJarShake(false), 600);

    // Floating paper animation
    const papers = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: -(Math.random() * 80 + 40),
      rotate: Math.random() * 360,
    }));
    setFloatingPapers(papers);
    setTimeout(() => setFloatingPapers([]), 1000);

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
    }, 600);
  }, [isAnimating, usedWishes]);

  const resetJar = () => {
    setCurrentWish(null);
    setUsedWishes([]);
  };

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
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
                scale: 1.2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 text-2xl pointer-events-none z-20"
            >
              📜
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Jar visual */}
        <motion.div
          animate={jarShake ? { rotate: [-3, 3, -3, 3, 0], y: [0, -5, 0] } : {}}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-8"
        >
          {/* Jar */}
          <div
            className={`relative w-48 h-56 mx-auto rounded-b-[40%] overflow-hidden border-2 ${
              isDark
                ? 'border-romantic-400/20 bg-romantic-950/40'
                : 'border-romantic-300/30 bg-white/30'
            }`}
            style={{
              backdropFilter: 'blur(8px)',
              borderTop: 'none',
            }}
          >
            {/* Jar lid */}
            <div
              className={`absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 rounded-t-lg border-2 ${
                isDark
                  ? 'border-romantic-400/30 bg-romantic-900/80'
                  : 'border-romantic-300/40 bg-romantic-100/80'
              }`}
            />

            {/* Papers inside jar */}
            <div className="absolute inset-0 flex flex-wrap items-end justify-center gap-1 p-4 pt-6">
              {wishes.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, Math.random() * 6 - 3, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className={`w-6 h-4 rounded-sm ${
                    usedWishes.includes(i)
                      ? 'opacity-20'
                      : 'opacity-70'
                  }`}
                  style={{
                    background: `hsl(${340 + i * 8}, 70%, ${60 + (i % 3) * 10}%)`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Glass reflection */}
            <div className="absolute top-0 left-2 w-6 h-full bg-white/5 rounded-full blur-sm" />
          </div>

          {/* Label */}
          <div className={`mt-3 text-center text-xs font-body ${
            isDark ? 'text-romantic-300/40' : 'text-romantic-500/40'
          }`}>
            {wishes.length - usedWishes.length} voeux restants 💕
          </div>
        </motion.div>

        {/* Pick button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={pickWish}
          disabled={isAnimating}
          className="relative group mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-400 to-accent-purple opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
          <div className="relative btn-romantic text-lg px-10 py-4 rounded-full font-body inline-flex items-center gap-3">
            <FaHeart className="text-sm" />
            <span>Piocher un voeu</span>
          </div>
        </motion.button>

        {/* Wish card display */}
        <AnimatePresence mode="wait">
          {currentWish && (
            <motion.div
              key={currentWish.index}
              initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className={`rounded-2xl p-8 relative overflow-hidden ${
                isDark ? 'glass' : 'glass-light'
              }`}
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentWish.color}`}
              />

              {/* Wish content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl mb-4">📜</div>
                <p
                  className={`font-elegant text-xl leading-relaxed ${
                    isDark ? 'text-romantic-100' : 'text-romantic-800'
                  }`}
                >
                  {currentWish.text}
                </p>
              </motion.div>

              {/* Paper fold decoration */}
              <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden">
                <div
                  className={`w-12 h-12 rotate-45 translate-x-2 translate-y-2 ${
                    isDark ? 'bg-romantic-900/50' : 'bg-romantic-100/50'
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset button */}
        {usedWishes.length > 3 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={resetJar}
            className={`mt-6 text-xs font-body inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isDark
                ? 'text-romantic-300/40 hover:text-romantic-300/70 hover:bg-romantic-400/10'
                : 'text-romantic-500/40 hover:text-romantic-500/70 hover:bg-romantic-100'
            }`}
          >
            <FaRedoAlt className="text-xs" />
            Remplir le bocal à nouveau
          </motion.button>
        )}
      </div>

      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`text-center mt-10 font-elegant text-lg italic ${
          isDark ? 'text-romantic-300/40' : 'text-romantic-600/40'
        }`}
      >
        Kol voeu men 9albi, inshallah yet7a99ou koulhom m3ak 🤲
      </motion.p>
    </div>
  );
};

export default WishJar;
