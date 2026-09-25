"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useFitLog } from "@/app/components/providers/FitLogProvider";
import Toast from "@/app/components/shared/Toast";
import type { Workout } from "@/types/fitlog";

type PlanTab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isCompleted,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const currentWorkouts = (activeTab === "today" ? plan : saved).toSorted(
    (a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    },
  );

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const handleRemove = (workout: Workout) => {
    if (activeTab === "today") {
      removeFromPlan(workout.id);
      setToast(`${workout.name} removed from today's plan`);
    } else {
      removeFromSaved(workout.id);
      setToast(`${workout.name} removed from saved`);
    }
  };

  const handleMarkDone = (workout: Workout) => {
    markAsDone(workout.id);
    setToast(`${workout.name} marked as done`);
  };

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-7">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#ccff00]">
            Personal Workspace
          </p>

          <h1 className="text-3xl font-black uppercase tracking-[-0.03em] sm:text-4xl">
            My Plan
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-5 text-[#858990]">
            Manage your workout plan, saved exercises, and completed workouts.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-2 border-b border-[#20242b]">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`border-b-2 px-4 py-3 text-[10px] font-bold uppercase tracking-wide transition ${
              activeTab === "today"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-[#666b73] hover:text-white"
            }`}
          >
            Today's Plan
            <span className="ml-2 rounded-full bg-[#20242b] px-2 py-0.5 text-[8px]">
              {plan.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-4 py-3 text-[10px] font-bold uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-[#666b73] hover:text-white"
            }`}
          >
            Saved
            <span className="ml-2 rounded-full bg-[#20242b] px-2 py-0.5 text-[8px]">
              {saved.length}
            </span>
          </button>
        </div>

        {/* Stats + Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid w-full grid-cols-3 border border-[#20242b] bg-[#15181e] sm:max-w-[520px]">
            <MetricCard label="Exercises" value={currentWorkouts.length} />

            <MetricCard label="Minutes" value={totalMinutes} />

            <MetricCard label="Calories" value={totalCalories} last />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-[9px] text-[#666b73]">
            <span>Sort By</span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="cursor-pointer appearance-none rounded-md border border-[#20242b] bg-[#111419] py-2 pl-3 pr-8 text-[9px] text-[#c7c9cc] outline-none hover:border-[#30353d] focus:border-[#ccff00]"
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#666b73]"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[150px] animate-pulse rounded-lg border border-[#20242b] bg-[#15181e]"
              />
            ))}
          </div>
        ) : currentWorkouts.length === 0 ? (
          /* Empty State */
          <div className="rounded-lg border border-[#20242b] bg-[#15181e] px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#20242b]">
              <span className="text-xl text-[#666b73]">+</span>
            </div>

            <h2 className="text-sm font-bold text-white">
              {activeTab === "today"
                ? "Your plan is empty"
                : "No saved workouts"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[10px] leading-5 text-[#666b73]">
              {activeTab === "today"
                ? "Add workouts from the library to build your plan."
                : "Save workouts from the workout details page to find them here later."}
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-md bg-[#ccff00] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          /* Workout List */
          <div className="space-y-3">
            {currentWorkouts.map((workout) => (
              <WorkoutPlanCard
                key={workout.id}
                workout={workout}
                showMarkDone={activeTab === "today"}
                completed={isCompleted(workout.id)}
                onRemove={() => handleRemove(workout)}
                onMarkDone={() => handleMarkDone(workout)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
};

interface MetricCardProps {
  label: string;
  value: number;
  last?: boolean;
}

const MetricCard = ({ label, value, last = false }: MetricCardProps) => {
  return (
    <div className={`px-4 py-4 ${!last ? "border-r border-[#20242b]" : ""}`}>
      <p className="text-[8px] font-bold uppercase tracking-wide text-[#666b73]">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  );
};

interface WorkoutPlanCardProps {
  workout: Workout;
  showMarkDone: boolean;
  completed: boolean;
  onRemove: () => void;
  onMarkDone: () => void;
}

const WorkoutPlanCard = ({
  workout,
  showMarkDone,
  completed,
  onRemove,
  onMarkDone,
}: WorkoutPlanCardProps) => {
  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-[#20242b] bg-[#15181e] p-3 transition hover:border-[#30353d] sm:flex-row sm:items-center">
      {/* Image */}
      <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-md bg-[#0b0d10] sm:h-[100px] sm:w-[150px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="150px"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded bg-[#20242b] px-2 py-1 text-[7px] font-bold uppercase text-[#858990]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h2 className="text-sm font-black uppercase text-white">
          {workout.name}
        </h2>

        <p className="mt-1 text-[9px] text-[#666b73]">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap gap-4 text-[8px] text-[#858990]">
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-md border border-[#30353d] px-3 py-2 text-[9px] font-bold text-[#c7c9cc] transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {showMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            disabled={completed}
            className={`rounded-md px-3 py-2 text-[9px] font-bold transition ${
              completed
                ? "cursor-not-allowed bg-[#20242b] text-[#666b73]"
                : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
            }`}
          >
            {completed ? "✓ Done" : "✓ Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#30353d] text-[#666b73] transition hover:border-red-500 hover:text-red-400"
          aria-label={`Remove ${workout.name}`}
        >
          ×
        </button>
      </div>
    </article>
  );
};

export default MyPlanPage;
