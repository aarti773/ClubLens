import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboardStats } from "../services/authService";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalMedia: 0,
    totalImages: 0,
    totalVideos: 0,
    totalUsers: 0,
    privateMedia: 0,
    totalAiTags: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        const token = localStorage.getItem("token");

        const data = await getDashboardStats(token);

        setStats(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadDashboardStats();
  }, []);

  const cards = [
    {
      label: "Total Events",
      value: stats.totalEvents,
    },
    {
      label: "Total Media",
      value: stats.totalMedia,
    },
    {
      label: "Photos",
      value: stats.totalImages,
    },
    {
      label: "Videos",
      value: stats.totalVideos,
    },
    {
      label: "Users",
      value: stats.totalUsers,
    },
    {
      label: "Private Media",
      value: stats.privateMedia,
    },
  ];

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Overview of platform activity and media usage.
          </p>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{card.label}</p>

              <h2 className="mt-3 text-3xl font-bold">{card.value}</h2>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default DashboardPage;
