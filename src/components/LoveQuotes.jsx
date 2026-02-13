import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const quotes = [
  {
    text: 'حبيبتي، أنتِ نور عيني وسبب سعادتي',
    translation: 'My love, you are the light of my eyes and the reason for my happiness',
    lang: 'العربية',
  },
  {
    text: 'Mon cœur ne bat que pour toi, ma vie',
    translation: 'My heart beats only for you, my life',
    lang: 'Français',
  },
  {
    text: 'Enti elli 3omrek ma tokhrej mel 9alb, ya rou7i',
    translation: "You'll never leave my heart, my soul",
    lang: 'Tounsi',
  },
  {
    text: 'Every love story is beautiful, but ours is my favorite',
    translation: '',
    lang: 'English',
  },
  {
    text: 'Tu es la plus belle chose qui me soit arrivée',
    translation: 'You are the most beautiful thing that ever happened to me',
    lang: 'Français',
  },
  {
    text: 'أحبكِ أكثر مما تتصورين، يا قلبي',
    translation: 'I love you more than you can imagine, my heart',
    lang: 'العربية',
  },
  {
    text: 'Ki nchoufek, el donya tetbaddel, enti kol 7aja',
    translation: 'When I see you, the world changes, you are everything',
    lang: 'Tounsi',
  },
  {
    text: "Je t'aime plus que les mots ne peuvent le dire, mon ange",
    translation: 'I love you more than words can say, my angel',
    lang: 'Français',
  },
  {
    text: 'وش السعد اللي جابك ليا، يا عمري',
    translation: 'What luck brought you to me, my life',
    lang: 'العربية',
  },
  {
    text: 'Même la distance ne peut pas éteindre notre flamme',
    translation: 'Even distance cannot extinguish our flame',
    lang: 'Français',
  },
];

const LoveQuotes = () => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
          Words From My Heart
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          In every language, my heart says the same thing...
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Quote carousel */}
      <div className="max-w-3xl w-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl p-10 sm:p-14 ${
              isDark ? 'glass' : 'glass-light'
            }`}
          >
            {/* Language badge */}
            <span className="inline-block px-4 py-1 rounded-full text-xs font-body tracking-wider bg-gradient-to-r from-romantic-400/20 to-accent-purple/20 text-romantic-400 mb-6">
              {quotes[currentIndex].lang}
            </span>

            {/* Quote text */}
            <p
              className={`font-elegant text-2xl sm:text-3xl md:text-4xl leading-relaxed mb-6 ${
                isDark ? 'text-romantic-100' : 'text-romantic-800'
              }`}
              dir={quotes[currentIndex].lang === 'العربية' ? 'rtl' : 'ltr'}
            >
              &ldquo;{quotes[currentIndex].text}&rdquo;
            </p>

            {/* Translation */}
            {quotes[currentIndex].translation && (
              <p
                className={`font-body text-sm italic ${
                  isDark ? 'text-romantic-300/50' : 'text-romantic-500/50'
                }`}
              >
                {quotes[currentIndex].translation}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-gradient-to-r from-romantic-400 to-accent-purple'
                  : isDark
                  ? 'bg-romantic-400/20 hover:bg-romantic-400/40'
                  : 'bg-romantic-300/30 hover:bg-romantic-300/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveQuotes;
