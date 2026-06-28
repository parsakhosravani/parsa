import Link from "next/link";
import type { Metadata } from "next";
import { blogIntro, sortedPosts, formatDate } from "../lib/blog";
import { Reveal } from "../components/reveal";

export const metadata: Metadata = {
  title: "Writing | Parsa Khosravani",
  description:
    "Essays on frontend engineering, performance, and framework architecture across React, Vue, and Angular by Parsa Khosravani.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <header className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-4xl text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            {blogIntro.heading}
          </h1>
          <a
            href="/feed.xml"
            className="mt-2 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-amber-300 hover:text-amber-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-amber-700 dark:hover:text-amber-400"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.18 15.64a2.18 2.18 0 1 0 0 4.36 2.18 2.18 0 0 0 0-4.36zM4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83C19.56 11.4 12.6 4.44 4 4.44zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
            RSS
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {blogIntro.subtitle}
        </p>
      </header>

      <div className="space-y-5">
        {sortedPosts.map((post, i) => (
          <Reveal as="article" key={post.slug} delay={i * 80}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600 sm:p-8"
            >
              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="font-display mt-3 text-2xl text-zinc-900 transition group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-cyan-300">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:gap-2 dark:text-zinc-300">
                  Read
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
