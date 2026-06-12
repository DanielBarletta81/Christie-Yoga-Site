'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../ui/Container';
import poseData from '../../poses.json';

// Joint connections defining the skeletal line art
const BONE_CONNECTIONS = [
  ['head', 'neck'],
  ['neck', 'shoulderL'],
  ['neck', 'shoulderR'],
  ['shoulderL', 'elbowL'],
  ['elbowL', 'wristL'],
  ['shoulderR', 'elbowR'],
  ['elbowR', 'wristR'],
  ['neck', 'hip'],
  ['hip', 'kneeL'],
  ['kneeL', 'ankleL'],
  ['hip', 'kneeR'],
  ['kneeR', 'ankleR'],
];

// Category color palette
const CATEGORY_COLORS = {
  Seated:        '#7B9EA6',
  'Seated Twist':'#9E7BA6',
  Standing:      '#7BA68C',
  Inversion:     '#A6917B',
  Backbend:      '#C47B5A',
  'Arm Balance': '#7B8CA6',
  Balance:       '#8CA67B',
  Supine:        '#A6A27B',
  Restorative:   '#7BA696',
};

const ERA_LABELS = { Ancient: 'Ancient', Medieval: 'Medieval', Modern: 'Modern' };

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolatePoints(from, to, t) {
  const next = {};
  Object.keys(to).forEach((key) => {
    const start = from[key] || to[key];
    const end = to[key];
    next[key] = {
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    };
  });
  return next;
}

