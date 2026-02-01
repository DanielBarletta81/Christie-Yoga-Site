export function DoshaBars({ doshas, config, resonatingDoshas, activeGlow }) {
  return (
    <section className="flex flex-col gap-4">
      {config.map((d) => {
        const isResonating = resonatingDoshas.includes(d.id);
        return (
          <div
            key={d.id}
            className={`dosha-row ${isResonating ? 'is-resonating' : ''}`}
            style={isResonating ? { '--chakra-color': activeGlow } : undefined}
          >
            <span className="text-base text-text-secondary">{d.label}</span>
            <div className="dosha-bar relative h-3 rounded-full bg-neutral-700/50">
              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
                style={{
                  left: `${(doshas[d.id] + 1) * 50}%`,
                  backgroundColor: d.color,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
