'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Container from '../ui/Container';
import RitualLibrary from './RitualLibrary';
import WeekColumn from './WeekColumn';
import ModuleCard from './ModuleCard';
import ChakraDetailModal from './ChakraDetailModal';
import { ChakraIcon } from './ChakraIcons';
import { loadSchedule, saveSchedule } from '../../lib/planner/storage';
import { ritualTemplates } from '../../lib/content/ritual-templates';
import { ritualRoutines } from '../../lib/content/ritual-routines';
import { loadSavedRoutines, saveSavedRoutines } from '../../lib/planner/saved-routines';
import { loadSavedDailyRoutines, saveSavedDailyRoutines } from '../../lib/planner/saved-daily-routines';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SLOTS = [
  { key: 'morning', label: 'Morning' },
  { key: 'midday', label: 'Midday' },
  { key: 'afternoon', label: 'Afternoon' },
  { key: 'evening', label: 'Evening' },
  { key: 'flex', label: 'Anytime (flex)' },
];

function getContainerId(dayIndex, slotKey) {
  return `${dayIndex}:${slotKey}`;
}

function createEmptyPlanner() {
  const itemsByContainer = {};
  for (let d = 0; d < 7; d += 1) {
    for (const slot of SLOTS) {
      itemsByContainer[getContainerId(d, slot.key)] = [];
    }
  }
  return { itemsByContainer, completed: {} };
}

function createInstanceId(moduleId) {
  return `instance:${moduleId}:${Date.now()}:${Math.random().toString(16).slice(2, 8)}`;
}

