/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        brand: {
          50: '#f8f2ed',
          100: '#efe5da',
          200: '#ddc8b5',
          300: '#c5a98f',
          400: '#ad8a6a',
          500: '#8b7355',
          600: '#6f5a42',
          700: '#534231',
          800: '#3b2f24',
          900: '#2c241d',
        },
      },
      boxShadow: {
        glow: '0 20px 60px -30px rgba(28, 24, 18, 0.45)',
      },
    },
  },
  plugins: [],
};
