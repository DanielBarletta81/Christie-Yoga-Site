'use client';

import { useEffect, useMemo, useState } from 'react';

export default function ProductCarousel({ items, intervalMs = 4500 }) {
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => items.filter(Boolean), [items]);

  useEffect(() => {
    if (!slides.length) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides, intervalMs]);

  if (!slides.length) return null;

  const active = slides[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-glow">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Featured download</p>
          <h2 className="mt-3 text-2xl font-semibold text-stone-900 sm:text-3xl">{active.title}</h2>
          <p className="mt-3 max-w-xl text-sm text-stone-600">{active.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-100/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button className="rounded-full border border-stone-900 bg-stone-900 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-stone-800">
              Buy download
            </button>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500">{active.duration}</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
            <img
              src={active.imageSrc}
              alt={active.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            type="button"
            onClick={() => setIndex(idx)}
            className={`h-2 w-6 rounded-full transition ${idx === index ? 'bg-stone-900' : 'bg-stone-300'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
