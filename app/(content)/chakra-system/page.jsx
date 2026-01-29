'use client';

import { ChakraGrid } from './ui/ChakraGrid';
import { DoshaBars } from './ui/DoshaBars';
import { RitualTray } from './ui/RitualTray';
import { ChakraModal } from './ui/ChakraModal';
import { useChakraSystem } from './logic/useChakraSystem';
import { CHAKRAS, DOSHAS, RITUALS } from './data';
import { CDN_BASE } from '../../../lib/media/cdn';

export default function ChakraSystemPage() {
  const { state, actions } = useChakraSystem({
    chakras: CHAKRAS,
    doshasInit: { vata: 0, pitta: 0, kapha: 0 },
    rituals: RITUALS,
  });

  const activeGlow = state.activeChakra?.glow || 'rgba(255,255,255,0.25)';

  return (
    <main
      className="min-h-screen bg-bg-primary text-text-primary"
      style={{
        backgroundImage: `url('${CDN_BASE}/bg/chakras-2.png'), url('${CDN_BASE}/chakra-vis.jpg')`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, left center',
      }}
    >
      <div className="min-h-screen bg-bg-primary/80">
        <div className="mx-auto flex max-w-[420px] flex-col gap-6 px-4 py-6 sm:max-w-[720px]">
          <header className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.35em] text-text-muted">Chakra System</p>
            <h1 className="text-2xl font-light text-text-primary">A calm ritual field</h1>
            <p className="text-sm text-text-secondary">
              Explore one center at a time. No pressure, no plans — just gentle attention and an optional suggestion.
            </p>
          </header>

          <ChakraGrid
            chakras={CHAKRAS}
            onSelect={actions.selectChakra}
            resonatingChakraId={state.resonatingChakra}
            activeChakraId={state.activeChakra?.id}
          />

          <DoshaBars
            doshas={state.doshas}
            config={DOSHAS}
            resonatingDoshas={state.resonatingDoshas}
            activeGlow={activeGlow}
          />

          <RitualTray
            visible={state.showRitualTray}
            suggested={state.suggested}
            available={state.available}
            completed={state.completed}
            onComplete={actions.completeRitual}
            onDismiss={actions.dismissSuggested}
            accent={activeGlow}
          />
        </div>
      </div>

      <ChakraModal chakra={state.activeChakra} open={state.showModal} onClose={actions.closeModal} />
    </main>
  );
}
