'use client';

export default function SplitSection() {
  return (
    <section id="about" className="bg-surface-cream py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
        <div id="ayurveda" className="group overflow-hidden rounded-3xl bg-white/85 shadow-xl ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-2xl">
          <div className="h-72 bg-[url('/images/ayurveda.jpg')] bg-cover bg-center grayscale transition duration-500 group-hover:grayscale-0 md:h-80" />
          <div className="px-8 py-10">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Ayurveda</p>
            <h3 className="mt-4 text-3xl font-light text-ink">Ayurvedic Diet</h3>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              Discover the ancient wisdom of Ayurveda and how mindful eating can balance your doshas and restore harmony to your body and mind. Learn to nourish yourself with foods that align with your unique constitution.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-accent transition hover:text-brand-700">
              Learn More →
            </a>
          </div>
        </div>

        <div className="group overflow-hidden rounded-3xl bg-white/85 shadow-xl ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-2xl">
          <div className="h-72 bg-[url('/images/wellness.jpg')] bg-cover bg-center grayscale transition duration-500 group-hover:grayscale-0 md:h-80" />
          <div className="px-8 py-10">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Wellness</p>
            <h3 className="mt-4 text-3xl font-light text-ink">Holistic Wellness</h3>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              Embrace a comprehensive approach to health through yoga, meditation, and Ayurvedic practices. Transform your daily routine into a sacred ritual that nurtures your physical, mental, and spiritual wellbeing.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-accent transition hover:text-brand-700">
              Explore →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
