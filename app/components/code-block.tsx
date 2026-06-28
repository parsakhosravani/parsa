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
    <div className="my-6 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-sm dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            {lang}
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md px-2 py-1 font-mono text-xs text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100"
            aria-label={copied ? "Code copied" : "Copy code to clipboard"}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono text-zinc-100">{code}</code>
      </pre>
    </div>
  );
}
