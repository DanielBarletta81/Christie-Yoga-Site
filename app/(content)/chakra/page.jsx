import Container from '../../../components/ui/Container';
import ChakraVisualizer from '../../../components/chakra/ChakraVisualizer';
import { CDN_BASE } from '../../../lib/media/cdn';
import { getContentBySlug } from '../../../lib/content';

const data = getContentBySlug('chakra-energy');

export default function ChakraPage() {
  return (
    <main
      className="relative min-h-screen bg-black pb-24 pt-28 text-white"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/hero-background.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/wellness.jpg')`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>
      <Container>
        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Chakra</p>
            <h1 className="mt-3 text-3xl font-light text-white sm:text-4xl">{data.title}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">{data.subtitle}</p>
            <p className="mt-4 max-w-2xl text-base text-white/70">{data.summary}</p>
          </div>

          <ChakraVisualizer data={data} />
        </div>
      </Container>
    </main>
  );
}
