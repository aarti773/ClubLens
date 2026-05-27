import MainLayout from "../layouts/MainLayout";

function UploadPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Upload Media</h1>

        <p className="mt-3 text-slate-400">
          Upload photos and videos for your club events.
        </p>

        <div className="mt-10 rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl">
            ↑
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Drag & Drop Media
          </h2>

          <p className="mt-3 text-slate-400">
            Upload event photos and videos securely.
          </p>

          <button className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-slate-900">
            Choose Files
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

export default UploadPage;