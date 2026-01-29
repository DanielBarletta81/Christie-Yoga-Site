import { useEffect, useState } from 'react';

export function RitualTray({
  visible,
  suggested,
  available,
  completed,
  onComplete,
  onDismiss,
  accent,
}) {
  if (!visible) return null;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`ritual-tray relative flex flex-col gap-4 pt-4 transition-opacity duration-calm motion-reduce:transition-none ${isReady ? 'visible' : ''}`}
    >
      <h2 className="text-sm uppercase tracking-wide text-text-muted">Today</h2>

      {suggested && (
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-text-muted">Suggested</span>
          <button
            className="w-full rounded-pill px-4 py-3 text-left bg-neutral-800/60 border-l-2"
            style={{ borderColor: accent }}
            onClick={() => onComplete(suggested)}
          >
            {suggested.label}
          </button>
          <button className="text-xs text-text-muted self-start" onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      )}

      {available.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-text-muted">Available</span>
          {available.map((r) => (
            <button
              key={r.id}
              className="w-full rounded-pill px-4 py-3 text-left bg-neutral-800/40"
              onClick={() => onComplete(r)}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-text-muted">Completed</span>
          {completed.map((r) => (
            <div
              key={r.id}
              className="w-full rounded-pill px-4 py-3 bg-neutral-800/20 text-text-muted"
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
