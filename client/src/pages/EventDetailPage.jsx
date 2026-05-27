import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const events = {
  1: {
    title: "Freshers Cultural Night",
    category: "Cultural",
    date: "12 September 2026",
    visibility: "Public Album",
    description:
      "A collection of photos and videos from the club cultural night, including stage performances, crowd moments, and team memories.",
  },
  2: {
    title: "Robotics Workshop",
    category: "Workshop",
    date: "24 September 2026",
    visibility: "Private Album",
    description:
      "Media from the robotics workshop covering technical sessions, student projects, and hands-on learning moments.",
  },
  3: {
    title: "Mountain Trip Gallery",
    category: "Trip",
    date: "3 October 2026",
    visibility: "Public Album",
    description:
      "Photos and videos from the club mountain trip, including group shots, landscapes, travel moments, and memories.",
  },
};

function EventDetailPage() {
  const { id } = useParams();
  const event = events[id];

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
            {event.category}
          </span>

          <h1 className="mt-5 text-4xl font-bold">{event.title}</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            {event.description}
          </p>

          <div className="mt-6 flex gap-4 text-sm text-slate-400">
            <span>{event.date}</span>
            <span>•</span>
            <span>{event.visibility}</span>
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
                <h3 className="font-medium">Media Item {item}</h3>

                <p className="mt-2 text-sm text-slate-400">
                  Uploaded from event gallery
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default EventDetailPage;