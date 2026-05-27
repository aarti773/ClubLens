import MainLayout from "../layouts/MainLayout";

function SearchPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            AI Media Search
          </h1>

          <p className="mt-4 text-slate-400">
            Search event photos using AI-powered tags and descriptions.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            type="text"
            placeholder="Search for photos..."
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
          />

          <button className="mt-4 rounded-xl bg-white px-6 py-3 font-medium text-slate-900">
            Search
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

export default SearchPage;