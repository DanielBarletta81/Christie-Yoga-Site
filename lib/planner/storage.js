const STORAGE_KEY = 'planner:schedule:v1';

export function loadSchedule() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // Back-compat: older shape was a plain container map.
    if (parsed && !parsed.itemsByContainer) {
      return {
        itemsByContainer: parsed,
        completed: {},
      };
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveSchedule(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore write errors (private mode, quota, etc.)
  }
}
