"use client";

import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";
import VueStory from "./vue-story";

const accentText = frameworks.find((f) => f.slug === "vue")!.accentText;
const story = frameworkStories.vue;

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
      <VueStory />
    </main>
  );
}
