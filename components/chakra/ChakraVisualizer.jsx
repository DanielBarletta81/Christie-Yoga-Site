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

  const chakraIconBase = `${CDN_BASE}/icons/chakra-crystal-system/svg`;

  return (
    <section className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/70 p-8 md:p-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url('${CDN_BASE}/chakra-vis.jpg')`,
            backgroundSize: '140%',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.12),transparent_45%)]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="text-xs uppercase tracking-[0.4em] text-white/60">Chakra Alignment</div>
          <div className="chakra-stack w-full max-w-[320px]">
            {data.chakras.map((chakra) => {
              const isActive = chakra.id === activeId;
              return (
                <button
                  key={chakra.id}
                  type="button"
                  onClick={() => setActiveId(chakra.id)}
                  onMouseEnter={() => setActiveId(chakra.id)}
                  className={`chakra-stack-item group ${isActive ? 'is-active' : ''}`}
                  style={{ '--chakra-glow': chakra.color }}
                  aria-label={chakra.name}
                >
                  <span className="chakra-stack-glow" />
                  <span className="chakra-stack-icon">
                    <img src={`${chakraIconBase}/${chakra.id}.svg`} alt="" />
                  </span>
                  <span className="chakra-stack-label">
                    <span className="text-xs uppercase tracking-[0.35em] text-white/40">{chakra.element}</span>
                    <span className="text-base text-white">{chakra.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="text-center text-sm text-white/60">
            Hover to illuminate. Tap to explore.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-[28px] border border-white/10 bg-black/60 p-7 text-white shadow-[0_40px_80px_-50px_rgba(0,0,0,0.8)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Active chakra</p>
              <h2 className="mt-2 text-2xl font-light text-white">{active.name}</h2>
            </div>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
              style={{ borderColor: `${active.color}66`, color: active.color }}
            >
              <ChakraIcon type={chakraIcons[active.id]} />
            </span>
          </div>

          <div className="mt-5 grid gap-3 text-base text-white/70">
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
              <img src={imageUrl} alt={active.name} className="h-52 w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
            <a
              className="rounded-full border px-4 py-2 transition hover:bg-white/10"
              href="/sound-bowl"
              style={{ borderColor: `${active.color}66`, color: active.color }}
            >
              Match with sound bowl
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
