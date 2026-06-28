import Image from "next/image";
import type { FrameworkStory } from "../lib/story";

interface Moment {
  src: string;
  alt: string;
  caption: string;
}

interface Theme {
  title: string;
  description: string;
}

export function StoryHero({
  story,
  accent,
  accentText,
  companyLinkedIn,
}: {
  story: FrameworkStory;
  accent: string;
  accentText: string;
  companyLinkedIn: string;
}) {
  return (
    <>
      <header className="animate-fade-up relative mb-10 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/40 sm:p-10">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl opacity-30"
          style={{ background: accent }}
        />
        <span
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: accent }}
        />
        <p
          className="relative text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accentText }}
        >
          {story.eyebrow}
        </p>
        <h1 className="font-display relative mt-3 text-4xl text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {story.title}
        </h1>
        <p className="relative mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {story.lede}
        </p>
      </header>

      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        <a
          href={companyLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 transition hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
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
          <div className="mt-2 flex flex-wrap gap-1.5">
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
    </>
  );
}

export function MomentsGallery({
  title,
  intro,
  moments,
}: {
  title: string;
  intro: string;
  moments: Moment[];
}) {
  return (
    <section className="mb-12 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-9">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
        {title}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {intro}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {moments.map((moment) => (
          <figure key={moment.src} className="group overflow-hidden rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {moment.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function KeyThemes({
  themes,
  accent,
}: {
  themes: Theme[];
  accent: string;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
        What Made This Chapter Matter
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {themes.map((theme) => (
          <div
            key={theme.title}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <span
              className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
              style={{ background: accent }}
            />
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
  );
}

export function StoryFooterNav({
  nextHref,
  nextLabel,
  accentText,
}: {
  nextHref: string;
  nextLabel: string;
  accentText: string;
}) {
  return (
    <div className="mt-12 flex gap-4">
      <a
        href="/"
        className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
      >
        ← Back to Home
      </a>
      <a
        href={nextHref}
        className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
        style={{ background: accentText }}
      >
        {nextLabel} →
      </a>
    </div>
  );
}
