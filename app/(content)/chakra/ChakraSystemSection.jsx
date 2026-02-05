'use client';

import { ChakraGrid } from '../chakra-system/ui/ChakraGrid';
import { DoshaBars } from '../chakra-system/ui/DoshaBars';
import { RitualTray } from '../chakra-system/ui/RitualTray';
import { ChakraModal } from '../chakra-system/ui/ChakraModal';
import { useChakraSystem } from '../chakra-system/logic/useChakraSystem';
import { DOSHAS } from '../chakra-system/data';
import SomaBackdrop from '../../../components/brand/SomaBackdrop';
import { CDN_BASE } from '../../../lib/media/cdn';

export default function ChakraSystemSection({ chakras = [], rituals = [] }) {
  const { state, actions } = useChakraSystem({
    chakras,
    doshasInit: { vata: 0, pitta: 0, kapha: 0 },
    rituals,
  });

  const activeGlow = state.activeChakra?.glow || 'rgba(255,255,255,0.25)';
  const hasChakras = chakras.length > 0;

  return (
    <section
      id="chakra-rituals"
      className="relative mt-16 overflow-hidden rounded-[40px] border border-white/10 bg-bg-primary/90 px-6 py-12 text-text-primary sm:px-10"
      style={{
        backgroundImage: `url('${CDN_BASE}/bg/chakras-2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-bg-primary/85" />
      <SomaBackdrop tone="dark" />
      <div className="relative z-10 flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-text-muted">
            <img src={`${CDN_BASE}/icons/chakra-yogi.svg`} alt="" className="h-5 w-5 opacity-80" />
            Chakra Ritual Field
          </div>
          <h2 className="text-2xl font-light text-text-primary sm:text-3xl">
            A calm ritual field for daily balance
          </h2>
          <p className="text-base text-text-secondary sm:text-lg">
            Select a center, notice the shift, and explore a gentle ritual if it feels supportive.
          </p>
        </header>

        {hasChakras ? (
          <ChakraGrid
            chakras={chakras}
            onSelect={actions.selectChakra}
            resonatingChakraId={state.resonatingChakra}
            activeChakraId={state.activeChakra?.id}
          />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 text-base text-white/70">
            Chakra content is not published yet.
          </div>
        )}

        {hasChakras ? (
          <DoshaBars
            doshas={state.doshas}
            config={DOSHAS}
            resonatingDoshas={state.resonatingDoshas}
            activeGlow={activeGlow}
          />
        ) : null}

        {hasChakras ? (
          <RitualTray
            visible={state.showRitualTray}
            suggested={state.suggested}
            available={state.available}
            completed={state.completed}
            onComplete={actions.completeRitual}
            onDismiss={actions.dismissSuggested}
            accent={activeGlow}
          />
        ) : null}
      </div>

      {hasChakras ? (
        <ChakraModal chakra={state.activeChakra} open={state.showModal} onClose={actions.closeModal} />
      ) : null}
    </section>
  );
}
