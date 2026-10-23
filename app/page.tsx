import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { chapterIndex } from "./lib/chapters";
import { githubUrl, projects } from "./lib/projects";
import { sortedPosts, formatDate } from "./lib/blog";
import { linkedinRecommendations, reviews } from "./lib/recommendations";
import { site } from "./lib/site";

const featuredQuote = {
  text: "Parsa is an exceptional front-end developer with a versatile skill set that extends far beyond his expertise in React and Vue.js.",
  name: "Massoud Beygi",
  context: "his direct manager for three years",
};

const appendices = [
  {
    href: "/career-timeline",
    title: "Career timeline",
    note: "Every role, in order",
  },
  {
    href: "/recommendations",
    title: "Recommendations",
    note: `${linkedinRecommendations.length + reviews.length} from managers, teammates and mentees`,
  },
  {
    href: "/blog",
    title: "Essays",
    note: `${sortedPosts.length} on performance and architecture`,
  },
];

/** A row on the page that keeps the book's margin column. */
function Spread({
  label,
  children,
  className = "",
  id,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr] ${className}`}
    >
      <h2
        id={headingId}
        className="font-display text-xl leading-tight text-ink-soft md:pt-1"
      >
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-20">
      {/* Title page */}
      <section className="grid gap-x-10 gap-y-8 md:grid-cols-[11rem_1fr]">
        <div className="order-2 md:order-1 md:pt-4">
          <div className="relative aspect-[4/5] w-32 overflow-hidden bg-zinc-300 md:w-full dark:bg-zinc-800">
            <Image
              src="/profile.jpg"
              alt="Portrait of Parsa Khosravani"
              fill
              sizes="(max-width: 768px) 128px, 176px"
              className="duotone object-cover"
              priority
            />
          </div>
          <p className="mt-3 text-sm leading-snug text-ink-faint">
            Tehran, open to relocating within Europe
          </p>
        </div>

        <div className="order-1 md:order-2">
          <h1 className="font-display set-in text-[clamp(3.6rem,12.5vw,10rem)] leading-[0.86] tracking-[-0.035em] text-ink">
            Parsa
            <br />
            Khosravani
          </h1>
          <p className="prose-serif set-in-late mt-8 max-w-[34ch] text-[clamp(1.3rem,2.4vw,1.65rem)] leading-[1.4] text-ink-soft">
            Senior frontend engineer. I build interfaces that stay calm when
            everything behind them doesn’t: sales-day traffic, startup
            deadlines, live market data.
          </p>
          <div className="set-in-late mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center bg-cobalt px-5 py-3 text-[0.9375rem] font-semibold text-cobalt-ink transition hover:opacity-90"
            >
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/parsakhosravani"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[0.9375rem] text-ink"
            >
              LinkedIn
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[0.9375rem] text-ink"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contents */}
      <Spread label="Contents" id="contents" className="mt-20 sm:mt-24">
        <p className="max-w-[60ch] text-ink-soft">
          My career so far, as three chapters. Each one is about a different
          company and a different kind of pressure, and each chapter page is
          built in the framework I used there.
        </p>
        <ol className="mt-8 border-t border-rule">
          {chapterIndex.map((c) => (
            <li key={c.slug} className="border-b border-rule">
              <Link
                href={`/${c.slug}`}
                className="toc-row group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-3 py-6 sm:grid-cols-[3.5rem_auto_1fr_auto] sm:gap-x-5"
                style={{ "--chapter": c.accentText } as CSSProperties}
              >
                <span className="font-display text-[1.75rem] leading-none text-ink-faint">
                  {c.numeral}
                </span>
                <span className="min-w-0">
                  <span className="toc-title font-display block text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.1] text-ink transition-colors">
                    {c.framework} at {c.company}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] text-ink-soft">
                    {c.line}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="toc-leader hidden sm:block"
                />
                <span className="font-display col-start-2 mt-2 text-lg tabular-nums text-ink-soft sm:col-start-auto sm:mt-0">
                  {c.years}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          {appendices.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group block">
                <span className="font-display text-xl text-ink transition-colors group-hover:text-cobalt">
                  {a.title}
                </span>
                <span className="mt-0.5 block text-sm text-ink-faint">
                  {a.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Spread>

      {/* Quote */}
      <Spread label="In their words" className="mt-28">
        <figure>
          <blockquote className="font-display max-w-[28ch] text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] text-ink">
            “{featuredQuote.text}”
          </blockquote>
          <figcaption className="mt-5 text-ink-soft">
            {featuredQuote.name}, {featuredQuote.context}.{" "}
            <Link href="/recommendations" className="link text-ink">
              Read all recommendations
            </Link>
          </figcaption>
        </figure>
      </Spread>

      {/* Selected work */}
      <Spread label="Selected work" className="mt-28">
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.name} className="border-t border-rule py-6">
              <h3 className="font-display text-2xl leading-tight text-ink">
                {project.name}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-ink-soft">
                {project.description}
              </p>
              <p className="mt-3 text-sm text-ink-faint">
                {project.tags.join(", ")}
              </p>
              <p className="mt-3 flex gap-5 text-sm">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-ink"
                  aria-label={`Source code for ${project.name}`}
                >
                  Source
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ink"
                    aria-label={`Live version of ${project.name}`}
                  >
                    Live
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-4 inline-block text-ink"
        >
          Everything else is on GitHub
        </a>
      </Spread>

      {/* Toolbox */}
      <Spread label="Toolbox" className="mt-28">
        <p className="prose-serif max-w-[54ch] text-ink-soft">
          Day to day I write <span className="text-ink">TypeScript</span>, in{" "}
          <span className="text-ink">React</span> and{" "}
          <span className="text-ink">Next.js</span>. Before that I shipped{" "}
          <span className="text-ink">Vue</span> with Nuxt, and{" "}
          <span className="text-ink">Angular</span>. Around them: Tailwind CSS,
          Storybook, Jest and Cypress for keeping things honest, AG Grid and
          Lightstreamer for live data, Node.js, and Figma for working with
          designers.
        </p>
      </Spread>

      {/* Writing */}
      <Spread label="Recent essays" className="mt-28">
        <ol className="border-t border-rule">
          {sortedPosts.slice(0, 3).map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[8.5rem_1fr]"
              >
                <time
                  dateTime={post.date}
                  className="text-sm tabular-nums text-ink-faint sm:pt-1.5"
                >
                  {formatDate(post.date)}
                </time>
                <span>
                  <span className="font-display block text-2xl leading-tight text-ink transition-colors group-hover:text-cobalt">
                    {post.title}
                  </span>
                  <span className="mt-1.5 block max-w-[62ch] text-[0.9375rem] text-ink-soft">
                    {post.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/blog" className="link mt-5 inline-block text-ink">
          All essays
        </Link>
      </Spread>
    </main>
  );
}
