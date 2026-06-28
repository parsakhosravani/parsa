"use client";

import dynamic from "next/dynamic";
import { StoryNav } from "../components/story-nav";
import {
  KeyThemes,
  MomentsGallery,
  StoryFooterNav,
  StoryHero,
} from "../components/story-sections";
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
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <StoryNav active="angular" />
      <StoryHero
        story={story}
        accent={accent}
        accentText={accentText}
        companyLinkedIn={companyLinkedIn}
      />

      <MomentsGallery
        title="Mofid Moments"
        intro="Culture and collaboration are part of the architecture story too. These moments show the team environment behind the platform work."
        moments={mofidMoments}
      />

      <KeyThemes themes={keyThemes} accent={accent} />

      <AngularStory />

      <StoryFooterNav
        nextHref="/react"
        nextLabel="Explore React"
        accentText={accentText}
      />
    </main>
  );
}
