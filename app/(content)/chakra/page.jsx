import Container from '../../../components/ui/Container';
import ChakraVisualizer from '../../../components/chakra/ChakraVisualizer';
import ChakraSystemSection from './ChakraSystemSection';
import { CDN_BASE } from '../../../lib/media/cdn';
import { fetchGraphQL, GET_ALL_CHAKRAS, GET_RITUAL_TRAY } from '../../../lib/wpgraphql';

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

async function getRituals() {
  try {
    const data = await fetchGraphQL(GET_RITUAL_TRAY, {
      revalidate: 600,
      tags: ['rituals'],
    });
    return data?.rituals?.nodes || [];
  } catch (error) {
    return [];
  }
}

export default async function ChakraPage() {
  const [overrides, ritualNodes] = await Promise.all([getChakraOverrides(), getRituals()]);
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
        governs: toList(fields.governs),
        mantra: fields.mantra || '—',
        sanskrit: fields.sanskrit || '',
        tone: fields.tone || fields.shortDescription || '',
        image: fields.image?.sourceUrl || null,
        order: fields.order ?? null,
      };
    })
    .filter(Boolean);

  raw.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const data = { chakras: raw };
  const hasChakras = data.chakras.length > 0;

  const crystalBase = `${CDN_BASE}/icons/chakra-crystal-system/svg`;
  const chakraSystemChakras = raw.map((chakra) => ({
    id: chakra.id,
    name: chakra.name,
    sanskrit: chakra.sanskrit,
    glow: chakra.color,
    svg: `${crystalBase}/${chakra.id}.svg`,
    governs: chakra.governs,
    imbalance: chakra.imbalances,
    practices: chakra.practices,
    tone: chakra.tone,
    order: chakra.order ?? 0,
  }));

  const chakraSystemRituals = ritualNodes
    .map((node) => {
      const supports = node.supportsChakra?.nodes?.map((item) => item.slug) || [];
      const biases = node.supportsDosha?.nodes?.map((item) => item.slug) || [];

      if (!supports.length) return null;

      return {
        id: node.id,
        label: node.ritualDetails?.ritualLabel || node.title,
        supports,
        biases,
      };
    })
    .filter(Boolean);

  return (
    <main
      className="editorial-shell relative min-h-screen bg-black pb-28 pt-28 text-white"
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
        <div className="editorial-content flex flex-col gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
              <span>Chakra</span>
              <img
                src={`${CDN_BASE}/icons/green-heart-chakra.svg`}
                alt=""
                className="h-5 w-5 opacity-80"
              />
            </div>
            <h1 className="mt-3 text-4xl font-light text-white sm:text-5xl">Chakra Energy</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/50">Subtle anatomy for everyday balance</p>
            <p className="mt-5 max-w-3xl text-lg text-white/70">
              Seven centers, one calm interface. Move through each chakra, then deepen with a ritual field or
              a matching sound bowl.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              <a className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10" href="/sound-bowl">
                Sound Bowl
              </a>
              <a className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10" href="/yoga/visualizer">
                Yoga Visualizer
              </a>
            </div>
          </div>

          {hasChakras ? (
            <ChakraVisualizer data={data} />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-black/60 p-8 text-base text-white/70">
              Chakra content is not published yet.
            </div>
          )}

          <ChakraSystemSection chakras={chakraSystemChakras} rituals={chakraSystemRituals} />
        </div>
      </Container>
    </main>
  );
}
