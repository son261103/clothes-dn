/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Map các biến CSS vào Tailwind classes
        bg: {
          main: 'var(--color-bg-main)',
          sub: 'var(--color-bg-sub)',
          glass: 'var(--color-bg-glass)',
        },
        text: {
          main: 'var(--color-text-main)',
          sub: 'var(--color-text-sub)',
          inverse: 'var(--color-text-inverse)',
        },
        brand: {
          orange: 'var(--color-brand-orange)',
          cream: 'var(--color-brand-cream)',
          beige: 'var(--color-brand-beige)',
          dark: 'var(--color-brand-dark)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        border: 'var(--color-border)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
