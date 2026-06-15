"use client";

import { useEffect, useRef } from "react";

export function AngularMfeLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("mfe_angular/bootstrap").then(({ mount }) => {
      if (cancelled || !containerRef.current) return;
      mount(containerRef.current).then(({ destroy }) => {
        if (cancelled) {
          destroy();
        } else {
          cleanup = destroy;
        }
      });
    });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={containerRef} />;
}
