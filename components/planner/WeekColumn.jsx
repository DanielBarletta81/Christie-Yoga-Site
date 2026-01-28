'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ModuleCard from './ModuleCard';
import ScheduledItem from './ScheduledItem';

function SlotZone({
  id,
  label,
  slotKey,
  items,
  catalogById,
  completed,
  onToggleDone,
  onRemove,
  onSaveRoutine,
  onApplyAllWeek,
  onOpenDetails,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const slotColors = {
    morning: 'bg-amber-300',
    midday: 'bg-sky-300',
    afternoon: 'bg-emerald-300',
    evening: 'bg-indigo-300',
    flex: 'bg-stone-300',
  };
  const slotTints = {
    morning: 'bg-amber-50/70',
    midday: 'bg-sky-50/70',
    afternoon: 'bg-emerald-50/70',
    evening: 'bg-indigo-50/70',
    flex: 'bg-stone-50/70',
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
          <span className={`inline-flex h-2 w-2 rounded-full ${slotColors[slotKey] || 'bg-stone-300'}`} />
          {label}
        </div>
        {items.length ? (
          <div className="flex items-center gap-2">
            {onApplyAllWeek ? (
              <button
                type="button"
                onClick={() => onApplyAllWeek(id)}
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-700"
              >
                All week
              </button>
            ) : null}
            {onSaveRoutine ? (
              <button
                type="button"
                onClick={() => onSaveRoutine(id, items)}
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-700"
              >
                Save
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        ref={setNodeRef}
        className={`mt-2 grid min-w-0 gap-2 rounded-2xl border border-dashed p-3 transition ${
          isOver ? 'border-stone-400 bg-stone-50' : `border-stone-200 ${slotTints[slotKey] || 'bg-white/80'}`
        }`}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => {
            const module = catalogById.get(item.moduleId);
            if (!module) return null;
            return (
              <ScheduledItem
                key={item.id}
                id={item.id}
                module={module}
                done={!!completed[item.id]}
                onToggleDone={() => onToggleDone(item.id)}
                onRemove={() => onRemove(item.id)}
                onOpenDetails={() => onOpenDetails?.(module)}
              />
            );
          })}
        </SortableContext>
        {!items.length && (
          <ModuleCard title="Drop here" minutes="" type="" tags={[]} subtle />
        )}
      </div>
    </div>
  );
}

export default function WeekColumn({
  dayLabel,
  dayIndex,
  slots,
  catalogById,
  completed,
  onToggleDone,
  onRemove,
  onSaveRoutine,
  onApplyAllWeek,
  onOpenDetails,
  hideHeader,
  dayDropId,
}) {
  const { setNodeRef: setDayRef, isOver: isDayOver } = useDroppable({ id: dayDropId ?? `day:${dayIndex}` });

  return (
    <div className="min-w-0 rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm">
      {!hideHeader ? (
        <div
          ref={setDayRef}
          className={`rounded-2xl border border-dashed px-3 py-2 ${
            isDayOver ? 'border-stone-400 bg-stone-50' : 'border-transparent'
          }`}
        >
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">{dayLabel}</h4>
        </div>
      ) : null}
      {slots.map((slot) => (
        <SlotZone
          key={`${dayIndex}:${slot.key}`}
          id={`${dayIndex}:${slot.key}`}
          label={slot.label}
          slotKey={slot.key}
          items={slot.items}
          catalogById={catalogById}
          completed={completed}
          onToggleDone={onToggleDone}
          onRemove={onRemove}
          onSaveRoutine={onSaveRoutine}
          onApplyAllWeek={onApplyAllWeek}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
