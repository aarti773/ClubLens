import MainLayout from "../layouts/MainLayout";

function RegisterPage() {
  return (
    <MainLayout>
      <section className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h1 className="text-3xl font-bold">Create account</h1>

        <p className="mt-2 text-slate-400">
          Join ClubLens and manage your club media.
        </p>

        <form className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
          />

          <button className="w-full rounded-xl bg-white px-5 py-3 font-medium text-slate-900">
            Create account
          </button>
        </form>
      </section>
    </MainLayout>
  );
}

export default RegisterPage;
