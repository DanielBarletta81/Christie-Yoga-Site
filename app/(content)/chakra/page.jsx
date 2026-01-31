import Container from '../../../components/ui/Container';
import ChakraVisualizer from '../../../components/chakra/ChakraVisualizer';
import { CDN_BASE } from '../../../lib/media/cdn';
import { fetchGraphQL, GET_ALL_CHAKRAS } from '../../../lib/wpgraphql';

async function getChakraOverrides() {
  try {
    const data = await fetchGraphQL(GET_ALL_CHAKRAS, {
      revalidate: 600,
      tags: ['chakras'],
    });
    return data?.chakras?.nodes || [];
  } catch (error) {
    return [];
  }
}

export default async function ChakraPage() {
  const overrides = await getChakraOverrides();
  const raw = overrides
    .map((node) => {
      const fields = node.chakraFields || {};
      if (fields.isActive === false) return null;
      const toList = (items) =>
        Array.isArray(items) ? items.map((item) => item?.label).filter(Boolean) : [];
      return {
        id: node.slug,
        name: node.title,
        color: fields.themeColor || '#ffffff',
        element: fields.element || '—',
        themes: toList(fields.themes),
        imbalances: toList(fields.imbalances),
        practices: toList(fields.practices),
        mantra: fields.mantra || '—',
        image: fields.image?.sourceUrl || null,
        order: fields.order ?? null,
      };
    })
    .filter(Boolean);

  raw.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const data = { chakras: raw };
  const hasChakras = data.chakras.length > 0;
  return (
    <main
      className="relative min-h-screen bg-black pb-24 pt-28 text-white"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/hero-background.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/wellness.jpg')`,
      }}
    >
      <div className="pointer-events-none absolute right-10 top-10 hidden opacity-30 md:block">
        <img src={`${CDN_BASE}/icons/chakras-3.svg`} alt="" className="h-28 w-28" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>
      <Container>
        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
              <span>Chakra</span>
              <img
                src={`${CDN_BASE}/icons/green-heart-chakra.svg`}
                alt=""
                className="h-5 w-5 opacity-80"
              />
            </div>
            <h1 className="mt-3 text-3xl font-light text-white sm:text-4xl">Chakra Energy</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">Subtle anatomy for everyday balance</p>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              Seven centers, one calm interface. Chakra content is now pulled from the CMS.
            </p>
          </div>

          {hasChakras ? (
            <ChakraVisualizer data={data} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-sm text-white/70">
              Chakra content is not published yet.
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
