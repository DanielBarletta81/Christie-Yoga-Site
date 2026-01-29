import { useEffect, useMemo, useRef, useState } from 'react';
import { applyChakraInfluence, decayDoshas, getAffectedDoshas } from './doshaLogic';
import { selectSuggestedRitual } from './ritualLogic';

export function useChakraSystem({ chakras, doshasInit, rituals }) {
  const [activeChakra, setActiveChakra] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRitualTray, setShowRitualTray] = useState(false);
  const [doshas, setDoshas] = useState(doshasInit);
  const [suggested, setSuggested] = useState(null);
  const [available, setAvailable] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [dismissed, setDismissed] = useState([]);
  const [resonatingDoshas, setResonatingDoshas] = useState([]);
  const [resonatingChakra, setResonatingChakra] = useState(null);
  const resonanceTimerRef = useRef(null);
  const decayTimerRef = useRef(null);

  useEffect(() => {
    decayTimerRef.current = setInterval(() => {
      setDoshas((prev) => decayDoshas(prev));
    }, 1200);

    return () => {
      if (decayTimerRef.current) clearInterval(decayTimerRef.current);
      if (resonanceTimerRef.current) clearTimeout(resonanceTimerRef.current);
    };
  }, []);

  const availableRituals = useMemo(() => {
    return available.filter((r) => !completed.some((c) => c.id === r.id));
  }, [available, completed]);

  function triggerResonance(chakraId, affected) {
    setResonatingChakra(chakraId);
    setTimeout(() => {
      setResonatingDoshas(affected);
    }, 250);

    if (resonanceTimerRef.current) clearTimeout(resonanceTimerRef.current);
    resonanceTimerRef.current = setTimeout(() => {
      setResonatingChakra(null);
      setResonatingDoshas([]);
    }, 1200);
  }

  function selectChakra(chakra) {
    setActiveChakra(chakra);
    setShowModal(true);
    setDoshas((prev) => applyChakraInfluence(prev, chakra.id));
    triggerResonance(chakra.id, getAffectedDoshas(chakra.id));
  }

  function closeModal() {
    setShowModal(false);
    setShowRitualTray(true);
    if (!activeChakra) return;
    const nextSuggested = selectSuggestedRitual(rituals, activeChakra.id, doshas, dismissed);
    setSuggested(nextSuggested);
    setAvailable(
      rituals.filter(
        (r) => r.supports.includes(activeChakra.id) && r.id !== nextSuggested?.id
      )
    );
  }

  function completeRitual(ritual) {
    setCompleted((prev) => [...prev, ritual]);
    setSuggested(null);
  }

  function dismissSuggested() {
    if (!suggested) return;
    setDismissed((prev) => [...prev, suggested.id]);
    setSuggested(null);
  }

  return {
    state: {
      activeChakra,
      showModal,
      showRitualTray,
      doshas,
      suggested,
      available: availableRituals,
      completed,
      resonatingDoshas,
      resonatingChakra,
    },
    actions: {
      selectChakra,
      closeModal,
      completeRitual,
      dismissSuggested,
    },
  };
}
