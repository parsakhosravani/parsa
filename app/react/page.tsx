import type { Metadata } from "next";
import { ChapterPage } from "../components/story-sections";
import { ChapterReader } from "../components/chapter-reader";
import { frameworkStories } from "../lib/story";

export const metadata: Metadata = {
  title: "React chapter",
};

const amrMoments = [
  {
    src: "/experiences/amr/react-next-sharing.jpg",
    alt: "AMR React and Next.js knowledge sharing poster",
    caption:
      "Technical sharing sessions aligned implementation patterns across the frontend team.",
  },
  {
    src: "/experiences/amr/architecture-notes.jpg",
    alt: "Architecture notes from an AMR planning session",
    caption:
      "Architecture planning made service boundaries and delivery priorities clearer before implementation.",
  },
  {
    src: "/experiences/amr/meetup-audience.jpg",
    alt: "AMR meetup audience engagement moment",
    caption:
      "Community and internal events strengthened engineering communication and team momentum.",
  },
  {
    src: "/experiences/amr/team-event.jpg",
    alt: "AMR team event group photo",
    caption:
      "Team culture supported faster collaboration and healthier execution during demanding sprints.",
  },
];

const keyThemes = [
  {
    title: "Startup Velocity",
    description:
      "Moving fast meant understanding what actually mattered. Every feature decision had to align with limited resources and aggressive timelines.",
  },
  {
    title: "Product Architecture",
    description:
      "React gave us the tools to structure complex travel flows without creating maintenance nightmares. The right abstractions made shipping faster and safer.",
  },
  {
    title: "Performance as Culture",
    description:
      "Performance was not a metric to chase—it was a cultural value. Every engineer understood that a slow page was a lost customer.",
  },
  {
    title: "Team Ownership",
    description:
      "Each engineer owned pieces of the product end-to-end. That ownership meant they cared about the actual user experience, not just code quality.",
  },
];

export default function ReactChapterPage() {
  return (
    <ChapterPage
      slug="react"
      moments={amrMoments}
      momentsIntro="These moments show the learning culture, collaboration, and intensity behind the startup delivery pace that defined this chapter."
      themes={keyThemes}
      reader={<ChapterReader chapters={frameworkStories.react.chapters} />}
    />
  );
}
