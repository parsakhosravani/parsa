import Link from "next/link";
import Image from "next/image";
import { frameworkStories, intro, frameworks } from "./lib/story";
import { githubUrl, projects } from "./lib/projects";
import { sortedPosts, formatDate } from "./lib/blog";
import { Reveal } from "./components/reveal";

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
  title: string;
  summary: string;
  href: string;
  accent: string;
  cta: string;
  logo: string;
  tags: string[];
  media?: TimelineMedia[];
};

const timeline: TimelineItem[] = [
  {
    id: "mofid",
    period: frameworkStories.angular.period,
    company: frameworkStories.angular.company,
    linkedin: "https://www.linkedin.com/company/mofidsecurities",
    title: "Scale, structure, and market-grade reliability",
    summary:
      "At Mofid, the work expanded to larger systems and teams: legacy modernization, real-time data, platform quality, and better long-term balance.",
    href: "/angular",
    accent:
      frameworks.find((fw) => fw.slug === "angular")?.accentText ?? "#dd0031",
    cta: "Read Angular story",
    logo: "/logos/mofid.png",
    tags: ["Market Data", "Large Teams", "Platform Discipline"],
    media: [
      {
        src: "/experiences/mofid/trading-dashboard.png",
        alt: "Mofid online trading dashboard interface",
        caption:
          "This is the product context behind our engineering decisions: realtime data visibility, execution clarity, and reliability under market pressure.",
      },
      {
        src: "/experiences/mofid/birthday-group.jpg",
        alt: "Mofid engineering team group photo from an office celebration",
        caption:
          "A healthy engineering culture helped us keep quality high while delivering under market pressure.",
      },
    ],
  },
  {
    id: "amr-tech",
    period: frameworkStories.react.period,
    company: frameworkStories.react.company,
    linkedin: "https://www.linkedin.com/company/amr-tech-co",
    title: "Startup velocity, OTA deadlines, and overnight pushes",
    summary:
      "AMR was fast and ambitious: React performance work, AI-assisted operations, and shipping under tight deadlines without losing quality.",
    href: "/react",
    accent:
      frameworks.find((fw) => fw.slug === "react")?.accentText ?? "#0b9dc7",
    cta: "Read React story",
    logo: "/logos/amr.png",
    tags: ["Startup Pace", "OTA Workflows", "Overnight Releases"],
    media: [
      {
        src: "/experiences/amr/react-next-sharing.jpg",
        alt: "AMR knowledge sharing visual for React and Next.js",
        caption:
          "Knowledge-sharing sessions improved shared standards and helped the team ship with more consistency.",
      },
      {
        src: "/experiences/amr/team-event.jpg",
        alt: "AMR team event group photo",
        caption:
          "A strong team environment made high-pressure delivery cycles more sustainable and collaborative.",
      },
    ],
  },
  {
    id: "khanoumi",
    period: frameworkStories.vue.period,
    company: frameworkStories.vue.company,
    linkedin: "https://www.linkedin.com/company/khanoumi",
    title: "Ecommerce pressure, campaign days, and Vue/Nuxt migration",
    summary:
      "From coronavirus-era demand shifts to Black Friday spikes, this chapter was about keeping trust and uptime when traffic became intense.",
    href: "/vue",
    accent: frameworks.find((fw) => fw.slug === "vue")?.accentText ?? "#2f9e6b",
    cta: "Read Vue story",
    logo: "/logos/khanoumi.png",
    tags: ["Ecommerce", "Campaign Traffic", "Nuxt Migration"],
    media: [
      {
        src: "/experiences/khanoumi/mall-campaign.jpg",
        alt: "Khanoumi campaign activation in a crowded shopping mall",
        caption:
          "Campaign execution at scale gave us direct feedback on traffic behavior and conversion bottlenecks.",
      },
      {
        src: "/experiences/khanoumi/lucky-wheel.jpg",
        alt: "Khanoumi lucky wheel campaign interface",
        caption:
          "Interactive campaign mechanics increased engagement while helping the team test growth ideas quickly.",
      },
    ],
  },
];

const stats = [
  { value: "5+", label: "Years building for the web" },
  { value: "4", label: "Product companies" },
  { value: "50K+", label: "Peak users served" },
  { value: "3", label: "Frameworks in production" },
];

