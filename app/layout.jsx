import './globals.css';
import Navigation from '../components/Navigation';

export const metadata = {
  title: 'Soma Living - Yoga & Ayurvedic Wellness',
  description: 'Find your inner peace through yoga and Ayurvedic wellness practices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
