'use client';

import HeroSection from '../../components/marketing/HeroSection';
import ImageCarousel from '../../components/marketing/ImageCarousel';
import SplitSection from '../../components/marketing/SplitSection';
import { CDN_BASE } from '@/lib/media/cdn';

// Sample carousel images - replace with your actual images
const carouselImages = [
  {
    src: `${CDN_BASE}/wellness.jpg`,
    alt: 'Wellness studio with natural light',
    title: 'Yoga improves sleep quality',
    description: 'Research shows yoga practice can improve sleep efficiency and reduce insomnia severity.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/30946665/',
    source: 'PubMed'
  },
  {
    src: `${CDN_BASE}/ayurveda.jpg`,
    alt: 'Ayurvedic herbs and mortar',
    title: 'Ayurveda reduces stress markers',
    description: 'Trials suggest adaptogens like ashwagandha can lower cortisol and perceived stress.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/23439798/',
    source: 'PubMed'
  },
  {
    src: `${CDN_BASE}/neuro-fascial.jpeg`,
    alt: 'Person practicing calm breathwork',
    title: 'Breathwork calms the nervous system',
    description: 'Slow diaphragmatic breathing can improve heart rate variability and emotional regulation.',
    href: 'https://www.frontiersin.org/articles/10.3389/fnhum.2017.00448/full',
    source: 'Frontiers in Human Neuroscience'
  },
  {
    src: `${CDN_BASE}/art-release.JPEG`,
    alt: 'Person journaling outdoors',
    title: 'Mindfulness eases anxiety',
    description: 'Mindfulness programs are associated with reduced anxiety and depressive symptoms.',
    href: 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754',
    source: 'JAMA Intern Med'
  }
];

export default function Home() {
  return (
    <main
      className="ambient-page grain-layer pb-20"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/hero-background.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/wellness.jpg')`,
      }}
    >
      <HeroSection />
      <ImageCarousel images={carouselImages} />
      <SplitSection />
    </main>
  );
}
