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

function buildGoalVariants(formData: GoalFormData) {
  const { condition, behavior, measurement, criteria, timeline } = formData;

  if (!condition || !behavior || !measurement || !criteria || !timeline) {
    return [];
  }

  return [
    `Given ${condition}, the student will ${behavior} as measured by ${measurement}, with ${criteria} by ${timeline}.`,
    `When provided ${condition}, the student will ${behavior}, as documented through ${measurement}, in ${criteria} by ${timeline}.`,
    `Using ${condition}, the student will ${behavior} with performance measured by ${measurement}, reaching ${criteria} by ${timeline}.`,
  ];
}

function getQualityChecks(formData: GoalFormData) {
  const checks = [
    {
      label: "Condition included",
      status: formData.condition ? "pass" : "fail",
      message: formData.condition
        ? "A condition is included."
        : "Add a condition for when or how the skill will be performed.",
    },
    {
      label: "Behavior is measurable",
      status: formData.behavior ? "pass" : "fail",
      message: formData.behavior
        ? "A target behavior is included."
        : "Add a clear, observable behavior.",
    },
    {
      label: "Measurement included",
      status: formData.measurement ? "pass" : "fail",
      message: formData.measurement
        ? "A measurement method is included."
        : "Add how progress will be measured.",
    },
    {
      label: "Criteria is specific",
      status:
        formData.criteria &&
        /%|percent|trial|trials|out of|times|days|minutes|sessions/i.test(
          formData.criteria
        )
          ? "pass"
          : formData.criteria
            ? "warn"
            : "fail",
      message:
        formData.criteria &&
        /%|percent|trial|trials|out of|times|days|minutes|sessions/i.test(
          formData.criteria
        )
          ? "Criteria looks specific."
          : formData.criteria
            ? "Criteria may be too vague. Try adding numbers, percentages, or trials."
            : "Add success criteria.",
    },
    {
      label: "Timeline present",
      status: formData.timeline ? "pass" : "fail",
      message: formData.timeline
        ? "A timeline is included."
        : "Add a timeline for when the goal should be achieved.",
    },
  ];

  return checks;
}

function getStatusStyles(status: string) {
  if (status === "pass") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (status === "warn") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  return "border-rose-200 bg-rose-50 text-rose-800";
}

function getStatusIcon(status: string) {
  if (status === "pass") return "✅";
  if (status === "warn") return "⚠️";
  return "❌";
}

export default function Home() {
  const [formData, setFormData] = useState<GoalFormData>(initialForm);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  const goalVariations = useMemo(() => buildGoalVariants(formData), [formData]);
  const qualityChecks = useMemo(() => getQualityChecks(formData), [formData]);

  const selectedGoal =
    goalVariations[selectedVariationIndex] ||
    "Complete all required fields to generate IEP goal variations.";

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSelectedVariationIndex(0);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(selectedGoal);
      alert("Goal copied to clipboard.");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  function handleReset() {
    setFormData(initialForm);
    setSelectedVariationIndex(0);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            GoalCraft
          </p>
          <h1 className="mt-2 text-4xl font-bold">IEP Goal Generator</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Create clearer, more measurable IEP goals with guided inputs,
            generated variations, and quick quality feedback.
          </p>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_1.2fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Goal Details</h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in the fields below to generate usable goal options.
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

          <section className="grid gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Generated Goal Options</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Choose the version that reads best, then copy it.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVariationIndex(index)}
                      disabled={!goalVariations.length}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedVariationIndex === index
                          ? "bg-slate-900 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      } ${!goalVariations.length ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      Option {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <p className="leading-7 text-slate-800">{selectedGoal}</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold">Structured View</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <p>
                      <span className="font-semibold text-slate-700">Condition:</span>{" "}
                      {formData.condition || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Behavior:</span>{" "}
                      {formData.behavior || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Measurement:</span>{" "}
                      {formData.measurement || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Criteria:</span>{" "}
                      {formData.criteria || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Timeline:</span>{" "}
                      {formData.timeline || "—"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold">Baseline</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {formData.baseline || "No baseline entered yet."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:opacity-90"
                >
                  Copy Selected Goal
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
                >
                  Reset Form
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Goal Quality Check</h2>
              <p className="mt-2 text-sm text-slate-500">
                Quick feedback to help make the goal clearer and more measurable.
              </p>

              <div className="mt-6 grid gap-3">
                {qualityChecks.map((check) => (
                  <div
                    key={check.label}
                    className={`rounded-2xl border p-4 ${getStatusStyles(check.status)}`}
                  >
                    <p className="font-medium">
                      {getStatusIcon(check.status)} {check.label}
                    </p>
                    <p className="mt-1 text-sm">{check.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}