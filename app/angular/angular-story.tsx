"use client";

import { useEffect, useRef } from "react";
import { frameworkStories } from "../lib/story";
import { readerClasses as c } from "../components/story-sections";

const story = frameworkStories.angular;

const template = `
  <div>
    <ol class="${c.tabs}">
      <li *ngFor="let ch of chapters; let i = index">
        <button
          type="button"
          (click)="go(i)"
          [attr.aria-current]="i === active ? 'true' : null"
          class="${c.tab}"
          [ngClass]="i === active ? '${c.tabActive}' : ''"
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
        <p *ngFor="let p of chapter.paragraphs">{{ p }}</p>
      </div>
    </article>

    <div class="${c.footer}">
      <button type="button" (click)="prev()" [disabled]="active === 0" class="${c.button}">
        Previous section
      </button>
      <span class="${c.count}">{{ active + 1 }} of {{ chapters.length }}</span>
      <button type="button" (click)="next()" [disabled]="active === chapters.length - 1" class="${c.button}">
        Next section
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
      // The JIT compiler must load before Angular itself. The app runs
      // zoneless (no zone.js): template event handlers schedule change
      // detection on their own, which is all this component needs.
      await import("@angular/compiler");
      const { Component, provideZonelessChangeDetection } = await import(
        "@angular/core"
      );
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
        chapters = story.chapters;
        active = 0;

        get chapter() {
          return this.chapters[this.active];
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
      hostRef.current.querySelector("[data-placeholder]")?.remove();
      hostEl = document.createElement("angular-story");
      hostRef.current.appendChild(hostEl);

      appRef = (await bootstrapApplication(StoryComponent, {
        providers: [provideZonelessChangeDetection()],
      })) as unknown as {
        destroy: () => void;
      };
    })();

    return () => {
      cancelled = true;
      if (appRef) appRef.destroy();
      if (hostEl && hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
    };
  }, []);

  return (
    <div ref={hostRef}>
      <p className="text-ink-faint" data-placeholder>
        Starting the Angular app…
      </p>
    </div>
  );
}
