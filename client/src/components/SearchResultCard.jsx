function SearchResultCard({ title, tag, event }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="h-44 bg-gradient-to-br from-cyan-500/30 to-violet-500/20" />

      <div className="p-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          {tag}
        </span>

        <h3 className="mt-4 font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-slate-400">{event}</p>
      </div>
    </article>
  );
}

export default SearchResultCard;
