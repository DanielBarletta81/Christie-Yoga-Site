import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';
import { fetchGraphQL, GET_PRACTICES } from '../../../lib/wpgraphql';

async function getPracticeSections() {
  try {
    const data = await fetchGraphQL(GET_PRACTICES, {
      revalidate: 900,
      tags: ['practices'],
    });
    const nodes = data?.practices?.nodes || [];
    return nodes.map((node) => {
      const details = node.practiceDetails || {};
      const summary = node.somaContentCore?.summary;
      const body = details.sequenceNotes || summary || 'Practice details coming soon.';
      const bullets = [];
      if (details.difficulty) bullets.push(`Difficulty: ${details.difficulty}`);
      if (details.props) bullets.push(`Props: ${details.props}`);
      if (details.instructor) bullets.push(`Instructor: ${details.instructor}`);
      return {
        id: node.id,
        title: node.title,
        body,
        bullets: bullets.length ? bullets : ['Gentle guidance for steady, supportive movement.'],
      };
    });
  } catch (error) {
    return [];
  }
}

export default async function YogaPage() {
  const practiceSections = await getPracticeSections();
  const sections = practiceSections;
  const hasSections = sections.length > 0;
  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/neuro-fascial.jpeg')`,
        '--ambient-image-2': `url('${CDN_BASE}/still-waterfall.png')`,
      }}
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Yoga</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Therapeutic movement + nervous system care
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-stone-500">Asanas and restorative flows</p>
            <p className="mt-4 max-w-2xl text-base text-stone-600">
              Yoga practices are now sourced directly from the CMS.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-stone-500">
              <a className="rounded-full border border-stone-300 px-4 py-2 hover:bg-stone-100" href="/yoga/visualizer">
                Yoga Visualizer
              </a>
            </div>
          </div>

          <div
            className="soft-frame rounded-[32px] bg-white/70 p-6 shadow-glow"
            style={{ '--accent-image': `url('${CDN_BASE}/wellness.jpg')` }}
          >
            {hasSections ? (
              <div className="grid gap-6 md:grid-cols-2">
                {sections.map((section) => (
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
            ) : (
              <div className="rounded-2xl border border-stone-200/70 bg-white/80 p-5 text-sm text-stone-600">
                Yoga content is not published yet.
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
