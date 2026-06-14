"use client";

import dynamic from "next/dynamic";
import { StoryNav } from "../components/story-nav";
import { frameworks } from "../lib/story";

const accentText = frameworks.find((f) => f.slug === "angular")!.accentText;

const AngularStory = dynamic(() => import("./angular-story"), {
  ssr: false,
  loading: () => <p className="text-zinc-500">Bootstrapping Angular app…</p>,
});

export default function AngularStoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <StoryNav active="angular" />
      <header className="mb-8">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: accentText }}
        >
          Angular · Bootstrapped app
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          My Journey
        </h1>
      </header>
      <AngularStory />
    </main>
  );
}