export default function PlannerBoard({ catalog }) {
  const [planner, setPlanner] = useState(createEmptyPlanner());
  const [activeDrag, setActiveDrag] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);
  const [query, setQuery] = useState('');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [openDay, setOpenDay] = useState(0);
  const [viewMode, setViewMode] = useState('weekly');
  const [activeDay, setActiveDay] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isChakraLegendOpen, setIsChakraLegendOpen] = useState(false);
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [hasLoadedSavedRoutines, setHasLoadedSavedRoutines] = useState(false);
  const [savedDailyRoutines, setSavedDailyRoutines] = useState([]);
  const [hasLoadedDailyRoutines, setHasLoadedDailyRoutines] = useState(false);
  const [hasLoadedSchedule, setHasLoadedSchedule] = useState(false);
  const [deletedRoutines, setDeletedRoutines] = useState([]);
  const undoTimerRef = useRef(new Map());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const stored = loadSchedule();
    if (!stored) {
      setHasLoadedSchedule(true);
      return;
    }

    const merged = createEmptyPlanner();
    const storedItems = stored.itemsByContainer ?? stored;

    for (const key of Object.keys(merged.itemsByContainer)) {
      if (storedItems[key]) merged.itemsByContainer[key] = storedItems[key];
    }

    if (stored.completed) merged.completed = stored.completed;

    setPlanner(merged);
    setHasLoadedSchedule(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedSchedule) return;
    saveSchedule(planner);
  }, [planner, hasLoadedSchedule]);

  useEffect(() => {
    setSavedRoutines(loadSavedRoutines());
    setHasLoadedSavedRoutines(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedRoutines) return;
    saveSavedRoutines(savedRoutines);
  }, [savedRoutines, hasLoadedSavedRoutines]);

  useEffect(() => {
    setSavedDailyRoutines(loadSavedDailyRoutines());
    setHasLoadedDailyRoutines(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedDailyRoutines) return;
    saveSavedDailyRoutines(savedDailyRoutines);
  }, [savedDailyRoutines, hasLoadedDailyRoutines]);

  useEffect(() => {
    const raw = window.localStorage.getItem('planner:chakra-legend');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.open === 'boolean') setIsChakraLegendOpen(parsed.open);
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('planner:chakra-legend', JSON.stringify({ open: isChakraLegendOpen }));
  }, [isChakraLegendOpen]);

  useEffect(() => {
    return () => {
      undoTimerRef.current.forEach((timerId) => clearTimeout(timerId));
      undoTimerRef.current.clear();
    };
  }, []);

  const catalogById = useMemo(() => {
    const map = new Map();
    for (const item of catalog) map.set(item.id, item);
    return map;
  }, [catalog]);

  const templateSummaries = useMemo(() => {
    return ritualTemplates.map((template) => {
      const totalMinutes = template.entries.reduce((sum, entry) => {
        const module = catalogById.get(entry.moduleId);
        return sum + (module?.minutes ?? 0);
      }, 0);
      return {
        ...template,
        count: template.entries.length,
        totalMinutes,
      };
    });
  }, [catalogById]);

  const routineSummaries = useMemo(() => {
    return ritualRoutines.map((routine) => {
      const totalMinutes = routine.modules.reduce((sum, moduleId) => {
        const module = catalogById.get(moduleId);
        return sum + (module?.minutes ?? 0);
      }, 0);
      return {
        ...routine,
        minutes: totalMinutes,
        type: 'routine',
      };
    });
  }, [catalogById]);

  const savedRoutineList = useMemo(() => {
    const list = savedRoutines.map((routine, index) => ({
      ...routine,
      pinned: !!routine.pinned,
      tags: routine.tags ?? [],
      order: routine.order ?? index,
    }));

    return list.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return a.order - b.order;
    });
  }, [savedRoutines]);

  const savedRoutineIdSet = useMemo(() => {
    return new Set(savedRoutineList.map((routine) => routine.id));
  }, [savedRoutineList]);

  const savedRoutineSummaries = useMemo(() => {
    return savedRoutineList.map((routine) => {
      const totalMinutes = routine.modules.reduce((sum, moduleId) => {
        const module = catalogById.get(moduleId);
        return sum + (module?.minutes ?? 0);
      }, 0);
      return {
        ...routine,
        minutes: totalMinutes,
        type: 'routine',
      };
    });
  }, [savedRoutineList, catalogById]);

  const savedDailySummaries = useMemo(() => {
    return savedDailyRoutines.map((routine) => ({
      ...routine,
      type: 'daily',
    }));
  }, [savedDailyRoutines]);

  function findContainer(id) {
    if (planner.itemsByContainer[id]) return id;
    for (const [containerId, items] of Object.entries(planner.itemsByContainer)) {
      if (items.some((item) => item.id === id)) return containerId;
    }
    return null;
  }

  function onDragStart(event) {
    const payload = event.active.data.current;
    if (payload?.source === 'routine' || payload?.source === 'saved-routine') {
      const routineSet = payload.source === 'routine' ? routineSummaries : savedRoutineSummaries;
      const routine = routineSet.find((item) => item.id === payload.routineId);
      setActiveDrag(routine ? { title: routine.title, minutes: routine.minutes, type: 'routine', tags: [] } : null);
      return;
    }
    if (payload?.source === 'daily-routine') {
      const routine = savedDailySummaries.find((item) => item.id === payload.routineId);
      setActiveDrag(routine ? { title: routine.title, minutes: '', type: 'daily', tags: [] } : null);
      return;
    }

    const moduleId = payload?.moduleId;
    const module = moduleId ? catalogById.get(moduleId) : null;
    setActiveDrag(
      module
        ? { title: module.title, minutes: module.minutes, type: module.type, tags: module.tags }
        : null
    );
  }

  function onDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      setActiveDrag(null);
      return;
    }

    if (active.data.current?.source === 'saved-routine' && savedRoutineIdSet.has(over.id)) {
      const activeIndex = savedRoutineList.findIndex((routine) => routine.id === active.id);
      const overIndex = savedRoutineList.findIndex((routine) => routine.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const sameGroup = savedRoutineList[activeIndex].pinned === savedRoutineList[overIndex].pinned;
        if (sameGroup && activeIndex !== overIndex) {
          const reordered = arrayMove(savedRoutineList, activeIndex, overIndex);
          const orderMap = new Map();
          reordered.forEach((item, index) => {
            orderMap.set(item.id, index);
          });

          setSavedRoutines((prev) => {
            const prevById = new Map(prev.map((item) => [item.id, item]));
            return reordered.map((item) => ({
              ...prevById.get(item.id),
              order: orderMap.get(item.id),
            }));
          });
        }
      }

      setActiveDrag(null);
      return;
    }

    if (active.data.current?.source === 'daily-routine' && String(over.id).startsWith('day:')) {
      const routineId = active.data.current?.routineId;
      const routine = savedDailyRoutines.find((item) => item.id === routineId);
      if (!routine) {
        setActiveDrag(null);
        return;
      }
      const dayIndex = Number(String(over.id).split(':')[1]);
      applyDailyRoutineToDay(dayIndex, routine);
      setActiveDrag(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id) ?? (planner.itemsByContainer[over.id] ? over.id : null);

    if (!overContainer) {
      setActiveDrag(null);
      return;
    }

    const isFromLibrary = active.data.current?.source === 'library';
    const isFromRoutine = active.data.current?.source === 'routine';
    const isFromSavedRoutine = active.data.current?.source === 'saved-routine';

    setPlanner((prev) => {
      const next = structuredClone(prev);

      if (isFromRoutine || isFromSavedRoutine) {
        const routineId = active.data.current?.routineId;
        const routine = (isFromRoutine ? ritualRoutines : savedRoutines).find((item) => item.id === routineId);
        if (!routine) return prev;

        routine.modules.forEach((moduleId) => {
          const instanceId = createInstanceId(moduleId);
          next.itemsByContainer[overContainer].push({ id: instanceId, moduleId });
          next.completed[instanceId] = false;
        });
        return next;
      }

      if (isFromLibrary) {
        const moduleId = active.data.current?.moduleId;
        if (!moduleId) return prev;

        const instanceId = createInstanceId(moduleId);
        next.itemsByContainer[overContainer].push({ id: instanceId, moduleId });
        next.completed[instanceId] = false;
        return next;
      }

      if (!activeContainer) return prev;

      const activeIndex = next.itemsByContainer[activeContainer].findIndex((item) => item.id === active.id);
      if (activeIndex === -1) return prev;

      if (activeContainer === overContainer) {
        if (planner.itemsByContainer[over.id]) {
          const [moved] = next.itemsByContainer[activeContainer].splice(activeIndex, 1);
          next.itemsByContainer[overContainer].push(moved);
          return next;
        }

        const overIndex = next.itemsByContainer[overContainer].findIndex((item) => item.id === over.id);
        if (overIndex === -1) return prev;

        const [moved] = next.itemsByContainer[activeContainer].splice(activeIndex, 1);
        next.itemsByContainer[overContainer].splice(overIndex, 0, moved);
        return next;
      }

      const [moved] = next.itemsByContainer[activeContainer].splice(activeIndex, 1);
      if (planner.itemsByContainer[over.id]) {
        next.itemsByContainer[overContainer].push(moved);
        return next;
      }

      const overIndex = next.itemsByContainer[overContainer].findIndex((item) => item.id === over.id);
      if (overIndex === -1) {
        next.itemsByContainer[overContainer].push(moved);
        return next;
      }

      next.itemsByContainer[overContainer].splice(overIndex, 0, moved);
      return next;
    });

    setActiveDrag(null);
  }

  function toggleDone(itemId) {
    setPlanner((prev) => {
      const next = structuredClone(prev);
      next.completed[itemId] = !next.completed[itemId];
      return next;
    });
  }

  function removeItem(itemId) {
    setPlanner((prev) => {
      const next = structuredClone(prev);
      const containerId = findContainer(itemId);
      if (containerId) {
        next.itemsByContainer[containerId] = next.itemsByContainer[containerId].filter((item) => item.id !== itemId);
      }
      delete next.completed[itemId];
      return next;
    });
  }

  function applyTemplate(template) {
    setPlanner(() => {
      const next = createEmptyPlanner();
      template.entries.forEach((entry) => {
        const containerId = getContainerId(entry.day, entry.slot);
        if (!next.itemsByContainer[containerId]) return;
        const instanceId = createInstanceId(entry.moduleId);
        next.itemsByContainer[containerId].push({ id: instanceId, moduleId: entry.moduleId });
        next.completed[instanceId] = false;
      });
      return next;
    });
  }

  function saveRoutine(containerId, items) {
    if (!items.length) return;
    const name = window.prompt('Name this routine');
    if (!name || !name.trim()) return;

    const modules = items.map((item) => item.moduleId).filter(Boolean);
    if (!modules.length) return;

    const routine = {
      id: `saved:${Date.now()}:${Math.random().toString(16).slice(2, 8)}`,
      title: name.trim(),
      description: `Saved from ${containerId}`,
      modules,
      tags: [],
      pinned: false,
      order: Date.now(),
    };

    setSavedRoutines((prev) => [routine, ...prev]);
  }

  function updateRoutine(routineId, updates) {
    const normalized = { ...updates };
    if (typeof normalized.title === 'string') {
      const trimmed = normalized.title.trim();
      if (!trimmed) return;
      normalized.title = trimmed;
    }

    setSavedRoutines((prev) =>
      prev.map((item) => (item.id === routineId ? { ...item, ...normalized } : item))
    );
  }

  function deleteRoutine(routineId) {
    const routine = savedRoutines.find((item) => item.id === routineId);
    if (!routine) return;
    setDeletedRoutines((prev) => [...prev, routine]);
    setSavedRoutines((prev) => prev.filter((item) => item.id !== routineId));

    const timerId = setTimeout(() => {
      setDeletedRoutines((prev) => prev.filter((item) => item.id !== routineId));
      undoTimerRef.current.delete(routineId);
    }, 5000);

    undoTimerRef.current.set(routineId, timerId);
  }

  function undoDeleteRoutine(routineId) {
    const routine = deletedRoutines.find((item) => item.id === routineId);
    if (!routine) return;
    setSavedRoutines((prev) => [routine, ...prev]);
    setDeletedRoutines((prev) => prev.filter((item) => item.id !== routineId));
    const timerId = undoTimerRef.current.get(routineId);
    if (timerId) clearTimeout(timerId);
    undoTimerRef.current.delete(routineId);
  }

  function togglePinRoutine(routineId) {
    const routine = savedRoutines.find((item) => item.id === routineId);
    if (!routine) return;
    updateRoutine(routineId, { pinned: !routine.pinned });
  }

  function moveRoutine(routineId, direction) {
    setSavedRoutines((prev) => {
      const list = prev.map((routine, index) => ({
        ...routine,
        pinned: !!routine.pinned,
        tags: routine.tags ?? [],
        order: routine.order ?? index,
      }));

      list.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.order - b.order;
      });

      const currentIndex = list.findIndex((routine) => routine.id === routineId);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= list.length) return prev;
      if (list[currentIndex].pinned !== list[nextIndex].pinned) return prev;

      const nextList = list.slice();
      const [moved] = nextList.splice(currentIndex, 1);
      nextList.splice(nextIndex, 0, moved);

      const orderMap = new Map();
      nextList.forEach((item, index) => {
        orderMap.set(item.id, index);
      });

      const prevById = new Map(prev.map((item) => [item.id, item]));
      return nextList.map((item) => ({
        ...prevById.get(item.id),
        order: orderMap.get(item.id),
      }));
    });
  }

  function applyDailyRoutineToDay(dayIndex, routine) {
    setPlanner((prev) => {
      const next = structuredClone(prev);
      SLOTS.forEach((slot) => {
        const containerId = getContainerId(dayIndex, slot.key);
        const moduleIds = routine.slots?.[slot.key] ?? [];
        next.itemsByContainer[containerId] = moduleIds.map((moduleId) => ({
          id: createInstanceId(moduleId),
          moduleId,
        }));
        next.itemsByContainer[containerId].forEach((item) => {
          next.completed[item.id] = false;
        });
      });
      return next;
    });
  }

  function applySlotToAllWeek(dayIndex, slotKey) {
    const sourceId = getContainerId(dayIndex, slotKey);
    const sourceItems = planner.itemsByContainer[sourceId] ?? [];
    const moduleIds = sourceItems.map((item) => item.moduleId);

    if (!moduleIds.length) return;

    setPlanner((prev) => {
      const next = structuredClone(prev);
      for (let d = 0; d < 7; d += 1) {
        const targetId = getContainerId(d, slotKey);
        next.itemsByContainer[targetId] = moduleIds.map((moduleId) => ({
          id: createInstanceId(moduleId),
          moduleId,
        }));
        next.itemsByContainer[targetId].forEach((item) => {
          next.completed[item.id] = false;
        });
      }
      return next;
    });
  }

  function handleApplyAllWeek(containerId) {
    const [dayIndex, slotKey] = String(containerId).split(':');
    if (dayIndex === undefined || !slotKey) return;
    applySlotToAllWeek(Number(dayIndex), slotKey);
  }

  function applyDayToWeek(dayIndex) {
    const daySlots = {};
    SLOTS.forEach((slot) => {
      const containerId = getContainerId(dayIndex, slot.key);
      daySlots[slot.key] = (planner.itemsByContainer[containerId] ?? []).map((item) => item.moduleId);
    });

    setPlanner((prev) => {
      const next = structuredClone(prev);
      for (let d = 0; d < 7; d += 1) {
        SLOTS.forEach((slot) => {
          const targetId = getContainerId(d, slot.key);
          const moduleIds = daySlots[slot.key] ?? [];
          next.itemsByContainer[targetId] = moduleIds.map((moduleId) => ({
            id: createInstanceId(moduleId),
            moduleId,
          }));
          next.itemsByContainer[targetId].forEach((item) => {
            next.completed[item.id] = false;
          });
        });
      }
      return next;
    });
  }

  function saveDailyRoutine(dayIndex) {
    const name = window.prompt('Name this daily routine');
    if (!name || !name.trim()) return;

    const slots = {};
    SLOTS.forEach((slot) => {
      const containerId = getContainerId(dayIndex, slot.key);
      slots[slot.key] = (planner.itemsByContainer[containerId] ?? []).map((item) => item.moduleId);
    });

    const routine = {
      id: `daily:${Date.now()}:${Math.random().toString(16).slice(2, 8)}`,
      title: name.trim(),
      slots,
    };

    setSavedDailyRoutines((prev) => [routine, ...prev]);
  }

  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/neuro-fascial.jpeg')",
        '--ambient-image-2': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/healthy-start.jpeg')",
      }}
    >
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Planner</p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Your weekly ritual planner
            </h1>
            <p className="mt-3 max-w-2xl text-base text-stone-600">
              Build a week that feels steady and doable. Drag small rituals into life-friendly slots and adjust as you go.
            </p>
          </div>

          <div
            className="soft-frame flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            style={{
              '--accent-image': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/ayurveda.jpg')",
            }}
          >
            <div>
              <h2 className="text-lg font-semibold text-stone-900">
                {viewMode === 'daily' ? 'Daily Planner' : 'Weekly Planner'}
              </h2>
              <p className="text-sm text-stone-600">No pressure. No perfect schedule. Just gentle defaults.</p>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setIsChakraLegendOpen((prev) => !prev)}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-500"
                >
                  Chakra legend {isChakraLegendOpen ? '−' : '+'}
                </button>
                {isChakraLegendOpen ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Root" size={14} />
                      Root
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Sacral" size={14} />
                      Sacral
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Solar" size={14} />
                      Solar
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Heart" size={14} />
                      Heart
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Throat" size={14} />
                      Throat
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Third Eye" size={14} />
                      Third Eye
                    </span>
                    <span className="flex items-center gap-2">
                      <ChakraIcon name="Crown" size={14} />
                      Crown
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
              <div className="inline-flex rounded-full border border-stone-200 bg-white p-1 text-xs uppercase tracking-[0.25em] text-stone-600">
                <button
                  type="button"
                  onClick={() => setViewMode('daily')}
                  className={`rounded-full px-4 py-2 transition ${viewMode === 'daily' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
                >
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('weekly')}
                  className={`rounded-full px-4 py-2 transition ${viewMode === 'weekly' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
                >
                  Weekly
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsFocusMode((prev) => !prev)}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-stone-600"
                >
                  {isFocusMode ? 'Exit focus' : 'Focus mode'}
                </button>
                {!isFocusMode ? (
                  <button
                    type="button"
                    onClick={() => setIsTemplatesOpen((prev) => !prev)}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-stone-600"
                  >
                    {isTemplatesOpen ? 'Hide templates' : 'Show templates'}
                  </button>
                ) : null}
              </div>
              <input
                className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 sm:max-w-xs"
                placeholder="Search rituals, tags, or type"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/70 p-4 shadow-sm lg:hidden">
            <button
              type="button"
              onClick={() => setIsTemplatesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">Templates</h3>
                <p className="mt-1 text-sm text-stone-600">Start with a ready-made week.</p>
              </div>
              <span className="text-lg text-stone-500">{isTemplatesOpen ? '−' : '+'}</span>
            </button>
            {isTemplatesOpen ? (
              <div className="mt-4 grid gap-3">
                {templateSummaries.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => applyTemplate(template)}
                    className="rounded-2xl border border-stone-300 bg-white px-3 py-3 text-left text-stone-700 transition hover:border-stone-400"
                    title={template.description}
                  >
                    <div className="text-[11px] uppercase tracking-[0.2em]">{template.title}</div>
                    <div className="mt-1 text-[11px] text-stone-500">
                      {template.count} rituals · {template.totalMinutes} min
                    </div>
                    <div className="mt-2 text-xs text-stone-500">{template.description}</div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <div className={`grid gap-6 ${isFocusMode ? 'lg:grid-cols-[minmax(0,1fr)]' : 'lg:grid-cols-[260px_minmax(0,1fr)_220px]'}`}>
              {!isFocusMode ? (
                <div
                  className="soft-frame rounded-[32px]"
                  style={{
                    '--accent-image': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/hero-background.jpg')",
                  }}
                >
                  <RitualLibrary
                    catalog={catalog}
                    routines={routineSummaries}
                    savedRoutines={savedRoutineSummaries}
                    dailyRoutines={savedDailySummaries}
                    query={query}
                    onUpdateRoutine={updateRoutine}
                    onDeleteRoutine={deleteRoutine}
                    onTogglePinRoutine={togglePinRoutine}
                    onMoveRoutine={moveRoutine}
                  />
                </div>
              ) : null}

              <div
                className="soft-frame overflow-x-auto rounded-[32px] bg-white/70 p-4 shadow-glow"
                style={{
                  '--accent-image': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/wellness.jpg')",
                }}
              >
                {viewMode === 'daily' ? (
                  <div className="grid gap-4">
                    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-200 bg-white/80 p-3">
                      {DAYS.map((label, index) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setActiveDay(index)}
                          className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                            activeDay === index ? 'bg-stone-900 text-white' : 'text-stone-600'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                      <div className="ml-auto flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => saveDailyRoutine(activeDay)}
                          className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-700"
                        >
                          Save day
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDayToWeek(activeDay)}
                          className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-700"
                        >
                          Apply day to week
                        </button>
                      </div>
                    </div>
                    <WeekColumn
                      dayLabel={DAYS[activeDay]}
                      dayIndex={activeDay}
                      hideHeader
                      slots={SLOTS.map((slot) => ({
                        key: slot.key,
                        label: slot.label,
                        items: planner.itemsByContainer[getContainerId(activeDay, slot.key)] ?? [],
                      }))}
                      catalogById={catalogById}
                      completed={planner.completed}
                      onToggleDone={toggleDone}
                      onRemove={removeItem}
                      onSaveRoutine={saveRoutine}
                      onOpenDetails={setActiveDetail}
                      dayDropId={`day:${activeDay}`}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 lg:hidden">
                      {DAYS.map((label, index) => (
                        <div key={label}>
                          <button
                            type="button"
                            onClick={() => setOpenDay((prev) => (prev === index ? -1 : index))}
                            className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-left"
                          >
                            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">
                              {label}
                            </span>
                            <span className="text-lg text-stone-500">{openDay === index ? '−' : '+'}</span>
                          </button>
                          {openDay === index ? (
                            <div className="mt-3">
                              <WeekColumn
                                dayLabel={label}
                                dayIndex={index}
                                hideHeader
                                slots={SLOTS.map((slot) => ({
                                  key: slot.key,
                                  label: slot.label,
                                  items: planner.itemsByContainer[getContainerId(index, slot.key)] ?? [],
                                }))}
                                catalogById={catalogById}
                                completed={planner.completed}
                      onToggleDone={toggleDone}
                      onRemove={removeItem}
                      onSaveRoutine={saveRoutine}
                      onApplyAllWeek={handleApplyAllWeek}
                      onOpenDetails={setActiveDetail}
                    />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>

                <div className="hidden grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 lg:grid">
                  {DAYS.map((label, index) => (
                    <WeekColumn
                          key={label}
                          dayLabel={label}
                          dayIndex={index}
                          slots={SLOTS.map((slot) => ({
                            key: slot.key,
                            label: slot.label,
                            items: planner.itemsByContainer[getContainerId(index, slot.key)] ?? [],
                          }))}
                          catalogById={catalogById}
                          completed={planner.completed}
                      onToggleDone={toggleDone}
                      onRemove={removeItem}
                      onSaveRoutine={saveRoutine}
                      onApplyAllWeek={handleApplyAllWeek}
                      onOpenDetails={setActiveDetail}
                    />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {isTemplatesOpen && !isFocusMode ? (
                <aside
                  className="soft-frame hidden rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glow lg:block"
                  style={{
                    '--accent-image': "url('https://soma-website-static-s3.s3.us-east-1.amazonaws.com/img/healthy-start.jpeg')",
                  }}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">Templates</h3>
                  <p className="mt-2 text-sm text-stone-600">
                    Pick a week to start. You can drag, swap, or remove anything.
                  </p>
                  <div className="mt-4 grid gap-3">
                    {templateSummaries.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => applyTemplate(template)}
                        className="rounded-2xl border border-stone-300 bg-white px-3 py-3 text-left text-stone-700 transition hover:border-stone-400"
                        title={template.description}
                      >
                        <div className="text-[11px] uppercase tracking-[0.2em]">{template.title}</div>
                        <div className="mt-1 text-[11px] text-stone-500">
                          {template.count} rituals · {template.totalMinutes} min
                        </div>
                        <div className="mt-2 text-xs text-stone-500">{template.description}</div>
                      </button>
                    ))}
                  </div>
                </aside>
              ) : null}
            </div>

            <DragOverlay>
              {activeDrag ? (
                <ModuleCard
                  title={activeDrag.title}
                  minutes={activeDrag.minutes}
                  type={activeDrag.type}
                  tags={activeDrag.tags}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
          <ChakraDetailModal module={activeDetail} onClose={() => setActiveDetail(null)} />
          {deletedRoutines.length ? (
            <div className="fixed bottom-6 left-1/2 z-50 flex w-[min(90vw,360px)] -translate-x-1/2 flex-col gap-2">
              {deletedRoutines.map((routine) => (
                <div
                  key={routine.id}
                  className="rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Routine removed</p>
                      <p className="text-sm text-stone-700">{routine.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => undoDeleteRoutine(routine.id)}
                      className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-700"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
