'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChakraGrid } from './ui/ChakraGrid';
import { DoshaBars } from './ui/DoshaBars';
import { RitualTray } from './ui/RitualTray';
import { ChakraModal } from './ui/ChakraModal';
import { useChakraSystem } from './logic/useChakraSystem';
import { DOSHAS } from './data';
import { CDN_BASE } from '../../../lib/media/cdn';
import SomaBackdrop from '../../../components/brand/SomaBackdrop';
import { fetchGraphQL, GET_ALL_CHAKRAS, GET_RITUAL_TRAY } from '../../../lib/wpgraphql';

export default function ChakraSystemPage() {
  const [chakraSet, setChakraSet] = useState([]);
  const [ritualSet, setRitualSet] = useState([]);

  const hasGraphql = useMemo(() => Boolean(process.env.NEXT_PUBLIC_WORDPRESS_API_URL), []);

  useEffect(() => {
    if (!hasGraphql) return;
    let ignore = false;

    async function loadOverrides() {
      try {
        const [chakraData, ritualData] = await Promise.all([
          fetchGraphQL(GET_ALL_CHAKRAS, { cache: 'no-store' }),
          fetchGraphQL(GET_RITUAL_TRAY, { cache: 'no-store' }),
        ]);

        const chakraNodes = chakraData?.chakras?.nodes || [];
        if (chakraNodes.length && !ignore) {
          const crystalBase = `${CDN_BASE}/icons/chakra-crystal-system/svg`;
          const mapped = chakraNodes
            .map((node) => {
              const fields = node.chakraFields || {};
              if (fields.isActive === false) return null;
              const slug = node.slug;
              if (!slug) return null;
              const toList = (items) =>
                Array.isArray(items) ? items.map((item) => item?.label).filter(Boolean) : [];
              return {
                id: slug,
                name: node.title || slug,
                sanskrit: fields.sanskrit || '',
                glow: fields.themeColor || '#ffffff',
                svg: `${crystalBase}/${slug}.svg`,
                governs: toList(fields.governs),
                imbalance: toList(fields.imbalances),
                practices: toList(fields.practices),
                tone: fields.tone || fields.shortDescription || '',
                order: fields.order ?? 0,
              };
            })
            .filter(Boolean)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          if (mapped.length) setChakraSet(mapped);
        }

        const ritualNodes = ritualData?.rituals?.nodes || [];
        const mappedRituals = ritualNodes
          .map((node) => {
            const supports = node.supportsChakra?.nodes?.map((item) => item.slug) || [];
            const biases = node.supportsDosha?.nodes?.map((item) => item.slug) || [];

            if (!supports.length) return null;

            return {
              id: node.id,
              label: node.ritualDetails?.ritualLabel || node.title,
              supports,
              biases,
            };
          })
          .filter(Boolean);

        if (mappedRituals.length && !ignore) {
          setRitualSet(mappedRituals);
        }
      } catch (error) {
        // No-data mode
      }
    }

    loadOverrides();

    return () => {
      ignore = true;
    };
  }, [hasGraphql]);

  const { state, actions } = useChakraSystem({
    chakras: chakraSet,
    doshasInit: { vata: 0, pitta: 0, kapha: 0 },
    rituals: ritualSet,
  });

  const activeGlow = state.activeChakra?.glow || 'rgba(255,255,255,0.25)';
  const hasChakras = chakraSet.length > 0;

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
        <SomaBackdrop tone="dark" />
        <div className="mx-auto flex max-w-[420px] flex-col gap-6 px-4 py-6 sm:max-w-[720px]">
          <header className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-text-muted">
              <img
                src={`${CDN_BASE}/icons/chakra-yogi.svg`}
                alt=""
                className="h-5 w-5 opacity-80"
              />
              Chakra System
            </div>
            <h1 className="text-2xl font-light text-text-primary">A calm ritual field</h1>
            <p className="text-sm text-text-secondary">
              Explore one center at a time. No pressure, no plans — just gentle attention and an optional suggestion.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src={`${CDN_BASE}/icons/green-heart-chakra.svg`} alt="" className="h-6 w-6 opacity-70" />
              <img src={`${CDN_BASE}/icons/chakras-3.svg`} alt="" className="h-7 w-7 opacity-60" />
            </div>
          </header>

          {hasChakras ? (
            <ChakraGrid
              chakras={chakraSet}
              onSelect={actions.selectChakra}
              resonatingChakraId={state.resonatingChakra}
              activeChakraId={state.activeChakra?.id}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-sm text-white/70">
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
      </div>

      {hasChakras ? (
        <ChakraModal chakra={state.activeChakra} open={state.showModal} onClose={actions.closeModal} />
      ) : null}
    </main>
  );
}
