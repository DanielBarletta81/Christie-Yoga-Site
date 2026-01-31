'use client';

export default function SomaBackdrop({ tone = 'light' }) {
  const baseOpacity = tone === 'dark' ? 'opacity-10' : 'opacity-15';
  const textColor = tone === 'dark' ? 'text-white/55' : 'text-black/35';
  const lineColor = tone === 'dark' ? 'text-white/45' : 'text-black/30';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -left-10 top-12 text-[clamp(3rem,20vw,11rem)] font-light uppercase tracking-[0.25em] blur-[0.5px] ${textColor} ${baseOpacity}`}>
        Soma
      </div>
      <div className={`absolute left-1/2 top-[38%] -translate-x-1/2 text-[clamp(1.2rem,7vw,3.6rem)] font-light uppercase tracking-[0.45em] blur-[0.5px] ${textColor} opacity-10`}>
        Soma Living Wellness
      </div>
      <div className={`absolute bottom-12 right-8 text-[clamp(1rem,5.5vw,2.8rem)] font-light uppercase tracking-[0.4em] blur-[0.5px] ${textColor} opacity-15`}>
        C.J. Barletta
      </div>

      <div className={`absolute right-12 top-20 h-40 w-40 ${lineColor} opacity-20 blur-[0.5px]`}>
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
          <circle cx="60" cy="60" r="46" />
          <line x1="60" y1="28" x2="60" y2="92" />
          <line x1="38" y1="54" x2="82" y2="54" />
          <circle cx="60" cy="60" r="4" />
        </svg>
      </div>
    </div>
  );
}
