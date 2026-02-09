export default function ModuleCard({ title, minutes, type, tags, subtle }) {
  const showMeta = minutes && type;

  return (
    <div
      className={`rounded-2xl border hover-soft ${subtle ? 'border-dashed border-stone-200 bg-white/80' : 'border-stone-200 bg-white'} p-3 shadow-sm`}
    >
      <div className="text-sm font-semibold text-stone-900">{title}</div>
      {showMeta ? (
        <div className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-500">
          {minutes} min · {type}
        </div>
      ) : null}
      {tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-brand-100/70 px-2 py-1 text-[10px] uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
