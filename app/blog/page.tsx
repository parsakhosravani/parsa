import Link from "next/link";
import type { Metadata } from "next";
import { blogIntro, sortedPosts, formatDate } from "../lib/blog";

export const metadata: Metadata = {
  title: "Writing",
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
    <main className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
      <header className="grid gap-x-10 gap-y-4 md:grid-cols-[11rem_1fr]">
        <Link
          href="/#contents"
          className="link self-start text-sm text-ink-soft md:pt-4"
        >
          Contents
        </Link>
        <div>
          <h1 className="font-display set-in text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            {blogIntro.heading}
          </h1>
          <p className="prose-serif set-in-late mt-6 max-w-[48ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
            {blogIntro.subtitle}
          </p>
          <a href="/feed.xml" className="link mt-5 inline-block text-sm text-ink-soft">
            Subscribe with RSS
          </a>
        </div>
      </header>

      <ol className="mt-20 border-t border-rule">
        {sortedPosts.map((post) => (
          <li key={post.slug} className="border-b border-rule">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-x-10 gap-y-2 py-9 md:grid-cols-[11rem_1fr]"
            >
              <span className="text-sm text-ink-faint md:pt-2">
                <time dateTime={post.date} className="block tabular-nums">
                  {formatDate(post.date)}
                </time>
                <span>{post.readingMinutes} min read</span>
              </span>
              <span className="min-w-0">
                <span className="font-display block max-w-[30ch] text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.1] text-ink transition-colors group-hover:text-cobalt">
                  {post.title}
                </span>
                <span className="mt-3 block max-w-[62ch] text-ink-soft">
                  {post.description}
                </span>
                <span className="mt-3 block text-sm text-ink-faint">
                  {post.tags.join(", ")}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
