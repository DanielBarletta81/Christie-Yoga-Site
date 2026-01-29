const CHAKRA_DOSHA_MAP = {
  root: { primary: 'kapha', secondary: 'vata' },
  sacral: { primary: 'vata', secondary: 'pitta' },
  solar: { primary: 'pitta', secondary: 'vata' },
  heart: { primary: 'kapha', secondary: 'vata' },
  throat: { primary: 'vata', secondary: 'pitta' },
  'third-eye': { primary: 'vata', secondary: 'kapha' },
  crown: { primary: 'vata' },
};

export const SHIFT_PRIMARY = 0.08;
export const SHIFT_SECONDARY = 0.04;

export function clamp(value) {
  return Math.max(-1, Math.min(1, value));
}

export function drift(value) {
  const bias = value > 0.3 ? -1 : 1;
  const noise = (Math.random() - 0.5) * 0.04;
  return bias * (0.06 + noise);
}

export function applyChakraInfluence(doshas, chakraId) {
  const mapping = CHAKRA_DOSHA_MAP[chakraId];
  if (!mapping) return doshas;

  const next = { ...doshas };

  if (mapping.primary) {
    next[mapping.primary] = clamp(next[mapping.primary] + drift(next[mapping.primary]) * (SHIFT_PRIMARY / 0.06));
  }

  if (mapping.secondary) {
    next[mapping.secondary] = clamp(next[mapping.secondary] + drift(next[mapping.secondary]) * (SHIFT_SECONDARY / 0.06));
  }

  return next;
}

export function decayDoshas(doshas, rate = 0.002) {
  return {
    vata: clamp(doshas.vata * (1 - rate)),
    pitta: clamp(doshas.pitta * (1 - rate)),
    kapha: clamp(doshas.kapha * (1 - rate)),
  };
}

export function getAffectedDoshas(chakraId) {
  const mapping = CHAKRA_DOSHA_MAP[chakraId];
  if (!mapping) return [];
  const list = [mapping.primary];
  if (mapping.secondary) list.push(mapping.secondary);
  return list.filter(Boolean);
}
