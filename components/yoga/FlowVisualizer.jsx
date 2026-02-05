'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import Container from '../ui/Container';

function PlaceholderModel({ color = '#1a1a1a' }) {
  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.35}>
      <mesh>
        <capsuleGeometry args={[0.65, 1.7, 6, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.75} />
      </mesh>
    </Float>
  );
}

function YogiModel({ modelUrl, color }) {
  if (!modelUrl) {
    return <PlaceholderModel color={color} />;
  }

  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
}

function SphereHalo({ color = '#7fb9c8' }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial color={color} transparent opacity={0.08} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function normalizePractice(practice) {
  const details = practice?.practiceDetails || {};
  const summary = practice?.somaContentCore?.summary;
  return {
    id: practice?.id,
    title: practice?.title || 'Practice',
    body: details.sequenceNotes || summary || 'Practice details will appear here once they are added in the CMS.',
    instructor: details.instructor,
    difficulty: details.difficulty,
    props: details.props,
    muscles: Array.isArray(practice?.muscleGroups) ? practice.muscleGroups : [],
  };
}

export default function FlowVisualizer({ practices = [], modelUrl = '/models/yogi.glb' }) {
  const normalized = useMemo(() => practices.map(normalizePractice), [practices]);
  const [activePractice, setActivePractice] = useState(normalized[0] || null);
  const [activeMuscle, setActiveMuscle] = useState(null);

  if (!normalized.length) {
    return (
      <section className="py-12">
        <Container>
          <div className="rounded-[32px] border border-stone-200/70 bg-white/80 p-8 text-sm text-stone-600">
            The visualizer will appear once practice content is published in the CMS.
          </div>
        </Container>
      </section>
    );
  }

  const muscles = activePractice?.muscles || [];

  return (
    <section className="py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-[520px] overflow-hidden rounded-[32px] border border-stone-200/70 bg-white/80 shadow-inner">
            <div className="absolute left-6 top-6 z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Interactive Model</p>
              <h3 className="text-xl font-light text-stone-800">{activePractice?.title}</h3>
            </div>

            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
              <Stage environment="city" intensity={0.6} contactShadow={false}>
                <Suspense fallback={<PlaceholderModel />}>
                  <YogiModel modelUrl={modelUrl} />
                </Suspense>
              </Stage>
              <SphereHalo />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
            </Canvas>

            <div className="absolute bottom-6 inset-x-0 flex flex-wrap justify-center gap-2 px-6">
              {muscles.length ? (
                muscles.map((muscle) => (
                  <button
                    key={muscle.id || muscle.name}
                    type="button"
                    onClick={() => setActiveMuscle(muscle)}
                    className="rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-[9px] uppercase tracking-widest text-stone-500 transition hover:bg-stone-900 hover:text-white"
                  >
                    {muscle.name}
                  </button>
                ))
              ) : (
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
                  Add muscle groups in the CMS
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[28px] border border-stone-200/70 bg-white/80 p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Practice focus</p>
              <h4 className="mt-2 text-2xl font-light text-stone-800">
                {activeMuscle?.name || 'Select a muscle group'}
              </h4>

              <div className="mt-6 space-y-6">
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">The science</h5>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {activeMuscle?.scientific || activePractice?.body}
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200/70 bg-stone-100/70 p-4">
                  <h5 className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold">The subtle body</h5>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 italic">
                    {activeMuscle?.yogic || 'Connect this movement to breath, attention, and quiet regulation.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-stone-200/70 bg-white/80 p-6 text-sm text-stone-600">
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-stone-400">
                {activePractice?.difficulty ? <span>{activePractice.difficulty}</span> : null}
                {activePractice?.instructor ? <span>{activePractice.instructor}</span> : null}
                {activePractice?.props ? <span>{activePractice.props}</span> : null}
              </div>
              <p className="mt-3 leading-relaxed text-stone-600">{activePractice?.body}</p>
            </div>

            <div className="rounded-[24px] border border-stone-200/70 bg-stone-50/80 p-6 text-sm text-stone-600">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Accessible adjustments</p>
              <p className="mt-3 leading-relaxed text-stone-600">
                If a movement feels too intense, scale it down with props, slower pacing, or a smaller range of motion.
                The goal is comfort and consistency over perfect form.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {normalized.map((practice) => (
                <button
                  key={practice.id}
                  type="button"
                  onClick={() => {
                    setActivePractice(practice);
                    setActiveMuscle(null);
                  }}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition ${
                    activePractice?.id === practice.id
                      ? 'border-stone-700 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white/70 text-stone-500 hover:border-stone-400 hover:text-stone-700'
                  }`}
                >
                  {practice.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
