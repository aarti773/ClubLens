import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-slate-950/90 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-xl font-semibold tracking-tight">
          ClubLens
        </h2>

        <div className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          <Link to="/" className="hover:text-white">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-white">
            Dashboard
          </Link>

          <Link to="/events" className="hover:text-white">
            Events
          </Link>

          <Link to="/gallery" className="hover:text-white">
            Gallery
          </Link>

          <Link to="/search" className="hover:text-white">
            AI Search
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/create-event"
              className="hover:text-white"
            >
              Create Event
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <button
                onClick={logout}
                className="hover:text-white"
              >
                Logout
              </button>

              <Link
                to="/upload"
                className="rounded-lg bg-white px-4 py-2 font-medium text-slate-950"
              >
                Upload
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-white px-4 py-2 font-medium text-slate-950"
            >
              Sign in
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 md:hidden"
        >
          Menu
        </button>
      </nav>

      {isMenuOpen && (
        <div className="space-y-4 border-t border-white/10 px-6 py-5 text-sm text-slate-300 md:hidden">
          <Link to="/" className="block hover:text-white">
            Home
          </Link>

          <Link
            to="/dashboard"
            className="block hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/events"
            className="block hover:text-white"
          >
            Events
          </Link>

          <Link
            to="/gallery"
            className="block hover:text-white"
          >
            Gallery
          </Link>

          <Link
            to="/search"
            className="block hover:text-white"
          >
            AI Search
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/create-event"
              className="block hover:text-white"
            >
              Create Event
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <button
                onClick={logout}
                className="block hover:text-white"
              >
                Logout
              </button>

              <Link
                to="/upload"
                className="block rounded-lg bg-white px-4 py-2 font-medium text-slate-950"
              >
                Upload
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="block rounded-lg bg-white px-4 py-2 font-medium text-slate-950"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;