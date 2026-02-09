'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../ui/Container';
import poseData from '../../content/data/yoga-poses.json';

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

const DEFAULT_FLOW = {
  order: [],
  transitionMs: 1600,
  dwellMs: 1200,
};

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

function renderModOverlay(item) {
  if (item.type === 'path') {
    return (
      <path key={item.d} d={item.d} fill="none" stroke={item.color} strokeWidth="3" strokeDasharray="10" />
    );
  }
  if (item.type === 'circle') {
    return (
      <circle key={`${item.cx}-${item.cy}`} cx={item.cx} cy={item.cy} r={item.r} fill="none" stroke={item.color} strokeWidth="2" />
    );
  }
  if (item.type === 'text') {
    return (
      <text key={`${item.text}-${item.x}-${item.y}`} x={item.x} y={item.y} fill={item.color} fontSize="12" fontWeight="700">
        {item.text}
      </text>
    );
  }
  return null;
}

function PoseModal({ pose, onClose }) {
  if (!pose) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/90 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{pose.name}</p>
            <h2 className="mt-2 text-2xl font-light">{pose.sanskrit}</h2>
          </div>
          <button type="button" className="text-white/70" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mt-5 space-y-4 text-sm text-white/70">
          <p>{pose.summary}</p>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Benefits</p>
            <ul className="mt-2 list-disc space-y-2 pl-4">
              {pose.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">History</p>
            <p className="mt-2">{pose.history}</p>
          </div>
          {pose.moreLink?.url ? (
            <a
              href={pose.moreLink.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 hover:bg-white/10"
            >
              {pose.moreLink.label || 'Learn more'}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function YogaPoseVisualizer() {
  const poses = poseData?.poses || [];
  const flow = { ...DEFAULT_FLOW, ...(poseData?.flow || {}) };
  if (!flow.order.length) flow.order = poses.map((pose) => pose.id);

  const [activeId, setActiveId] = useState(poses[0]?.id || '');
  const [showAlignment, setShowAlignment] = useState(true);
  const [showModifications, setShowModifications] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const active = useMemo(
    () => poses.find((pose) => pose.id === activeId) || poses[0],
    [poses, activeId]
  );

  const [skeleton, setSkeleton] = useState(active?.skeleton || {});
  const skeletonRef = useRef(skeleton);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);
  const flowIndexRef = useRef(Math.max(0, flow.order.indexOf(activeId)));

  useEffect(() => {
    skeletonRef.current = skeleton;
  }, [skeleton]);

  useEffect(() => {
    const idx = flow.order.indexOf(activeId);
    if (idx >= 0) flowIndexRef.current = idx;
  }, [activeId, flow.order]);

  function animateToPose(target, duration) {
    if (!target) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const start = performance.now();
    const origin = skeletonRef.current;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      const next = interpolatePoints(origin, target, eased);
      setSkeleton(next);
      if (t < 1) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (!active) return;
    animateToPose(active.skeleton, flow.transitionMs);
  }, [activeId]);

  useEffect(() => {
    if (!isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const advance = () => {
      const nextIndex = (flowIndexRef.current + 1) % flow.order.length;
      flowIndexRef.current = nextIndex;
      setActiveId(flow.order[nextIndex]);
    };

    timeoutRef.current = setTimeout(advance, flow.transitionMs + flow.dwellMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeId, isPlaying, flow.transitionMs, flow.dwellMs, flow.order]);

  if (!active) return null;

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

                <div className="absolute inset-8 rounded-full border border-stone-200/70 bg-white/90 p-6">
                  <svg viewBox="0 0 600 600" className="h-full w-full">
                    {BONE_CONNECTIONS.map(([from, to]) => {
                      const a = skeleton[from];
                      const b = skeleton[to];
                      if (!a || !b) return null;
                      return (
                        <line
                          key={`${from}-${to}`}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          stroke="#2b2b2b"
                          strokeWidth="20"
                          strokeLinecap="round"
                        />
                      );
                    })}
                    {Object.entries(skeleton).map(([key, point]) => (
                      <circle key={key} cx={point.x} cy={point.y} r={key === 'head' ? 26 : 10} fill="#1f1f1f" />
                    ))}
                  </svg>
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
                      {active.angles.map((angle) => {
                        if (angle.type === 'line') {
                          return (
                            <line
                              key={angle.label}
                              x1={angle.x1}
                              y1={angle.y1}
                              x2={angle.x2}
                              y2={angle.y2}
                              stroke={angle.color}
                              strokeWidth="3"
                            />
                          );
                        }
                        return (
                          <path
                            key={angle.label}
                            d={angle.path}
                            fill="none"
                            stroke={angle.color}
                            strokeWidth="3"
                          />
                        );
                      })}
                      {active.angleLabels.map((label) => (
                        <text
                          key={`${label.text}-${label.x}-${label.y}`}
                          x={label.x}
                          y={label.y}
                          fill={label.color}
                          fontSize="12"
                          fontWeight="700"
                        >
                          {label.text}
                        </text>
                      ))}
                    </svg>
                  ) : null}

                  {showModifications ? (
                    <svg viewBox="0 0 600 600" className="h-full w-full">
                      {active.modOverlays.map((item) => renderModOverlay(item))}
                    </svg>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-stone-200/70 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Angle Focus
              <button
                type="button"
                className="rounded-full border border-stone-200 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-stone-600"
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? 'Pause flow' : 'Play flow'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">{active.name}</p>
              <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">{active.sanskrit}</h1>
              <p className="mt-4 text-base text-stone-600">
                {active.summary} If a pose feels inaccessible today, choose a variation that supports your breath and body.
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
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
              >
                Pose details
              </button>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Supportive cues</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-base text-stone-600">
                {active.cues.map((cue) => (
                  <li key={cue}>{cue}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-stone-50/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Feel-good alternatives</p>
              <ul className="mt-3 list-disc space-y-2 pl-4">
                {active.modifications.map((mod) => (
                  <li key={mod}>{mod}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-white/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Benefits + history</p>
              <ul className="mt-3 list-disc space-y-2 pl-4">
                {active.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone-500">{active.history}</p>
              {active.moreLink?.url ? (
                <a
                  href={active.moreLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600 hover:bg-stone-100"
                >
                  {active.moreLink.label || 'Learn more'}
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {poses.map((pose) => (
                <button
                  key={pose.id}
                  type="button"
                  onClick={() => {
                    flowIndexRef.current = flow.order.indexOf(pose.id);
                    setActiveId(pose.id);
                  }}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition ${
                    active.id === pose.id
                      ? 'border-stone-700 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white/70 text-stone-500 hover:border-stone-400 hover:text-stone-700'
                  }`}
                >
                  {pose.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
      {showModal ? <PoseModal pose={active} onClose={() => setShowModal(false)} /> : null}
    </section>
  );
}
