import { fetchGraphQL, GET_PRACTICES } from '../../../../lib/wpgraphql';
import FlowVisualizer from '../../../../components/yoga/FlowVisualizer';

async function getPractices() {
  const data = await fetchGraphQL(GET_PRACTICES, {
    revalidate: 600,
    tags: ['practices'],
  });
  return data?.practices?.nodes || [];
}

export default async function YogaVisualizerPage() {
  const practices = await getPractices();

  return (
    <main className="min-h-screen bg-stone-50 pb-20 pt-24">
      <FlowVisualizer practices={practices} />
    </main>
  );
}
