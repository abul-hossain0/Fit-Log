"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

const Navbar = ({ planCount = 0, savedCount = 0 }: NavbarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-[#202329] bg-[#0b0d10]">
      <nav className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/src/app/assets/logo.png"
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog Home"
        >
          <span className="flex h-7 w-7 items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14.7 3.3L20.7 9.3"
                stroke="#CCFF00"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M9.3 20.7L3.3 14.7"
                stroke="#CCFF00"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M5.8 12.8L12.8 5.8"
                stroke="#CCFF00"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M11.2 18.2L18.2 11.2"
                stroke="#CCFF00"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8 5.5L18.5 16"
                stroke="#CCFF00"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className="text-sm font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-[#858990] hover:bg-[#15181d] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-[#858990] hover:bg-[#15181d] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop Status Badges */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-[#858990] transition-colors hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-[#858990] transition-colors hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#454950] px-1.5 text-[10px] font-bold text-[#c7c9cc]">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#292d33] text-white transition-colors hover:bg-[#15181d] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <>
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <path
                  d="M4 7H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#202329] bg-[#0b0d10] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isWorkoutActive
                  ? "bg-[#ccff00] text-black"
                  : "text-[#858990] hover:bg-[#15181d] hover:text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isPlanActive
                  ? "bg-[#ccff00] text-black"
                  : "text-[#858990] hover:bg-[#15181d] hover:text-white"
              }`}
            >
              My Plan
            </Link>

            {/* Mobile Counters */}
            <div className="mt-2 flex items-center gap-3 border-t border-[#202329] pt-4">
              <Link
                href="/my-plan"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-[#858990]"
              >
                <span>Plan</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
                  {planCount}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-[#858990]"
              >
                <span>Saved</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#454950] px-1.5 text-[10px] font-bold text-[#c7c9cc]">
                  {savedCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
