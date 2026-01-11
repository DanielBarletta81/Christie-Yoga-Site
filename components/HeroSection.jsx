'use client';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-24 md:min-h-[85vh]"
    >
      <div className="absolute inset-0 bg-[url('/images/hero-background.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <div className="glass-panel soft-ring rounded-[32px] px-6 py-10 md:px-12 md:py-14">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/80">
            Soma Living
          </p>
          <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] font-light leading-[1.05] tracking-tight">
            Find Your Inner Peace
          </h1>
          <p className="mt-4 text-lg uppercase tracking-[0.3em] text-white/85 md:text-xl">
            Yoga & Ayurvedic Wellness
          </p>
        </div>
      </div>
    </section>
  );
}
