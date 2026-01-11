import './globals.css';
import { Manrope, Playfair_Display } from 'next/font/google';
import Navigation from '../components/Navigation';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: 'Soma Living - Yoga & Ayurvedic Wellness',
  description: 'Find your inner peace through yoga and Ayurvedic wellness practices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
