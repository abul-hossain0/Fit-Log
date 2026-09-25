import { Workout } from "@/types/fitlog";
import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e] transition-all duration-200 hover:border-[#3b424c] hover:bg-[#181b21]"
    >
      <div className="relative aspect-[1.55/1] overflow-hidden bg-[#101216]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#ccff00] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-black sm:text-[9px]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="truncate text-xs font-bold uppercase text-white sm:text-sm">
          {workout.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-[#858990] sm:text-[10px]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 7V17M18 7V17M3 10V14M21 10V14M6 12H18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>{workout.equipment}</span>
        </div>

        <div className="mt-3 flex items-center gap-3 border-t border-[#20242b] pt-2.5 text-[8px] text-[#858990] sm:text-[9px]">
          <span className="flex items-center gap-1">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 8V12L15 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3.5L14.6 8.8L20.5 9.7L16.2 13.8L17.2 19.7L12 16.9L6.8 19.7L7.8 13.8L3.5 9.7L9.4 8.8L12 3.5Z" />
            </svg>

            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
