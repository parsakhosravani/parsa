"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";

const fw = frameworks.find((f) => f.slug === "react")!;
const accent = fw.accent;
const accentText = fw.accentText;
const story = frameworkStories.react;
const companyLinkedIn = "https://www.linkedin.com/company/amr-tech-co";

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

const keyThemes = [
  {
    title: "Startup Velocity",
    description:
      "Moving fast meant understanding what actually mattered. Every feature decision had to align with limited resources and aggressive timelines.",
  },
  {
    title: "Product Architecture",
    description:
      "React gave us the tools to structure complex travel flows without creating maintenance nightmares. The right abstractions made shipping faster and safer.",
  },
  {
    title: "Performance as Culture",
    description:
      "Performance was not a metric to chase—it was a cultural value. Every engineer understood that a slow page was a lost customer.",
  },
  {
    title: "Team Ownership",
    description:
      "Each engineer owned pieces of the product end-to-end. That ownership meant they cared about the actual user experience, not just code quality.",
  },
];

export default function ReactStoryPage() {
  const [active, setActive] = useState(0);
  const chapter = story.chapters[active];
  const progress = ((active + 1) / story.chapters.length) * 100;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <StoryNav active="react" />

      <header className="mb-12">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accentText }}
        >
          {story.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {story.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {story.lede}
        </p>
      </header>

      <div className="mb-12 grid gap-3 sm:grid-cols-3">
        <a
          href={companyLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
        >
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Company
          </p>
          <p className="mt-1 font-semibold text-zinc-900 group-hover:underline dark:text-zinc-100">
            {story.company}
          </p>
          <p className="mt-1 text-xs text-zinc-500 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
            View on LinkedIn →
          </p>
        </a>
        <div className="rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Period
          </p>
          <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
            {story.period}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Focus
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {story.highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="inline-block rounded text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: accent }}
        />
      </div>

      <section className="mb-12 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-9">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          AMR Moments
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          These moments show the learning culture, collaboration, and intensity behind the
          startup delivery pace that defined this chapter.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {amrMoments.map((moment) => (
            <figure key={moment.src} className="overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover transition hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {moment.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          What Made This Chapter Matter
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {keyThemes.map((theme) => (
            <div
              key={theme.title}
              className="rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {theme.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {theme.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <article className="mb-12 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-9">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          {chapter.era}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          {chapter.title}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {chapter.subtitle}
        </p>
        <div className="mt-7 space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <div className="mb-12 flex items-center justify-between">
        <button
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          disabled={active === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
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
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          Next →
        </button>
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          ← Back to Home
        </Link>
        <Link
          href="/vue"
          className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: accentText }}
        >
          Next Story →
        </Link>
      </div>
    </main>
  );
}
