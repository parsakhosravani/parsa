import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-20">
      <section className="w-full rounded-3xl border border-zinc-200 bg-white/70 p-8 text-center backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/40 sm:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          This page is off the map
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
          The route you requested does not exist, or it may have moved while the
          portfolio was being updated.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Back to Home
          </Link>
          <Link
            href="/react"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
          >
            Read React Story
          </Link>
        </div>
      </section>
    </main>
  );
}
