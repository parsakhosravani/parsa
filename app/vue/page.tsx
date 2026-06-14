"use client";

import Image from "next/image";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";
import VueStory from "./vue-story";

const accentText = frameworks.find((f) => f.slug === "vue")!.accentText;
const story = frameworkStories.vue;

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

export default function VueStoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <StoryNav active="vue" />
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

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Khanoumi Moments
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          These campaign moments show how product, growth, and real-world
          customer interaction came together in the ecommerce chapter.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {khanoumiMoments.map((moment) => (
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
      <VueStory />
    </main>
  );
}
