const STORAGE_KEY = 'planner:saved-daily-routines:v1';

export function loadSavedDailyRoutines() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavedDailyRoutines(routines) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  } catch {
    // Ignore write errors.
  }
}
