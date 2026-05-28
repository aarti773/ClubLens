import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { createEvent } from "../services/authService";

function CreateEventPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateEvent() {
    try {
      const token = localStorage.getItem("token");

      setLoading(true);
      setError("");

      const data = await createEvent(
        {
          title,
          description,
          category,
          date,
        },
        token
      );

      navigate(`/events/${data.event._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">Create Event</h1>

          <p className="mt-2 text-slate-400">
            Admins can publish new club events.
          </p>

          {error && (
            <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
            />

            <textarea
              placeholder="Event description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
            />

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
            />

            <button
              onClick={handleCreateEvent}
              disabled={loading}
              className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default CreateEventPage;