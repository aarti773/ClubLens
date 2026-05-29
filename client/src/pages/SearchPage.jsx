import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { searchMedia } from "../services/authService";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch() {
    try {
      setError("");

      const data = await searchMedia(query);

      setResults(data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Advanced Media Search</h1>

          <p className="mt-4 text-slate-400">
            Search media by tags, captions, events, and uploaded content.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            type="text"
            placeholder="Try: crowd, workshop, cultural..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
          />

          <button
            onClick={handleSearch}
            className="mt-4 rounded-xl bg-white px-6 py-3 font-medium text-slate-900"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={item.imageUrl}
                alt={item.caption || "Search result"}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-medium">
                  {item.caption || "Event photo"}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {item.event?.title || "Unknown event"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Uploaded by {item.uploadedBy?.name || "member"}
                </p>

                {item.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && query && !error && (
          <p className="mt-8 text-center text-slate-400">
            No media found for this search.
          </p>
        )}
      </section>
    </MainLayout>
  );
}

export default SearchPage;