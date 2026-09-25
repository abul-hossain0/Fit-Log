import Image from "next/image";
import Link from "next/link";

import bannerImage from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative min-h-[198px] overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e] px-6 py-6 sm:min-h-[220px] sm:px-8 sm:py-7 lg:min-h-[250px] lg:px-10 lg:py-8">
          <div className="relative z-10 max-w-[55%]">
            <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.12em] text-[#ccff00] sm:text-[8px] lg:text-[9px]">
              Workout Library
            </p>

            <h1 className="max-w-[390px] text-[25px] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[30px] lg:text-[36px]">
              Train with intent. Log every set.
            </h1>

            <p className="mt-3 max-w-[380px] text-[8px] leading-[1.5] text-[#858990] sm:text-[9px] lg:text-[10px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-4 inline-flex items-center gap-1.5 rounded-[3px] bg-[#ccff00] px-3 py-2 text-[7px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#b8e600] sm:px-4 sm:py-2.5 sm:text-[8px]"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 13L12 19L18 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Browse Workouts
            </Link>
          </div>

          <div className="absolute bottom-0 right-[4%] flex h-full w-[34%] items-end justify-center">
            <Image
              src={bannerImage}
              alt="FitLog workout"
              width={500}
              height={600}
              priority
              className="h-[92%] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
