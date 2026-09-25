"use client";

import { useMemo, useState } from "react";

import WorkoutCard from "@/app/components/home/WorkoutCard";
import { getWorkouts } from "@/lib/api/fitlog";
import type { Workout } from "@/types/fitlog";

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useMemo(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Failed to load workouts.");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const matchesName = workout.name.toLowerCase().includes(query);

    const matchesMuscleGroup = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(query),
    );

    const matchesEquipment = workout.equipment.toLowerCase().includes(query);

    return matchesName || matchesMuscleGroup || matchesEquipment;
  });

  return (
    <section id="library" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.15em] text-[#ccff00]">
              Explore
            </p>

            <h2 className="text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
              Workout Library
            </h2>

            <p className="mt-2 text-[9px] leading-5 text-[#666b73] sm:text-[10px]">
              Find the right movement and build your training plan.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[260px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workouts..."
              aria-label="Search workouts"
              className="w-full rounded-md border border-[#20242b] bg-[#15181e] px-3 py-2.5 pr-9 text-[10px] text-white outline-none placeholder:text-[#666b73] focus:border-[#ccff00]"
            />

            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666b73]"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[300px] animate-pulse rounded-lg border border-[#20242b] bg-[#15181e]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-lg border border-[#20242b] bg-[#15181e] p-8 text-center">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* No Result */}
        {!isLoading && !error && filteredWorkouts.length === 0 && (
          <div className="rounded-lg border border-[#20242b] bg-[#15181e] px-6 py-14 text-center">
            <p className="text-sm font-bold text-white">No workouts found</p>

            <p className="mt-2 text-[10px] text-[#666b73]">
              Try searching with another workout name or muscle group.
            </p>
          </div>
        )}

        {/* Workout Grid */}
        {!isLoading && !error && filteredWorkouts.length > 0 && (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[9px] text-[#666b73]">
                {filteredWorkouts.length} workout
                {filteredWorkouts.length !== 1 ? "s" : ""} found
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-[9px] font-bold text-[#ccff00] hover:text-white"
                >
                  Clear search
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Library;
