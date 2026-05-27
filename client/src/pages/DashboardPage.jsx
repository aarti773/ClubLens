import MainLayout from "../layouts/MainLayout";

function DashboardPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Total Events</p>
            <h2 className="mt-3 text-3xl font-bold">12</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Media Files</p>
            <h2 className="mt-3 text-3xl font-bold">348</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Private Albums</p>
            <h2 className="mt-3 text-3xl font-bold">5</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">AI Tags</p>
            <h2 className="mt-3 text-3xl font-bold">86</h2>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default DashboardPage;