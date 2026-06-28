import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <nav className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-100">
            Parsa
          </Link>

          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="https://www.linkedin.com/in/parsakhosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href="https://adplist.org/mentors/parsa-khosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              AdpList Mentorship
            </a>
            <a
              href="https://github.com/parsakhosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href="mailto:parsakhosravani@gmail.com"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <details className="relative sm:hidden">
              <summary className="list-none cursor-pointer">
                <svg
                  className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <div className="space-y-2">
                  <a
                    href="https://www.linkedin.com/in/parsakhosravani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://adplist.org/mentors/parsa-khosravani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  >
                    AdpList Mentorship
                  </a>
                  <a
                    href="https://github.com/parsakhosravani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:parsakhosravani@gmail.com"
                    className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}
