"use client";

import { useEffect, useRef } from "react";
import { frameworkStories } from "../lib/story";
import { readerClasses as c } from "../components/story-sections";

const story = frameworkStories.vue;

const template = `
  <div>
    <ol class="${c.tabs}">
      <li v-for="(ch, i) in chapters" :key="ch.id">
        <button
          type="button"
          @click="go(i)"
          :aria-current="i === active ? 'true' : null"
          class="${c.tab}"
          :class="i === active ? '${c.tabActive}' : ''"
        >
          <span class="${c.tabNumber}">{{ i + 1 }}</span>
          {{ ch.era }}
        </button>
      </li>
    </ol>

    <article class="${c.article}" aria-live="polite">
      <h3 class="${c.title}">{{ chapter.title }}</h3>
      <p class="${c.subtitle}">{{ chapter.subtitle }}</p>
      <div class="${c.body}">
        <p v-for="(p, i) in chapter.paragraphs" :key="i">{{ p }}</p>
      </div>
    </article>

    <div class="${c.footer}">
      <button type="button" @click="prev" :disabled="active === 0" class="${c.button}">
        Previous section
      </button>
      <span class="${c.count}">{{ active + 1 }} of {{ chapters.length }}</span>
      <button type="button" @click="next" :disabled="active === chapters.length - 1" class="${c.button}">
        Next section
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
      hostRef.current.querySelector("[data-placeholder]")?.remove();

      app = createApp({
        data() {
          return { chapters: story.chapters, active: 0 };
        },
        computed: {
          chapter(): (typeof story.chapters)[number] {
            // @ts-expect-error Vue runtime `this`
            return this.chapters[this.active];
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

  return (
    <div ref={hostRef}>
      <p className="text-ink-faint" data-placeholder>
        Starting the Vue app…
      </p>
    </div>
  );
}
