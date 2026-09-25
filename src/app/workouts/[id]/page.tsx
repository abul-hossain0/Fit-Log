import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/workout/WorkoutActions";

import { getWorkoutById } from "@/lib/api/fitlog";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium text-[#858990] transition-colors hover:text-[#ccff00]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 12H5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to workouts
        </Link>

        {/* Details Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
          {/* Left: Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e] sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div>
            {/* Title */}
            <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-xs leading-5 text-[#858990] sm:text-sm sm:leading-6">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-6 overflow-hidden rounded-lg border border-[#20242b] bg-[#111419]">
              <SpecRow label="Equipment" value={workout.equipment} />

              <SpecRow label="Difficulty" value={workout.difficulty} />

              <SpecRow label="Sets" value={String(workout.sets)} />

              <SpecRow label="Reps" value={workout.reps} />

              <SpecRow label="Duration" value={`${workout.duration} min`} />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow label="Rating" value={workout.rating.toFixed(1)} last />
            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="text-xs font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-3 text-[10px] leading-5 text-[#858990] sm:text-xs"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#30353d] text-[9px] font-bold text-[#ccff00]">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Buttons */}
            <WorkoutActions workout={workout}></WorkoutActions>
          </div>
        </div>
      </div>
    </main>
  );
};

interface SpecRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const SpecRow = ({ label, value, last = false }: SpecRowProps) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 ${
        !last ? "border-b border-[#20242b]" : ""
      }`}
    >
      <span className="text-[9px] font-medium uppercase tracking-wide text-[#666b73]">
        {label}
      </span>

      <span className="text-right text-[10px] font-medium text-[#d5d7da]">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetailsPage;
