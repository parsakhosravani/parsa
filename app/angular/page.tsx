"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { StoryNav } from "../components/story-nav";
import { frameworkStories, frameworks } from "../lib/story";

const accentText = frameworks.find((f) => f.slug === "angular")!.accentText;
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
          <a
            href={companyLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-zinc-500 transition hover:underline dark:text-zinc-400"
          >
            LinkedIn
          </a>
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
          Mofid Moments
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Culture and collaboration are part of the architecture story too.
          These moments show the team environment behind the platform work.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {mofidMoments.map((moment) => (
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
      <AngularStory />
    </main>
  );
}
