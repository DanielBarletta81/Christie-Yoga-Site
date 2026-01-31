import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';

const sections = [
  {
    title: 'What Ayurveda is',
    body: 'Ayurveda is a traditional system of wellness that focuses on balance. It looks at your energy, digestion, sleep, and stress patterns to help you feel steady and supported.',
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

const doshas = [
  {
    name: 'Vata',
    tone: 'Light + airy',
    body: 'Movement, creativity, and change. Balance with warmth, grounding, and steady routines.',
    color: '#546E7A',
    kathaIcon: `${CDN_BASE}/icons/dosha-katha/vata-katha.svg`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#546E7A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 4c-4 2-4 6 0 8s4 6 0 8" />
      </svg>
    ),
  },
  {
    name: 'Pitta',
    tone: 'Warm + focused',
    body: 'Drive, digestion, and clarity. Balance with cooling, softness, and spaciousness.',
    color: '#C62828',
    kathaIcon: `${CDN_BASE}/icons/dosha-katha/pitta-katha.svg`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 4c2 3 1 5-1 7 2 0 3 2 3 4a3 3 0 0 1-6 0c0-2 2-4 4-6z" />
      </svg>
    ),
  },
  {
    name: 'Kapha',
    tone: 'Steady + grounded',
    body: 'Stability, strength, and calm. Balance with lightness, variety, and gentle energy.',
    color: '#6D4C41',
    kathaIcon: `${CDN_BASE}/icons/dosha-katha/kapha-katha.svg`,
    markers: [
      `${CDN_BASE}/icons/dosha-icon-system/kapha-active.svg`,
      `${CDN_BASE}/icons/dosha-icon-system/kapha-aggravating.svg`,
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6D4C41" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M8 16h8M9 18h6" />
      </svg>
    ),
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
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Ayurveda, made simple</h1>
              <div className="flex items-center gap-2">
                {doshas.map((dosha) => (
                  <img
                    key={`${dosha.name}-katha`}
                    src={dosha.kathaIcon}
                    alt=""
                    className="h-6 w-6 opacity-70"
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-base text-stone-600">
              A gentle, everyday guide to balance. No jargon—just practical ways to feel better in your body.
            </p>
          </div>

          <div
            className="soft-frame grid gap-6 rounded-[32px] bg-white/70 p-6 shadow-glow lg:grid-cols-[1.3fr_0.7fr]"
            style={{
              '--accent-image': `url('${CDN_BASE}/wellness.jpg')`,
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                {[sections[0], sections[2]].map((section) => (
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

              <div className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-white/80 p-5">
                <span className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.4em] text-stone-400">
                  ✶
                </span>
                <h2 className="text-lg font-semibold text-stone-900">{sections[1].title}</h2>
                <p className="mt-3 text-sm text-stone-600">{sections[1].body}</p>
              </div>
            </div>

            <aside className="flex flex-col gap-4 rounded-3xl border border-stone-200/70 bg-white/80 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Doshas</p>
                <h2 className="mt-2 text-lg font-semibold text-stone-900">The three energies</h2>
                <p className="mt-2 text-sm text-stone-600">
                  Each dosha has strengths and needs. You can support balance with small, steady shifts.
                </p>
              </div>

              <div className="grid gap-3">
                {doshas.map((dosha) => (
                  <div
                    key={dosha.name}
                    className="relative rounded-2xl border border-stone-200/70 bg-white/70 p-4"
                    style={{
                      borderColor: `${dosha.color}33`,
                      backgroundColor: `${dosha.color}0A`,
                    }}
                  >
                    {dosha.kathaIcon ? (
                      <img
                        src={dosha.kathaIcon}
                        alt=""
                        className="absolute right-4 top-4 h-6 w-6 opacity-60"
                      />
                    ) : null}
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{dosha.tone}</p>
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white"
                        style={{ borderColor: `${dosha.color}55`, color: dosha.color }}
                      >
                        {dosha.icon}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-stone-900">{dosha.name}</h3>
                      {dosha.markers ? (
                        <div className="flex items-center gap-2">
                          {dosha.markers.map((src) => (
                            <img key={src} src={src} alt="" className="h-5 w-5 opacity-70" />
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-stone-600">{dosha.body}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}
