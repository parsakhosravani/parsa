"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-soft transition hover:text-ink"
    >
      {/* A half-filled circle: the ink side shows which mode you're in. */}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
      {dark ? "Light" : "Dark"}
    </button>
  );
}