const expertise = [
  {
    title: "Product-Minded Frontend",
    body: "I translate business goals into technical plans, then ship interfaces that feel fast, clear, and trustworthy.",
    icon: "◆",
  },
  {
    title: "Performance & Scale",
    body: "From campaign traffic spikes to real-time market data, I build for reliability when the pressure is highest.",
    icon: "⚡",
  },
  {
    title: "Systems & Architecture",
    body: "Design systems, migrations, and testing discipline that keep large codebases maintainable over time.",
    icon: "▣",
  },
  {
    title: "Mentorship & Craft",
    body: "I mentor engineers on AdpList and care deeply about helping teams grow their judgment, not just their output.",
    icon: "✦",
  },
];

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "Nuxt",
  "Angular",
  "Tailwind CSS",
  "Node.js",
  "Storybook",
  "Jest",
  "Cypress",
  "AG Grid",
  "Lightstreamer",
  "Figma",
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="animate-fade-up relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/40 sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/20" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-600/20" />

        <div className="relative flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-900/30 dark:text-emerald-300">
              <span className="animate-pulse-ring h-2 w-2 rounded-full bg-emerald-500" />
              Open to senior frontend & platform roles
            </span>

            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              {intro.role}
            </p>
            <h1 className="font-display mt-3 bg-gradient-to-r from-indigo-600 via-zinc-900 to-cyan-600 bg-clip-text text-5xl font-bold text-transparent dark:from-indigo-300 dark:via-zinc-100 dark:to-cyan-300 sm:text-7xl">
              {intro.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {intro.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:parsakhosravani@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Get in touch
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/career-timeline"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
              >
                Career timeline
              </Link>
              <Link
                href="/recommendations"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
              >
                Recommendations
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                href="https://github.com/parsakhosravani"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/parsakhosravani"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                LinkedIn
              </a>
              <a
                href="https://adplist.org/mentors/parsa-khosravani"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                AdpList
              </a>
            </div>
          </div>

          <div className="animate-float relative h-40 w-40 shrink-0 sm:h-52 sm:w-52">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 blur-xl opacity-40" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/60 bg-zinc-100 shadow-xl ring-1 ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-800">
              <Image
                src="/profile.jpg"
                alt="Portrait of Parsa Khosravani"
                fill
                sizes="(max-width: 640px) 160px, 208px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            variant="scale"
            delay={i * 80}
            className="rounded-2xl border border-zinc-200 bg-white/60 p-5 text-center backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <p className="font-display text-3xl text-zinc-900 dark:text-zinc-100">
              {stat.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-400">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </section>

      {/* Expertise */}
      <Reveal as="section" className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          What I bring
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {expertise.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={i * 90}
              className="group rounded-2xl border border-zinc-200 bg-white/60 p-6 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 text-lg text-indigo-600 dark:text-cyan-300">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Tech stack */}
      <Reveal as="section" className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Tools of the trade
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      {/* GitHub projects */}
      <Reveal as="section" className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Selected projects
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              A few public repositories from my GitHub.
            </p>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
          >
            View all on GitHub
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              as="div"
              key={project.name}
              delay={(i % 3) * 90}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h3>
                {project.stars > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <span aria-hidden className="text-amber-500">
                      ★
                    </span>
                    {project.stars}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 text-sm font-medium">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
                >
                  Code
                  <span aria-hidden>↗</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
                  >
                    Live demo
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Writing */}
      <Reveal as="section" className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Latest writing
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Essays on frontend performance and framework architecture.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
          >
            All posts
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {sortedPosts.slice(0, 3).map((post, i) => (
            <Reveal as="div" key={post.slug} variant="left" delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden className="sm:hidden">
                    ·
                  </span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg text-zinc-900 transition group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-cyan-300">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden text-zinc-400 transition group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 sm:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Story chapters */}
      <Reveal as="section" className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Read my journey in
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {frameworks.map((fw, i) => {
            const story = frameworkStories[fw.slug];
            return (
              <Reveal as="div" key={fw.slug} delay={i * 90} variant="scale">
                <Link
                  href={`/${fw.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 transition-transform"
                    style={{ background: fw.accent }}
                  />
                  <h3
                    className="font-display text-2xl"
                    style={{ color: fw.accentText }}
                  >
                    {fw.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                    {story.company}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {fw.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:gap-2 dark:text-zinc-300">
                    Enter the story
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Career Timeline
          </h2>
          <Link
            href="/career-timeline"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View full timeline →
          </Link>
        </div>
        <ol className="mt-6 space-y-7">
          {timeline.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              variant="left"
              delay={i * 70}
              className="relative pl-12"
            >
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
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-lg font-semibold text-zinc-900 transition hover:underline dark:text-zinc-100"
                    >
                      {item.company}
                    </a>
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
                {item.media && item.media.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {item.media.map((media) => (
                      <figure key={media.src}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 300px"
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
            </Reveal>
          ))}
        </ol>
      </Reveal>

      <footer className="mt-20 border-t border-zinc-200 pt-12 dark:border-zinc-800">
        <div className="mb-8 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 dark:border-zinc-800 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-cyan-950/30 sm:p-10">
          <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Let's talk about your next challenge
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            Whether you're building at startup speed, scaling systems to
            millions of users, or modernizing legacy code, I bring experience in
            translating business needs into solid technical decisions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:parsakhosravani@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Get in touch
              <span aria-hidden>→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/parsakhosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              LinkedIn profile
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Parsa Khosravani</p>
          <div className="flex items-center gap-4">
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
              href="https://www.linkedin.com/in/parsakhosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              LinkedIn
            </a>
            <span aria-hidden>·</span>
            <a
              href="mailto:parsakhosravani@gmail.com"
              className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
