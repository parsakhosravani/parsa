"use client";

import Link from "next/link";
import { useState } from "react";
import { StoryNav } from "../components/story-nav";
import {
  KeyThemes,
  MomentsGallery,
  StoryHero,
} from "../components/story-sections";
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
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <StoryNav active="react" />

      <StoryHero
        story={story}
        accent={accent}
        accentText={accentText}
        companyLinkedIn={companyLinkedIn}
      />

      <div className="mb-12 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: accent }}
        />
      </div>

      <MomentsGallery
        title="AMR Moments"
        intro="These moments show the learning culture, collaboration, and intensity behind the startup delivery pace that defined this chapter."
        moments={amrMoments}
      />

      <KeyThemes themes={keyThemes} accent={accent} />

      <article className="mb-12 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-9">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          {chapter.era}
        </p>
        <h2 className="font-display mt-2 text-3xl text-zinc-900 dark:text-zinc-100">
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
          type="button"
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
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${c.title}`}
              aria-current={i === active ? "true" : undefined}
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
          type="button"
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
