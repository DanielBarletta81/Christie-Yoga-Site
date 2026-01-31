'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { shouldUseSoundOnly } from '@/utils/useSoundOnly';
import { CDN_BASE } from '../../../lib/media/cdn';
import { fetchGraphQL, GET_ALL_SOUNDS } from '../../../lib/wpgraphql';

export default function SoundBowlPage() {
  const [frequencies, setFrequencies] = useState([]);
  const [activeFreq, setActiveFreq] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOnly, setSoundOnly] = useState(false);
  const audioRef = useRef(null);

  const hasGraphql = useMemo(() => Boolean(process.env.NEXT_PUBLIC_WORDPRESS_API_URL), []);

  useEffect(() => {
    setSoundOnly(shouldUseSoundOnly());
  }, []);

  useEffect(() => {
    if (!hasGraphql) return;
    let ignore = false;

    async function loadSounds() {
      try {
        const data = await fetchGraphQL(GET_ALL_SOUNDS, {
          cache: 'no-store',
        });
        const nodes = data?.sounds?.nodes || [];
        const mapped = nodes
          .map((node) => {
            const details = node.soundDetails || node;
            if (!details?.audioUrl) return null;
            const frequency = details.frequencyHz ? `${details.frequencyHz} Hz` : node.title || 'Sound Bowl';
            return {
              id: node.id,
              label: frequency,
              color: details.colorHex || '#9fcfc0',
              src: details.audioUrl,
              copy: details.frequencyCopy || 'A calming tone for steady listening.',
            };
          })
          .filter(Boolean);

        if (!ignore && mapped.length) {
          setFrequencies(mapped);
          setActiveFreq(mapped[0]);
        }
      } catch (error) {
        // Silent no-data mode
      }
    }

    loadSounds();

    return () => {
      ignore = true;
    };
  }, [graphqlEndpoint, hasGraphql]);

  useEffect(() => {
    if (!frequencies.length) return;
    if (!frequencies.find((freq) => freq.id === activeFreq?.id)) {
      setActiveFreq(frequencies[0]);
    }
  }, [frequencies, activeFreq?.id]);

  useEffect(() => {
    if (!activeFreq?.src) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(activeFreq.src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.8;
      return;
    }

    const oldAudio = audioRef.current;
    const newAudio = new Audio(activeFreq.src);
    newAudio.loop = true;
    newAudio.volume = 0;

    if (isPlaying) {
      newAudio.play();
      fadeAudio(oldAudio, newAudio);
    }

    audioRef.current = newAudio;

    return () => {
      oldAudio.pause();
      newAudio.pause();
    };
  }, [activeFreq, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  function fadeAudio(oldAudio, newAudio) {
    let t = 0;
    const fade = setInterval(() => {
      t += 0.05;
      oldAudio.volume = Math.max(0, 0.8 * (1 - t));
      newAudio.volume = Math.min(0.8, 0.8 * t);
      if (t >= 1) {
        oldAudio.pause();
        clearInterval(fade);
      }
    }, 40);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-bg-primary text-text-primary"
      style={{
        backgroundImage: `url('${CDN_BASE}/bg/buddha-sit.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        type="button"
        onClick={() => setSoundOnly((value) => !value)}
        className="absolute right-6 top-6 z-20 text-xs text-text-muted"
      >
        {soundOnly ? 'Visual mode' : 'Sound only'}
      </button>
      <div className="absolute inset-0 bg-bg-primary/80" />
      {activeFreq ? (
        soundOnly ? (
          <SoundOnlyPlayer frequency={activeFreq} isPlaying={isPlaying} onToggle={togglePlay} />
        ) : (
          <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
            <ambientLight intensity={0.35} />
            <directionalLight position={[2, 4, 2]} intensity={0.6} />
            <Environment preset="studio" />

            <SoundBowl glowColor={activeFreq.color} isPlaying={isPlaying} onToggle={togglePlay} />
          </Canvas>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
          Sound library is coming online.
        </div>
      )}

      {activeFreq ? (
        <div className="absolute bottom-16 left-1/2 w-[min(520px,90vw)] -translate-x-1/2 text-center text-sm text-text-muted">
          {activeFreq.copy}
        </div>
      ) : null}

      {frequencies.length ? (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
          {frequencies.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFreq(f)}
              className={`pb-1 transition-opacity ${activeFreq?.id === f.id ? 'opacity-100 border-b' : 'opacity-60'}`}
              style={{ borderColor: activeFreq?.id === f.id ? f.color : 'transparent' }}
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SoundBowl({ glowColor, isPlaying, onToggle }) {
  return (
    <group onClick={onToggle} position={[0, -0.5, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1.2, 0.6, 64, 1, true]} />
        <meshStandardMaterial color="#2b241b" roughness={0.6} metalness={0.8} />
      </mesh>

      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[0.9, 0.05, 16, 64]} />
        <meshStandardMaterial color="#bfa35a" metalness={1} roughness={0.3} />
      </mesh>

      <mesh scale={1.03}>
        <cylinderGeometry args={[1.05, 1.25, 0.62, 64, 1, true]} />
        <meshStandardMaterial color={glowColor} transparent opacity={isPlaying ? 0.12 : 0} />
      </mesh>
    </group>
  );
}

function SoundOnlyPlayer({ frequency, isPlaying, onToggle }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onToggle();
      }}
      aria-label={`Sound bowl. ${isPlaying ? 'Playing' : 'Tap to play'}. Frequency: ${frequency.label}.`}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="h-24 w-24 rounded-full border"
          style={{
            borderColor: frequency.color,
            opacity: isPlaying ? 0.6 : 0.3,
          }}
        />

        <p className="text-xs text-text-muted">{isPlaying ? 'Playing' : 'Tap to play'}</p>
      </div>
    </div>
  );
}
