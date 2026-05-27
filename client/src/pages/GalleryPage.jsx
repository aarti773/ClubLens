import MainLayout from "../layouts/MainLayout";

function GalleryPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gallery</h1>

            <p className="mt-2 text-slate-400">
              View uploaded event photos and videos in one place.
            </p>
          </div>

          <button className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900">
            Upload Media
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20"></div>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20"></div>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20"></div>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-orange-500/30 to-yellow-500/20"></div>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20"></div>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-rose-500/30 to-red-500/20"></div>
        </div>
      </section>
    </MainLayout>
  );
}

export default GalleryPage;
