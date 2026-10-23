import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts, formatDate } from "../../lib/blog";
import { BlogContent } from "../../components/blog-content";
import { ReadingProgress } from "../../components/reading-progress";
import { site, siteUrl } from "../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
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

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
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
    <main className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="grid gap-x-10 gap-y-6 md:grid-cols-[11rem_1fr]">
        <aside className="text-sm text-ink-faint md:pt-4">
          <Link href="/blog" className="link text-ink-soft">
            All essays
          </Link>
          <p className="mt-6">
            <time dateTime={post.date} className="block tabular-nums text-ink">
              {formatDate(post.date)}
            </time>
            {post.readingMinutes} min read
          </p>
          <p className="mt-4 hidden md:block">{post.tags.join(", ")}</p>
        </aside>

        <div className="min-w-0">
          <header>
            <h1 className="font-display set-in max-w-[22ch] text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.025em] text-ink">
              {post.title}
            </h1>
            <p className="prose-serif set-in-late mt-6 max-w-[52ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
              {post.description}
            </p>
          </header>

          <div className="mt-12 max-w-[68ch] border-t border-rule">
            <BlogContent blocks={post.content} />
          </div>

          <footer className="mt-16 max-w-[68ch] border-t border-rule pt-8">
            <p className="text-ink-soft">
              Written by <span className="text-ink">{site.author}</span>,
              senior frontend engineer. If this was useful or you disagree,
              I’d like to hear why.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/blog" className="link text-ink">
                More essays
              </Link>
              <a
                href="https://www.linkedin.com/in/parsakhosravani"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-ink"
              >
                Discuss on LinkedIn
              </a>
            </p>
          </footer>
        </div>
      </article>
    </main>
  );
}
