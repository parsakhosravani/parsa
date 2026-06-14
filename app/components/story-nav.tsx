import Link from "next/link";
import { frameworks } from "../lib/story";

export function StoryNav({ active }: { active: string }) {
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm">
      <Link
        href="/"
        className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
      >
        ← Home
      </Link>
      <span className="mx-1 text-zinc-600">|</span>
      {frameworks.map((fw) => {
        const isActive = fw.slug === active;
        return (
          <Link
            key={fw.slug}
            href={`/${fw.slug}`}
            aria-current={isActive ? "page" : undefined}
            className="rounded-full border px-3 py-1 transition"
            style={{
              borderColor: isActive ? fw.accent : "rgb(63 63 70)",
              color: isActive ? fw.accent : "rgb(212 212 216)",
              background: isActive ? `${fw.accent}1a` : "transparent",
            }}
          >
            {fw.name}
          </Link>
        );
      })}
    </nav>
  );
}
