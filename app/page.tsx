export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            GoalCraft
          </p>
          <h1 className="mt-2 text-4xl font-bold">IEP Goal Generator</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Generate structured, measurable IEP goals with a privacy-first,
            local-first workflow.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Build in Progress</h2>
          <p className="mt-3 text-slate-600">
            Day 1 setup complete. Generator coming next.
          </p>
        </section>
      </div>
    </main>
  );
}