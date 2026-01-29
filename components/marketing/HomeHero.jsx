'use client';

import { CDN_BASE } from '../../lib/media/cdn';

export default function HomeHero() {
  return (
    <section
      className="relative flex min-h-[72vh] items-center overflow-hidden rounded-[32px] border border-white/10"
      style={{
        backgroundImage: `url('${CDN_BASE}/bg/browning-mill-waterfall.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `url('${CDN_BASE}/bg/chakras-2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-16 text-white">
        <p className="text-xs uppercase tracking-[0.5em] text-white/70">Soma Living</p>
        <h1 className="max-w-2xl text-[clamp(2.6rem,6vw,4.5rem)] font-light leading-[1.05]">
          Calm practices for real life
        </h1>
        <p className="max-w-xl text-sm text-white/75 sm:text-base">
          Yoga, Ayurveda, and daily rituals that are gentle, doable, and supportive — without pressure or performance.
        </p>
      </div>
    </section>
  );
}
