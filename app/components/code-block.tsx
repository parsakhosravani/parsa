"use client";

import { useState } from "react";

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (insecure context, permissions) — fail silently.
    }
  }

  return (
    <figure className="my-8 bg-zinc-900 font-sans text-zinc-100 dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <figcaption className="flex items-center justify-between px-4 pt-3 text-xs text-zinc-400">
        <span>{lang}</span>
        <button
          type="button"
          onClick={copy}
          className="text-zinc-300 transition hover:text-white"
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto px-4 pb-4 pt-3 text-[0.8125rem] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}
