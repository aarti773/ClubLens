import MainLayout from "../layouts/MainLayout";
import SearchResultCard from "../components/SearchResultCard";

const results = [
  {
    title: "Stage performance crowd shot",
    tag: "cultural",
    event: "Freshers Cultural Night",
  },
  {
    title: "Students attending technical session",
    tag: "workshop",
    event: "Robotics Workshop",
  },
  {
    title: "Outdoor group photo near hills",
    tag: "trip",
    event: "Mountain Trip Gallery",
  },
];

function SearchPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">AI Media Search</h1>

          <p className="mt-4 text-slate-400">
            Search event photos using AI-powered tags and descriptions.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            type="text"
            placeholder="Try searching: crowd, workshop, mountains..."
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
          />

          <button className="mt-4 rounded-xl bg-white px-6 py-3 font-medium text-slate-900">
            Search
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((item) => (
            <SearchResultCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default SearchPage;