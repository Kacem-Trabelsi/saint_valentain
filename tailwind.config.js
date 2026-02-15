/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        romantic: ['"Great Vibes"', 'cursive'],
        elegant: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        romantic: {
          50: '#fff5f7',
          100: '#ffe0e6',
          200: '#ffb3c1',
          300: '#ff8fa3',
          400: '#ff6b9d',
          500: '#ff477e',
          600: '#c44569',
          700: '#a3375a',
          800: '#7a2a44',
          900: '#521c2e',
          950: '#0a0015',
        },
        accent: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          rose: '#F43F5E',
          gold: '#F59E0B',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glow-slow': 'glow 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        'pulse-love': 'pulse-love 3s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'love-wave': 'love-wave 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 157, 0.6), 0 0 80px rgba(236, 72, 153, 0.3)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-love': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'love-wave': {
          '0%': { transform: 'translateX(-100%) scaleY(1)' },
          '50%': { transform: 'translateX(0%) scaleY(1.5)' },
          '100%': { transform: 'translateX(100%) scaleY(1)' },
        },
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 30%, #2d1b3d 60%, #1a0a2e 100%)',
        'gradient-romantic-light': 'linear-gradient(135deg, #fff5f7 0%, #ffe0e6 30%, #f0e6ff 60%, #fff5f7 100%)',
      },
    },
  },
  plugins: [],
};
