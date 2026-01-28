'use client';

import { CDN_BASE } from '../../lib/media/cdn';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[70vh] items-center overflow-hidden pt-24 md:min-h-[85vh]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${CDN_BASE}/hero-background.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-white">
        <p className="text-xs uppercase tracking-[0.5em] text-white/80">Welcome</p>
        <h1 className="max-w-3xl text-[clamp(2.8rem,6vw,5rem)] font-light leading-[1.05] tracking-tight">
          Soma Living Wellness
        </h1>
        <p className="max-w-2xl text-base text-white/80 md:text-lg">
          Calm, practical yoga and Ayurveda for real life—steady routines that feel nourishing, not performative.
        </p>
        <a
          href="/about"
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
        >
          About Soma Living →
        </a>
      </div>
    </section>
  );
}
