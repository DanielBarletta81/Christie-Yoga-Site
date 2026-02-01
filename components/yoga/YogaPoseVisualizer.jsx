'use client';

import { useState } from 'react';
import Container from '../ui/Container';

export default function YogaPoseVisualizer() {
  const [showAlignment, setShowAlignment] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);

  return (
    <section className="editorial-content pb-16 pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-stone-200/70 bg-white/80 shadow-lg">
            <div className="aspect-[4/3] w-full">
              <iframe
                title="Various Yoga Female Poses with Mat 003 Bundle"
                className="h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                src="https://sketchfab.com/models/c764eec29f54472e8b4dacafd0d52bf2/embed?ui_infos=0&ui_related=0&ui_controls=1&ui_hint=0&autostart=0"
              />
            </div>

            {(showAlignment || showMistakes) && (
              <div className="pointer-events-none absolute inset-0">
                {showAlignment ? (
                  <svg viewBox="0 0 640 480" className="h-full w-full">
                    <line
                      x1="180"
                      y1="400"
                      x2="350"
                      y2="150"
                      stroke="#1CAAD9"
                      strokeWidth="3"
                      strokeDasharray="8"
                    />
                    <text
                      x="190"
                      y="320"
                      fill="#1CAAD9"
                      fontSize="12"
                      fontWeight="700"
                      transform="rotate(-55, 190, 320)"
                    >
                      NEUTRAL SPINE (135°)
                    </text>
                    <path d="M 330 180 Q 350 140 380 180" fill="none" stroke="#FF5733" strokeWidth="3" />
                    <text x="360" y="130" fill="#FF5733" fontSize="12" fontWeight="700">
                      HIP FLEXION: 70° - 75°
                    </text>
                    <line
                      x1="350"
                      y1="150"
                      x2="480"
                      y2="400"
                      stroke="#1CAAD9"
                      strokeWidth="3"
                      strokeDasharray="8"
                    />
                    <text x="490" y="380" fill="#1CAAD9" fontSize="12" fontWeight="700">
                      HEELS REACHING
                    </text>
                    <circle cx="180" cy="405" r="15" fill="none" stroke="#FF5733" strokeWidth="2" />
                    <text x="50" y="430" fill="#FF5733" fontSize="11" fontWeight="700">
                      DISTRIBUTE WEIGHT THROUGH FINGERS
                    </text>
                  </svg>
                ) : null}

                {showMistakes ? (
                  <svg viewBox="0 0 640 480" className="h-full w-full">
                    <path
                      d="M 200 380 Q 300 300 360 180"
                      fill="none"
                      stroke="#E15252"
                      strokeWidth="4"
                      strokeDasharray="10"
                    />
                    <text x="220" y="260" fill="#E15252" fontSize="12" fontWeight="700">
                      ROUNDED BACK
                    </text>
                    <circle cx="230" cy="140" r="26" fill="none" stroke="#E15252" strokeWidth="3" />
                    <text x="40" y="150" fill="#E15252" fontSize="12" fontWeight="700">
                      SHOULDERS SHRUGGED
                    </text>
                  </svg>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Downward-Facing Dog</p>
              <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
                Adho Mukha Svanasana
              </h1>
              <p className="mt-4 text-base text-stone-600">
                Use the overlay to check neutral spine alignment, hip hinge angle, and weight
                distribution. Tap the toggles to compare clinical benchmarks and common mistakes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowAlignment((prev) => !prev)}
                className="rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
              >
                {showAlignment ? 'Hide Alignment' : 'Show Alignment'}
              </button>
              <button
                type="button"
                onClick={() => setShowMistakes((prev) => !prev)}
                className="rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
              >
                {showMistakes ? 'Hide Mistakes' : 'Show Mistakes'}
              </button>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Clinical cues</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-base text-stone-600">
                <li>Long spine from wrists through hips.</li>
                <li>Hip hinge first; bend knees as needed to keep neutral spine.</li>
                <li>Shoulders externally rotate; neck relaxed.</li>
                <li>Heels reaching is a byproduct, not a requirement.</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
