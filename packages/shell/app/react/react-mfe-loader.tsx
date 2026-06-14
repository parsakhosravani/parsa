"use client";

import dynamic from "next/dynamic";

const ReactStoryMfe = dynamic(() => import("mfe_react/App"), {
  ssr: false,
  loading: () => (
    <p className="py-8 text-center text-zinc-500">Loading React story…</p>
  ),
});

export function ReactMfeLoader() {
  return <ReactStoryMfe />;
}
