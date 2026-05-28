import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getEventById } from "../services/authService";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data.event);
      } catch (error) {
        setError(error.message);
      }
    }

    loadEvent();
  }, [id]);

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {!event && !error && (
          <p className="text-slate-400">Loading event...</p>
        )}

        {event && (
          <>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                {event.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold">
                {event.title}
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                {event.description}
              </p>

              <div className="mt-6 flex gap-4 text-sm text-slate-400">
                <span>
                  {new Date(event.date).toDateString()}
                </span>
                <span>•</span>
                <span>Public Album</span>
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="h-52 bg-slate-800"></div>

                  <div className="p-4">
                    <h3 className="font-medium">
                      Media Item {item}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Uploaded from event gallery
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default EventDetailPage;
