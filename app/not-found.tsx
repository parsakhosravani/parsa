import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
      <div className="grid gap-x-10 gap-y-4 md:grid-cols-[11rem_1fr]">
        <p className="font-display text-xl text-ink-soft md:pt-4">Page 404</p>
        <div>
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            This page isn’t in the book
          </h1>
          <p className="prose-serif mt-6 max-w-[48ch] text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.5] text-ink-soft">
            The address may be mistyped, or the page moved when the site was
            redesigned. The contents page lists everything that’s here.
          </p>
          <Link
            href="/#contents"
            className="mt-9 inline-flex bg-cobalt px-5 py-3 text-[0.9375rem] font-semibold text-cobalt-ink transition hover:opacity-90"
          >
            Go to contents
          </Link>
        </div>
      </div>
    </main>
  );
}
