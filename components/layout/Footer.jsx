export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-stone-600 md:flex-row">
        <div className="text-xs uppercase tracking-[0.25em]">
          © {new Date().getFullYear()} Soma Living Wellness · C.J. Barletta
        </div>
        <div className="flex items-center gap-3">
          <SocialIcon label="TikTok" />
          <SocialIcon label="YouTube" />
          <SocialIcon label="Facebook" />
          <SocialIcon label="Instagram" />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-xs uppercase tracking-[0.2em] text-stone-500 transition hover:border-stone-300"
      aria-label={label}
      title={label}
    >
      {label.slice(0, 2)}
    </button>
  );
}
