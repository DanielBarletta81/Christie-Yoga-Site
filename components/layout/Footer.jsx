export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-stone-600 md:flex-row">
        <div className="text-xs uppercase tracking-[0.25em]">
          © {new Date().getFullYear()} Soma Living Wellness™. All rights reserved. Designed for calm. Built with restraint.
        </div>
        <div className="flex items-center gap-3">
          <SocialIcon label="TikTok" href="https://www.tiktok.com/@soma-live-wellness" />
          <SocialIcon label="YouTube" href="https://www.youtube.com/@soma-live-wellness" />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label, href }) {
  const icon =
    label === 'TikTok' ? (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5">
        <line x1="32" y1="10" x2="32" y2="46" />
        <path d="M32 18c6 4 10 2 14 2" />
        <circle cx="32" cy="50" r="4" />
      </svg>
    ) : (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5">
        <rect x="10" y="18" width="44" height="28" rx="6" />
        <circle cx="32" cy="32" r="4" />
      </svg>
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}
