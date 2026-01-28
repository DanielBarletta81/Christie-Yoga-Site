import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';

const filters = ['Dosha', 'Season', 'Duration', 'Type', 'Intention'];
const placeholders = [
  {
    title: 'Morning Grounding Flow',
    type: 'Yoga · 20 min',
    tags: ['Vata', 'Stability'],
  },
  {
    title: 'Evening Breath Reset',
    type: 'Meditation · 10 min',
    tags: ['Pitta', 'Cooling'],
  },
  {
    title: 'Kitchari Reset Bowl',
    type: 'Recipe · 35 min',
    tags: ['Kapha', 'Digestive'],
  },
  {
    title: 'Seasonal Self-Care Guide',
    type: 'Guide · 8 min read',
    tags: ['Seasonal', 'Ritual'],
  },
];

export default function LibraryPage() {
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/ayurveda.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/still-waterfall.png')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Library</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              The yoga + ayurveda library
            </h1>
            <p className="mt-3 max-w-2xl text-base text-stone-600">
              Filter by dosha, season, intention, or time. This is the calm place where every practice, recipe, and
              ritual lives.
            </p>
          </div>

          <div className="soft-frame rounded-[32px] bg-white/70 p-4 shadow-glow" style={{ '--accent-image': `url('${CDN_BASE}/healthy-start.jpeg')` }}>
            <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-stone-700 transition hover:border-stone-400"
                type="button"
              >
                {filter}
              </button>
            ))}
            </div>
          </div>

          <div className="soft-frame rounded-[32px] bg-white/70 p-4 shadow-glow" style={{ '--accent-image': `url('${CDN_BASE}/neuro-fascial.jpeg')` }}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((item) => (
              <article
                key={item.title}
                className="glass-panel soft-ring flex flex-col gap-3 rounded-3xl p-6 text-stone-900 shadow-glow"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-stone-500">{item.type}</div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-100/70 px-3 py-1 text-xs uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
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
