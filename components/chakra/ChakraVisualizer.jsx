'use client';

import { useMemo, useState } from 'react';
import { CDN_BASE } from '../../lib/media/cdn';
import { ChakraIcon } from '../planner/ChakraIcons';

const chakraIcons = {
  root: 'root',
  sacral: 'sacral',
  solar: 'solar',
  heart: 'heart',
  throat: 'throat',
  'third-eye': 'thirdEye',
  crown: 'crown',
};

export default function ChakraVisualizer({ data }) {
  const [activeId, setActiveId] = useState(data?.chakras?.[0]?.id || '');

  const active = useMemo(
    () => data.chakras.find((chakra) => chakra.id === activeId) || data.chakras[0],
    [data, activeId]
  );

  if (!active) return null;

  const themes = Array.isArray(active.themes) ? active.themes : [];
  const imbalances = Array.isArray(active.imbalances) ? active.imbalances : [];
  const practices = Array.isArray(active.practices) ? active.practices : [];
  const imageUrl = active.image
    ? active.image.startsWith('http')
      ? active.image
      : `${CDN_BASE}/${active.image}`
    : null;

  return (
    <section className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative flex min-h-[560px] flex-col items-center justify-between overflow-hidden rounded-[32px] border border-white/10 bg-black/70 p-6">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url('${CDN_BASE}/chakra-vis.jpg')`,
            backgroundSize: '120%',
            backgroundPosition: 'left center',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('${CDN_BASE}/icons/chakras-3.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.18),transparent_55%)]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="text-xs uppercase tracking-[0.4em] text-white/60">Chakra Tower</div>
          <div className="relative h-[360px] w-[220px] rounded-full border border-white/10 bg-black/60">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.16),transparent_65%)]" />
            <div className="absolute inset-6 rounded-full border border-white/10 bg-black/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 translate-x-6 md:translate-x-8">
                {data.chakras.map((chakra) => {
                  const isActive = chakra.id === activeId;
                  return (
                    <button
                      key={chakra.id}
                      type="button"
                      onClick={() => setActiveId(chakra.id)}
                      onMouseEnter={() => setActiveId(chakra.id)}
                      className="group relative h-10 w-10 rounded-full border border-white/10 bg-black/70 transition"
                      style={{
                        boxShadow: isActive ? `0 0 24px ${chakra.color}66` : 'none',
                        borderColor: isActive ? `${chakra.color}88` : 'rgba(255,255,255,0.1)',
                      }}
                      aria-label={chakra.name}
                    >
                      <span
                        className="absolute inset-[7px] rounded-full bg-white/10 transition group-hover:opacity-100"
                        style={{
                          backgroundColor: isActive ? chakra.color : 'rgba(255,255,255,0.12)',
                          opacity: isActive ? 1 : 0.35,
                        }}
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-white/60 transition group-hover:text-white"
                        style={{ color: isActive ? chakra.color : 'rgba(255,255,255,0.6)' }}
                      >
                        <ChakraIcon type={chakraIcons[chakra.id]} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-white/70">
            The quiet center. Tap a crystal to explore.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-[24px] border border-white/10 bg-black/60 p-5 text-white shadow-[0_40px_80px_-50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Active chakra</p>
              <h2 className="mt-2 text-xl font-light text-white">{active.name}</h2>
            </div>
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
              style={{ borderColor: `${active.color}66`, color: active.color }}
            >
              <ChakraIcon type={chakraIcons[active.id]} />
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <p>
              <span className="text-white/50">Element:</span> {active.element}
            </p>
            <p>
              <span className="text-white/50">Themes:</span> {themes.join(', ') || '—'}
            </p>
            <p>
              <span className="text-white/50">When off balance:</span> {imbalances.join(', ') || '—'}
            </p>
            <p>
              <span className="text-white/50">Gentle practices:</span> {practices.join(', ') || '—'}
            </p>
            <p className="text-white/60">Mantra: “{active.mantra || '—'}”</p>
          </div>

          {imageUrl ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <img src={imageUrl} alt={active.name} className="h-44 w-full object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
