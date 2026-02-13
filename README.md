# 💝 For Chams — A Valentine's Day Love Letter

A beautiful, interactive, and cinematic Valentine's Day web experience built with love.

## ✨ Features

- **Animated Landing Page** — Typewriter love message, floating hearts, and glowing particles
- **Love Counter** — Live timer counting every second since you met
- **Love Timeline** — Interactive timeline of your memories together
- **Reasons I Love You** — 12 animated flip cards with romantic reasons
- **Love Game** — Interactive quiz about your relationship
- **Surprise Love Letter** — Hidden romantic letter with optional background music
- **Final Page** — "Will you be my Valentine?" with confetti celebration
- **Easter Egg** — Click the heart 5 times on the landing page for a secret message!
- **Dark/Light Mode** — Romantic theme toggle
- **Fully Responsive** — Beautiful on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to project folder
cd "projet chams"

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Change the Love Start Date
Edit `src/App.jsx` and update the `LOVE_START_DATE`:

```js
// Month is 0-indexed: January = 0, February = 1, etc.
export const LOVE_START_DATE = new Date(2024, 0, 1); // January 1, 2024
```

### Add Your Photos
Replace the image placeholders in the Timeline modal with your actual photos.

### Customize Memories
Edit the `memories` array in `src/components/Timeline.jsx` with your real memories.

### Add Background Music
Place your romantic song file at:
```
public/music/romantic-song.mp3
```

### Customize Love Game Questions
Edit the `questions` array in `src/components/LoveGame.jsx`.

### Customize Reasons
Edit the `reasons` array in `src/components/ReasonsILoveYou.jsx`.

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite 5** — Lightning fast build tool
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 11** — Smooth animations
- **Canvas Confetti** — Celebration effects
- **React Icons** — Beautiful icons
- **Google Fonts** — Great Vibes, Playfair Display, Poppins

## 📁 Project Structure

```
projet chams/
├── public/
│   └── music/              # Place romantic-song.mp3 here
├── src/
│   ├── components/
│   │   ├── FloatingHearts.jsx    # Background animated particles
│   │   ├── Landing.jsx           # Hero + typewriter + easter egg
│   │   ├── LoveCounter.jsx       # Live time counter
│   │   ├── Timeline.jsx          # Memory timeline + modal
│   │   ├── ReasonsILoveYou.jsx   # Flip card reasons
│   │   ├── LoveGame.jsx          # Interactive quiz
│   │   ├── SurpriseButton.jsx    # Love letter surprise
│   │   ├── FinalPage.jsx         # Valentine question + confetti
│   │   ├── ThemeToggle.jsx       # Dark/light mode
│   │   └── Navbar.jsx            # Side navigation dots
│   ├── context/
│   │   └── ThemeContext.jsx      # Theme state management
│   ├── App.jsx                   # Main app + configuration
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles + animations
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 💕 Made with Love

This project was made with all my heart, for the most beautiful person in my world — **Chams** ❤️
