import './globals.css';

export const metadata = {
  title: 'Christie Yoga & Ayurvedic Wellness',
  description: 'Find your inner peace through yoga and Ayurvedic wellness practices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
