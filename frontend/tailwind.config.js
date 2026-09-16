/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dae4f0',
          200: '#b8cce0',
          300: '#8fa9c9',
          400: '#6485b0',
          500: '#456798',
          600: '#36517e',
          700: '#2a4168',
          800: '#1a3a6b',
          900: '#0a1f44',
          950: '#061229',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0c8',
          200: '#f5e08e',
          300: '#f0c75e',
          400: '#e8b13a',
          500: '#d4af37',
          600: '#b8941f',
          700: '#93751a',
          800: '#7a5e1c',
          900: '#684e1d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
