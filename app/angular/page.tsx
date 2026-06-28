"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";

const fw = frameworks.find((f) => f.slug === "angular")!;
const accentText = fw.accentText;
const accent = fw.accent;
const story = frameworkStories.angular;
const companyLinkedIn = "https://www.linkedin.com/company/mofidsecurities";

const mofidMoments = [
  {
    src: "/experiences/mofid/trading-dashboard.png",
    alt: "Mofid online trading dashboard interface",
    caption:
      "A product-facing view of the domain: realtime market data, transaction depth, and clear trader workflows.",
  },
  {
    src: "/experiences/mofid/team-circle.jpg",
    alt: "Mofid team in a collaborative discussion session",
    caption:
      "Regular discussion sessions improved alignment across product and engineering decisions.",
  },
  {
    src: "/experiences/mofid/balloon-session.jpg",
    alt: "Mofid team celebration with blue balloons",
    caption:
      "Celebration moments kept morale high while we handled demanding delivery cycles.",
  },
  {
    src: "/experiences/mofid/birthday-group.jpg",
    alt: "Mofid engineering team birthday event photo",
    caption:
      "Strong team relationships supported consistent execution and better ownership at scale.",
  },
];

const keyThemes = [
  {
    title: "High-Trust Environments",
    description:
      "Market systems require absolute reliability. That constraint shaped every architectural decision and test we wrote.",
  },
  {
    title: "Scale and Complexity",
    description:
      "Thousands of concurrent users, real-time data flows, and market-grade latency requirements teach you how to think about systems differently.",
  },
  {
    title: "Mature Engineering",
    description:
      "After startup pace, mature organizations show you that sustainable velocity comes from good foundations, not heroics.",
  },
  {
    title: "Ownership at Scale",
    description:
      "In larger teams, leadership means helping others move faster, not just writing code. That shift was fundamental to this chapter.",
  },
];

const AngularStory = dynamic(() => import("./angular-story"), {
  ssr: false,
  loading: () => <p className="text-zinc-500">Bootstrapping Angular app…</p>,
});

export default function AngularStoryPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <StoryNav active="angular" />
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

      <section className="mb-12 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-9">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Mofid Moments
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Culture and collaboration are part of the architecture story too.
          These moments show the team environment behind the platform work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {mofidMoments.map((moment) => (
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

      <AngularStory />

      <div className="mt-12 flex gap-4">
        <Link
          href="/"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          ← Back to Home
        </Link>
        <Link
          href="/react"
          className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: accentText }}
        >
          Explore React →
        </Link>
      </div>
    </main>
  );
}
