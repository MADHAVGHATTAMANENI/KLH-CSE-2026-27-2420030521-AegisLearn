/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bloom: {
          remember: '#3b82f6',
          understand: '#10b981',
          apply: '#f59e0b',
          analyze: '#8b5cf6',
          evaluate: '#ec4899',
          create: '#06b6d4',
        },
        dark: {
          bg: '#0b0f19',
          card: '#111827',
          hover: '#1f2937',
          border: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};
