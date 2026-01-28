import Container from '../../../components/ui/Container';
import { CDN_BASE } from '@/lib/media/cdn';

const sections = [
  {
    title: 'What Ayurveda is',
    body: 'Ayurveda is a traditional system of wellness that focuses on balance. It looks at your energy, digestion, sleep, and stress patterns to help you feel steady and supported.',
  },
  {
    title: 'The three doshas',
    body: 'Vata is light and airy, Pitta is warm and focused, Kapha is steady and grounded. Everyone has a mix. The goal is not to be perfect—just to notice what brings you back to balance.',
  },
  {
    title: 'Daily rituals that help',
    body: 'Simple habits like warm water in the morning, a short walk after meals, or a calm breath reset can shift how you feel. Small steps matter more than perfect routines.',
  },
  {
    title: 'Food as support',
    body: 'Ayurveda encourages you to eat in a way that feels supportive—warm, simple, and easy to digest. You can start by noticing how foods make you feel, then adjust gently over time.',
  },
];

export default function AyurvedaPage() {
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/ayurveda.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/healthy-start.jpeg')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Ayurveda</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Ayurveda, made simple
            </h1>
            <p className="mt-4 max-w-2xl text-base text-stone-600">
              A gentle, everyday guide to balance. No jargon—just practical ways to feel better in your body.
            </p>
          </div>

          <div
            className="soft-frame rounded-[32px] bg-white/70 p-6 shadow-glow"
            style={{
              '--accent-image': `url('${CDN_BASE}/wellness.jpg')`,
            }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-white/70 p-5"
                >
                  <span className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.4em] text-stone-400">
                    ✶
                  </span>
                  <h2 className="text-lg font-semibold text-stone-900">{section.title}</h2>
                  <p className="mt-3 text-sm text-stone-600">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
