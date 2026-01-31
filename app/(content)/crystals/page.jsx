import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';
import { getContentBySlug } from '../../../lib/content';

const data = getContentBySlug('crystals');

export default function CrystalsPage() {
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/bg/buddha-sit.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/art-release.JPEG')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Crystals</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              {data.title}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-stone-500">{data.subtitle}</p>
            <p className="mt-4 max-w-2xl text-base text-stone-600">{data.summary}</p>
          </div>

          <div
            className="soft-frame rounded-[32px] bg-white/70 p-6 shadow-glow"
            style={{ '--accent-image': `url('${CDN_BASE}/healthy-start.jpeg')` }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              {data.sections.map((section) => (
                <article
                  key={section.id}
                  className="rounded-2xl border border-stone-200/70 bg-white/80 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-stone-500">{section.title}</p>
                  <p className="mt-3 text-sm text-stone-600">{section.body}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-stone-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
