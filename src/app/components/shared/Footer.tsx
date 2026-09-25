import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#1f2329] bg-[#0b0d10]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog Home"
        >
          <div className="flex items-center text-[#ccff00]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M7 4L10 7L7 10L4 7L7 4Z" fill="currentColor" />

              <path d="M17 14L20 17L17 20L14 17L17 14Z" fill="currentColor" />

              <path
                d="M9 8L16 15"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M6 11L11 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M13 18L18 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-sm font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-[10px] text-[#666b73] sm:text-[11px] md:text-right">
          © 2026 <span className="italic text-[#9a9da3]">FitLog</span>
          {" — "}
          <span className="italic">
            Workout Library. Train hard, log honest.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
