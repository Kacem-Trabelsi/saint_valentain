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
        'glow': 'glow 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
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
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 30%, #2d1b3d 60%, #1a0a2e 100%)',
        'gradient-romantic-light': 'linear-gradient(135deg, #fff5f7 0%, #ffe0e6 30%, #f0e6ff 60%, #fff5f7 100%)',
      },
    },
  },
  plugins: [],
};
