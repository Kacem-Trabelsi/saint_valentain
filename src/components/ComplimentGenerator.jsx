import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaRedoAlt } from 'react-icons/fa';

const compliments = [
  { text: "Enti a7la bnaya f el donya ya 7abibi 🌹", lang: 'Tounsi' },
  { text: "Tu es la femme la plus magnifique que j'ai jamais vue 💫", lang: 'Français' },
  { text: "Your smile could light up the entire universe ☀️", lang: 'English' },
  { text: "أنتِ أجمل من كل نجوم السماء ⭐", lang: 'العربية' },
  { text: "Ki te7ki, 9albi ykhabbat w el donya tokhla7 🦋", lang: 'Tounsi' },
  { text: "Ton rire est ma mélodie préférée 🎵", lang: 'Français' },
  { text: "You have the most beautiful soul I've ever known 💝", lang: 'English' },
  { text: "3inik a7la men el ba7ar w el sma m3a b3adhhom 🌊", lang: 'Tounsi' },
  { text: "Chaque jour tu deviens encore plus belle, mon ange 🌸", lang: 'Français' },
  { text: "أنتِ سبب كل الفرحة في حياتي 🌈", lang: 'العربية' },
  { text: "Even the moon is jealous of how beautiful you are 🌙", lang: 'English' },
  { text: "Enti 9awiya, dhkiya, w jmila — kol 7aja n7ebha fik 💪", lang: 'Tounsi' },
  { text: "Tu es mon étoile dans la nuit la plus sombre ✨", lang: 'Français' },
  { text: "I love the way you see the world — through kind eyes 👀", lang: 'English' },
  { text: "Sot'ek a7la 7aja nsam3ha f nhari 🎧", lang: 'Tounsi' },
  { text: "Tu mérites tout le bonheur du monde, et plus encore 🌍", lang: 'Français' },
  { text: "حبيبتي، وجهك نور، وقلبك أنقى من الماء 💎", lang: 'العربية' },
  { text: "Your strength and grace inspire me every single day 🌟", lang: 'English' },
  { text: "Men awwel ma 3raftek w 7ayeti tbaddlet lel a7sen 🔄", lang: 'Tounsi' },
  { text: "Je suis l'homme le plus chanceux parce que tu m'as choisi 🍀", lang: 'Français' },
  { text: "You are not just beautiful outside — your heart is pure gold 💛", lang: 'English' },
  { text: "Kol ma nchouf swartek, 9albi yzid y7ebbek 📸", lang: 'Tounsi' },
  { text: "أنتِ حلم أصبح حقيقة 🦢", lang: 'العربية' },
  { text: "Ta présence suffit à rendre n'importe quel jour parfait ☁️", lang: 'Français' },
];

const ComplimentGenerator = () => {
  const { isDark } = useTheme();
  const [currentCompliment, setCurrentCompliment] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hearts, setHearts] = useState([]);

  const generateCompliment = useCallback(() => {
    setIsAnimating(true);
    
    // Add heart burst
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: -(Math.random() * 150 + 50),
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 1000);

    // Pick random compliment (different from current)
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * compliments.length);
    } while (compliments[newIndex] === currentCompliment && compliments.length > 1);
    
    setTimeout(() => {
      setCurrentCompliment(compliments[newIndex]);
      setIsAnimating(false);
    }, 200);
  }, [currentCompliment]);

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          How Beautiful You Are
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          Appuie et découvre à quel point tu es spéciale, ya 7abibi
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Compliment display */}
      <div className="max-w-xl w-full text-center relative">
        {/* Heart burst */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, x: heart.x, y: heart.y, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 text-2xl pointer-events-none z-20"
            >
              ❤️
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Compliment card */}
        <div
          className={`rounded-3xl p-8 sm:p-12 min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden ${
            isDark ? 'glass' : 'glass-light'
          }`}
        >
          <AnimatePresence mode="wait">
            {currentCompliment ? (
              <motion.div
                key={currentCompliment.text}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Language badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-body tracking-wider bg-gradient-to-r from-romantic-400/20 to-accent-purple/20 text-romantic-400 mb-6">
                  {currentCompliment.lang}
                </span>

                {/* Compliment text */}
                <p
                  className={`font-elegant text-xl sm:text-2xl md:text-3xl leading-relaxed ${
                    isDark ? 'text-romantic-100' : 'text-romantic-800'
                  }`}
                  dir={currentCompliment.lang === 'العربية' ? 'rtl' : 'ltr'}
                >
                  {currentCompliment.text}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  💝
                </motion.div>
                <p
                  className={`font-elegant text-lg italic ${
                    isDark ? 'text-romantic-200/50' : 'text-romantic-600/50'
                  }`}
                >
                  Appuie sur le bouton, ya 7abibi...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generate button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={generateCompliment}
          disabled={isAnimating}
          className="mt-8 relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-400 to-accent-purple opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
          <div className="relative btn-romantic text-lg px-10 py-4 rounded-full font-body inline-flex items-center gap-3">
            <span>
              {currentCompliment ? (
                <span className="inline-flex items-center gap-2">
                  <FaRedoAlt className="text-sm" />
                  Encore un compliment
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <FaHeart />
                  Découvre, ya 7abibi
                </span>
              )}
            </span>
          </div>
        </motion.button>

        {/* Counter */}
        {currentCompliment && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-xs font-body ${
              isDark ? 'text-romantic-300/30' : 'text-romantic-500/30'
            }`}
          >
            {compliments.length} compliments w mazelt barsha... 💕
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ComplimentGenerator;
