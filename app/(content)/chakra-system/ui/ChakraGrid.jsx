export function ChakraGrid({ chakras, onSelect, resonatingChakraId, activeChakraId }) {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {chakras.map((chakra, i) => {
        const isResonating = resonatingChakraId === chakra.id;
        const isActive = activeChakraId === chakra.id;
        return (
          <button
            key={chakra.id}
            aria-haspopup="dialog"
            aria-label={`Open ${chakra.name}`}
            onClick={() => onSelect(chakra)}
            className={`chakra-crystal relative flex items-center justify-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
              i === 6 ? 'col-span-2 justify-self-center sm:col-span-1' : ''
            } ${isActive ? 'is-active' : ''}`}
            style={{ outlineColor: chakra.glow, ['--chakra-color']: chakra.glow }}
          >
            <span className={`crystal-resonance absolute inset-6 rounded-full ${isResonating ? 'is-active' : ''}`} />
            <img src={chakra.svg} alt="" className="max-h-[130px] w-auto" />
          </button>
        );
      })}
    </section>
  );
}
