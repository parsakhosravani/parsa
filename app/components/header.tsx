"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { chapterIndex } from "../lib/chapters";
import { site } from "../lib/site";

const pages = [
  { href: "/career-timeline", label: "Timeline" },
  { href: "/blog", label: "Writing" },
  { href: "/recommendations", label: "Recommendations" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-[1.35rem] leading-none text-ink transition hover:text-cobalt"
        >
          Parsa Khosravani
        </Link>

        <div className="hidden items-center gap-7 text-[0.9375rem] md:flex">
          <div className="flex items-center gap-3" aria-label="Chapters">
            <span className="text-ink-faint">Chapters</span>
            {chapterIndex.map((c) => {
              const active = pathname === `/${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  aria-label={`Chapter ${c.numeral}: ${c.framework} at ${c.company}`}
                  aria-current={active ? "page" : undefined}
                  title={`${c.framework} at ${c.company}`}
                  className="font-display text-lg leading-none text-ink-soft transition hover:text-ink"
                  style={active ? { color: c.accentText } : undefined}
                >
                  {c.numeral}
                </Link>
              );
            })}
          </div>

          {pages.map((page) => {
            const active =
              pathname === page.href || pathname.startsWith(`${page.href}/`);
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={`transition hover:text-ink ${
                  active
                    ? "text-ink underline decoration-cobalt decoration-2 underline-offset-[0.4em]"
                    : "text-ink-soft"
                }`}
              >
                {page.label}
              </Link>
            );
          })}

          <a
            href={`mailto:${site.email}`}
            className="text-ink-soft transition hover:text-ink"
          >
            Email
          </a>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <details className="group relative">
            <summary
              className="flex cursor-pointer list-none items-center gap-1.5 text-[0.9375rem] text-ink-soft [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation menu"
            >
              Menu
            </summary>
            <div className="absolute right-0 top-full mt-3 w-64 border border-rule bg-raised p-5 shadow-[0_18px_40px_-20px_rgba(22,27,46,0.35)]">
              <p className="text-sm text-ink-faint">Chapters</p>
              <ul className="mt-2 space-y-2">
                {chapterIndex.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="flex items-baseline gap-3 text-ink"
                    >
                      <span
                        className="font-display w-6 text-lg"
                        style={{ color: c.accentText }}
                      >
                        {c.numeral}
                      </span>
                      {c.framework} at {c.company}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2 border-t border-rule pt-4">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-ink">
                      {page.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="text-ink">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
