import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaTimes, FaHeart, FaCamera } from 'react-icons/fa';

/* ============================================
   TIMELINE MEMORIES - Customize your love story!
   Replace these with your actual memories.
   ============================================ */
const memories = [
  {
    id: 1,
    date: 'July 16, 2025',
    title: 'The First Time We Talked',
    shortDesc: 'A message on Instagram that changed everything...',
    fullDesc:
      'It all started with a simple message on Instagram. July 16th — the day I found the courage to talk to you, and the day my life changed forever. From that very first conversation, I felt something special. I knew you were different, Chams. That message was the beginning of the most beautiful story of my life.',
    emoji: '✨',
    image: '/photos/chams.jpeg',
  },
  {
    id: 2,
    date: 'August 3, 2025',
    title: 'The Day She Said Yes',
    shortDesc: 'I declared my love and she accepted...',
    fullDesc:
      'August 3rd — the day I finally told you everything in my heart. I sent you these words:\n\n"Bech n9oul hajet w nohreb\nEnti ta3refni 9adech nhebek non?\nوفي قلبي لكِ مقامٌ، لا يزول ولا ينام\nDepuis qu\'on se parle my heart found peace\nTon regard est un vers ton rire une mélodie\nI don\'t want this to be just a talking stage\nJe veux être à toi, et que tu sois à moi\nWill you be my girlfriend?"\n\nAnd you said YES. That was the most beautiful moment of my life, Chams. 💝',
    emoji: '💬',
    image: '/photos/distance-love.png',
  },
  {
    id: 3,
    date: 'One Day Soon',
    title: 'The Day We Finally Meet',
    shortDesc: 'The moment I dream about every night...',
    fullDesc:
      'I close my eyes and I imagine the moment I\'ll see you for the first time in person. 9albi bech ykhabbat, w na3ref mech bech n9adder nwa99ef men el te7kik. That day will be the most beautiful day of 7ayeti, ya 7abibi. I\'m counting every second until then.',
    emoji: '🌹',
    image: '/photos/couple-stars.png',
  },
  {
    id: 4,
    date: 'In The Future',
    title: 'Our First Trip Together',
    shortDesc: 'A dream waiting to come true...',
    fullDesc:
      'I dream about the day we\'ll travel together — discovering new places, watching sunsets side by side, getting lost in new cities with your hand in mine. Kol aventure bech tkoun alf marra a7la 5ater enti m3aya. Nwa3dek, ya rou7i, bech n7a99ouha.',
    emoji: '✈️',
    image: '/photos/planes-meeting.png',
  },
  {
    id: 5,
    date: 'Forever',
    title: 'Our Entire Future Together',
    shortDesc: 'Every promise I make to you...',
    fullDesc:
      'Manich me7taj nestanna bech na3ref — enti el we7ida. Kol youm m3ak, 7ata men b3id, y2akkadli hedha. Nwa3dek n7ebbek akther, nkoun saber, w n7areb 3lina. Youm el bo3d bech yemchi, w mayeb9a ken enti w ena, dima w l\'ebed. N7ebbek ya 7abibi.',
    emoji: '💫',
    image: '/photos/moon-couple.png',
  },
  {
    id: 6,
    date: 'Today',
    title: 'Still Falling For You',
    shortDesc: 'Every day I love you more...',
    fullDesc:
      'Kol sbe7 nfi9 w na7med rabbi elli enti f 7ayeti. 7obbi lik yekber kol youm. Lyoum, ghodwa, w dima — enti a7sen 7aja saret-li, ya nour 3ini.',
    emoji: '💝',
    image: '/photos/chams.jpeg',
  },
];

const Timeline = () => {
  const { isDark } = useTheme();
  const [selectedMemory, setSelectedMemory] = useState(null);

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
          Our Love Story
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          A journey written in the stars
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center line */}
        <div className="timeline-line" />

        {memories.map((memory, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 md:mb-16 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-row`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-4 h-4 rounded-full bg-gradient-to-br from-romantic-400 to-accent-purple shadow-lg shadow-romantic-400/30"
                />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedMemory(memory)}
                className={`cursor-pointer ml-12 md:ml-0 ${
                  isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                } md:w-[45%] w-full`}
              >
                <div
                  className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? 'glass hover:shadow-romantic-400/10'
                      : 'glass-light hover:shadow-romantic-400/20'
                  }`}
                >
                  {/* Date badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{memory.emoji}</span>
                    <span
                      className={`text-xs font-body tracking-widest uppercase ${
                        isDark ? 'text-romantic-400/60' : 'text-romantic-500/60'
                      }`}
                    >
                      {memory.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-elegant text-xl font-semibold mb-2 ${
                      isDark ? 'text-romantic-100' : 'text-romantic-800'
                    }`}
                  >
                    {memory.title}
                  </h3>

                  {/* Short description */}
                  <p
                    className={`font-body text-sm ${
                      isDark ? 'text-romantic-200/60' : 'text-romantic-600/60'
                    }`}
                  >
                    {memory.shortDesc}
                  </p>

                  {/* Click hint */}
                  <div className="flex items-center gap-1 mt-4">
                    <FaHeart className="text-romantic-400/40 text-xs" />
                    <span
                      className={`text-xs ${
                        isDark ? 'text-romantic-300/30' : 'text-romantic-500/40'
                      }`}
                    >
                      Click to read more
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-lg w-full rounded-3xl p-8 ${
                isDark
                  ? 'bg-romantic-950/95 border border-romantic-400/10'
                  : 'bg-white/95 border border-romantic-200'
              } shadow-2xl`}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark
                    ? 'text-romantic-300/60 hover:bg-romantic-400/10'
                    : 'text-romantic-500/60 hover:bg-romantic-100'
                }`}
              >
                <FaTimes />
              </button>

              {/* Emoji */}
              <div className="text-5xl mb-4">{selectedMemory.emoji}</div>

              {/* Photo */}
              {selectedMemory.image && (
                <div className="w-full rounded-xl mb-6 overflow-hidden">
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className={`w-full rounded-xl ${
                      selectedMemory.image.includes('chams.jpeg')
                        ? 'h-72 object-cover object-center'
                        : 'h-56 object-cover'
                    }`}
                  />
                </div>
              )}

              {/* Date */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-body tracking-wider bg-gradient-to-r from-romantic-400/20 to-accent-purple/20 text-romantic-400 mb-3">
                {selectedMemory.date}
              </span>

              {/* Title */}
              <h3
                className={`font-elegant text-2xl font-bold mb-4 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                {selectedMemory.title}
              </h3>

              {/* Full description */}
              <p
                className={`font-body text-sm leading-relaxed ${
                  isDark ? 'text-romantic-200/70' : 'text-romantic-600/70'
                }`}
              >
                {selectedMemory.fullDesc}
              </p>

              {/* Bottom decoration */}
              <div className="romantic-divider mt-6" />
              <p className="text-center mt-4 text-romantic-400/40 text-xs font-body">
                ❤️ A beautiful memory with you
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
