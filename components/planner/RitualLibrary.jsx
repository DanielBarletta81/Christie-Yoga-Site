'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChakraIcon } from './ChakraIcons';
import { formatSlotLabel, getPrimaryRecommendation } from '../../lib/planner/recommendations';

function ModuleLibraryCard({ module }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library:${module.id}`,
    data: { moduleId: module.id, source: 'library' },
  });

  const chakraMap = {
    yoga: ['Root', 'Sacral', 'Solar'],
    breath: ['Heart', 'Throat'],
    meditation: ['Third Eye', 'Crown'],
    habit: ['Root'],
    recipe: ['Solar'],
    note: ['Throat'],
  };

  const chakras = chakraMap[module.type] || [];
  const recommended = getPrimaryRecommendation(module.type);

  return (
    <div className={`rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm hover-soft ${isDragging ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{module.type}</p>
          <h4 className="mt-2 text-sm font-semibold text-stone-900">{module.title}</h4>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-stone-400">
            Recommended: {formatSlotLabel(recommended)}
          </p>
          {module.instructions ? (
            <p className="mt-2 text-sm text-stone-600">{module.instructions}</p>
          ) : null}
          {module.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
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
          {chakras.length ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {chakras.map((chakra) => (
                <span
                  key={chakra}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-600"
                >
                  <ChakraIcon name={chakra} size={14} />
                  {chakra}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-500"
          aria-label="Drag"
        >
          ⋮⋮
        </button>
      </div>
    </div>
  );
}

function RoutinePill({ label, minutes, onEdit, onDelete, onTogglePin, isPinned }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-600 transition">
      <span className="text-[11px] text-stone-700">{label}</span>
      {minutes ? (
        <span className="text-[10px] text-stone-400">{minutes} min</span>
      ) : null}
      {isPinned ? (
        <span className="rounded-full bg-stone-900 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
          Pinned
        </span>
      ) : null}
      {onEdit ? (
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
        >
          Edit
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
        >
          Remove
        </button>
      ) : null}
      {onTogglePin ? (
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onTogglePin();
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
        >
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
      ) : null}
    </div>
  );
}

function DraggablePill({ label, minutes, dragId, payload }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: dragId,
    data: payload,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-600 transition ${
        isDragging ? 'opacity-60' : ''
      }`}
    >
      <span className="text-[11px] text-stone-700">{label}</span>
      {minutes ? <span className="text-[10px] text-stone-400">{minutes} min</span> : null}
    </div>
  );
}

function SavedRoutineItem({
  routine,
  onEdit,
  onDelete,
  onTogglePin,
  onMoveUp,
  onMoveDown,
  showMoveUp,
  showMoveDown,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: routine.id,
    data: { routineId: routine.id, source: 'saved-routine' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? 'opacity-60' : ''}>
      <div className="flex items-center gap-2">
        <RoutinePill
          label={routine.title}
          minutes={routine.minutes}
          onEdit={onEdit ? () => onEdit(routine.id) : undefined}
          onDelete={onDelete ? () => onDelete(routine.id) : undefined}
          onTogglePin={onTogglePin ? () => onTogglePin(routine.id) : undefined}
          isPinned={routine.pinned}
        />
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="rounded-full border border-stone-200 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-400"
          aria-label="Reorder"
        >
          ⋮⋮
        </button>
        {showMoveUp ? (
          <button
            type="button"
            onClick={() => onMoveUp?.(routine.id)}
            className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
          >
            Up
          </button>
        ) : null}
        {showMoveDown ? (
          <button
            type="button"
            onClick={() => onMoveDown?.(routine.id)}
            className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
          >
            Down
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SavedRoutineEditor({ routine, onCancel, onSave, onDelete }) {
  const [title, setTitle] = useState(routine.title);
  const [tags, setTags] = useState((routine.tags || []).join(', '));
  const [pinned, setPinned] = useState(!!routine.pinned);

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
      <label className="text-xs uppercase tracking-[0.2em] text-stone-500">
        Routine name
        <input
          className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className="mt-3 text-xs uppercase tracking-[0.2em] text-stone-500">
        Effects (comma separated)
        <input
          className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="energizing, relaxing, digestion"
        />
      </label>
      <button
        type="button"
        onClick={() => setPinned((prev) => !prev)}
        className="mt-3 rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-600"
      >
        {pinned ? 'Pinned' : 'Pin'}
      </button>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onSave({ title, tags, pinned })}
          className="rounded-full border border-stone-300 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-rose-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default function RitualLibrary({
  catalog,
  routines,
  savedRoutines,
  dailyRoutines,
  query,
  onUpdateRoutine,
  onDeleteRoutine,
  onTogglePinRoutine,
  onMoveRoutine,
}) {
  const [editingId, setEditingId] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(true);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isRoutinesOpen, setIsRoutinesOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [maxMinutes, setMaxMinutes] = useState(30);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (item.minutes > maxMinutes) return false;
      if (!q) return true;
      const haystack = [item.title, item.type, ...(item.tags || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [catalog, query, typeFilter, maxMinutes]);

  useEffect(() => {
    const raw = window.localStorage.getItem('planner:library:sections');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.isFiltersOpen === 'boolean') setIsFiltersOpen(parsed.isFiltersOpen);
      if (typeof parsed.isSavedOpen === 'boolean') setIsSavedOpen(parsed.isSavedOpen);
      if (typeof parsed.isDailyOpen === 'boolean') setIsDailyOpen(parsed.isDailyOpen);
      if (typeof parsed.isRoutinesOpen === 'boolean') setIsRoutinesOpen(parsed.isRoutinesOpen);
      if (typeof parsed.isModulesOpen === 'boolean') setIsModulesOpen(parsed.isModulesOpen);
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    const state = {
      isFiltersOpen,
      isSavedOpen,
      isDailyOpen,
      isRoutinesOpen,
      isModulesOpen,
    };
    window.localStorage.setItem('planner:library:sections', JSON.stringify(state));
  }, [isFiltersOpen, isSavedOpen, isDailyOpen, isRoutinesOpen, isModulesOpen]);

  return (
    <div className="glass-panel soft-ring rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900">Ritual Library</h3>
          <p className="mt-1 text-sm text-stone-600">
            Drag a module into your week. Keep it simple — consistency beats perfection.
          </p>
        </div>
        <span className="rounded-full bg-stone-900 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
          {filtered.length} items
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <button
          type="button"
          onClick={() => setIsFiltersOpen((prev) => !prev)}
          className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-600"
        >
          Filters
          <span className="text-stone-400">{isFiltersOpen ? '−' : '+'}</span>
        </button>
        {isFiltersOpen ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Type
              <select
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                {['all', 'breath', 'yoga', 'meditation', 'habit', 'recipe', 'note'].map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All' : type}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Max minutes
              <select
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
                value={maxMinutes}
                onChange={(event) => setMaxMinutes(Number(event.target.value))}
              >
                {[5, 10, 15, 20, 30].map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} min
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
        {savedRoutines?.length ? (
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-3">
            <button
              type="button"
              onClick={() => setIsSavedOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-500"
            >
              Your routines
              <span className="text-stone-400">{isSavedOpen ? '−' : '+'}</span>
            </button>
            {isSavedOpen ? (
              <>
                <p className="mt-1 text-xs text-stone-500">Drag a saved routine to expand it.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <SortableContext items={savedRoutines.map((routine) => routine.id)} strategy={verticalListSortingStrategy}>
                    {savedRoutines.map((routine, index) => {
                  const prev = savedRoutines[index - 1];
                  const next = savedRoutines[index + 1];
                  const canMoveUp = !!prev && prev.pinned === routine.pinned;
                  const canMoveDown = !!next && next.pinned === routine.pinned;

                return editingId === routine.id ? (
                  <SavedRoutineEditor
                    key={routine.id}
                    routine={routine}
                    onCancel={() => setEditingId(null)}
                    onSave={({ title, tags, pinned }) => {
                      const tagList = tags
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean);
                      onUpdateRoutine?.(routine.id, { title, tags: tagList, pinned });
                      setEditingId(null);
                    }}
                    onDelete={() => {
                      onDeleteRoutine?.(routine.id);
                      setEditingId(null);
                    }}
                  />
                ) : (
                  <SavedRoutineItem
                    key={routine.id}
                    routine={routine}
                    onEdit={() => setEditingId(routine.id)}
                    onDelete={onDeleteRoutine}
                    onTogglePin={onTogglePinRoutine}
                    onMoveUp={(id) => onMoveRoutine?.(id, -1)}
                    onMoveDown={(id) => onMoveRoutine?.(id, 1)}
                    showMoveUp={canMoveUp}
                    showMoveDown={canMoveDown}
                  />
                    );
                  })}
                  </SortableContext>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        {dailyRoutines?.length ? (
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-3">
            <button
              type="button"
              onClick={() => setIsDailyOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-500"
            >
              Daily favorites
              <span className="text-stone-400">{isDailyOpen ? '−' : '+'}</span>
            </button>
            {isDailyOpen ? (
              <>
                <p className="mt-1 text-xs text-stone-500">Drag onto a day to fill it.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dailyRoutines.map((routine) => (
                    <DraggablePill
                      key={routine.id}
                      label={routine.title}
                      dragId={`daily-routine:${routine.id}`}
                      payload={{ routineId: routine.id, source: 'daily-routine' }}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        {routines?.length ? (
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-3">
            <button
              type="button"
              onClick={() => setIsRoutinesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-500"
            >
              Routines
              <span className="text-stone-400">{isRoutinesOpen ? '−' : '+'}</span>
            </button>
            {isRoutinesOpen ? (
              <>
                <p className="mt-1 text-xs text-stone-500">
                  Drag a routine to expand it into multiple modules.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {routines.map((routine) => (
                    <DraggablePill
                      key={routine.id}
                      label={routine.title}
                      minutes={routine.minutes}
                      dragId={`routine:${routine.id}`}
                      payload={{ routineId: routine.id, source: 'routine' }}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="rounded-2xl border border-stone-200 bg-white/80 p-3">
          <button
            type="button"
            onClick={() => setIsModulesOpen((prev) => !prev)}
            className="flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-500"
          >
            Modules
            <span className="text-stone-400">{isModulesOpen ? '−' : '+'}</span>
          </button>
          {isModulesOpen ? (
            <div className="mt-3 grid gap-2">
              {filtered.map((module) => (
                <ModuleLibraryCard key={module.id} module={module} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
