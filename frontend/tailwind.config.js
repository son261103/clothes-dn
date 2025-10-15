/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Golden rice color palette
        'golden-rice': {
          50: '#fefdf8',
          100: '#fdfbf0',
          200: '#f8f4e0',
          300: '#f2ecc8',
          400: '#eadfad',
          500: '#e4d092', // Main golden rice color
          600: '#d4b96e',
          700: '#ba9d52',
          800: '#9e8345',
          900: '#856f3e',
        },
        // Accent colors
        'accent': {
          50: '#fff5f5',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}