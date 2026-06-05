import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteMyAccount } from "../services/authService";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../api/notificationApi";

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();

  const [profileMessage, setProfileMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "G";

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  async function handleDeleteAccount() {
    setProfileMessage("");

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await deleteMyAccount(token);

      logout();
      window.location.href = "/";
    } catch (error) {
      setProfileMessage(error.message);
    }
  }

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem("token");

        if (!token || !isLoggedIn) {
          setNotifications([]);
          return;
        }

        const data = await getNotifications(token);
        setNotifications(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchNotifications();
  }, [isLoggedIn]);

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
          <Link to="/my-photos" className="hover:text-white">My Photos</Link>
          <Link to="/favourites" className="hover:text-white">Favourites</Link>

          {user?.role === "admin" && (
            <>
              <Link to="/create-event" className="hover:text-white">
                Create Event
              </Link>
              <Link to="/admin/users" className="hover:text-white">
                Manage Users
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative rounded-full border border-white/10 px-3 py-2 text-lg hover:bg-white/10"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-xl">
                  <h3 className="mb-3 font-semibold text-white">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No notifications yet.
                    </p>
                  ) : (
                    <div className="max-h-80 space-y-3 overflow-y-auto">
                      {notifications.map((notification) => (
                        <Link
                          key={notification._id}
                          to={`/events/${notification.media?.event}`}
                          onClick={async () => {
                            const token = localStorage.getItem("token");

                            if (token) {
                              await markNotificationsAsRead(token);
                            }

                            setNotifications((prevNotifications) =>
                              prevNotifications.filter(
                                (item) => item._id !== notification._id,
                              ),
                            );

                            setIsNotificationOpen(false);
                            setIsProfileOpen(false);
                          }}
                          className="block rounded-xl bg-white/5 p-3 text-sm hover:bg-white/10"
                        >
                          <p className="text-white">
                            <span className="font-semibold">
                              {notification.sender?.name || "Someone"}
                            </span>{" "}
                            {notification.message}
                          </p>

                          {notification.media?.caption && (
                            <p className="mt-1 text-xs text-slate-400">
                              “{notification.media.caption}”
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setProfileMessage("");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-slate-950"
            >
              {avatarLetter}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-xl">
                {isLoggedIn ? (
                  <>
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{user?.email}</p>

                    <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-slate-300">
                      {user?.role}
                    </span>

                    {profileMessage && (
                      <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
                        {profileMessage}
                      </p>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={handleDeleteAccount}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                      >
                        Delete Account
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-white">Guest user</p>
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
        <div className="border-t border-white/10 px-6 py-5 text-sm text-slate-300 md:hidden">
          <div className="flex flex-col gap-5">
            <Link to="/" className="block hover:text-white">Home</Link>
            <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
            <Link to="/events" className="block hover:text-white">Events</Link>
            <Link to="/gallery" className="block hover:text-white">Gallery</Link>
            <Link to="/search" className="block hover:text-white">AI Search</Link>
            <Link to="/my-photos" className="block hover:text-white">My Photos</Link>
            <Link to="/favourites" className="block hover:text-white">Favourites</Link>

            {user?.role === "admin" && (
              <>
                <Link to="/create-event" className="block hover:text-white">
                  Create Event
                </Link>
                <Link to="/admin/users" className="block hover:text-white">
                  Manage Users
                </Link>
              </>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            {isLoggedIn ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative rounded-lg border border-white/10 px-4 py-2 text-white"
                  >
                    🔔 Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationOpen && (
                    <div className="relative z-50 mt-3 space-y-2 rounded-lg bg-white/5 p-3">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-slate-400">
                          No notifications yet.
                        </p>
                      ) : (
                        notifications.map((notification) => (
                          <Link
                            key={notification._id}
                            to={`/events/${notification.media?.event}`}
                            onClick={async () => {
                              const token = localStorage.getItem("token");

                              if (token) {
                                await markNotificationsAsRead(token);
                              }

                              setNotifications((prevNotifications) =>
                                prevNotifications.filter(
                                  (item) => item._id !== notification._id,
                                ),
                              );

                              setIsNotificationOpen(false);
                              setIsMenuOpen(false);
                            }}
                            className="block rounded-lg bg-white/5 p-2 text-sm hover:bg-white/10"
                          >
                            <span className="font-semibold">
                              {notification.sender?.name}
                            </span>{" "}
                            {notification.message}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

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

                {profileMessage && (
                  <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    {profileMessage}
                  </p>
                )}

                <button
                  onClick={handleDeleteAccount}
                  className="mt-4 block text-red-300 hover:text-red-200"
                >
                  Delete Account
                </button>

                <button
                  onClick={logout}
                  className="mt-3 block text-slate-300 hover:text-white"
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