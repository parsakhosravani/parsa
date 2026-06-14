import Link from "next/link";
import Image from "next/image";
import { frameworkStories, intro, frameworks } from "./lib/story";
import { ThemeToggle } from "./components/theme-toggle";

const timeline = [
  {
    id: "mofid",
    period: frameworkStories.angular.period,
    company: frameworkStories.angular.company,
    title: "Scale, structure, and market-grade reliability",
    summary:
      "At Mofid, the work expanded to larger systems and teams: legacy modernization, real-time data, platform quality, and better long-term balance.",
    href: "/angular",
    accent:
      frameworks.find((fw) => fw.slug === "angular")?.accentText ?? "#dd0031",
    cta: "Read Angular story",
    logo: "/logos/mofid.png",
    tags: ["Market Data", "Large Teams", "Platform Discipline"],
  },
  {
    id: "amr-tech",
    period: frameworkStories.react.period,
    company: frameworkStories.react.company,
    title: "Startup velocity, OTA deadlines, and overnight pushes",
    summary:
      "AMR was fast and ambitious: React performance work, AI-assisted operations, and shipping under tight deadlines without losing quality.",
    href: "/react",
    accent:
      frameworks.find((fw) => fw.slug === "react")?.accentText ?? "#0b9dc7",
    cta: "Read React story",
    logo: "/logos/amr.png",
    tags: ["Startup Pace", "OTA Workflows", "Overnight Releases"],
  },
  {
    id: "khanoumi",
    period: frameworkStories.vue.period,
    company: frameworkStories.vue.company,
    title: "Ecommerce pressure, campaign days, and Vue/Nuxt migration",
    summary:
      "From coronavirus-era demand shifts to Black Friday spikes, this chapter was about keeping trust and uptime when traffic became intense.",
    href: "/vue",
    accent: frameworks.find((fw) => fw.slug === "vue")?.accentText ?? "#2f9e6b",
    cta: "Read Vue story",
    logo: "/logos/khanoumi.png",
    tags: ["Ecommerce", "Campaign Traffic", "Nuxt Migration"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-6 flex justify-end">
        <ThemeToggle />
      </div>
      <section className="rounded-3xl border border-zinc-200 bg-white/70 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/40 sm:p-12">
        <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              {intro.role}
            </p>
            <h1 className="mt-4 bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-4xl font-bold text-transparent dark:from-zinc-100 dark:to-zinc-400 sm:text-6xl">
              {intro.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {intro.tagline}
            </p>
          </div>
          <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:h-44 sm:w-44">
            <Image
              src="/profile.jpg"
              alt="Portrait of Parsa Khosravani"
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Read my journey in
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {frameworks.map((fw) => (
            <Link
              key={fw.slug}
              href={`/${fw.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: fw.accent }}
              />
              <h3
                className="text-xl font-semibold"
                style={{ color: fw.accentText }}
              >
                {fw.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {fw.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-700 transition group-hover:gap-2 dark:text-zinc-300">
                Enter the story
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Career Timeline
        </h2>
        <ol className="mt-6 space-y-7">
          {timeline.map((item) => (
            <li key={item.id} className="relative pl-12">
              <span className="absolute left-3 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />
              <span
                className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-white shadow-sm dark:border-zinc-900"
                style={{ background: item.accent }}
              />
              <article className="rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/35">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      {item.period}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.company}
                    </h3>
                  </div>
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-100">
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo mark`}
                      fill
                      sizes="56px"
                      quality={100}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
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
                  href={item.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition hover:gap-2"
                  style={{ color: item.accent }}
                >
                  {item.cta}
                  <span aria-hidden>→</span>
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-16 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
        <a
          href="https://github.com/parsakhosravani"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
        >
          GitHub
        </a>
        <span aria-hidden>·</span>
        <a
          href="mailto:parsakhosravani@gmail.com"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
        >
          Email
        </a>
      </footer>
    </main>
  );
}
