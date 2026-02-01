import Navigation from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';
import PagePlantShell from '../../components/layout/PagePlantShell';

export default function MarketingLayout({ children }) {
  return (
    <PagePlantShell>
      <Navigation />
      {children}
      <Footer />
    </PagePlantShell>
  );
}
