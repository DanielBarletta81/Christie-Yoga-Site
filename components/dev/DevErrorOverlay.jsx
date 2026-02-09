'use client';

import { useEffect, useMemo, useState } from 'react';
import { assertClientEnv } from '../../lib/env';

const MAX_ERRORS = 6;

function normalizeError(err) {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err.message) return err.message;
  try {
    return JSON.stringify(err);
  } catch (error) {
    return String(err);
  }
}

export default function DevErrorOverlay() {
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(true);

  const enabled = useMemo(() => process.env.NODE_ENV === 'development', []);

  useEffect(() => {
    if (!enabled) return;

    const envResult = assertClientEnv();
    if (!envResult.ok) {
      setErrors((prev) => [{ message: envResult.message, type: 'env' }, ...prev].slice(0, MAX_ERRORS));
    }

    const originalError = console.error;
    console.error = (...args) => {
      const message = args.map(normalizeError).join(' ');
      setErrors((prev) => [{ message, type: 'console' }, ...prev].slice(0, MAX_ERRORS));
      originalError(...args);
    };

    function handleError(event) {
      const message = normalizeError(event.error || event.message);
      setErrors((prev) => [{ message, type: 'window' }, ...prev].slice(0, MAX_ERRORS));
    }

    function handleRejection(event) {
      const message = normalizeError(event.reason);
      setErrors((prev) => [{ message, type: 'promise' }, ...prev].slice(0, MAX_ERRORS));
    }

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm rounded-xl border border-red-200/60 bg-white/95 p-3 text-xs text-red-900 shadow-xl">
      <button
        type="button"
        className="mb-2 text-[10px] uppercase tracking-[0.2em] text-red-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? 'Hide Dev Errors' : 'Show Dev Errors'}
      </button>
      {open ? (
        <div className="space-y-2">
          {errors.length ? (
            errors.map((err, idx) => (
              <div key={`${err.type}-${idx}`} className="rounded-lg border border-red-100 bg-red-50/60 p-2">
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-400">{err.type}</div>
                <div className="mt-1 text-[11px] text-red-900">{err.message}</div>
              </div>
            ))
          ) : (
            <div className="text-[11px] text-red-700/70">No captured errors.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
