import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';

export default function AboutPage() {
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/still-waterfall.png')`,
        '--ambient-image-2': `url('${CDN_BASE}/hero-background.jpg')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">About</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              A calm place for real routines
            </h1>
            <p className="mt-4 max-w-2xl text-base text-stone-600">
              Soma Living Wellness is a gentle, grounded space for yoga, Ayurveda, and daily rituals that fit real life.
              No pressure, no performance—just steady care that supports your body and mind.
            </p>
          </div>

          <div
            className="soft-frame rounded-[32px] bg-white/70 p-6 shadow-glow"
            style={{
              '--accent-image': `url('${CDN_BASE}/ayurveda.jpg')`,
            }}
          >
            <h2 className="text-xl font-semibold text-stone-900">What to expect</h2>
            <div className="mt-4 grid gap-4 text-sm text-stone-600 md:grid-cols-2">
              <div>
                <p className="uppercase tracking-[0.25em] text-stone-500">Gentle guidance</p>
                <p className="mt-2">
                  Practices and explanations that feel simple, supportive, and easy to return to.
                </p>
              </div>
              <div>
                <p className="uppercase tracking-[0.25em] text-stone-500">Everyday rituals</p>
                <p className="mt-2">
                  Small, repeatable practices that build steadiness without adding pressure.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">Contact</h2>
            <div className="mt-4 grid gap-3 text-sm text-stone-600">
              <div>
                <p className="uppercase tracking-[0.25em] text-stone-500">Email</p>
                <p>hello@somaliving.com</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.25em] text-stone-500">Phone</p>
                <p>(000) 000-0000</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.25em] text-stone-500">Location</p>
                <p>Charlotte, NC</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
