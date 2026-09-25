"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Workout } from "@/types/fitlog";

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";
const COMPLETED_STORAGE_KEY = "fitlog-completed";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  completedPlanIds: number[];

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

interface FitLogProviderProps {
  children: ReactNode;
}

export const FitLogProvider = ({ children }: FitLogProviderProps) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedPlanIds, setCompletedPlanIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);
      const storedCompleted = localStorage.getItem(COMPLETED_STORAGE_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      if (storedCompleted) {
        setCompletedPlanIds(JSON.parse(storedCompleted));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem(
      COMPLETED_STORAGE_KEY,
      JSON.stringify(completedPlanIds),
    );
  }, [completedPlanIds]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      return false;
    }

    const alreadyExists = plan.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadyExists) {
      return false;
    }

    setPlan((current) => [...current, workout]);

    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) =>
      current.filter((workout) => String(workout.id) !== String(id)),
    );

    setCompletedPlanIds((current) =>
      current.filter((completedId) => String(completedId) !== String(id)),
    );
  };

  const saveForLater = (workout: Workout) => {
    const alreadyExists = saved.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadyExists) {
      return false;
    }

    setSaved((current) => [...current, workout]);

    return true;
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) =>
      current.filter((workout) => String(workout.id) !== String(id)),
    );
  };

  const markAsDone = (id: number) => {
    setCompletedPlanIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const isInPlan = (id: number) => {
    return plan.some((workout) => String(workout.id) === String(id));
  };

  const isSaved = (id: number) => {
    return saved.some((workout) => String(workout.id) === String(id));
  };

  const isCompleted = (id: number) => {
    return completedPlanIds.includes(id);
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        completedPlanIds,

        addToPlan,
        removeFromPlan,

        saveForLater,
        removeFromSaved,

        markAsDone,

        isInPlan,
        isSaved,
        isCompleted,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};
