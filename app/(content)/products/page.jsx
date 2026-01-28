import Container from '../../../components/ui/Container';
import ProductCarousel from '../../../components/products/ProductCarousel';
import { CDN_BASE } from '@/lib/media/cdn';

const featured = [
  {
    title: 'Quiet Morning Flow',
    description: 'A gentle 25-minute video practice you can download and keep. Slow pace, soft transitions, no pressure.',
    tags: ['gentle', 'morning', 'download'],
    duration: '25 min',
    imageSrc: `${CDN_BASE}/carousel-1.jpg`,
    imageAlt: 'Quiet morning flow preview',
  },
  {
    title: 'Evening Unwind Ritual',
    description: 'A calming 18-minute wind-down sequence designed for real evenings. Includes a short breath reset.',
    tags: ['evening', 'calming', 'download'],
    duration: '18 min',
    imageSrc: `${CDN_BASE}/carousel-2.jpg`,
    imageAlt: 'Evening unwind ritual preview',
  },
  {
    title: 'Steady Energy Boost',
    description: 'A grounded 20-minute flow for when you need clarity without intensity.',
    tags: ['steady', 'midday', 'download'],
    duration: '20 min',
    imageSrc: `${CDN_BASE}/carousel-3.jpg`,
    imageAlt: 'Steady energy boost preview',
  },
];

const products = [
  {
    title: 'Soft Neck + Shoulders',
    tone: 'Quiet release',
    duration: '12 min',
    price: '$6',
    imageSrc: `${CDN_BASE}/neuro-fascial.jpeg`,
    imageAlt: 'Soft neck and shoulders release',
    description: 'Gentle movements for tension relief after long days.',
  },
  {
    title: 'Grounding Breath',
    tone: 'Calm + clear',
    duration: '8 min',
    price: '$4',
    imageSrc: `${CDN_BASE}/still-waterfall.png`,
    imageAlt: 'Grounding breath preview',
    description: 'A slow breath reset to steady your nervous system.',
  },
  {
    title: 'Gentle Hips',
    tone: 'Slow ease',
    duration: '20 min',
    price: '$8',
    imageSrc: `${CDN_BASE}/healthy-start.jpeg`,
    imageAlt: 'Gentle hips preview',
    description: 'Longer holds, softer edges, and easy pacing.',
  },
  {
    title: 'Evening Downshift',
    tone: 'Wind-down',
    duration: '15 min',
    price: '$7',
    imageSrc: `${CDN_BASE}/wellness.jpg`,
    imageAlt: 'Evening downshift preview',
    description: 'Settle the day with a calm, quiet release.',
  },
  {
    title: 'Morning Mobility',
    tone: 'Light energy',
    duration: '18 min',
    price: '$7',
    imageSrc: `${CDN_BASE}/ayurveda.jpg`,
    imageAlt: 'Morning mobility preview',
    description: 'A slow‑build flow to wake up gently.',
  },
  {
    title: 'Desk Reset',
    tone: 'Simple relief',
    duration: '10 min',
    price: '$5',
    imageSrc: `${CDN_BASE}/art-release.JPEG`,
    imageAlt: 'Desk reset preview',
    description: 'Neck, shoulders, and breath for screen fatigue.',
  },
  {
    title: 'Slow Core Support',
    tone: 'Steady + kind',
    duration: '16 min',
    price: '$7',
    imageSrc: `${CDN_BASE}/Rock_RiverNh.png`,
    imageAlt: 'Slow core support preview',
    description: 'Supportive core work without strain.',
  },
  {
    title: 'Quiet Sit',
    tone: 'Stillness',
    duration: '9 min',
    price: '$4',
    imageSrc: `${CDN_BASE}/hero-background.jpg`,
    imageAlt: 'Quiet sit preview',
    description: 'A soft meditation for calm focus.',
  },
];

export default function ProductsPage() {
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/carousel-4.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/Rock_RiverNh.png')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Products</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Download content on-demand
            </h1>
            <p className="mt-3 max-w-2xl text-base text-stone-600">
              Find the perfect routines for your lifestyle.
            </p>
          </div>

          <div
            className="soft-frame rounded-[32px]"
            style={{
              '--accent-image': `url('${CDN_BASE}/carousel-2.jpg')`,
            }}
          >
            <ProductCarousel items={featured} intervalMs={9000} />
          </div>

          <div
            className="soft-frame rounded-[32px] bg-white/70 p-4 shadow-glow"
            style={{
              '--accent-image': `url('${CDN_BASE}/carousel-3.jpg')`,
            }}
          >
            <div className="grid gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.title}
                className="glass-panel soft-ring flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glow sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">{product.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-500">{product.tone}</p>
                    <p className="mt-2 text-sm text-stone-600">{product.description}</p>
                    <div className="mt-3 text-xs uppercase tracking-[0.25em] text-stone-500">
                      {product.duration}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-600">{product.price}</span>
                  <button className="rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-stone-800">
                    Buy
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
