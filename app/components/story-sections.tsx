import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getChapter } from "../lib/chapters";
import { frameworkStories, type FrameworkSlug } from "../lib/story";

export interface Moment {
  src: string;
  alt: string;
  caption: string;
}

export interface Theme {
  title: string;
  description: string;
}

/**
 * Class strings shared by the three chapter readers. The React reader uses
 * them directly; the Vue and Angular templates repeat the same classes so
 * all three render identically.
 */
export const readerClasses = {
  tabs: "flex flex-wrap gap-x-7 gap-y-2 border-b border-rule pb-3",
  tab: "inline-flex items-baseline gap-2 text-[0.9375rem] text-ink-soft transition hover:text-ink",
  tabActive:
    "text-ink underline decoration-[var(--chapter)] decoration-2 underline-offset-[0.55em]",
  tabNumber: "font-display tabular-nums",
  article: "pt-9",
  title:
    "font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] text-ink",
  subtitle: "prose-serif mt-2 italic text-ink-soft",
  body: "prose-serif mt-7 max-w-[62ch] space-y-5 text-ink",
  footer:
    "mt-10 flex items-center justify-between gap-4 border-t border-rule pt-5 text-[0.9375rem]",
  button:
    "text-ink transition hover:text-[var(--chapter)] disabled:cursor-default disabled:opacity-30 disabled:hover:text-ink",
  count: "text-sm tabular-nums text-ink-faint",
} as const;

function Spread({
  label,
  children,
  className = "",
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr] ${className}`}>
      <div className="font-display text-xl leading-tight text-ink-soft md:pt-1">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function ChapterPage({
  slug,
  moments,
  momentsIntro,
  themes,
  reader,
}: {
  slug: FrameworkSlug;
  moments: Moment[];
  momentsIntro: string;
  themes: Theme[];
  reader: ReactNode;
}) {
  const { chapter, prev, next } = getChapter(slug);
  const story = frameworkStories[slug];

  return (
    <main
      className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16"
      style={{ "--chapter": chapter.accentText } as CSSProperties}
    >
      {/* Chapter opener */}
      <header className="grid gap-x-10 gap-y-6 md:grid-cols-[11rem_1fr]">
        <div className="md:pt-3">
          <Link href="/#contents" className="link text-sm text-ink-soft">
            Contents
          </Link>
          <p
            className="font-display mt-6 text-[4.5rem] leading-none"
            style={{ color: chapter.accentText }}
            aria-hidden="true"
          >
            {chapter.numeral}
          </p>
        </div>
        <div>
          <p className="text-ink-soft">
            <span className="sr-only">Chapter {chapter.numeral}: </span>
            {chapter.framework} at{" "}
            <a
              href={chapter.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-ink"
            >
              {chapter.company}
            </a>
            , {chapter.city}
          </p>
          <h1 className="font-display set-in mt-4 max-w-[18ch] text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[0.98] tracking-[-0.025em] text-ink">
            {story.title}
          </h1>
          <p className="prose-serif set-in-late mt-8 max-w-[52ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
            {story.lede}
          </p>
          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-rule pt-5 text-[0.9375rem] sm:grid-cols-[auto_1fr]">
            <div>
              <dt className="text-ink-faint">When</dt>
              <dd className="mt-0.5 text-ink">{story.period}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Focus</dt>
              <dd className="mt-0.5 text-ink">
                {story.highlights.join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* The story itself, rendered by the chapter's own framework */}
      <Spread
        className="mt-24"
        label={
          <>
            The story
            <span className="mt-2 block font-sans text-sm leading-snug text-ink-faint">
              This part of the page is a live {chapter.framework} app.
            </span>
          </>
        }
      >
        {reader}
      </Spread>

      {/* Photos */}
      <Spread className="mt-24" label="From the archive">
        <p className="max-w-[60ch] text-ink-soft">{momentsIntro}</p>
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-3">
          {moments.map((moment, i) => (
            <figure key={moment.src} className={i === 0 ? "sm:col-span-3" : ""}>
              <div
                className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 900px"
                      : "(max-width: 640px) 100vw, 300px"
                  }
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                {moment.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Spread>

      {/* Lessons */}
      <Spread className="mt-24" label="What it taught me">
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {themes.map((theme) => (
            <div key={theme.title} className="border-t border-rule py-6">
              <dt className="font-display text-2xl leading-tight text-ink">
                {theme.title}
              </dt>
              <dd className="mt-2 max-w-[50ch] text-[0.9375rem] text-ink-soft">
                {theme.description}
              </dd>
            </div>
          ))}
        </dl>
      </Spread>

      {/* Turn the page */}
      <nav
        aria-label="Chapters"
        className="mt-24 grid gap-px border-y border-rule bg-rule sm:grid-cols-2"
      >
        {[prev, next].map((target, i) =>
          target ? (
            <Link
              key={target.slug}
              href={`/${target.slug}`}
              className={`group bg-paper py-8 ${i === 1 ? "sm:pl-10 sm:text-right" : "sm:pr-10"}`}
              style={{ "--target": target.accentText } as CSSProperties}
            >
              <span className="text-sm text-ink-faint">
                {i === 0 ? "Previous chapter" : "Next chapter"}
              </span>
              <span className="font-display mt-2 block text-[clamp(1.6rem,3vw,2.25rem)] leading-tight text-ink transition-colors group-hover:text-[var(--target)]">
                {target.numeral}. {target.framework} at {target.company}
              </span>
            </Link>
          ) : (
            <Link
              key={i === 0 ? "start" : "end"}
              href={i === 0 ? "/#contents" : "/career-timeline"}
              className={`group bg-paper py-8 ${i === 1 ? "sm:pl-10 sm:text-right" : "sm:pr-10"}`}
            >
              <span className="text-sm text-ink-faint">
                {i === 0 ? "Back to" : "After the last chapter"}
              </span>
              <span className="font-display mt-2 block text-[clamp(1.6rem,3vw,2.25rem)] leading-tight text-ink transition-colors group-hover:text-cobalt">
                {i === 0 ? "Contents" : "The full timeline"}
              </span>
            </Link>
          ),
        )}
      </nav>
    </main>
  );
}
