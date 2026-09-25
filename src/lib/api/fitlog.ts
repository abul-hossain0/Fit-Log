import { Workout } from "@/types/fitlog";

const FITLOG_API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(FITLOG_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const response = await fetch(`${FITLOG_API_URL}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}
