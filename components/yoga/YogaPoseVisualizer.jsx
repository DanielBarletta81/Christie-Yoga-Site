'use client';

import { useState } from 'react';
import Container from '../ui/Container';

export default function YogaPoseVisualizer() {
  const [showAlignment, setShowAlignment] = useState(true);
  const [showModifications, setShowModifications] = useState(false);

  return (
    <section className="editorial-content pb-16 pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-stone-200/70 bg-white/80 shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_55%)]" />
            <div className="relative flex items-center justify-center p-6">
              <div className="relative aspect-square w-full max-w-[520px]">
                <div className="absolute inset-0 rounded-full border border-stone-200/80 bg-white/70" />
                <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(60,120,140,0.18),transparent_55%),radial-gradient(circle_at_50%_70%,rgba(217,182,129,0.16),transparent_60%)]" />
                <div className="absolute inset-0 rounded-full border border-stone-200/70" />

                <div className="absolute inset-8 overflow-hidden rounded-full border border-stone-200/70 bg-white">
                  <iframe
                    title="Yoga pose visualizer"
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    src="https://sketchfab.com/models/c764eec29f54472e8b4dacafd0d52bf2/embed?ui_infos=0&ui_related=0&ui_controls=1&ui_hint=0&autostart=0"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0">
                  {showAlignment ? (
                    <svg viewBox="0 0 600 600" className="h-full w-full">
                      <circle
                        cx="300"
                        cy="300"
                        r="210"
                        fill="none"
                        stroke="#2C8BB0"
                        strokeWidth="2"
                        strokeDasharray="6 8"
                        opacity="0.7"
                      />
                      <line x1="180" y1="420" x2="320" y2="200" stroke="#2C8BB0" strokeWidth="3" />
                      <path d="M 320 200 Q 360 160 400 200" fill="none" stroke="#E37E35" strokeWidth="3" />
                      <text x="330" y="150" fill="#E37E35" fontSize="13" fontWeight="700">
                        HIP HINGE ~75°
                      </text>
                      <text x="120" y="450" fill="#2C8BB0" fontSize="13" fontWeight="700">
                        LONG SPINE
                      </text>
                    </svg>
                  ) : null}

                  {showModifications ? (
                    <svg viewBox="0 0 600 600" className="h-full w-full">
                      <path
                        d="M 210 420 Q 280 330 320 220"
                        fill="none"
                        stroke="#D45B5B"
                        strokeWidth="3"
                        strokeDasharray="10"
                      />
                      <text x="140" y="350" fill="#D45B5B" fontSize="13" fontWeight="700">
                        SOFTEN KNEES
                      </text>
                      <circle cx="230" cy="220" r="32" fill="none" stroke="#D45B5B" strokeWidth="2" />
                      <text x="70" y="220" fill="#D45B5B" fontSize="12" fontWeight="700">
                        USE BLOCKS
                      </text>
                    </svg>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-stone-200/70 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Angle Focus
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Downward-Facing Dog</p>
              <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">Adho Mukha Svanasana</h1>
              <p className="mt-4 text-base text-stone-600">
                Explore angles, alignment, and options that meet you where you are. The visualizer is a guide — not a
                test. If a pose feels inaccessible today, choose a variation that supports your breath and body.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowAlignment((prev) => !prev)}
                className="rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
              >
                {showAlignment ? 'Hide Angles' : 'Show Angles'}
              </button>
              <button
                type="button"
                onClick={() => setShowModifications((prev) => !prev)}
                className="rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
              >
                {showModifications ? 'Hide Options' : 'Show Options'}
              </button>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Supportive cues</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-base text-stone-600">
                <li>Lengthen from wrists through hips to keep the spine neutral.</li>
                <li>Soften knees or lift heels until the hinge feels available.</li>
                <li>Press evenly through palms; shoulder blades stay wide.</li>
                <li>Choose props or child's pose when you need more ease.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-stone-50/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Feel-good alternatives</p>
              <p className="mt-3">
                Modify with blocks, a chair, or a wall to keep steady breath. The goal is regulation and comfort, not
                hitting a perfect angle.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
