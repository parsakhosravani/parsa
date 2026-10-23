import type { Metadata } from "next";
import { ChapterPage } from "../components/story-sections";
import AngularStory from "./angular-story";

export const metadata: Metadata = {
  title: "Angular chapter",
};

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

export default function AngularChapterPage() {
  return (
    <ChapterPage
      slug="angular"
      moments={mofidMoments}
      momentsIntro="Culture and collaboration are part of the architecture story too. These moments show the team environment behind the platform work."
      themes={keyThemes}
      reader={<AngularStory />}
    />
  );
}
