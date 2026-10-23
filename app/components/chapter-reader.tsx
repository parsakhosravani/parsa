"use client";

import { useState } from "react";
import type { Chapter } from "../lib/story";
import { readerClasses as c } from "./story-sections";

/** The React chapter reader. Vue and Angular render the same markup. */
export function ChapterReader({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];

  return (
    <div>
      <ol className={c.tabs}>
        {chapters.map((ch, i) => (
          <li key={ch.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active ? "true" : undefined}
              className={`${c.tab} ${i === active ? c.tabActive : ""}`}
            >
              <span className={c.tabNumber}>{i + 1}</span>
              {ch.era}
            </button>
          </li>
        ))}
      </ol>

      <article className={c.article} aria-live="polite">
        <h3 className={c.title}>{chapter.title}</h3>
        <p className={c.subtitle}>{chapter.subtitle}</p>
        <div className={c.body}>
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <div className={c.footer}>
        <button
          type="button"
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          disabled={active === 0}
          className={c.button}
        >
          Previous section
        </button>
        <span className={c.count}>
          {active + 1} of {chapters.length}
        </span>
        <button
          type="button"
          onClick={() => setActive((i) => Math.min(chapters.length - 1, i + 1))}
          disabled={active === chapters.length - 1}
          className={c.button}
        >
          Next section
        </button>
      </div>
    </div>
  );
}
