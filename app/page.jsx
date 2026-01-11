import HeroSection from '../components/HeroSection';
import ImageCarousel from '../components/ImageCarousel';
import SplitSection from '../components/SplitSection';

// Sample carousel images - replace with your actual images
const carouselImages = [
  {
    src: '/images/cards/healthy-start.jpg',
    alt: 'Yoga practice',
    title: 'Mindful Movement',
    description: 'Connect breath with body through gentle yoga practice'
  },
  {
    src: '/images/cards/Release-open.jpg',
    alt: 'Meditation',
    title: 'Inner Peace',
    description: 'Find stillness and clarity through meditation'
  },
  {
    src: '/images/cards/neuro-fascial.jpg',
    alt: 'Ayurvedic herbs',
    title: 'Natural Healing',
    description: 'Discover the power of Ayurvedic herbs and remedies'
  },
  {
    src: '/images/cards/art-release.jpg',
    alt: 'Wellness journey',
    title: 'Holistic Living',
    description: 'Embrace a balanced lifestyle for body, mind, and spirit'
  }
];

export default function Home() {
  return (
    <main className="pb-20">
      <HeroSection />
      <ImageCarousel images={carouselImages} />
      <SplitSection />
    </main>
  );
}
