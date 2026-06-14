"use client";

import { useEffect, useRef } from "react";

export function VueMfeLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("mfe_vue/mount").then(({ mount }) => {
      if (cancelled || !containerRef.current) return;
      const { unmount } = mount(containerRef.current);
      cleanup = unmount;
    });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={containerRef} />;
}
