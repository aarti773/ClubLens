import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getAllGalleryMedia } from "../services/authService";

function GalleryPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGalleryMedia() {
      try {
        const galleryMedia = await getAllGalleryMedia();
        setMedia(galleryMedia);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadGalleryMedia();
  }, []);

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gallery</h1>

            <p className="mt-2 text-slate-400">
              View uploaded event photos in one place.
            </p>
          </div>

          <Link
            to="/upload"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900"
          >
            Upload Media
          </Link>
        </div>

        {loading && (
          <p className="mt-8 text-slate-400">Loading gallery...</p>
        )}

        {error && (
          <p className="mt-8 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && media.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-slate-300">
              No media uploaded yet.
            </p>
          </div>
        )}

        {!loading && !error && media.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {media.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || "Event media"}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <p className="text-sm font-medium text-white">
                    {item.caption || "Untitled media"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.eventTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default GalleryPage;