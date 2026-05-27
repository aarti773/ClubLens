import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">
          Event & Media Management Platform
        </p>

        <h1 className="text-5xl font-bold tracking-tight">ClubLens</h1>

        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          A centralized platform for clubs to manage events, upload media,
          discover photos with AI, and collaborate securely.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950">
            Explore Events
          </button>

          <button className="rounded-xl border border-white/20 px-5 py-3 font-medium">
            Upload Media
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;
