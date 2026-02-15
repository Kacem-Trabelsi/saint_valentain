import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '✨', '💜', '🌸', '💫', '🦋', '💘', '🌹'];

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = useCallback(() => {
    const type = Math.random();
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: Math.random() * 18 + 10,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 2,
      swayAmount: (Math.random() - 0.5) * 150,
      type: type > 0.7 ? 'spiral' : type > 0.4 ? 'zigzag' : 'float',
      blur: Math.random() > 0.7,
    };
  }, []);

  useEffect(() => {
    const initial = Array.from({ length: 10 }, () => createParticle());
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const filtered = prev.slice(-30);
        return [...filtered, createParticle()];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [createParticle]);

  const getAnimation = (particle) => {
    const base = {
      y: '-10vh',
      opacity: [0, 0.6, 0.5, 0.3, 0],
      scale: [0.3, 1, 0.9, 0.7, 0.2],
    };

    switch (particle.type) {
      case 'spiral':
        return {
          ...base,
          x: [
            `${particle.x}vw`,
            `${particle.x + 8}vw`,
            `${particle.x - 5}vw`,
            `${particle.x + 6}vw`,
            `${particle.x - 3}vw`,
          ],
          rotate: [0, 180, 360, 540, 720],
        };
      case 'zigzag':
        return {
          ...base,
          x: [
            `${particle.x}vw`,
            `${particle.x + 6}vw`,
            `${particle.x - 6}vw`,
            `${particle.x + 4}vw`,
            `${particle.x - 2}vw`,
          ],
          rotate: [0, 15, -15, 10, -5],
        };
      default:
        return {
          ...base,
          x: `${particle.x + (Math.random() - 0.5) * 15}vw`,
          rotate: [0, 15, -10, 20],
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-romantic-400/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-5s' }}
      />
      {/* Extra moving orbs */}
      <div
        className="absolute top-3/4 left-1/3 w-72 h-72 bg-romantic-400/3 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute top-1/3 right-1/5 w-56 h-56 bg-accent-purple/3 rounded-full blur-3xl animate-float-fast"
        style={{ animationDelay: '-2s' }}
      />

      {/* Rotating ring decorations */}
      <div className="absolute top-[20%] left-[10%] w-40 h-40 border border-romantic-400/5 rounded-full animate-spin-slow" />
      <div className="absolute bottom-[15%] right-[8%] w-60 h-60 border border-accent-purple/5 rounded-full animate-spin-reverse" />
      <div className="absolute top-[60%] left-[60%] w-32 h-32 border border-accent-pink/5 rounded-full animate-spin-slow" style={{ animationDelay: '-8s' }} />

      {/* Twinkling stars (tiny dots) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-romantic-300/30 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

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
            animate={getAnimation(particle)}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{
              fontSize: particle.size,
              filter: particle.blur ? 'blur(1px)' : 'none',
            }}
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