function PoseModal({ pose, onClose }) {
  if (!pose) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/90 p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{pose.english_name}</p>
            <h2 className="mt-2 text-2xl font-light">{pose.sanskrit_name}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">
              {ERA_LABELS[pose.historical_era]} · {pose.source_text}
            </p>
          </div>
          <button type="button" className="ml-4 text-white/50 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm text-white/70">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Benefits</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {pose.benefits?.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          {pose.history ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">History</p>
              <p className="mt-2">{pose.history}</p>
            </div>
          ) : null}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Primary Alignment</p>
            <p className="mt-2">{pose.visualizer_data?.primary_alignment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function YogaPoseVisualizer() {
  const poses = Array.isArray(poseData) ? poseData : [];

  const [activeId, setActiveId] = useState(poses[0]?.id || '');
  const [showAngles, setShowAngles] = useState(true);
  const [showMods, setShowMods] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const active = useMemo(
    () => poses.find((p) => p.id === activeId) || poses[0],
    [poses, activeId]
  );

  const [skeleton, setSkeleton] = useState(active?.skeleton || {});
  const skeletonRef = useRef(skeleton);
  const animRef = useRef(null);
  const timerRef = useRef(null);
  const idxRef = useRef(0);

  useEffect(() => { skeletonRef.current = skeleton; }, [skeleton]);

  function animateToPose(target, ms) {
    if (!target) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = performance.now();
    const origin = skeletonRef.current;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      setSkeleton(interpolatePoints(origin, target, easeInOutCubic(t)));
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (active?.skeleton) animateToPose(active.skeleton, 900);
  }, [activeId]);

  useEffect(() => {
    if (!isPlaying) { clearTimeout(timerRef.current); return; }
    timerRef.current = setTimeout(() => {
      idxRef.current = (idxRef.current + 1) % poses.length;
      setActiveId(poses[idxRef.current].id);
    }, 2200);
    return () => clearTimeout(timerRef.current);
  }, [activeId, isPlaying, poses]);

  if (!active) return null;

  const accentColor = CATEGORY_COLORS[active.category] || '#7B9EA6';

  return (
    <section className="editorial-content pb-16 pt-28">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Pose Visualizer</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">Asana Library</h1>
            <p className="mt-1 text-sm text-stone-500">{poses.length} poses · Ancient through Modern</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                isPlaying
                  ? 'border-stone-700 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white/70 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play Flow'}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* ── SVG Canvas ── */}
          <div className="relative overflow-hidden rounded-[32px] border border-stone-200/70 bg-white/90 shadow-lg">
            {/* Category badge */}
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white"
                style={{ backgroundColor: accentColor }}
              >
                {active.category}
              </span>
              <span className="rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                {active.historical_era}
              </span>
            </div>

            {/* Toggle controls */}
            <div className="absolute right-5 top-5 z-10 flex gap-2">
              <button
                type="button"
                onClick={() => setShowAngles((p) => !p)}
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition ${
                  showAngles ? 'border-stone-500 bg-stone-800 text-white' : 'border-stone-200 bg-white/80 text-stone-500'
                }`}
              >
                Angles
              </button>
              <button
                type="button"
                onClick={() => setShowMods((p) => !p)}
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition ${
                  showMods ? 'border-stone-500 bg-stone-800 text-white' : 'border-stone-200 bg-white/80 text-stone-500'
                }`}
              >
                Mods
              </button>
            </div>

            {/* SVG */}
            <div className="flex items-center justify-center p-8 pt-16">
              <div className="relative aspect-square w-full max-w-[480px]">
                {/* Background circle */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${accentColor}18, transparent 65%),
                                 radial-gradient(circle at 50% 80%, ${accentColor}10, transparent 55%)`,
                    border: `1px solid ${accentColor}30`,
                    borderRadius: '50%',
                  }}
                />
                {/* Ring */}
                <div
                  className="absolute inset-6 rounded-full"
                  style={{ border: `1px solid ${accentColor}20` }}
                />

                {/* Skeleton SVG */}
                <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
                  {/* Bones */}
                  {BONE_CONNECTIONS.map(([from, to]) => {
                    const a = skeleton[from];
                    const b = skeleton[to];
                    if (!a || !b) return null;
                    return (
                      <line
                        key={`${from}-${to}`}
                        x1={a.x} y1={a.y}
                        x2={b.x} y2={b.y}
                        stroke="#1e1e1e"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                    );
                  })}
                  {/* Joints */}
                  {Object.entries(skeleton).map(([key, pt]) => (
                    <circle
                      key={key}
                      cx={pt.x} cy={pt.y}
                      r={key === 'head' ? 24 : 9}
                      fill={key === 'head' ? '#1e1e1e' : accentColor}
                    />
                  ))}
                </svg>

                {/* Angle overlay */}
                {showAngles && active.angles?.length ? (
                  <svg viewBox="0 0 600 600" className="pointer-events-none absolute inset-0 h-full w-full">
                    {active.angles.map((angle) =>
                      angle.type === 'line' ? (
                        <line
                          key={angle.label}
                          x1={angle.x1} y1={angle.y1}
                          x2={angle.x2} y2={angle.y2}
                          stroke={angle.color}
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                          opacity="0.85"
                        />
                      ) : (
                        <path
                          key={angle.label}
                          d={angle.path}
                          fill="none"
                          stroke={angle.color}
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                          opacity="0.85"
                        />
                      )
                    )}
                    {active.angleLabels?.map((lbl) => (
                      <text
                        key={`${lbl.text}-${lbl.x}`}
                        x={lbl.x} y={lbl.y}
                        fill={lbl.color}
                        fontSize="11"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        {lbl.text}
                      </text>
                    ))}
                  </svg>
                ) : null}

                {/* Modification overlay */}
                {showMods && active.modOverlays?.length ? (
                  <svg viewBox="0 0 600 600" className="pointer-events-none absolute inset-0 h-full w-full">
                    {active.modOverlays.map((item, i) => {
                      if (item.type === 'path')
                        return <path key={i} d={item.d} fill="none" stroke={item.color} strokeWidth="2.5" strokeDasharray="8 4" />;
                      if (item.type === 'circle')
                        return <circle key={i} cx={item.cx} cy={item.cy} r={item.r} fill="none" stroke={item.color} strokeWidth="2" />;
                      if (item.type === 'text')
                        return <text key={i} x={item.x} y={item.y} fill={item.color} fontSize="11" fontWeight="700" letterSpacing="0.08em">{item.text}</text>;
                      return null;
                    })}
                  </svg>
                ) : null}
              </div>
            </div>

            {/* Pose name strip */}
            <div className="border-t border-stone-100 px-8 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{active.english_name}</p>
              <p className="mt-0.5 font-serif text-lg text-stone-700">{active.sanskrit_name}</p>
            </div>
          </div>

          {/* ── Info Panel ── */}
          <div className="flex flex-col gap-5">
            {/* Alignment */}
            <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Primary Alignment</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                {active.visualizer_data?.primary_alignment}
              </p>
            </div>

            {/* Cues */}
            {active.cues?.length ? (
              <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Supportive Cues</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  {active.cues.map((cue) => (
                    <li key={cue} className="flex gap-2">
                      <span style={{ color: accentColor }}>—</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Modifications */}
            {active.modifications?.length ? (
              <div className="rounded-3xl border border-stone-100 bg-stone-50/80 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Modifications</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  {active.modifications.map((mod) => (
                    <li key={mod} className="flex gap-2">
                      <span className="text-[#D45B5B]">·</span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Detail button */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-full border border-stone-300 bg-white/70 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100 self-start transition"
            >
              History + Benefits
            </button>
          </div>
        </div>

        {/* ── Pose Selector Grid ── */}
        <div className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">All Poses</p>
          {['Ancient', 'Medieval', 'Modern'].map((era) => {
            const eraPoses = poses.filter((p) => p.historical_era === era);
            if (!eraPoses.length) return null;
            return (
              <div key={era} className="mb-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-stone-400">{era}</p>
                <div className="flex flex-wrap gap-2">
                  {eraPoses.map((pose) => (
                    <button
                      key={pose.id}
                      type="button"
                      onClick={() => {
                        idxRef.current = poses.findIndex((p) => p.id === pose.id);
                        setActiveId(pose.id);
                      }}
                      className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition ${
                        active.id === pose.id
                          ? 'border-stone-700 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white/70 text-stone-500 hover:border-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {pose.english_name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {showModal ? <PoseModal pose={active} onClose={() => setShowModal(false)} /> : null}
    </section>
  );
}
