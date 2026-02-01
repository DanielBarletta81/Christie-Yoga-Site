export function ChakraGrid({ chakras, onSelect, resonatingChakraId, activeChakraId }) {
  return (
    <section className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:gap-8">
      {chakras.map((chakra, i) => {
        const isResonating = resonatingChakraId === chakra.id;
        const isActive = activeChakraId === chakra.id;
        return (
          <button
            key={chakra.id}
            aria-haspopup="dialog"
            aria-label={`Open ${chakra.name}`}
            onClick={() => onSelect(chakra)}
            className={`chakra-crystal relative flex min-h-[160px] items-center justify-center rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-[180px] sm:p-7 ${
              i === 6 ? 'col-span-2 justify-self-center sm:col-span-1' : ''
            } ${isActive ? 'is-active' : ''}`}
            style={{ outlineColor: chakra.glow, ['--chakra-color']: chakra.glow }}
          >
            <span className={`crystal-resonance absolute inset-6 rounded-full ${isResonating ? 'is-active' : ''}`} />
            <img src={chakra.svg} alt="" className="max-h-[150px] w-auto sm:max-h-[170px]" />
          </button>
        );
      })}
    </section>
  );
}
