export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          GoalCraft
        </p>
        <h1 className="mt-2 text-4xl font-bold">Privacy Policy</h1>

        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            GoalCraft is designed to help users create and organize IEP goal drafts.
          </p>

          <p>
            Saved goals and favorites are stored locally in your browser on your device.
            This information is not intentionally sent to a remote database by the app.
          </p>

          <p>
            Do not enter sensitive student-identifying information unless your school or
            organization has approved your workflow and device usage.
          </p>

          <p>
            If this site is updated in the future to store data remotely, this privacy
            policy should be updated to reflect those changes.
          </p>

          <p>
            By using GoalCraft, you are responsible for reviewing generated content before
            using it in official educational documentation.
          </p>
        </div>
      </div>
    </main>
  );
}