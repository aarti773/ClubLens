import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const data = await loginUser(formData);

      login(data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h1 className="text-3xl font-bold">Sign in</h1>

        <p className="mt-2 text-slate-400">Access your ClubLens workspace.</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 pr-12 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className="w-full rounded-xl bg-white px-5 py-3 font-medium text-slate-900">
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          New to ClubLens?{" "}
          <Link to="/register" className="text-white hover:underline">
            Create account
          </Link>
        </p>
      </section>
    </MainLayout>
  );
}

export default LoginPage;
