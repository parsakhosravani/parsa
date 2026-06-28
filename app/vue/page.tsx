"use client";

import Image from "next/image";
import Link from "next/link";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";
import VueStory from "./vue-story";

const fw = frameworks.find((f) => f.slug === "vue")!;
const accentText = fw.accentText;
const accent = fw.accent;
const story = frameworkStories.vue;
const companyLinkedIn = "https://www.linkedin.com/company/khanoumi";

const khanoumiMoments = [
  {
    src: "/experiences/khanoumi/mall-campaign.jpg",
    alt: "Khanoumi in-mall campaign event with high foot traffic",
    caption:
      "Offline activation and online flow were coordinated to improve campaign reach and conversion intent.",
  },
  {
    src: "/experiences/khanoumi/outdoor-team.jpg",
    alt: "Khanoumi team outdoor event photo",
    caption:
      "Cross-functional collaboration made campaign launches faster and more reliable.",
  },
  {
    src: "/experiences/khanoumi/lucky-wheel.jpg",
    alt: "Khanoumi lucky wheel UI used during promotional campaign",
    caption:
      "Gamified promotion mechanics increased engagement and gave us useful user behavior signals.",
  },
  {
    src: "/experiences/khanoumi/kiosk-interaction.jpg",
    alt: "Khanoumi interactive kiosk used by a campaign participant",
    caption:
      "Interactive touchpoints connected product experience with measurable campaign participation.",
  },
];

const keyThemes = [
  {
    title: "Ecommerce at Scale",
    description:
      "Every campaign day revealed what infrastructure really meant. Traffic spikes were not theoretical—they were business moments.",
  },
  {
    title: "Reliability Under Pressure",
    description:
      "Downtime during a campaign was not just a technical failure—it was a business loss. That responsibility shaped every decision.",
  },
  {
    title: "Strategic Modernization",
    description:
      "The Nuxt migration was not about following trends. It was about building a foundation that let the team move faster without fear.",
  },
  {
    title: "Design Systems as Multiplier",
    description:
      "Consistency was not about aesthetics. It was about reducing friction so designers and engineers could collaborate at startup speed.",
  },
];

export default function VueStoryPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <StoryNav active="vue" />
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
          Khanoumi Moments
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          These campaign moments show how product, growth, and real-world
          customer interaction came together in the ecommerce chapter.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {khanoumiMoments.map((moment) => (
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

      <VueStory />

      <div className="mt-12 flex gap-4">
        <Link
          href="/"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          ← Back to Home
        </Link>
        <Link
          href="/angular"
          className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: accentText }}
        >
          Next Story →
        </Link>
      </div>
    </main>
  );
}
