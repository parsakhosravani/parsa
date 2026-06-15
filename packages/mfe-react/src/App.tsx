import { useState } from "react";
import { frameworkStories, frameworks } from "./story";

const fw = frameworks.find((f) => f.slug === "react")!;
const accent = fw.accent;
const story = frameworkStories.react;

/**
 * React story chapter navigator.
 * Exposed via Module Federation as `mfe_react/App`.
 * Mounted by the shell at /react.
 */
export default function App() {
  const [active, setActive] = useState(0);
  const chapter = story.chapters[active];
  const progress = ((active + 1) / story.chapters.length) * 100;

  return (
    <div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: accent }}
        />
      </div>

      <article className="rounded-2xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          {chapter.era}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {chapter.title}
        </h2>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {chapter.subtitle}
        </p>
        <div className="mt-5 space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          disabled={active === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {story.chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              aria-label={`Go to ${c.title}`}
              className={
                i === active
                  ? "h-2.5 w-2.5 rounded-full transition"
                  : "h-2.5 w-2.5 rounded-full bg-zinc-300 transition dark:bg-zinc-700"
              }
              style={
                i === active
                  ? { background: accent, transform: "scale(1.3)" }
                  : undefined
              }
            />
          ))}
        </div>

        <button
          onClick={() =>
            setActive((i) => Math.min(story.chapters.length - 1, i + 1))
          }
          disabled={active === story.chapters.length - 1}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
