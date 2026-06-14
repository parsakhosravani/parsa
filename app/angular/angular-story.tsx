"use client";

import { useEffect, useRef } from "react";
import { chapters, frameworks } from "../lib/story";

const accent = frameworks.find((f) => f.slug === "angular")!.accent;

const template = `
  <div>
    <div class="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        class="h-full rounded-full transition-all duration-500"
        [style.width.%]="progress"
        [style.background]="accent"
      ></div>
    </div>

    <article class="rounded-2xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p class="text-xs uppercase tracking-widest text-zinc-500">{{ chapter.era }}</p>
      <h2 class="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{{ chapter.title }}</h2>
      <p class="mt-1 text-zinc-500 dark:text-zinc-400">{{ chapter.subtitle }}</p>
      <div class="mt-5 space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p *ngFor="let p of chapter.paragraphs">{{ p }}</p>
      </div>
    </article>

    <div class="mt-6 flex items-center justify-between">
      <button
        (click)="prev()"
        [disabled]="active === 0"
        class="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
      >
        ← Previous
      </button>

      <div class="flex gap-2">
        <button
          *ngFor="let c of chapters; let i = index"
          (click)="go(i)"
          [attr.aria-label]="'Go to ' + c.title"
          class="h-2.5 w-2.5 rounded-full transition"
          [ngClass]="i === active ? '' : 'bg-zinc-300 dark:bg-zinc-700'"
          [style.background]="i === active ? accent : ''"
          [style.transform]="i === active ? 'scale(1.3)' : 'scale(1)'"
        ></button>
      </div>

      <button
        (click)="next()"
        [disabled]="active === chapters.length - 1"
        class="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
      >
        Next →
      </button>
    </div>
  </div>
`;

export default function AngularStory() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let appRef: { destroy: () => void } | undefined;
    let hostEl: HTMLElement | undefined;
    let cancelled = false;

    (async () => {
      // Order matters: zone first, then the JIT compiler, then Angular itself.
      await import("zone.js");
      await import("@angular/compiler");
      const { Component } = await import("@angular/core");
      const { CommonModule } = await import("@angular/common");
      const { bootstrapApplication } =
        await import("@angular/platform-browser");

      if (cancelled || !hostRef.current) return;

      @Component({
        selector: "angular-story",
        standalone: true,
        imports: [CommonModule],
        template,
      })
      class StoryComponent {
        chapters = chapters;
        active = 0;
        accent = accent;

        get chapter() {
          return this.chapters[this.active];
        }
        get progress() {
          return ((this.active + 1) / this.chapters.length) * 100;
        }
        go(i: number) {
          this.active = i;
        }
        next() {
          if (this.active < this.chapters.length - 1) this.active++;
        }
        prev() {
          if (this.active > 0) this.active--;
        }
      }

      // Angular bootstraps into the first matching selector in the document.
      hostEl = document.createElement("angular-story");
      hostRef.current.appendChild(hostEl);

      appRef = (await bootstrapApplication(StoryComponent)) as unknown as {
        destroy: () => void;
      };
    })();

    return () => {
      cancelled = true;
      if (appRef) appRef.destroy();
      if (hostEl && hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
    };
  }, []);

  return <div ref={hostRef} />;
}
