import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  FaHeart,
  FaStar,
  FaTrophy,
  FaArrowRight,
  FaRedo,
} from 'react-icons/fa';

/* ============================================
   LOVE GAME - Customize the questions!
   Replace questions and answers with your own.
   correctAnswer is the index (0-based) of the right answer.
   ============================================ */
const questions = [
  {
    question: "What's the first thing I noticed about Chams?",
    options: ['Her smile', 'Her eyes', 'Her laugh', 'Everything at once'],
    correctAnswer: 1,
  },
  {
    question: 'What would be our perfect date?',
    options: [
      'Sunset walk on the beach',
      'Cozy movie night at home',
      'Dinner under the stars',
      'All of the above',
    ],
    correctAnswer: 3,
  },
  {
    question: "What's our love language?",
    options: [
      'Words of affirmation',
      'Quality time',
      'Physical touch',
      'All of them combined',
    ],
    correctAnswer: [0, 1],
  },
  {
    question: 'What song reminds me of Chams?',
    options: [
      'Psycholove 2 - Paranoia 08',
      'Wesh Saad - Lil Elmohamedy',
      'Zaytouna 2 - Paranoia 08',
      'All of the above',
    ],
    correctAnswer: 3,
  },
  {
    question: 'How much do I love Chams?',
    options: [
      'To the moon and back',
      'More than words can say',
      'Beyond infinity',
      'All of these combined, times a million',
    ],
    correctAnswer: 3,
  },
  {
    question: "What's my favorite thing about us?",
    options: [
      'How we laugh together',
      'How we understand each other',
      'How we grow together',
      'Literally everything',
    ],
    correctAnswer: 3,
  },
  {
    question: 'What moment am I dreaming about the most with Chams?',
    options: [
      'The day we finally meet in person',
      'Our first hug',
      'Hearing her voice for the first time face to face',
      "All of these — I can't wait for every single one",
    ],
    correctAnswer: 3,
  },
];

const scoreMessages = [
  { min: 0, max: 3, emoji: '💕', message: "Mazilna net3arfou 3la b3adhna — w hedha houa jmel el 7ob! 💕" },
  { min: 4, max: 5, emoji: '💖', message: "Ta3rafna barsha behi, ya 7abibi! Notre amour grandit chaque jour!" },
  { min: 6, max: 6, emoji: '💝', message: "Magnifique! Tu connais notre love story par cœur, ya 9albi!" },
  { min: 7, max: 7, emoji: '👑', message: "Score parfait! Enti ta3rafni akthar men ay we7ed. Arwe7na taw2em, ya rou7i! 👑" },
];

const LoveGame = () => {
  const { isDark } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const isCorrect = (questionIndex, answerIndex) => {
    const correct = questions[questionIndex].correctAnswer;
    return Array.isArray(correct) ? correct.includes(answerIndex) : correct === answerIndex;
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (isCorrect(currentQuestion, index)) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
  };

  const getScoreMessage = () => {
    return scoreMessages.find(
      (msg) => score >= msg.min && score <= msg.max
    ) || scoreMessages[scoreMessages.length - 1];
  };

  const getOptionStyle = (index) => {
    if (!isAnswered) {
      return isDark
        ? 'glass hover:bg-romantic-400/10'
        : 'glass-light hover:bg-romantic-100';
    }
    if (isCorrect(currentQuestion, index)) {
      return 'bg-green-500/20 border-green-500/40';
    }
    if (index === selectedAnswer && !isCorrect(currentQuestion, index)) {
      return 'bg-red-500/20 border-red-500/40';
    }
    return isDark ? 'glass opacity-50' : 'glass-light opacity-50';
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
          Love Game
        </h2>
        <p
          className={`font-elegant text-lg italic ${
            isDark ? 'text-romantic-200/60' : 'text-romantic-700/60'
          }`}
        >
          How well do we know each other?
        </p>
        <div className="romantic-divider mt-6" />
      </motion.div>

      {/* Game container */}
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!gameStarted ? (
            /* Start screen */
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-3xl p-8 sm:p-12 text-center ${
                isDark ? 'glass' : 'glass-light'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🎮💕
              </motion.div>
              <h3
                className={`font-elegant text-2xl font-bold mb-4 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                Ready to test our love?
              </h3>
              <p
                className={`font-body text-sm mb-8 ${
                  isDark ? 'text-romantic-200/60' : 'text-romantic-600/60'
                }`}
              >
                {questions.length} questions about us. Let&apos;s see how well
                you know our love story!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameStarted(true)}
                className="btn-romantic text-lg px-10 py-4"
              >
                <span>Start Playing 💝</span>
              </motion.button>
            </motion.div>
          ) : showResult ? (
            /* Results screen */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-3xl p-8 sm:p-12 text-center ${
                isDark ? 'glass' : 'glass-light'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {getScoreMessage().emoji}
              </motion.div>
              <FaTrophy className="text-accent-gold text-4xl mx-auto mb-4" />
              <h3
                className={`font-elegant text-2xl font-bold mb-2 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                Your Score
              </h3>
              <div className="gradient-text font-elegant text-6xl font-bold mb-4">
                {score}/{questions.length}
              </div>
              <p
                className={`font-body text-base mb-8 max-w-md mx-auto ${
                  isDark ? 'text-romantic-200/70' : 'text-romantic-600/70'
                }`}
              >
                {getScoreMessage().message}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
                className="btn-romantic px-8 py-3 inline-flex items-center gap-2"
              >
                <span className="inline-flex items-center gap-2">
                  <FaRedo className="text-sm" />
                  Play Again
                </span>
              </motion.button>
            </motion.div>
          ) : (
            /* Question screen */
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-6 sm:p-10 ${
                isDark ? 'glass' : 'glass-light'
              }`}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-xs font-body tracking-wider ${
                    isDark ? 'text-romantic-300/50' : 'text-romantic-500/50'
                  }`}
                >
                  Question {currentQuestion + 1} / {questions.length}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-accent-gold text-sm" />
                  <span
                    className={`text-xs font-body ${
                      isDark ? 'text-romantic-300/50' : 'text-romantic-500/50'
                    }`}
                  >
                    Score: {score}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className={`w-full h-1 rounded-full mb-8 ${
                  isDark ? 'bg-romantic-900/50' : 'bg-romantic-100'
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-romantic-400 to-accent-purple"
                />
              </div>

              {/* Question */}
              <h3
                className={`font-elegant text-xl sm:text-2xl font-semibold mb-8 ${
                  isDark ? 'text-romantic-100' : 'text-romantic-800'
                }`}
              >
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${getOptionStyle(
                      index
                    )} ${
                      isDark
                        ? 'border-romantic-400/10 text-romantic-100'
                        : 'border-romantic-200 text-romantic-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDark
                            ? 'bg-romantic-400/10 text-romantic-300'
                            : 'bg-romantic-100 text-romantic-600'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-body text-sm">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Next button */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p
                      className={`text-sm font-body mb-4 ${
                        isCorrect(currentQuestion, selectedAnswer)
                          ? 'text-green-400'
                          : 'text-romantic-400'
                      }`}
                    >
                      {isCorrect(currentQuestion, selectedAnswer)
                        ? "That's right! You know us so well! 💝"
                        : "The answer is love... it's always love! 💕"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextQuestion}
                      className="btn-romantic px-8 py-3 inline-flex items-center gap-2"
                    >
                      <span className="inline-flex items-center gap-2">
                        {currentQuestion < questions.length - 1
                          ? 'Next Question'
                          : 'See Results'}
                        <FaArrowRight className="text-sm" />
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveGame;
