export const SLOT_RECOMMENDATIONS = {
  yoga: ['morning', 'afternoon'],
  breath: ['morning', 'evening'],
  meditation: ['evening'],
  habit: ['morning'],
  recipe: ['midday'],
  note: ['evening'],
};

export function getRecommendedSlots(type) {
  return SLOT_RECOMMENDATIONS[type] || [];
}

export function getPrimaryRecommendation(type) {
  const list = getRecommendedSlots(type);
  return list[0] || 'flex';
}

export function formatSlotLabel(slotKey) {
  const map = {
    morning: 'Morning',
    midday: 'Midday',
    afternoon: 'Afternoon',
    evening: 'Evening',
    flex: 'Anytime',
  };
  return map[slotKey] || 'Anytime';
}
