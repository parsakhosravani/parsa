"use client";

import Image from "next/image";
import { useState } from "react";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";

const fw = frameworks.find((f) => f.slug === "react")!;
const accent = fw.accent;
const accentText = fw.accentText;
const story = frameworkStories.react;

const amrMoments = [
  {
    src: "/experiences/amr/react-next-sharing.jpg",
    alt: "AMR React and Next.js knowledge sharing poster",
    caption:
      "Technical sharing sessions aligned implementation patterns across the frontend team.",
  },
  {
    src: "/experiences/amr/architecture-notes.jpg",
    alt: "Architecture notes from an AMR planning session",
    caption:
      "Architecture planning made service boundaries and delivery priorities clearer before implementation.",
  },
  {
    src: "/experiences/amr/meetup-audience.jpg",
    alt: "AMR meetup audience engagement moment",
    caption:
      "Community and internal events strengthened engineering communication and team momentum.",
  },
  {
    src: "/experiences/amr/team-event.jpg",
    alt: "AMR team event group photo",
    caption:
      "Team culture supported faster collaboration and healthier execution during demanding sprints.",
  },
];

export default function ReactStoryPage() {
  const [active, setActive] = useState(0);
  const chapter = story.chapters[active];
  const progress = ((active + 1) / story.chapters.length) * 100;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <StoryNav active="react" />

      <header className="mb-8">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accentText }}
        >
          {story.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {story.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-300">
          {story.lede}
        </p>
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Company
          </p>
          <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
            {story.company}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Period
          </p>
          <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
            {story.period}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Highlights
          </p>
          <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
            {story.highlights.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: accent }}
        />
      </div>

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          AMR Moments
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          These moments show the learning culture and collaboration behind the
          startup delivery pace.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {amrMoments.map((moment) => (
            <figure key={moment.src}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {moment.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

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
    </main>
  );
}
