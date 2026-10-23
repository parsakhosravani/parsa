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
          className="bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.82em] text-ink dark:bg-zinc-800"
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
    <div className="prose-serif text-ink">
      {blocks.map((block, i) => {
        const key = `block-${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="font-display mt-14 text-[1.9rem] leading-tight text-ink"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="mt-10 font-sans text-[1.0625rem] font-semibold text-ink"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="mt-5">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="mt-5 list-disc space-y-2 pl-6 marker:text-ink-faint"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={key}
                className="mt-5 list-decimal space-y-2 pl-6 marker:text-ink-faint"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="font-display my-10 text-[1.6rem] leading-snug text-ink"
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
