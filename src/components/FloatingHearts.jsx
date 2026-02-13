import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '✨', '💜', '🌸', '💫'];

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = useCallback(() => {
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: Math.random() * 16 + 12,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 2,
      swayAmount: (Math.random() - 0.5) * 100,
    };
  }, []);

  useEffect(() => {
    // Create initial batch
    const initial = Array.from({ length: 8 }, () => createParticle());
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const filtered = prev.slice(-25); // Keep max 25 particles
        return [...filtered, createParticle()];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-romantic-400/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-5s' }}
      />

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              y: '110vh',
              x: `${particle.x}vw`,
              opacity: 0,
              scale: 0.3,
              rotate: 0,
            }}
            animate={{
              y: '-10vh',
              x: `${particle.x + (Math.random() - 0.5) * 15}vw`,
              opacity: [0, 0.7, 0.5, 0],
              scale: [0.3, 1, 0.8, 0.3],
              rotate: [0, 15, -10, 20],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{ fontSize: particle.size }}
            onAnimationComplete={() => {
              setParticles((prev) =>
                prev.filter((p) => p.id !== particle.id)
              );
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
