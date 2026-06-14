"use client";

import { useEffect, useRef } from "react";
import { chapters, frameworks } from "../lib/story";

const accent = frameworks.find((f) => f.slug === "vue")!.accent;

const template = `
  <div>
    <div class="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
      <div
        class="h-full rounded-full transition-all duration-500"
        :style="{ width: progress + '%', background: accent }"
      ></div>
    </div>

    <article class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7">
      <p class="text-xs uppercase tracking-widest text-zinc-500">{{ chapter.era }}</p>
      <h2 class="mt-1 text-2xl font-semibold text-zinc-100">{{ chapter.title }}</h2>
      <p class="mt-1 text-zinc-400">{{ chapter.subtitle }}</p>
      <div class="mt-5 space-y-4 leading-relaxed text-zinc-300">
        <p v-for="(p, i) in chapter.paragraphs" :key="i">{{ p }}</p>
      </div>
    </article>

    <div class="mt-6 flex items-center justify-between">
      <button
        @click="prev"
        :disabled="active === 0"
        class="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 disabled:opacity-30"
      >
        ← Previous
      </button>

      <div class="flex gap-2">
        <button
          v-for="(c, i) in chapters"
          :key="c.id"
          @click="go(i)"
          :aria-label="'Go to ' + c.title"
          class="h-2.5 w-2.5 rounded-full transition"
          :style="{
            background: i === active ? accent : 'rgb(63 63 70)',
            transform: i === active ? 'scale(1.3)' : 'scale(1)'
          }"
        ></button>
      </div>

      <button
        @click="next"
        :disabled="active === chapters.length - 1"
        class="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 disabled:opacity-30"
      >
        Next →
      </button>
    </div>
  </div>
`;

export default function VueStory() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app:
      | { mount: (el: Element) => unknown; unmount: () => void }
      | undefined;
    let cancelled = false;

    (async () => {
      // The full browser build ships the template compiler.
      const { createApp } = await import("vue/dist/vue.esm-browser.js");
      if (cancelled || !hostRef.current) return;

      app = createApp({
        data() {
          return { chapters, active: 0, accent };
        },
        computed: {
          chapter(): (typeof chapters)[number] {
            // @ts-expect-error Vue runtime `this`
            return this.chapters[this.active];
          },
          progress(): number {
            // @ts-expect-error Vue runtime `this`
            return ((this.active + 1) / this.chapters.length) * 100;
          },
        },
        methods: {
          go(i: number) {
            // @ts-expect-error Vue runtime `this`
            this.active = i;
          },
          next() {
            // @ts-expect-error Vue runtime `this`
            if (this.active < this.chapters.length - 1) this.active++;
          },
          prev() {
            // @ts-expect-error Vue runtime `this`
            if (this.active > 0) this.active--;
          },
        },
        template,
      });

      app.mount(hostRef.current);
    })();

    return () => {
      cancelled = true;
      if (app) app.unmount();
    };
  }, []);

  return <div ref={hostRef} />;
}
