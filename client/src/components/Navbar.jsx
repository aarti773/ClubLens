import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/90 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-xl font-semibold tracking-tight">ClubLens</h2>

        <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
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
          <Link to="/login" className="hover:text-white">
            Sign in
          </Link>
          <Link
            to="/upload"
            className="rounded-lg bg-white px-4 py-2 font-medium text-slate-950"
          >
            Upload
          </Link>
        </div>
       <button className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 lg:hidden">
          Menu
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
