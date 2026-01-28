'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChakraIcon } from './ChakraIcons';

const chakraMap = {
  yoga: ['Root', 'Sacral', 'Solar'],
  breath: ['Heart', 'Throat'],
  meditation: ['Third Eye', 'Crown'],
  habit: ['Root'],
  recipe: ['Solar'],
  note: ['Throat'],
};

export default function ScheduledItem({ id, module, done, onToggleDone, onRemove, onOpenDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { moduleId: module.id, source: 'schedule' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const chakras = chakraMap[module.type] || [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex min-w-0 items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-600 shadow-sm ${
        isDragging ? 'opacity-60' : ''
      }`}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggleDone();
        }}
        className={`rounded-full border px-2 py-1 text-[9px] uppercase tracking-[0.2em] transition ${
          done ? 'border-stone-300 bg-stone-100 text-stone-500' : 'border-stone-200 text-stone-600'
        }`}
      >
        {done ? 'Done' : 'Do'}
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpenDetails?.();
        }}
        className={`truncate text-left text-[11px] ${done ? 'line-through text-stone-400' : 'text-stone-800'}`}
      >
        {module.title}
      </button>

      <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500">{module.minutes} min</span>

      <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400">{module.type}</span>

      {chakras.length ? (
        <div className="flex items-center gap-1">
          {chakras.map((chakra) => (
            <ChakraIcon key={chakra} name={chakra} size={12} />
          ))}
        </div>
      ) : null}

      {module.media?.access === 'paid' ? (
        <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[9px] text-stone-500">
          Locked
        </span>
      ) : null}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        className="ml-auto h-6 w-6 rounded-full border border-stone-200 text-xs text-stone-500 transition hover:border-stone-300"
        aria-label="Remove"
      >
        ×
      </button>
    </div>
  );
}
