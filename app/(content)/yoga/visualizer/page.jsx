import { fetchGraphQL, GET_PRACTICES } from '../../../../lib/wpgraphql';
import FlowVisualizer from '../../../../components/yoga/FlowVisualizer';
import YogaPoseVisualizer from '../../../../components/yoga/YogaPoseVisualizer';
import { CDN_BASE } from '../../../../lib/media/cdn';

async function getPractices() {
  try {
    const data = await fetchGraphQL(GET_PRACTICES, {
      revalidate: 600,
      tags: ['practices'],
    });
    return data?.practices?.nodes || [];
  } catch (error) {
    return [];
  }
}

export default async function YogaVisualizerPage() {
  const practices = await getPractices();

  return (
    <main
      className="ambient-page grain-layer min-h-screen bg-surface-cream pb-20"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/wellness.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/hero-background.jpg')`,
      }}
    >
      <YogaPoseVisualizer />
      <FlowVisualizer practices={practices} />
    </main>
  );
}
