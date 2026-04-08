"use client";

import { useMemo, useState } from "react";

type GoalFormData = {
  condition: string;
  behavior: string;
  measurement: string;
  criteria: string;
  timeline: string;
  baseline: string;
};

const initialForm: GoalFormData = {
  condition: "",
  behavior: "",
  measurement: "",
  criteria: "",
  timeline: "",
  baseline: "",
};

export default function Home() {
  const [formData, setFormData] = useState<GoalFormData>(initialForm);

  const generatedGoal = useMemo(() => {
    const { condition, behavior, measurement, criteria, timeline } = formData;

    if (!condition || !behavior || !measurement || !criteria || !timeline) {
      return "Complete all required fields to generate an IEP goal.";
    }

    return `Given ${condition}, the student will ${behavior} as measured by ${measurement}, with ${criteria} by ${timeline}.`;
  }, [formData]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedGoal);
      alert("Goal copied to clipboard.");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            GoalCraft
          </p>
          <h1 className="mt-2 text-4xl font-bold">IEP Goal Generator</h1>
          <p className="mt-3 text-slate-600">
            Build measurable IEP goals using a simple structured form.
          </p>

          <div className="mt-8 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="condition">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">Select a condition</option>
                <option value="grade-level reading passages">
                  grade-level reading passages
                </option>
                <option value="teacher prompts and visual supports">
                  teacher prompts and visual supports
                </option>
                <option value="small-group instruction">
                  small-group instruction
                </option>
                <option value="a structured classroom assignment">
                  a structured classroom assignment
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="behavior">
                Behavior
              </label>
              <select
                id="behavior"
                name="behavior"
                value={formData.behavior}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">Select a behavior</option>
                <option value="identify the main idea and two supporting details">
                  identify the main idea and two supporting details
                </option>
                <option value="solve two-step math problems accurately">
                  solve two-step math problems accurately
                </option>
                <option value="begin assigned tasks within 2 minutes">
                  begin assigned tasks within 2 minutes
                </option>
                <option value="use appropriate coping strategies when frustrated">
                  use appropriate coping strategies when frustrated
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="measurement">
                Measurement
              </label>
              <select
                id="measurement"
                name="measurement"
                value={formData.measurement}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">Select a measurement</option>
                <option value="teacher-collected work samples">
                  teacher-collected work samples
                </option>
                <option value="curriculum-based assessments">
                  curriculum-based assessments
                </option>
                <option value="behavior tracking data">
                  behavior tracking data
                </option>
                <option value="weekly progress monitoring probes">
                  weekly progress monitoring probes
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="criteria">
                Criteria
              </label>
              <input
                id="criteria"
                name="criteria"
                type="text"
                value={formData.criteria}
                onChange={handleChange}
                placeholder="Example: 4 out of 5 trials"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="timeline">
                Timeline
              </label>
              <input
                id="timeline"
                name="timeline"
                type="text"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="Example: the end of the annual IEP period"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="baseline">
                Baseline (optional)
              </label>
              <input
                id="baseline"
                name="baseline"
                type="text"
                value={formData.baseline}
                onChange={handleChange}
                placeholder="Example: Currently completes 1 out of 5 correctly"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Generated Goal</h2>
          <p className="mt-3 text-sm text-slate-500">
            This is the first working version of the generator.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-6">
            <p className="leading-7 text-slate-800">{generatedGoal}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Baseline</h3>
            <p className="mt-2 text-slate-600">
              {formData.baseline || "No baseline entered yet."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:opacity-90"
            >
              Copy Goal
            </button>

            <button
              type="button"
              onClick={() => setFormData(initialForm)}
              className="rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
            >
              Reset Form
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}