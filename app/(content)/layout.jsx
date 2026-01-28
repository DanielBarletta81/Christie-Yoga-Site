import Navigation from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';

export default function ContentLayout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
