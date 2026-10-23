import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { frameworkStories, frameworks } from "../lib/story";
import { chapterIndex } from "../lib/chapters";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Every frontend role Parsa Khosravani has held, in order: ecommerce at Khanoumi, startup travel at AMR Tech, and market systems at Mofid Securities.",
};

type TimelineMedia = {
  src: string;
  alt: string;
  caption: string;
};

type TimelineItem = {
  id: string;
  period: string;
  company: string;
  linkedin: string;
  role: string;
  summary: string;
  tags: string[];
  accent: string;
  storyHref: string;
  storyLabel: string;
  logo: string;
  media?: TimelineMedia[];
};

const timeline: TimelineItem[] = [
  {
    id: "khanoumi",
    period: frameworkStories.vue.period,
    company: frameworkStories.vue.company,
    linkedin: "https://www.linkedin.com/company/khanoumi",
    role: "Frontend Engineer",
    summary:
      "Built ecommerce features under campaign pressure and helped evolve the frontend foundation with Vue and Nuxt workflows.",
    tags: ["Ecommerce", "Campaign Traffic", "Nuxt Migration"],
    accent: frameworks.find((fw) => fw.slug === "vue")?.accentText ?? "#2f9e6b",
    storyHref: "/vue",
    storyLabel: "Read Vue Chapter",
    logo: "/logos/khanoumi.png",
    media: [
      {
        src: "/experiences/khanoumi/mall-campaign.jpg",
        alt: "Khanoumi campaign activation in a mall",
        caption:
          "Campaign periods shaped how we designed reliability and conversion-focused experiences.",
      },
    ],
  },
  {
    id: "amr",
    period: frameworkStories.react.period,
    company: frameworkStories.react.company,
    linkedin: "https://www.linkedin.com/company/amr-tech-co",
    role: "Frontend Engineer",
    summary:
      "Shipped React product features at startup speed, balancing delivery pace with maintainable architecture and performance discipline.",
    tags: ["Startup Velocity", "React Architecture", "Performance"],
    accent:
      frameworks.find((fw) => fw.slug === "react")?.accentText ?? "#0b9dc7",
    storyHref: "/react",
    storyLabel: "Read React Chapter",
    logo: "/logos/amr.png",
    media: [
      {
        src: "/experiences/amr/team-event.jpg",
        alt: "AMR team event photo",
        caption:
          "A collaborative product team helped us move quickly while keeping quality high.",
      },
    ],
  },
  {
    id: "mofid",
    period: frameworkStories.angular.period,
    company: frameworkStories.angular.company,
    linkedin: "https://www.linkedin.com/company/mofidsecurities",
    role: "Senior Frontend Engineer",
    summary:
      "Focused on platform reliability, maintainability, and high-trust delivery for financial products with real-time user demands.",
    tags: ["Fintech", "Scale", "Platform Engineering"],
    accent:
      frameworks.find((fw) => fw.slug === "angular")?.accentText ?? "#dd0031",
    storyHref: "/angular",
    storyLabel: "Read Angular Chapter",
    logo: "/logos/mofid.png",
    media: [
      {
        src: "/experiences/mofid/trading-dashboard.png",
        alt: "Mofid trading dashboard",
        caption:
          "Reliability and clarity became the core of every frontend decision in market-facing products.",
      },
    ],
  },
];

export default function CareerTimelinePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
      <header className="grid gap-x-10 gap-y-4 md:grid-cols-[11rem_1fr]">
        <Link href="/#contents" className="link self-start text-sm text-ink-soft md:pt-4">
          Contents
        </Link>
        <div>
          <h1 className="font-display set-in text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            Timeline
          </h1>
          <p className="prose-serif set-in-late mt-6 max-w-[48ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
            Every role so far, in order: from ecommerce on sales days, to a
            travel startup, to systems that move with the stock market.
          </p>
        </div>
      </header>

      <ol className="mt-20 border-t border-rule">
        {timeline.map((item, i) => {
          const chapter = chapterIndex.find((c) => c.slug === item.storyHref.slice(1));
          return (
            <li
              key={item.id}
              className="grid gap-x-10 gap-y-5 border-b border-rule py-12 md:grid-cols-[11rem_1fr]"
              style={{ "--chapter": chapter?.accentText ?? item.accent } as CSSProperties}
            >
              <div>
                <p className="font-display text-2xl tabular-nums text-ink">
                  {chapter?.years ?? item.period}
                </p>
                <p className="mt-1 text-sm text-ink-faint">{item.period}</p>
                <div className="relative mt-5 hidden h-14 w-14 overflow-hidden bg-white p-1.5 md:block">
                  <Image
                    src={item.logo}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.05] text-ink">
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--chapter)]"
                  >
                    {item.company}
                  </a>
                </h2>
                <p className="mt-2 text-ink">{item.role}</p>
                <p className="mt-4 max-w-[60ch] text-ink-soft">{item.summary}</p>
                <p className="mt-3 text-sm text-ink-faint">{item.tags.join(", ")}</p>

                {item.media?.map((media) => (
                  <figure key={media.src} className="mt-8 max-w-3xl">
                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 760px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 max-w-[56ch] text-sm text-ink-soft">
                      {media.caption}
                    </figcaption>
                  </figure>
                ))}

                <Link
                  href={item.storyHref}
                  className="font-display mt-8 inline-block text-xl text-ink underline decoration-[var(--chapter)] decoration-2 underline-offset-[0.3em] transition-colors hover:text-[var(--chapter)]"
                >
                  Read chapter {chapter?.numeral ?? i + 1}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
