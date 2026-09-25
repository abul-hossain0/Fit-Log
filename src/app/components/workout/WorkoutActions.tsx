"use client";

import { useState } from "react";

import { useFitLog } from "@/app/components/providers/FitLogProvider";
import Toast from "@/app/components/shared/Toast";
import type { Workout } from "@/types/fitlog";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [toast, setToast] = useState<string | null>(null);

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  const planIsFull = plan.length >= 5;

  const handleAddToPlan = () => {
    if (planIsFull) {
      setToast("Today's plan is full. Maximum 5 workouts allowed.");
      return;
    }

    if (alreadyInPlan) {
      setToast(`${workout.name} is already in today's plan.`);
      return;
    }

    const added = addToPlan(workout);

    if (added) {
      setToast(`${workout.name} added to today's plan.`);
    }
  };

  const handleSaveForLater = () => {
    if (alreadySaved) {
      setToast(`${workout.name} is already saved.`);
      return;
    }

    const savedSuccessfully = saveForLater(workout);

    if (savedSuccessfully) {
      setToast(`${workout.name} saved for later.`);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={alreadyInPlan || planIsFull}
          className={`flex-1 rounded-md px-4 py-3 text-[9px] font-bold uppercase tracking-wide transition ${
            alreadyInPlan || planIsFull
              ? "cursor-not-allowed bg-[#20242b] text-[#666b73]"
              : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
          }`}
        >
          {alreadyInPlan
            ? "✓ Added to Plan"
            : planIsFull
              ? "Plan Full (5/5)"
              : "+ Add to Today's Plan"}
        </button>
        <button
          type="button"
          onClick={handleSaveForLater}
          disabled={alreadySaved}
          className={`flex-1 rounded-md border px-4 py-3 text-[9px] font-bold uppercase tracking-wide transition ${
            alreadySaved
              ? "cursor-not-allowed border-[#20242b] bg-[#20242b] text-[#666b73]"
              : "border-[#30353d] bg-[#15181e] text-white hover:border-[#ccff00] hover:text-[#ccff00]"
          }`}
        >
          {alreadySaved ? "✓ Saved" : "♡ Save for Later"}
        </button>
      </div>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default WorkoutActions;