"use client";

import { useState } from "react";

import { Workout } from "@/types/fitlog";
import { useFitLog } from "../providers/FitLogProvider";
import Toast from "../shared/Toast";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { addToPlan, saveForLater, isInPlan, isSaved } = useFitLog();

  const [toast, setToast] = useState<string | null>(null);

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      setToast("Already added to today's plan");
      return;
    }

    const added = addToPlan(workout);

    if (!added) {
      setToast("Today's plan can contain maximum 5 lifts");
      return;
    }

    setToast("Added to today's plan");
  };

  const handleSaveForLater = () => {
    if (alreadySaved) {
      setToast("Already saved");
      return;
    }

    const saved = saveForLater(workout);

    if (!saved) {
      setToast("Workout is already saved");
      return;
    }

    setToast("Workout saved for later");
  };

  return (
    <>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {/* Add to Today's Plan */}
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={alreadyInPlan}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {alreadyInPlan ? "Already in plan" : "Add to today's plan"}
        </button>

        {/* Save for Later */}
        <button
          type="button"
          onClick={handleSaveForLater}
          disabled={alreadySaved}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#30353d] bg-transparent px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-[#c7c9cc] transition-colors hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 4.5C6 3.67 6.67 3 7.5 3H16.5C17.33 3 18 3.67 18 4.5V21L12 17.5L6 21V4.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          {alreadySaved ? "Saved" : "Save for later"}
        </button>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default WorkoutActions;
