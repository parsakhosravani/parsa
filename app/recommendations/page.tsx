import type { Metadata } from "next";
import Link from "next/link";
import {
  adplistProfile,
  linkedinProfile,
  linkedinRecommendations,
  reviews,
  socialProofStats,
} from "../lib/recommendations";

export const metadata: Metadata = {
  title: "Recommendations",
  description:
    "Recommendations for Parsa Khosravani from managers and teammates on LinkedIn, and reviews from mentees on AdpList.",
};

const sessions = socialProofStats.find((s) => s.label === "Sessions completed");

export default function RecommendationsPage() {
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
            Recommendations
          </h1>
          <p className="prose-serif set-in-late mt-6 max-w-[48ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
            What the people I’ve worked with and mentored have said, in their
            own words and unedited.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="colleagues"
        className="mt-20 grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr]"
      >
        <div className="md:pt-1">
          <h2
            id="colleagues"
            className="font-display text-xl leading-tight text-ink-soft"
          >
            From colleagues
          </h2>
          <a
            href={linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-2 inline-block text-sm text-ink-faint"
          >
            On LinkedIn
          </a>
        </div>
        <div className="grid gap-x-12 lg:grid-cols-2">
          {linkedinRecommendations.map((rec) => (
            <figure key={rec.id} className="border-t border-rule py-8">
              <blockquote className="prose-serif text-[1.125rem] leading-[1.65] text-ink">
                “{rec.text}”
              </blockquote>
              <figcaption className="mt-5 text-[0.9375rem]">
                <a
                  href={rec.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link font-semibold text-ink"
                >
                  {rec.name}
                </a>
                <span className="mt-0.5 block text-ink-soft">{rec.title}</span>
                <span className="mt-0.5 block text-sm text-ink-faint">
                  {rec.relationship}, {rec.date}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="mentees"
        className="mt-20 grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr]"
      >
        <div className="md:pt-1">
          <h2
            id="mentees"
            className="font-display text-xl leading-tight text-ink-soft"
          >
            From mentees
          </h2>
          <a
            href={adplistProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-2 inline-block text-sm text-ink-faint"
          >
            On AdpList
          </a>
        </div>
        <div>
          <p className="max-w-[60ch] text-ink-soft">
            I mentor frontend developers on AdpList
            {sessions ? `: ${sessions.value} sessions so far` : ""}. Every
            review below rated the session 5 out of 5.
          </p>
          <div className="mt-8 gap-x-10 sm:columns-2 lg:columns-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="mb-8 break-inside-avoid border-t border-rule pt-5"
              >
                <blockquote className="text-[0.9375rem] leading-relaxed text-ink">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold text-ink">{review.name}</span>
                  <span className="block text-ink-faint">{review.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
