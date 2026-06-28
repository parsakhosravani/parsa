import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts, formatDate } from "../../lib/blog";
import { BlogContent } from "../../components/blog-content";
import { ReadingProgress } from "../../components/reading-progress";
import { site, siteUrl } from "../../lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found | Parsa Khosravani" };
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | Parsa Khosravani`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: site.author,
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition hover:gap-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <span aria-hidden>←</span>
        All writing
      </Link>

      <article className="mt-8">
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h1 className="font-display mt-4 text-3xl leading-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="mt-8 h-px w-full"
          style={{
            background: `linear-gradient(to right, ${post.accent}, transparent)`,
          }}
        />

        <BlogContent blocks={post.content} />
      </article>

      <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Written by{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Parsa Khosravani
          </span>{" "}
          — Senior Frontend Engineer.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
          >
            <span aria-hidden>←</span>
            More posts
          </Link>
          <a
            href="https://www.linkedin.com/in/parsakhosravani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-700 transition hover:gap-2 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-cyan-300"
          >
            Discuss on LinkedIn
            <span aria-hidden>↗</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
