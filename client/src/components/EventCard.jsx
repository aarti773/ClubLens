import { Link } from "react-router-dom";
function EventCard({ id, title, date, category, visibility }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          {category}
        </span>

        <span className="text-xs text-slate-400">{visibility}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-slate-400">{date}</p>

      <Link
        to={`/events/${id}`}
        className="mt-5 inline-block rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
      >
        View Album
      </Link>
    </article>
  );
}

export default EventCard;
