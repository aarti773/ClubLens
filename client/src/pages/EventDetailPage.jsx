import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getEventById, getEventMedia } from "../services/authService";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEventDetails() {
      try {
        const eventData = await getEventById(id);
        const mediaData = await getEventMedia(id);

        setEvent(eventData.event);
        setMedia(mediaData);
      } catch (error) {
        setError(error.message);
      }
    }

    loadEventDetails();
  }, [id]);

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {!event && !error && <p className="text-slate-400">Loading event...</p>}

        {event && (
          <>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                {event.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold">{event.title}</h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                {event.description}
              </p>

              <div className="mt-6 flex gap-4 text-sm text-slate-400">
                <span>{new Date(event.date).toDateString()}</span>
                <span>•</span>
                <span>{media.length} media uploads</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Event Gallery</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Photos uploaded by club members
                  </p>
                </div>
              </div>

              {media.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
                  <p className="text-slate-300">No media uploaded yet.</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Uploaded photos will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {media.map((item) => (
                    <div
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.caption || event.title}
                        className="h-52 w-full object-cover"
                      />

                      <div className="p-4">
                        <h3 className="font-medium">
                          {item.caption || "Event photo"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Uploaded by {item.uploadedBy?.name || "member"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default EventDetailPage;
