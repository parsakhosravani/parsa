"use client";

import { StoryNav } from "../components/story-nav";
import {
  KeyThemes,
  MomentsGallery,
  StoryFooterNav,
  StoryHero,
} from "../components/story-sections";
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
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <StoryNav active="vue" />
      <StoryHero
        story={story}
        accent={accent}
        accentText={accentText}
        companyLinkedIn={companyLinkedIn}
      />

      <MomentsGallery
        title="Khanoumi Moments"
        intro="These campaign moments show how product, growth, and real-world customer interaction came together in the ecommerce chapter."
        moments={khanoumiMoments}
      />

      <KeyThemes themes={keyThemes} accent={accent} />

      <VueStory />

      <StoryFooterNav
        nextHref="/angular"
        nextLabel="Next Story"
        accentText={accentText}
      />
    </main>
  );
}
