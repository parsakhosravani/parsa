import Link from "next/link";
import { frameworks } from "../lib/story";

export function StoryNav({ active }: { active: string }) {
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm">
      <Link
        href="/"
        className="rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
      >
        ← Home
      </Link>
      <span className="mx-1 text-zinc-400 dark:text-zinc-600">|</span>
      {frameworks.map((fw) => {
        const isActive = fw.slug === active;
        return (
          <Link
            key={fw.slug}
            href={`/${fw.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full border px-3 py-1 transition"
                : "rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
            }
            style={
              isActive
                ? {
                    borderColor: fw.accent,
                    color: fw.accentText,
                    background: `${fw.accent}1a`,
                  }
                : undefined
            }
          >
            {fw.name}
          </Link>
        );
      })}
    </nav>
  );
}
