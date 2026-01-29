/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0E1115',
          secondary: '#0B0E11',
          surface: '#11161C',
        },
        text: {
          primary: '#E6E9EC',
          secondary: 'rgba(230,233,236,0.75)',
          muted: 'rgba(230,233,236,0.55)',
        },
        chakra: {
          root: '#E57373',
          sacral: '#FFB74D',
          solar: '#FFF176',
          heart: '#81C784',
          throat: '#64B5F6',
          thirdEye: '#9575CD',
          crown: '#BA68C8',
        },
        dosha: {
          vata: '#546E7A',
          pitta: '#C62828',
          kapha: '#6D4C41',
        },
        neutral: {
          900: '#0E1115',
          800: '#141A21',
          700: '#1C2228',
          600: '#2A3138',
          500: '#3A424A',
        },
      },
      spacing: {
        section: '1.5rem',
        block: '1rem',
        tight: '0.75rem',
        loose: '2rem',
      },
      borderRadius: {
        pill: '999px',
        card: '1.125rem',
        modal: '1.25rem',
      },
      boxShadow: {
        chakra: '0 0 48px var(--chakra-color)',
        soft: '0 0 0 1px rgba(255,255,255,0.06)',
        tray: '0 -1px 0 rgba(255,255,255,0.04)',
      },
      transitionDuration: {
        calm: '400ms',
        slow: '700ms',
      },
      transitionTimingFunction: {
        'ease-calm': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
