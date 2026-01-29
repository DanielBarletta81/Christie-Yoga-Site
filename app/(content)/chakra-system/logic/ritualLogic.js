export const DRIFT_THRESHOLD = 0.35;
export const MIN_DURATION_MINUTES = 8;

export function selectSuggestedRitual(rituals, chakraId, doshas, dismissed = []) {
  const candidates = rituals.filter(
    (r) => r.supports.includes(chakraId) && !dismissed.includes(r.id)
  );

  if (!candidates.length) return null;

  if (doshas.vata > 0.4) return candidates.find((r) => r.biases.includes('vata')) || candidates[0];
  if (doshas.pitta > 0.4) return candidates.find((r) => r.biases.includes('pitta')) || candidates[0];
  if (doshas.kapha > 0.4) return candidates.find((r) => r.biases.includes('kapha')) || candidates[0];

  return candidates[0];
}
