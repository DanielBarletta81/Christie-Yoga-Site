'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import ModuleCard from './ModuleCard';
import ScheduledItem from './ScheduledItem';

function SlotZone({
  id,
  label,
  slotKey,
  timeRange,
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
          {timeRange ? <span className="text-[10px] text-stone-400">{timeRange}</span> : null}
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
                slotKey={slotKey}
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

function formatHour(hour) {
  const period = hour >= 12 ? 'p' : 'a';
  const value = hour % 12 === 0 ? 12 : hour % 12;
  return `${value}${period}`;
}

const SLOT_COLORS = {
  morning: 'bg-amber-300',
  midday: 'bg-sky-300',
  afternoon: 'bg-emerald-300',
  evening: 'bg-indigo-300',
  flex: 'bg-stone-300',
};

function getSlotForHour(slots, hour) {
  return slots.find((slot) => slot.key !== 'flex' && hour >= slot.startHour && hour < slot.endHour);
}

function TimeSlotBlock({
  dayIndex,
  slot,
  start,
  catalogById,
  completed,
  onToggleDone,
  onRemove,
  onOpenDetails,
  onUpdateHour,
}) {
  const startRow = slot.startHour - start + 1;
  const endRow = slot.endHour - start + 1;
  const hours = Array.from({ length: slot.endHour - slot.startHour }, (_, idx) => slot.startHour + idx);
  const availableHours = hours;

  return (
    <div
      className="rounded-2xl border border-stone-200 bg-white/80 p-3"
      style={{ gridRow: `${startRow} / ${endRow}` }}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-stone-500">
        <span>{slot.label}</span>
        <span className="text-stone-400">{slot.time}</span>
      </div>
      <div className="mt-2 grid gap-2">
        {hours.map((hour) => (
          <HourCell
            key={`${slot.key}-${hour}`}
            dayIndex={dayIndex}
            slotKey={slot.key}
            hour={hour}
            items={slot.items.filter((item) => (item.hour ?? slot.startHour) === hour)}
            catalogById={catalogById}
            completed={completed}
            onToggleDone={onToggleDone}
            onRemove={onRemove}
            onOpenDetails={onOpenDetails}
            availableHours={availableHours}
            onUpdateHour={onUpdateHour}
          />
        ))}
      </div>
    </div>
  );
}

function HourCell({
  dayIndex,
  slotKey,
  hour,
  items,
  catalogById,
  completed,
  onToggleDone,
  onRemove,
  onOpenDetails,
  availableHours,
  onUpdateHour,
}) {
  const dropId = `${dayIndex}:${slotKey}:${hour}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropId });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border border-dashed px-3 py-2 ${isOver ? 'border-stone-400 bg-stone-50' : 'border-stone-200 bg-white/80'}`}
    >
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-400">{formatHour(hour)}</div>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.length ? (
          items.map((item) => {
            const module = catalogById.get(item.moduleId);
            if (!module) return null;
            return (
              <ScheduledItem
                key={item.id}
                id={item.id}
                module={module}
                slotKey={slotKey}
                hour={hour}
                done={!!completed[item.id]}
                onToggleDone={() => onToggleDone(item.id)}
                onRemove={() => onRemove(item.id)}
                onOpenDetails={() => onOpenDetails?.(module)}
                showTimePicker
                availableHours={availableHours}
                onUpdateHour={(nextHour) => onUpdateHour?.(item.id, nextHour)}
              />
            );
          })
        ) : (
          <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Drop here</div>
        )}
      </SortableContext>
    </div>
  );
}
function FlexSlotBlock({
  dayIndex,
  slot,
  catalogById,
  completed,
  onToggleDone,
  onRemove,
  onOpenDetails,
  onUpdateHour,
}) {
  const availableHours = Array.from({ length: 16 }, (_, idx) => 6 + idx);
  const dropId = `${dayIndex}:${slot.key}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropId });

  return (
    <div ref={setNodeRef} className={`mt-4 rounded-2xl border p-3 ${isOver ? 'border-stone-400 bg-stone-50' : 'border-stone-200 bg-stone-50/70'}`}>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
        <span className="inline-flex h-2 w-2 rounded-full bg-stone-300" />
        {slot.label}
        <span className="text-[10px] text-stone-400">{slot.time}</span>
      </div>
      <div className="mt-2 grid gap-2">
        <SortableContext items={slot.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {slot.items.length ? (
            slot.items.map((item) => {
              const module = catalogById.get(item.moduleId);
              if (!module) return null;
              return (
                <ScheduledItem
                  key={item.id}
                  id={item.id}
                  module={module}
                  slotKey={slot.key}
                  hour={item.hour ?? null}
                  done={!!completed[item.id]}
                  onToggleDone={() => onToggleDone(item.id)}
                  onRemove={() => onRemove(item.id)}
                  onOpenDetails={() => onOpenDetails?.(module)}
                  showTimePicker
                  availableHours={availableHours}
                  onUpdateHour={(nextHour) => onUpdateHour?.(item.id, nextHour)}
                />
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-stone-200 bg-white/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Drop here
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

function TimeGrid({ dayIndex, slots, catalogById, completed, onToggleDone, onRemove, onOpenDetails, onUpdateHour }) {
  const timedSlots = slots.filter((slot) => slot.key !== 'flex');
  const flexSlot = slots.find((slot) => slot.key === 'flex');
  const start = Math.min(...timedSlots.map((slot) => slot.startHour));
  const end = Math.max(...timedSlots.map((slot) => slot.endHour));
  const hours = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);

  const slotByHour = useMemo(() => {
    const map = new Map();
    hours.slice(0, -1).forEach((hour) => {
      const slot = getSlotForHour(slots, hour);
      map.set(hour, slot?.key ?? 'flex');
    });
    return map;
  }, [hours, slots]);

  return (
    <div className="mt-3">
      <div className="grid grid-cols-[44px_1fr] gap-3">
        <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-stone-400">
          {hours.slice(0, -1).map((hour) => (
            <div key={hour} className="flex h-10 items-center gap-2">
              <span className={`inline-flex h-2 w-2 rounded-full ${SLOT_COLORS[slotByHour.get(hour)] || 'bg-stone-300'}`} />
              {formatHour(hour)}
            </div>
          ))}
        </div>
        <div
          className="grid gap-2"
          style={{ gridTemplateRows: `repeat(${hours.length - 1}, minmax(40px, 1fr))` }}
        >
          {timedSlots.map((slot) => (
            <TimeSlotBlock
              key={slot.key}
              dayIndex={dayIndex}
              slot={slot}
              start={start}
              catalogById={catalogById}
              completed={completed}
              onToggleDone={onToggleDone}
              onRemove={onRemove}
              onOpenDetails={onOpenDetails}
              onUpdateHour={onUpdateHour}
            />
          ))}
        </div>
      </div>

      {flexSlot ? (
        <FlexSlotBlock
          dayIndex={dayIndex}
          slot={flexSlot}
          catalogById={catalogById}
          completed={completed}
          onToggleDone={onToggleDone}
          onRemove={onRemove}
          onOpenDetails={onOpenDetails}
        />
      ) : null}
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
  dayDate,
  layoutMode = 'slots',
  onUpdateHour,
  hideHeader,
  dayDropId,
}) {
  const { setNodeRef: setDayRef, isOver: isDayOver } = useDroppable({ id: dayDropId ?? `day:${dayIndex}` });

  return (
    <div className="min-w-0 rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm hover-lift">
      {!hideHeader ? (
        <div
          ref={setDayRef}
          className={`rounded-2xl border border-dashed px-3 py-2 ${
            isDayOver ? 'border-stone-400 bg-stone-50' : 'border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">{dayLabel}</h4>
            {dayDate ? (
              <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
                {dayDate}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      {layoutMode === 'time' ? (
        <TimeGrid
          dayIndex={dayIndex}
          slots={slots}
          catalogById={catalogById}
          completed={completed}
          onToggleDone={onToggleDone}
          onRemove={onRemove}
          onOpenDetails={onOpenDetails}
          onUpdateHour={onUpdateHour}
        />
      ) : (
        slots.map((slot) => (
          <SlotZone
            key={`${dayIndex}:${slot.key}`}
            id={`${dayIndex}:${slot.key}`}
            label={slot.label}
            slotKey={slot.key}
            timeRange={slot.time}
            items={slot.items}
            catalogById={catalogById}
            completed={completed}
            onToggleDone={onToggleDone}
            onRemove={onRemove}
            onSaveRoutine={onSaveRoutine}
            onApplyAllWeek={onApplyAllWeek}
            onOpenDetails={onOpenDetails}
          />
        ))
      )}
    </div>
  );
}
