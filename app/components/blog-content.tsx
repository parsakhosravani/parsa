import type { ContentBlock } from "../lib/blog";
import { CodeBlock } from "./code-block";

/** Render a string, turning `backtick` spans into inline code. */
function renderInline(text: string, keyBase: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyBase}-${i}`}
          className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-cyan-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={`${keyBase}-${i}`}>{part}</span>;
  });
}

export function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mt-10 space-y-1">
      {blocks.map((block, i) => {
        const key = `block-${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="font-display pt-8 text-2xl text-zinc-900 dark:text-zinc-100"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="pt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={key}
                className="pt-4 text-[15px] leading-7 text-zinc-700 dark:text-zinc-300"
              >
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="mt-4 space-y-2 pl-5 text-[15px] leading-7 text-zinc-700 marker:text-indigo-500 dark:text-zinc-300 dark:marker:text-cyan-400"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`} className="list-disc">
                    {renderInline(item, `${key}-${j}`)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={key}
                className="mt-4 space-y-2 pl-5 text-[15px] leading-7 text-zinc-700 marker:font-semibold marker:text-indigo-500 dark:text-zinc-300 dark:marker:text-cyan-400"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`} className="list-decimal">
                    {renderInline(item, `${key}-${j}`)}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="my-6 border-l-2 border-indigo-400 pl-5 text-[15px] italic leading-7 text-zinc-600 dark:border-cyan-500 dark:text-zinc-300"
              >
                {renderInline(block.text, key)}
              </blockquote>
            );
          case "code":
            return <CodeBlock key={key} lang={block.lang} code={block.code} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
