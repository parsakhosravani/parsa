import Link from "next/link";
import { intro, chapters, frameworks } from "./lib/story";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-8 backdrop-blur-sm sm:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
          {intro.role}
        </p>
        <h1 className="mt-4 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
          {intro.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          {intro.tagline}
        </p>
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
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-600"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: fw.accent }}
              />
              <h3
                className="text-xl font-semibold"
                style={{ color: fw.accent }}
              >
                {fw.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{fw.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-300 transition group-hover:gap-2">
                Enter the story
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Chapters
        </h2>
        <ol className="mt-5 space-y-3">
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className="flex items-baseline gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 px-5 py-4"
            >
              <span className="font-mono text-sm text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  {chapter.era}
                </p>
                <p className="text-zinc-200">{chapter.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-16 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
        <a
          href="https://github.com/parsakhosravani"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-zinc-200"
        >
          GitHub
        </a>
        <span aria-hidden>·</span>
        <a
          href="mailto:parsakhosravani@gmail.com"
          className="transition hover:text-zinc-200"
        >
          Email
        </a>
      </footer>
    </main>
  );
}
