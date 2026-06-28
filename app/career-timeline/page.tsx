import Image from "next/image";
import Link from "next/link";
import { frameworkStories, frameworks } from "../lib/story";

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
    <main className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <section className="rounded-3xl border border-zinc-200 bg-white/75 p-8 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          Career Timeline
        </p>
        <h1 className="font-display mt-3 text-4xl text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          The Road So Far
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          A chronological look at my product and frontend journey across
          ecommerce, startup environments, and fintech systems.
        </p>
      </section>

      <section className="mt-10">
        <ol className="space-y-8">
          {timeline.map((item) => (
            <li key={item.id} className="relative pl-12">
              <span className="absolute left-3 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />
              <span
                className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-white shadow-sm dark:border-zinc-900"
                style={{ background: item.accent }}
              />

              <article className="rounded-2xl border border-zinc-200 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/45">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      {item.period}
                    </p>
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xl font-semibold text-zinc-900 transition hover:underline dark:text-zinc-100"
                    >
                      {item.company}
                    </a>
                    <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {item.role}
                    </p>
                  </div>

                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-100">
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.summary}
                </p>

                {item.media && item.media.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-1">
                    {item.media.map((media) => (
                      <figure key={media.src}>
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 700px"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {media.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={item.storyHref}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition hover:gap-2"
                  style={{ color: item.accent }}
                >
                  {item.storyLabel}
                  <span aria-hidden>→</span>
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
        >
          ← Back to Home
        </Link>

        <Link
          href="/recommendations"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
        >
          View Recommendations →
        </Link>
      </nav>
    </main>
  );
}
