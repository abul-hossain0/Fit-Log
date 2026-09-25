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
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } =
    useFitLog();

  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

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
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            My Plan
          </h1>

          <p className="mt-1 text-[10px] text-[#858990] sm:text-xs">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e] sm:grid-cols-3">
          <MetricCard label="Exercises" value={currentWorkouts.length} />

          <MetricCard label="Minutes" value={totalMinutes} />

          <MetricCard label="Calories" value={totalCalories} last />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-md border border-[#20242b] bg-[#111419] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded px-4 py-2 text-[9px] font-medium transition-colors ${
                activeTab === "today"
                  ? "bg-[#20242b] text-white"
                  : "text-[#666b73] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded px-4 py-2 text-[9px] font-medium transition-colors ${
                activeTab === "saved"
                  ? "bg-[#20242b] text-white"
                  : "text-[#666b73] hover:text-white"
              }`}
            >
              Saved
            </button>
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

              {/* Chevron */}
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

        <div className="mt-4">
          {isLoading ? (
            <LoadingState />
          ) : currentWorkouts.length === 0 ? (
            <EmptyState activeTab={activeTab} />
          ) : (
            <div className="space-y-3">
              {currentWorkouts.map((workout) => (
                <WorkoutPlanCard
                  key={workout.id}
                  workout={workout}
                  showMarkDone={activeTab === "today"}
                  onRemove={() => handleRemove(workout)}
                  onMarkDone={() => handleMarkDone(workout)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
};

/* =========================
   Metric Card
========================= */

interface MetricCardProps {
  label: string;
  value: number;
  last?: boolean;
}

const MetricCard = ({ label, value, last = false }: MetricCardProps) => {
  return (
    <div
      className={`px-5 py-5 sm:px-6 ${
        !last ? "border-b border-[#20242b] sm:border-b-0 sm:border-r" : ""
      }`}
    >
      <p className="text-[9px] font-medium text-[#666b73]">{label}</p>

      <p className="mt-1 text-2xl font-black leading-none text-[#ccff00] sm:text-3xl">
        {value}
      </p>
    </div>
  );
};

/* =========================
   Loading
========================= */

const LoadingState = () => {
  return (
    <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-[#20242b] bg-[#111419]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#30353d] border-t-[#ccff00]" />

        <p className="text-xs text-[#858990]">Loading workouts...</p>
      </div>
    </div>
  );
};

/* =========================
   Empty State
========================= */

interface EmptyStateProps {
  activeTab: PlanTab;
}

const EmptyState = ({ activeTab }: EmptyStateProps) => {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-dashed border-[#20242b] bg-[#111419] px-6 text-center">
      <h2 className="text-sm font-black uppercase text-white sm:text-base">
        Nothing here yet
      </h2>

      <p className="mt-2 max-w-sm text-[10px] leading-5 text-[#666b73] sm:text-xs">
        {activeTab === "saved"
          ? "Save a workout from the library and it will appear here."
          : "Browse the library and add a lift to get today moving."}
      </p>

      <Link
        href="/"
        className="mt-5 rounded-md bg-[#ccff00] px-5 py-2.5 text-[9px] font-bold uppercase text-black hover:bg-[#b8e600]"
      >
        Go to workouts
      </Link>
    </div>
  );
};

/* =========================
   Workout Plan Card
========================= */

interface WorkoutPlanCardProps {
  workout: Workout;
  showMarkDone: boolean;
  onRemove: () => void;
  onMarkDone: () => void;
}

const WorkoutPlanCard = ({
  workout,
  showMarkDone,
  onRemove,
  onMarkDone,
}: WorkoutPlanCardProps) => {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-[#20242b] bg-[#15181e] p-3 sm:flex-row sm:items-center sm:p-4">
      {/* Image */}
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-md bg-[#101216] sm:h-[72px] sm:w-[110px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="110px"
          className="object-cover"
        />
      </div>

      {/* Information */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-bold uppercase text-white sm:text-sm">
          {workout.name}
        </h3>

        <p className="mt-1 text-[9px] text-[#666b73]">{workout.equipment}</p>

        {/* Stats */}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-[#858990]">
          <span className="flex items-center gap-1">
            <ClockIcon />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <FlameIcon />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <StarIcon />
            {workout.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        {/* View Details */}
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-md border border-[#30353d] px-3 py-2 text-[8px] font-medium text-[#c7c9cc] hover:border-[#ccff00] hover:text-[#ccff00] sm:px-4"
        >
          View Details
        </Link>

        {/* Mark as Done */}
        {showMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#ccff00] px-3 py-2 text-[8px] font-bold text-black hover:bg-[#b8e600] sm:px-4"
          >
            <CheckIcon />
            Mark as Done
          </button>
        )}

        {/* Remove */}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[#666b73] hover:bg-[#20242b] hover:text-white"
        >
          ×
        </button>
      </div>
    </article>
  );
};

/* =========================
   Icons
========================= */

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />

    <path
      d="M12 8V12L15 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const FlameIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C12 3 17 7 17 12C17 15.31 14.76 18 12 18C9.24 18 7 15.31 7 12C7 9.5 8.5 7.5 10 6C10 8 11 9 12 10C13 8 13 5 12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />

    <path
      d="M9 18C9.7 19.8 10.7 21 12 21C13.3 21 14.3 19.8 15 18"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3.5L14.6 8.8L20.5 9.7L16.2 13.8L17.2 19.7L12 16.9L6.8 19.7L7.8 13.8L12 3.5Z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12L10 17L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MyPlanPage;
