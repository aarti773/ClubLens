import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/authService";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data.events);
      } catch (error) {
        setError(error.message);
      }
    }

    loadEvents();
  }, []);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(events.map((event) => event.category)),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (searchTerm.trim()) {
      result = result.filter((event) =>
        event.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (event) => event.category === categoryFilter
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [events, searchTerm, categoryFilter, sortBy]);

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Events</h1>

        <p className="mt-2 text-slate-400">
          Browse, search, and sort club events with organized media albums.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search event name..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
          />

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All categories" : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Event name</option>
          </select>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              date={new Date(event.date).toDateString()}
              category={event.category}
              visibility="Public"
            />
          ))}
        </div>

        {filteredEvents.length === 0 && !error && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-slate-300">No matching events found.</p>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default EventsPage;