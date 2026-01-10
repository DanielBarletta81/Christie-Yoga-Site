import HeroSection from '../components/HeroSection';
import ImageCarousel from '../components/ImageCarousel';
import SplitSection from '../components/SplitSection';

// Sample carousel images - replace with your actual images
const carouselImages = [
  {
    src: '/images/carousel-1.jpg',
    alt: 'Yoga practice',
    title: 'Mindful Movement',
    description: 'Connect breath with body through gentle yoga practice'
  },
  {
    src: '/images/carousel-2.jpg',
    alt: 'Meditation',
    title: 'Inner Peace',
    description: 'Find stillness and clarity through meditation'
  },
  {
    src: '/images/carousel-3.jpg',
    alt: 'Ayurvedic herbs',
    title: 'Natural Healing',
    description: 'Discover the power of Ayurvedic herbs and remedies'
  },
  {
    src: '/images/carousel-4.jpg',
    alt: 'Wellness journey',
    title: 'Holistic Living',
    description: 'Embrace a balanced lifestyle for body, mind, and spirit'
  }
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImageCarousel images={carouselImages} />
      <SplitSection />
    </main>
  );
}
