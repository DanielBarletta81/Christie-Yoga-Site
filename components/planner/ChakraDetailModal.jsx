'use client';

import { useEffect } from 'react';
import { ChakraIcon } from './ChakraIcons';

export default function ChakraDetailModal({ module, onClose }) {
  useEffect(() => {
    if (!module) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [module, onClose]);

  if (!module) return null;

  const chakraMap = {
    yoga: ['Root', 'Sacral', 'Solar'],
    breath: ['Heart', 'Throat'],
    meditation: ['Third Eye', 'Crown'],
    habit: ['Root'],
    recipe: ['Solar'],
    note: ['Throat'],
  };

  const chakras = chakraMap[module.type] || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md border-l border-stone-200 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Ritual details</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">{module.title}</h3>
            <p className="mt-2 text-sm text-stone-600">
              {module.type} · {module.minutes} min · {module.intensity || 'gentle'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-200 px-3 py-1 text-xs uppercase tracking-[0.25em] text-stone-600"
          >
            Close
          </button>
        </div>
        {module.instructions ? (
          <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
            {module.instructions}
          </div>
        ) : null}
        {chakras.length ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chakras.map((chakra) => (
              <span
                key={chakra}
                className={`inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-600`}
              >
                <ChakraIcon name={chakra} size={14} />
                {chakra}
              </span>
            ))}
          </div>
        ) : null}
        {module.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {module.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-100/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-700"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
