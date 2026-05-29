import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "G";

  return (
    <header className="border-b border-white/10 bg-slate-950/90 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          ClubLens
        </Link>

        <div className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/events" className="hover:text-white">Events</Link>
          <Link to="/gallery" className="hover:text-white">Gallery</Link>
          <Link to="/search" className="hover:text-white">AI Search</Link>

          {user?.role === "admin" && (
            <Link to="/create-event" className="hover:text-white">
              Create Event
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-slate-950"
            >
              {avatarLetter}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-xl">
                {isLoggedIn ? (
                  <>
                    <p className="font-semibold text-white">
                      {user?.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {user?.email}
                    </p>

                    <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-slate-300">
                      {user?.role}
                    </span>

                    <div className="mt-4 flex flex-col gap-2">
                    
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-white">
                      Guest user
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Sign in to upload private media and interact with albums.
                    </p>

                    <Link
                      to="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="mt-4 block rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-slate-950"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
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
          <Link to="/" className="block hover:text-white">Home</Link>
          <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
          <Link to="/events" className="block hover:text-white">Events</Link>
          <Link to="/gallery" className="block hover:text-white">Gallery</Link>
          <Link to="/search" className="block hover:text-white">AI Search</Link>

          {user?.role === "admin" && (
            <Link to="/create-event" className="block hover:text-white">
              Create Event
            </Link>
          )}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-slate-950">
                    {avatarLetter}
                  </div>

                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-xs capitalize text-slate-400">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="mt-4 block text-red-300 hover:text-red-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block rounded-lg bg-white px-4 py-2 text-center font-medium text-slate-950"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
