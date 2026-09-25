import { getWorkouts } from "@/lib/api/fitlog";
import WorkoutCard from "./WorkoutCard";

const Library = async () => {
  let workouts;

  try {
    workouts = await getWorkouts();
  } catch {
    return (
      <section id="library" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-lg border border-[#20242b] bg-[#15181e] px-6 py-10 text-center">
            <h2 className="text-lg font-bold uppercase text-white">
              Unable to load workouts
            </h2>

            <p className="mt-2 text-sm text-[#858990]">
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="library" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-[10px] text-[#858990] sm:text-xs">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;
