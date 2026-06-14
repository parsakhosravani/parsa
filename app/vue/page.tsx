"use client";

import dynamic from "next/dynamic";
import { StoryNav } from "../components/story-nav";
import { frameworks } from "../lib/story";

const accent = frameworks.find((f) => f.slug === "vue")!.accent;

const VueStory = dynamic(() => import("./vue-story"), {
  ssr: false,
  loading: () => <p className="text-zinc-500">Mounting Vue app…</p>,
});

export default function VueStoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <StoryNav active="vue" />
      <header className="mb-8">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          Vue · Live mounted app
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-100 sm:text-4xl">
          My Journey
        </h1>
      </header>
      <VueStory />
    </main>
  );
}
