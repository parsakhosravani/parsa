"use client";

import { useState } from "react";
import { StoryNav } from "../components/story-nav";
import { chapters, frameworks } from "../lib/story";

const accent = frameworks.find((f) => f.slug === "react")!.accent;

export default function ReactStoryPage() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  const progress = ((active + 1) / chapters.length) * 100;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <StoryNav active="react" />

      <header className="mb-8">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          React · Hooks &amp; JSX
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-100 sm:text-4xl">
          My Journey
        </h1>
      </header>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: accent }}
        />
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          {chapter.era}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-100">
          {chapter.title}
        </h2>
        <p className="mt-1 text-zinc-400">{chapter.subtitle}</p>
        <div className="mt-5 space-y-4 leading-relaxed text-zinc-300">
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          disabled={active === 0}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 disabled:opacity-30"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              aria-label={`Go to ${c.title}`}
              className="h-2.5 w-2.5 rounded-full transition"
              style={{
                background: i === active ? accent : "rgb(63 63 70)",
                transform: i === active ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((i) => Math.min(chapters.length - 1, i + 1))}
          disabled={active === chapters.length - 1}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
