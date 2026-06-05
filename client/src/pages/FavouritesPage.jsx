import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getFavouriteMedia } from "../services/authService";

function FavouritesPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavourites() {
      try {
        const token = localStorage.getItem("token");

        const data = await getFavouriteMedia(token);

        setMedia(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadFavourites();
  }, []);

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">My Favourites</h1>

        <p className="mt-2 text-slate-400">
          Media you have marked as favourite.
        </p>

        {loading && (
          <p className="mt-8 text-slate-400">
            Loading favourites...
          </p>
        )}

        {error && (
          <p className="mt-8 text-red-300">
            {error}
          </p>
        )}

        {!loading && media.length === 0 && (
          <p className="mt-8 text-slate-400">
            No favourites yet.
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {media.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {item.mediaType === "video" ? (
                <video
                  src={item.imageUrl}
                  className="h-56 w-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-4">
                <p className="font-medium">
                  {item.caption || "Favourite media"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.event?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default FavouritesPage;