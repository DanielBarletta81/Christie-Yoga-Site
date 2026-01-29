'use client';

import { useEffect, useRef } from 'react';

export function ChakraModal({ chakra, open, onClose }) {
  const closeRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (closeRef.current) closeRef.current.focus();

    function handleKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }

      if (event.key === 'Tab' && wrapperRef.current) {
        const focusable = wrapperRef.current.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open || !chakra) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chakra-title"
    >
      <div
        ref={wrapperRef}
        className="chakra-card relative w-full max-w-md rounded-modal bg-bg-surface p-6 text-text-primary"
        style={{ '--chakra-color': chakra.glow, boxShadow: `0 0 48px ${chakra.glow}` }}
      >
        <button
          ref={closeRef}
          className="absolute right-4 top-4 text-text-muted"
          onClick={onClose}
          aria-label="Close chakra details"
        >
          ✕
        </button>

        <div className="chakra-card-header">
          <span className="chakra-dot" />
          <div>
            <h2 id="chakra-title" className="text-sm uppercase tracking-[0.3em]">
              {chakra.name}
            </h2>
            <p className="text-xs text-text-muted">{chakra.sanskrit}</p>
          </div>
        </div>

        <section className="mt-4">
          <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">Governs</h3>
          <p className="mt-2 text-sm text-text-secondary">{chakra.governs.join(' · ')}</p>
        </section>

        <section className="mt-4">
          <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">When strained or imbalanced</h3>
          <p className="mt-2 text-sm text-text-secondary">{chakra.imbalance.join(', ')}</p>
        </section>

        <section className="mt-4">
          <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">Gentle practices</h3>
          <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-text-secondary">
            {chakra.practices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 text-sm text-text-secondary">
          {chakra.tone}
        </section>
      </div>
    </div>
  );
}
