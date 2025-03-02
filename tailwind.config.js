/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-pink': '#ff00ff',
        'neon-purple': '#b026ff',
        'neon-green': '#0fff50',
        'cyber-black': '#0a0a0f',
        'cyber-dark': '#121223',
        'cyber-gray': '#1e1e2f',
        'cyber-light': '#2a2a3a'
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif']
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' }
        },
        glow: {
          '0%': { textShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '100%': { textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(18, 18, 35, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 18, 35, 0.9) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(to right, #121223, #1e1e2f)',
        'neon-gradient': 'linear-gradient(to right, #00f3ff, #b026ff, #ff00ff)'
      },
      backgroundSize: {
        'cyber-grid': '30px 30px'
      }
    },
  },
  plugins: [],
};