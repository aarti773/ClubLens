import MainLayout from "../layouts/MainLayout";

function EventsPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="mt-2 text-slate-400">
          Browse club events and their media albums.
        </p>
      </section>
    </MainLayout>
  );
}

export default EventsPage;