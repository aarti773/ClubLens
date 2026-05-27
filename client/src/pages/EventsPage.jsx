import MainLayout from "../layouts/MainLayout";
import EventCard from "../components/EventCard";

const events = [
  {
    title: "Freshers Cultural Night",
    date: "12 September 2026",
    category: "Cultural",
    visibility: "Public",
  },
  {
    title: "Robotics Workshop",
    date: "24 September 2026",
    category: "Workshop",
    visibility: "Private",
  },
  {
    title: "Mountain Trip Gallery",
    date: "3 October 2026",
    category: "Trip",
    visibility: "Public",
  },
];

function EventsPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="mt-2 text-slate-400">
          Browse club events and their media albums.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default EventsPage;