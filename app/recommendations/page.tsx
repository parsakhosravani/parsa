import Link from "next/link";
import {
  adplistProfile,
  linkedinProfile,
  linkedinRecommendations,
  reviews,
  socialProofStats,
} from "../lib/recommendations";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const avatarStyles = [
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
];

export default function RecommendationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">


      {/* Real reviews */}
      <section className="mb-16">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Mentee reviews
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {reviews.length} verbatim reviews · 5.0 average rating
            </p>
          </div>
          <a
            href={adplistProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-200 sm:inline-block"
          >
            View on AdpList →
          </a>
        </div>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70"
            >
              <div
                className="mb-3 flex items-center gap-1 text-amber-400"
                role="img"
                aria-label="Rated 5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.447a1 1 0 00-1.176 0l-3.366 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.27 9.391c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>

              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                “{review.text}”
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    avatarStyles[index % avatarStyles.length]
                  }`}
                >
                  {initials(review.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {review.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {review.role}
                  </p>
                </div>
                <time className="ml-auto shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
                  {review.date}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LinkedIn */}
      <section>
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/40">
            <svg
              className="h-6 w-6 text-cyan-700 dark:text-cyan-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              LinkedIn
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {linkedinRecommendations.length} recommendations from managers and
              teammates.
            </p>
          </div>
        </div>

        {linkedinRecommendations.length > 0 && (
          <div className="mt-5 columns-1 gap-5 md:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {linkedinRecommendations.map((rec, index) => (
              <article
                key={rec.id}
                className="rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50/60 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-cyan-900/40 dark:from-cyan-950/30 dark:to-zinc-900/70"
              >
                <svg
                  className="mb-3 h-7 w-7 text-cyan-300 dark:text-cyan-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A2.67 2.67 0 018.17 8.5V6h-1zm10 0A5.17 5.17 0 0012 11.17V18h6.83v-6.83H15.5a2.67 2.67 0 012.67-2.67V6h-1z" />
                </svg>
                <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {rec.text}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-cyan-200/60 pt-4 dark:border-cyan-900/40">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      avatarStyles[index % avatarStyles.length]
                    }`}
                  >
                    {initials(rec.name)}
                  </span>
                  <div className="min-w-0">
                    <a
                      href={rec.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-zinc-900 transition hover:text-cyan-700 dark:text-zinc-100 dark:hover:text-cyan-300"
                    >
                      {rec.name}
                    </a>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {rec.title}
                    </p>
                    <p className="mt-0.5 text-xs text-cyan-700 dark:text-cyan-400">
                      {rec.relationship} · {rec.date}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <nav className="mt-10 flex flex-wrap justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
        >
          ← Back to Home
        </Link>
        <Link
          href="/react"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
        >
          Read Story Chapters →
        </Link>
      </nav>
    </main>
  );
}
