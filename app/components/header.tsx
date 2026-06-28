"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const internalLinks = [{ href: "/recommendations", label: "Recommendations" }];

const storyLinks = [
  { href: "/react", label: "React · AMR" },
  { href: "/vue", label: "Vue · Khanoumi" },
  { href: "/angular", label: "Angular · Mofid" },
];

const externalLinks = [
  { href: "https://www.linkedin.com/in/parsakhosravani", label: "LinkedIn" },
  { href: "https://adplist.org/mentors/parsa-khosravani", label: "AdpList" },
  { href: "https://github.com/parsakhosravani", label: "GitHub" },
];

export function Header() {
  const pathname = usePathname();
  const isStory = storyLinks.some((s) => s.href === pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/60">
      <nav className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-lg text-zinc-900 transition hover:opacity-70 dark:text-zinc-100"
          >
            Parsa<span className="text-indigo-500">.</span>
          </Link>

          <div className="hidden items-center gap-6 sm:flex">
            <details className="group relative">
              <summary
                className={`flex cursor-pointer list-none items-center gap-1 text-sm transition ${
                  isStory
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                Stories
                <svg
                  className="h-3.5 w-3.5 transition group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                {storyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      pathname === link.href
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            {internalLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition ${
                    active
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />

            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}

            <a
              href="mailto:parsakhosravani@gmail.com"
              className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
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
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <div className="space-y-1">
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Stories
                  </p>
                  {storyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Explore
                  </p>
                  {internalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Elsewhere
                  </p>
                  {externalLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      {link.label}
                    </a>
                  ))}
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
