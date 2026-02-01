import Navigation from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';
import PagePlantShell from '../../components/layout/PagePlantShell';

export default function ContentLayout({ children }) {
  return (
    <PagePlantShell>
      <Navigation />
      {children}
      <Footer />
    </PagePlantShell>
  );
}
