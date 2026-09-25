import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#0b0d10] px-4">
      <div className="text-center">
        <p className="text-6xl font-black text-[#ccff00]">404</p>

        <h1 className="mt-4 text-2xl font-black uppercase text-white">
          Workout not found
        </h1>

        <p className="mt-2 text-sm text-[#858990]">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black transition-colors hover:bg-[#b8e600]"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
