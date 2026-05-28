import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/authService";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Events</h1>

        <p className="mt-2 text-slate-400">
          Browse club events and their media albums.
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {events.map((event) => (
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
      </section>
    </MainLayout>
  );
}

export default EventsPage;
